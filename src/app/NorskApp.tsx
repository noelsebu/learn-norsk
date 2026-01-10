"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { VOCAB, ALL_WORDS, type Word } from "@/data/vocabulary";
import {
  PHRASES, GRAMMAR, CONJUGATIONS, SENTENCES, FILL_BLANKS,
  DIALOGUES, READINGS,
} from "@/data/content";
import styles from "./NorskApp.module.css";

const sh = <T,>(a: T[]): T[] => [...a].sort(() => Math.random() - 0.5);
const pk = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
const lc = (l: string) => l === "A1" ? "#34D399" : "#FBBF24";

type Level = "all" | "A1" | "A2";
type Tab = "home"|"vocab"|"phrases"|"grammar"|"dialog"|"read"|"quiz"|"build"|"fill"|"conj"|"stats";

interface ChipItem { t: string; id: number; }

export default function NorskApp() {
  const [tab, setTab] = useState<Tab>("home");
  const [lvl, setLvl] = useState<Level>("all");
  const [cat, setCat] = useState(Object.keys(VOCAB)[0]);
  const [fl, setFl] = useState<Record<string, boolean>>({});
  const [xp, setXp] = useState(0);
  const [hist, setHist] = useState<{t:string;c:boolean;ts:number}[]>([]);
  const ax = (n: number) => setXp(x => x + n);
  const lg = (t: string, c: boolean) => setHist(h => [...h, { t, c, ts: Date.now() }]);

  // Quiz
  const [q, setQ] = useState<{w:Word;opts:string[];done:boolean;mode:string}|null>(null);
  const [qSel, setQSel] = useState<string|null>(null);
  const [qSc, setQSc] = useState({ c: 0, t: 0 });
  const [qStr, setQStr] = useState(0);
  const [qMd, setQMd] = useState("no2en");

  const genQ = useCallback(() => {
    const pool = lvl !== "all" ? ALL_WORDS.filter(w => w.l === lvl) : ALL_WORDS;
    if (pool.length < 4) return;
    const w = pk(pool);
    const wrongs = sh(pool.filter(x => x.e !== w.e)).slice(0, 3);
    const rev = qMd === "en2no";
    const opts = sh([...wrongs.map(x => rev ? x.n : x.e), rev ? w.n : w.e]);
    setQ({ w, opts, done: false, mode: qMd }); setQSel(null);
  }, [lvl, qMd]);

  useEffect(() => { if (tab === "quiz" && !q) genQ(); }, [tab, q, genQ]);

  const ansQ = (a: string) => {
    if (!q || q.done) return;
