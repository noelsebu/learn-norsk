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
    const ok = q.mode === "en2no" ? a === q.w.n : a === q.w.e;
    setQSel(a); setQ({ ...q, done: true });
    setQSc(s => ({ c: s.c + (ok ? 1 : 0), t: s.t + 1 }));
    setQStr(s => ok ? s + 1 : 0);
    if (ok) ax(10 + Math.min(qStr * 2, 20));
    lg("quiz", ok);
  };
  const qAns = q ? (q.mode === "en2no" ? q.w.n : q.w.e) : "";

  // Sentence builder
  const [si, setSi] = useState(0);
  const [so, setSo] = useState<ChipItem[]>([]);
  const [sp, setSp] = useState<ChipItem[]>([]);
  const [sd, setSd] = useState(false);
  const [sc, setSc] = useState<boolean|null>(null);
  const sf = useMemo(() => lvl !== "all" ? SENTENCES.filter(x => x.l === lvl) : SENTENCES, [lvl]);

  const initS = useCallback((idx: number) => {
    if (sf.length === 0) return;
    const s = sf[idx % sf.length];
    setSo([]); setSp(sh(s.w.map((p, j) => ({ t: p, id: j })))); setSd(false); setSc(null);
  }, [sf]);

  useEffect(() => { if (tab === "build" && sf.length > 0) initS(si); }, [tab, si, initS, sf.length]);

  const sAdd = (w: ChipItem) => {
    if (sd || sf.length === 0) return;
    const n = [...so, w]; setSo(n); setSp(sp.filter(x => x.id !== w.id));
    if (n.length === sf[si % sf.length].w.length) {
      const ok = n.map(x => x.t).join(" ") === sf[si % sf.length].w.join(" ");
      setSd(true); setSc(ok); if (ok) ax(15); lg("build", ok);
    }
  };
  const sRem = (w: ChipItem) => { if (sd) return; setSo(so.filter(x => x.id !== w.id)); setSp([...sp, w]); };

  // Fill blank
  const [fi, setFi] = useState(0);
  const [fv, setFv] = useState("");
  const [fc, setFc] = useState<boolean|null>(null);
  const ff = useMemo(() => lvl !== "all" ? FILL_BLANKS.filter(x => x.l === lvl) : FILL_BLANKS, [lvl]);
  const chkF = () => {
    if (ff.length === 0) return;
    const ok = fv.trim().toLowerCase() === ff[fi % ff.length].a.toLowerCase();
    setFc(ok); if (ok) ax(12); lg("fill", ok);
  };

  // Conjugation
  const [ci, setCi] = useState(0);
  const [cv, setCv] = useState({ p: "", pa: "", pe: "" });
  const [cc, setCc] = useState<{p:boolean;pa:boolean;pe:boolean}|null>(null);
  const cV = CONJUGATIONS[ci % CONJUGATIONS.length];
  const chkC = () => {
    const r = {
      p: cv.p.trim().toLowerCase() === cV.pr.toLowerCase(),
      pa: cv.pa.trim().toLowerCase() === cV.pa.toLowerCase(),
      pe: cv.pe.trim().toLowerCase() === cV.pf.toLowerCase()
    };
    setCc(r); const ok = r.p && r.pa && r.pe; if (ok) ax(20); lg("conj", ok);
  };

  // Dialogue
  const [di, setDi] = useState(0);
  const [dSh, setDSh] = useState(false);

  // Reading
  const [ri, setRi] = useState(0);
  const [rSh, setRSh] = useState(false);
  const [rAn, setRAn] = useState<Record<number,string>>({});
  const [rCh, setRCh] = useState(false);

  // Filtered data
  const fV = useMemo(() => { const w = VOCAB[cat] || []; return lvl !== "all" ? w.filter(x => x.l === lvl) : w; }, [cat, lvl]);
  const fP = useMemo(() => lvl !== "all" ? PHRASES.filter(p => p.l === lvl) : PHRASES, [lvl]);
  const fG = useMemo(() => lvl !== "all" ? GRAMMAR.filter(g => g.l === lvl) : GRAMMAR, [lvl]);
  const fD = useMemo(() => lvl !== "all" ? DIALOGUES.filter(d => d.l === lvl) : DIALOGUES, [lvl]);
  const fR = useMemo(() => lvl !== "all" ? READINGS.filter(r => r.l === lvl) : READINGS, [lvl]);

  const tc = hist.filter(h => h.c).length;
  const ta = hist.length;
  const xlv = Math.floor(xp / 100) + 1;
  const xpr = xp % 100;

  const IS: React.CSSProperties = { padding: "12px 14px", borderRadius: 10, border: "1.5px solid var(--bd)", background: "var(--sf)", color: "var(--tx)", fontFamily: "'Nunito Sans',sans-serif", fontSize: 16, fontWeight: 600, outline: "none", width: "100%", minHeight: 46 };

  const Badge = ({ l }: { l: string }) => (
    <span className={styles.BD} style={{ background: `${lc(l)}15`, color: lc(l) }}>{l}</span>
  );

  return (
    <div className={styles.R}>
      <div className={styles.TB}>
        <div className={styles.XR}>
          <span style={{fontWeight:700,color:"var(--go)"}}>Lvl {xlv}</span>
          <div className={styles.XB}><div className={styles.XF} style={{width:`${xpr}%`}}/></div>
          <span>{xp} XP</span>
          <span style={{color:"var(--mi)",fontWeight:700}}>{tc}/{ta}</span>
        </div>
        <div className={styles.NR}>
          {([["home","🏠","Home"],["vocab","📖","Words"],["phrases","💬","Phrases"],["grammar","📝","Grammar"],
            ["dialog","🗣️","Dialogues"],["read","📰","Read"],["quiz","🎯","Quiz"],["build","🧩","Build"],
