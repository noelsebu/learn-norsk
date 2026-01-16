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
            ["fill","✍️","Fill"],["conj","🔄","Conj"],["stats","📊","Stats"]
          ] as const).map(([id,ic,lb])=>(
            <button key={id} className={`${styles.NB} ${tab===id?styles.NBa:""}`} onClick={()=>{setTab(id as Tab);if(id==="quiz")setQ(null);}}>
              <span style={{fontSize:14}}>{ic}</span><span className={styles.nl}>{lb}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.M}>
        {!["home","stats"].includes(tab) && (
          <div className={styles.LP}>
            {([["all","All"],["A1","A1"],["A2","A2"]] as const).map(([v,t])=>(
              <button key={v} className={`${styles.LB} ${lvl===v?styles.LBa:""}`} onClick={()=>setLvl(v as Level)}>{t}</button>
            ))}
          </div>
        )}

        {/* HOME */}
        {tab==="home"&&<div>
          <div style={{textAlign:"center",padding:"40px 14px 24px",animation:"fadeUp .5s both"}}>
            <h1 className={styles.heroTitle}>Lær Norsk — A1→A2</h1>
            <p style={{color:"var(--tm)",marginTop:10,fontSize:14,maxWidth:480,marginInline:"auto",lineHeight:1.6}}>Complete CEFR-aligned Norwegian course. {ALL_WORDS.length}+ words, {GRAMMAR.length} grammar topics, {DIALOGUES.length} dialogues, {READINGS.length} readings, and 4 exercise types.</p>
          </div>
          <div className={styles.SG} style={{animation:"fadeUp .4s .1s both"}}>
            <div className={styles.SD}><div className={styles.sn} style={{color:"var(--go)"}}>{xlv}</div><div className={styles.sl}>Level</div></div>
            <div className={styles.SD}><div className={styles.sn} style={{color:"var(--acl)"}}>{xp}</div><div className={styles.sl}>XP</div></div>
            <div className={styles.SD}><div className={styles.sn} style={{color:"var(--mi)"}}>{tc}</div><div className={styles.sl}>Correct</div></div>
            <div className={styles.SD}><div className={styles.sn}>{ALL_WORDS.length}+</div><div className={styles.sl}>Words</div></div>
          </div>
          <div className={styles.FG}>
            {[{ic:"📖",t:"Vocabulary",d:`${ALL_WORDS.length}+ words`,to:"vocab"},{ic:"💬",t:"Phrases",d:`${PHRASES.length} phrases`,to:"phrases"},
              {ic:"📝",t:"Grammar",d:`${GRAMMAR.length} topics`,to:"grammar"},{ic:"🗣️",t:"Dialogues",d:`${DIALOGUES.length} dialogues`,to:"dialog"},
              {ic:"📰",t:"Reading",d:`${READINGS.length} passages`,to:"read"},{ic:"🎯",t:"Quiz",d:"2 quiz modes",to:"quiz"},
              {ic:"🧩",t:"Build",d:`${SENTENCES.length} sentences`,to:"build"},{ic:"✍️",t:"Fill",d:`${FILL_BLANKS.length} exercises`,to:"fill"},
              {ic:"🔄",t:"Conjugate",d:`${CONJUGATIONS.length} verbs`,to:"conj"},{ic:"📊",t:"Stats",d:"Track progress",to:"stats"},
            ].map((f,i)=>(
              <div className={styles.FD} key={f.t} style={{animation:`fadeUp .4s ${i*40}ms both`}} onClick={()=>{setTab(f.to as Tab);if(f.to==="quiz")setQ(null);}}>
                <div className={styles.ic}>{f.ic}</div><h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>}

        {/* VOCAB */}
        {tab==="vocab"&&<div>
          <h2 className={styles.ST}>Vocabulary</h2>
          <div className={styles.CP}>{Object.keys(VOCAB).map(c=>(
            <button key={c} className={`${styles.CB} ${cat===c?styles.CBa:""}`} onClick={()=>{setCat(c);setFl({});}}>{c}</button>
          ))}</div>
          {fV.length===0?<p style={{color:"var(--tm)",textAlign:"center",padding:30}}>No words at this level.</p>:
          <div className={styles.G}>{fV.map((w,i)=>(
            <div key={cat+i} className={styles.FC} style={{animationDelay:`${i*25}ms`}} onClick={()=>setFl(f=>({...f,[cat+i]:!f[cat+i]}))}>
              <div className={styles.FI} style={{transform:fl[cat+i]?"rotateY(180deg)":"rotateY(0)"}}>
                <div className={styles.FF}>
                  <Badge l={w.l} />
                  <span style={{fontSize:19,fontWeight:800,color:"var(--acl)",fontFamily:"'Crimson Pro',serif",marginTop:2}}>{w.n}</span>
                  <span style={{fontSize:10,color:"var(--tm)",fontStyle:"italic"}}>/{w.p}/</span>
                  {w.g?<span style={{fontSize:9,color:"var(--bd)",fontWeight:700}}>({w.g})</span>:null}
                  <span style={{fontSize:8,color:"var(--tm)",marginTop:5,opacity:.35,textTransform:"uppercase",letterSpacing:2}}>tap to flip</span>
                </div>
                <div className={styles.FB}>
                  <span style={{fontSize:17,fontWeight:700,fontFamily:"'Crimson Pro',serif"}}>{w.e}</span>
                  <span style={{fontSize:11,opacity:.7}}>{w.n}</span>
                </div>
              </div>
            </div>
          ))}</div>}
        </div>}

        {/* PHRASES */}
        {tab==="phrases"&&<div>
          <h2 className={styles.ST}>Phrases ({fP.length})</h2>
          {fP.map((p,i)=>(
            <div className={styles.PR} key={i} style={{animationDelay:`${i*20}ms`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                <span style={{fontSize:15,fontWeight:700,color:"var(--acl)",fontFamily:"'Crimson Pro',serif"}}>{p.n}</span>
                <Badge l={p.l} />
              </div>
              <div style={{fontSize:12,color:"var(--tx)",marginTop:3,opacity:.85}}>{p.e}</div>
              <div style={{fontSize:10,color:"var(--tm)",marginTop:2,fontStyle:"italic"}}>/{p.p}/</div>
            </div>
          ))}
        </div>}

        {/* GRAMMAR */}
        {tab==="grammar"&&<div>
          <h2 className={styles.ST}>Grammar ({fG.length})</h2>
          {fG.map((g,i)=>(
            <div className={styles.GC} key={i} style={{animationDelay:`${i*40}ms`}}>
              <h3><span>{g.em}</span> {g.t} <Badge l={g.l} /></h3>
              <p>{g.d}</p>
              {g.ex.map((e,j)=><div className={styles.EL} key={j}>{e}</div>)}
              {g.tip&&<div className={styles.TP}>💡 {g.tip}</div>}
            </div>
          ))}
        </div>}

        {/* DIALOGUES */}
        {tab==="dialog"&&<div>
