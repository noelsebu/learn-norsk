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
          <h2 className={styles.ST}>Dialogues</h2>
          <div className={styles.CP}>{fD.map((d,i)=>(
            <button key={i} className={`${styles.CB} ${di===i?styles.CBa:""}`} onClick={()=>{setDi(i);setDSh(false);}}>{d.t}</button>
          ))}</div>
          {fD.length===0?<p style={{color:"var(--tm)"}}>No dialogues at this level.</p>:(()=>{
            const d=fD[di%fD.length]; return <div>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}>
                <h3 style={{fontFamily:"'Crimson Pro',serif",fontSize:19,fontWeight:700}}>{d.t}</h3>
                <Badge l={d.l} />
                <button className={`${styles.BT} ${styles.BG}`} style={{padding:"4px 12px",fontSize:11,marginLeft:"auto",width:"auto",minHeight:32}} onClick={()=>setDSh(!dSh)}>{dSh?"Hide":"Show"} EN</button>
              </div>
              {d.li.map((ln,i)=>(
                <div className={styles.DL} key={i} style={{animationDelay:`${i*50}ms`}}>
                  <div className={styles.DA} style={{background:ln.w==="A"?"var(--ac)":"var(--co)",color:"#fff"}}>{ln.w}</div>
                  <div>
                    <div style={{fontWeight:700,fontSize:13,color:"var(--acl)"}}>{ln.n}</div>
                    {dSh&&<div style={{fontSize:11,color:"var(--tm)",marginTop:2}}>{ln.e}</div>}
                  </div>
                </div>
              ))}
            </div>;
          })()}
        </div>}

        {/* READING */}
        {tab==="read"&&<div>
          <h2 className={styles.ST}>Reading</h2>
          <div className={styles.CP}>{fR.map((r,i)=>(
            <button key={i} className={`${styles.CB} ${ri===i?styles.CBa:""}`} onClick={()=>{setRi(i);setRSh(false);setRAn({});setRCh(false);}}>{r.t}</button>
          ))}</div>
          {fR.length===0?<p style={{color:"var(--tm)"}}>No readings at this level.</p>:(()=>{
            const r=fR[ri%fR.length]; return <div>
              <div className={styles.RB} style={{marginBottom:12}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap"}}>
                  <h3 style={{fontFamily:"'Crimson Pro',serif",fontSize:19,fontWeight:700}}>{r.t}</h3>
                  <Badge l={r.l} />
                  <button className={`${styles.BT} ${styles.BG}`} style={{padding:"4px 12px",fontSize:11,marginLeft:"auto",width:"auto",minHeight:32}} onClick={()=>setRSh(!rSh)}>{rSh?"Hide":"Show"} EN</button>
                </div>
                <div className={styles.RT}>{r.tx}</div>
                {rSh&&<div style={{marginTop:10,padding:10,background:"rgba(37,99,235,.05)",borderRadius:9,fontSize:12,color:"var(--tm)",lineHeight:1.7}}>{r.en}</div>}
              </div>
              <div className={styles.GC}>
                <h3><span>❓</span> Questions</h3>
                {r.qs.map((qu,qi)=>(
                  <div key={qi} style={{marginBottom:12}}>
                    <p style={{fontWeight:700,fontSize:13,color:"var(--tx)",marginBottom:5}}>{qi+1}. {qu.q}</p>
                    <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
                      {qu.o.map(o=>{
                        let s: React.CSSProperties={padding:"8px 14px",borderRadius:8,border:"1.5px solid var(--bd)",background:"var(--sf)",color:"var(--tx)",fontFamily:"'Nunito Sans',sans-serif",fontSize:13,fontWeight:600,cursor:"pointer",transition:"all .2s",minHeight:40};
                        if(rCh){if(o===qu.a)s={...s,borderColor:"var(--ok)",background:"rgba(34,197,94,.08)",color:"var(--ok)"};
                        else if(rAn[qi]===o&&o!==qu.a)s={...s,borderColor:"var(--no)",background:"rgba(239,68,68,.08)",color:"var(--no)"};}
                        else if(rAn[qi]===o)s={...s,borderColor:"var(--ac)",background:"rgba(37,99,235,.08)"};
                        return <button key={o} style={s} onClick={()=>{if(!rCh)setRAn(a=>({...a,[qi]:o}));}}>{o}</button>;
                      })}
                    </div>
                  </div>
                ))}
                {!rCh?<button className={styles.BT} onClick={()=>{setRCh(true);const ok=r.qs.every((qu,qi)=>rAn[qi]===qu.a);if(ok)ax(25);lg("read",ok);}}>Check</button>:
                <div>
                  {r.qs.every((qu,qi)=>rAn[qi]===qu.a)?<p style={{color:"var(--ok)",fontWeight:700}}>✓ All correct! +25 XP</p>:
                  <p style={{color:"var(--no)",fontWeight:700}}>Review answers above.</p>}
                  <button className={styles.BT} style={{marginTop:6}} onClick={()=>{setRi(i=>i+1);setRSh(false);setRAn({});setRCh(false);}}>Next →</button>
                </div>}
              </div>
            </div>;
          })()}
        </div>}

        {/* QUIZ */}
        {tab==="quiz"&&<div>
          <h2 className={styles.ST} style={{textAlign:"center"}}>Quiz</h2>
          <div style={{display:"flex",justifyContent:"center",gap:5,marginBottom:14}}>
            {([["no2en","NO → EN"],["en2no","EN → NO"]] as const).map(([m,l])=>(
              <button key={m} className={`${styles.LB} ${qMd===m?styles.LBa:""}`} onClick={()=>{setQMd(m);setQ(null);setTimeout(genQ,50);}}>{l}</button>
            ))}
          </div>
          <div className={styles.SR}>
            <div className={styles.SI}><div className={styles.sn} style={{color:"var(--ok)"}}>{qSc.c}</div><div className={styles.sl}>Correct</div></div>
            <div className={styles.SI}><div className={styles.sn}>{qSc.t}</div><div className={styles.sl}>Total</div></div>
            <div className={styles.SI}><div className={styles.sn} style={{color:"var(--go)"}}>{qSc.t?Math.round(qSc.c/qSc.t*100):0}%</div><div className={styles.sl}>Acc</div></div>
            <div className={styles.SI}><div className={styles.sn} style={{color:"var(--co)"}}>{qStr}🔥</div><div className={styles.sl}>Streak</div></div>
          </div>
          {q&&<div className={styles.QC}>
            <div style={{fontSize:9,color:"var(--tm)",textTransform:"uppercase",letterSpacing:3,marginBottom:8}}>{q.mode==="en2no"?"Translate to Norwegian":"What does this mean?"}</div>
            <div className={styles.QW}>{q.mode==="en2no"?q.w.e:q.w.n}</div>
            <div style={{color:"var(--tm)",fontSize:12,margin:"4px 0 0",fontStyle:"italic"}}>/{q.w.p}/</div>
            <div className={styles.QO}>{q.opts.map(o=>{let c=styles.QP;if(q.done){c+=` ${styles.QPd}`;if(o===qAns)c+=` ${styles.QPok}`;else if(o===qSel&&o!==qAns)c+=` ${styles.QPno}`;}return <button key={o} className={c} onClick={()=>ansQ(o)}>{o}</button>;})}</div>
            {q.done&&<div style={{marginTop:14}}>
              {qSel===qAns?<p style={{color:"var(--ok)",fontWeight:700,marginBottom:8}}>✓ Correct!</p>:
              <p style={{color:"var(--no)",fontWeight:700,marginBottom:8}}>✗ Answer: {qAns}</p>}
              <button className={styles.BT} onClick={genQ}>Next →</button>
            </div>}
          </div>}
        </div>}

        {/* SENTENCE BUILDER */}
        {tab==="build"&&<div>
          <h2 className={styles.ST}>Sentence Builder</h2>
          {sf.length===0?<p style={{color:"var(--tm)"}}>No sentences at this level.</p>:
          <div className={styles.QC} style={{textAlign:"left"}}>
            <p style={{color:"var(--tm)",fontSize:11,marginBottom:4}}>Arrange to form the correct sentence:</p>
            <p style={{color:"var(--acl)",fontWeight:700,fontSize:14,fontFamily:"'Crimson Pro',serif",marginBottom:12}}>
              &ldquo;{sf[si%sf.length].e}&rdquo; <Badge l={sf[si%sf.length].l} />
            </p>
            <div className={`${styles.SZ} ${sd?(sc?styles.SZok:styles.SZbad):""}`}>
              {so.length===0&&<span style={{color:"var(--tm)",fontSize:11,opacity:.5}}>Tap words below...</span>}
              {so.map(w=><span key={w.id} className={styles.SC} onClick={()=>sRem(w)}>{w.t}</span>)}
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
              {sp.map(w=><span key={w.id} className={`${styles.SC} ${styles.SCp}`} onClick={()=>sAdd(w)}>{w.t}</span>)}
            </div>
            {sd&&<div>{sc?<p style={{color:"var(--ok)",fontWeight:700,marginBottom:8}}>✓ Perfect! +15 XP</p>:
            <p style={{color:"var(--no)",fontWeight:700,marginBottom:8}}>✗ Correct: {sf[si%sf.length].w.join(" ")}</p>}
            <button className={styles.BT} onClick={()=>setSi(i=>i+1)}>Next →</button></div>}
            {!sd&&so.length>0&&<button className={`${styles.BT} ${styles.BG}`} style={{padding:"5px 14px",fontSize:11}} onClick={()=>initS(si)}>Reset</button>}
          </div>}
        </div>}

        {/* FILL BLANK */}
        {tab==="fill"&&<div>
          <h2 className={styles.ST}>Fill in the Blank</h2>
          {ff.length===0?<p style={{color:"var(--tm)"}}>No exercises at this level.</p>:(()=>{
            const f=ff[fi%ff.length]; return <div className={styles.QC} style={{textAlign:"left"}}>
              <Badge l={f.l} />
              <p style={{fontSize:19,fontWeight:700,fontFamily:"'Crimson Pro',serif",color:"var(--tx)",margin:"10px 0",lineHeight:1.4}}>
                {f.s.split("___").map((pt,i,a)=><span key={i}>{pt}{i<a.length-1&&<span style={{display:"inline-block",minWidth:70,borderBottom:"2.5px solid var(--ac)",textAlign:"center",color:fc!==null?(fc?"var(--ok)":"var(--no)"):"var(--acl)",fontWeight:700}}>{fc!==null?(fc?f.a:`${fv} → ${f.a}`):fv||"\u00a0"}</span>}</span>)}
              </p>
              <p style={{color:"var(--tm)",fontSize:11,marginBottom:10}}>Hint: {f.h}</p>
              {fc===null?<div style={{display:"flex",gap:7}}>
                <input style={IS} value={fv} onChange={e=>setFv(e.target.value)} onKeyDown={e=>e.key==="Enter"&&fv.trim()&&chkF()} placeholder="Type answer..." autoFocus/>
                <button className={styles.BT} style={{minWidth:80}} onClick={chkF} disabled={!fv.trim()}>Check</button>
              </div>:<div>
                {fc?<p style={{color:"var(--ok)",fontWeight:700,marginBottom:8}}>✓ Correct! +12 XP</p>:
                <p style={{color:"var(--no)",fontWeight:700,marginBottom:8}}>✗ Answer: <strong>{f.a}</strong></p>}
                <button className={styles.BT} onClick={()=>{setFi(i=>i+1);setFv("");setFc(null);}}>Next →</button>
              </div>}
            </div>;
          })()}
        </div>}

        {/* CONJUGATION */}
        {tab==="conj"&&<div>
          <h2 className={styles.ST}>Verb Conjugation</h2>
          <div className={styles.QC} style={{textAlign:"left"}}>
            <div style={{textAlign:"center",marginBottom:14}}>
              <div style={{fontSize:9,color:"var(--tm)",textTransform:"uppercase",letterSpacing:3}}>Group {cV.g}</div>
              <div style={{fontFamily:"'Crimson Pro',serif",fontSize:28,fontWeight:900,color:"var(--acl)",marginTop:3}}>{cV.i}</div>
              <div style={{color:"var(--tm)",fontSize:12}}>({cV.e})</div>
            </div>
            <table className={styles.CT}><thead><tr><th>Tense</th><th>Answer</th><th></th></tr></thead><tbody>
              {([["p","Present",cV.pr],["pa","Past",cV.pa],["pe","Perfect",cV.pf]] as const).map(([k,l,a])=>(
                <tr key={k}><td style={{fontWeight:600,fontSize:12,color:"var(--tm)"}}>{l}</td>
                <td><input style={{...IS,borderColor:cc?(cc[k as keyof typeof cc]?"var(--ok)":"var(--no)"):"var(--bd)"}} value={cv[k as keyof typeof cv]} onChange={e=>setCv(p=>({...p,[k]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&chkC()} placeholder={`${l}...`} disabled={cc!==null}/></td>
                <td style={{fontSize:12,fontWeight:700,color:cc?.[k as keyof typeof cc]?"var(--ok)":"var(--no)"}}>{cc&&(cc[k as keyof typeof cc]?"✓":a)}</td></tr>
              ))}
            </tbody></table>
            <div style={{marginTop:14,textAlign:"center"}}>
              {cc===null?<button className={styles.BT} onClick={chkC}>Check</button>:<div>
                {cc.p&&cc.pa&&cc.pe?<p style={{color:"var(--ok)",fontWeight:700,marginBottom:8}}>✓ All correct! +20 XP</p>:
                <p style={{color:"var(--no)",fontWeight:700,marginBottom:8}}>Review above</p>}
                <button className={styles.BT} onClick={()=>{setCi(i=>i+1);setCv({p:"",pa:"",pe:""});setCc(null);}}>Next →</button>
              </div>}
            </div>
          </div>
        </div>}

        {/* STATS */}
        {tab==="stats"&&<div>
          <h2 className={styles.ST}>Progress</h2>
          <div className={styles.SG} style={{animation:"fadeUp .4s both"}}>
            <div className={styles.SD}><div className={styles.sn} style={{color:"var(--go)"}}>{xlv}</div><div className={styles.sl}>Level</div></div>
            <div className={styles.SD}><div className={styles.sn} style={{color:"var(--acl)"}}>{xp}</div><div className={styles.sl}>XP</div></div>
            <div className={styles.SD}><div className={styles.sn} style={{color:"var(--mi)"}}>{tc}</div><div className={styles.sl}>Correct</div></div>
            <div className={styles.SD}><div className={styles.sn}>{ta}</div><div className={styles.sl}>Attempts</div></div>
            <div className={styles.SD}><div className={styles.sn} style={{color:"var(--co)"}}>{ta?Math.round(tc/ta*100):0}%</div><div className={styles.sl}>Accuracy</div></div>
          </div>
          <div className={styles.GC} style={{marginTop:10}}>
            <h3><span>📈</span> Breakdown</h3>
            {([["quiz","Quiz"],["build","Build"],["fill","Fill"],["conj","Conjugation"],["read","Reading"]] as const).map(([t,l])=>{
              const it=hist.filter(h=>h.t===t),ok=it.filter(h=>h.c).length;
              return it.length>0&&<div key={t} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                <span style={{fontWeight:600,fontSize:11,width:90,color:"var(--tm)"}}>{l}</span>
                <div style={{flex:1,height:6,background:"var(--bd)",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${ok/it.length*100}%`,background:"var(--ok)",borderRadius:3}}/>
                </div>
                <span style={{fontSize:11,fontWeight:700,color:"var(--tm)",minWidth:40,textAlign:"right"}}>{ok}/{it.length}</span>
              </div>;
            })}
            {hist.length===0&&<p style={{color:"var(--tm)",fontSize:12}}>Complete exercises to see stats!</p>}
          </div>
          <div className={styles.GC}>
            <h3><span>🎯</span> A2 Checklist</h3>
            <p>At CEFR A2, you can:</p>
            <div className={styles.EL}>Understand sentences about familiar topics</div>
            <div className={styles.EL}>Communicate in routine tasks</div>
            <div className={styles.EL}>Describe background and immediate needs</div>
            <div className={styles.EL}>Use past, present perfect, and future forms</div>
            <div className={styles.EL}>Handle comparatives, possessives, and reflexives</div>
            <div className={styles.TP}>💡 Complete all A2 exercises with 80%+ accuracy to reach A2!</div>
          </div>
        </div>}
      </div>
    </div>
  );
}
