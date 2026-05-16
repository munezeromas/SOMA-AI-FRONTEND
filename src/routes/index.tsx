import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { RiveAnimation } from "@/components/soma/RiveAnimation";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Soma AI Island" }] }),
  component: Index,
});

// ── All student app features spread across ALL 5 islands ──
const STOPS = [
  // 🏜️ Desert island (LEFT) — 2 stops, sitting on the sandy island
  { id:"home",      icon:"🏠", label:"Dashboard",  desc:"Your streaks, badges, XP & daily goals!",            left:"28%",  top:"37%" },
  { id:"progress",  icon:"📊", label:"Progress",   desc:"Live charts tracking your subject mastery!",          left:"33%",  top:"50%" },

  // 🌿 Pyramid / Jungle island (TOP CENTER) — 3 stops
  { id:"tutor",     icon:"🤖", label:"Soma AI",    desc:"24/7 AI tutor — any subject, any time!",              left:"41%",  top:"25%" },
  { id:"aiquiz",    icon:"✨", label:"AI Quiz",    desc:"Auto-generated quizzes tailored just for you!",       left:"54%",  top:"20%" },
  { id:"simplify",  icon:"📝", label:"Simplify",   desc:"Paste anything hard — get it explained simply!",      left:"47%",  top:"33%" },

  // 🧊 Ice / Volcano island (RIGHT) — 3 stops
  { id:"quizzes",   icon:"⚡", label:"Quizzes",    desc:"Thousands of curriculum-aligned practice quizzes!",   left:"74%",  top:"24%" },
  { id:"homework",  icon:"📚", label:"Homework",   desc:"Step-by-step AI homework help for every subject!",    left:"83%",  top:"35%" },
  { id:"community", icon:"🌍", label:"Community",  desc:"Connect, share & learn with students island-wide!",   left:"78%",  top:"45%" },

  // 🟢 Main center island — 4 stops
  { id:"games",     icon:"🎮", label:"Games",      desc:"Learn while playing awesome educational games!",       left:"56%",  top:"57%" },
  { id:"planner",   icon:"📅", label:"Planner",    desc:"Smart daily study planner to keep you on track!",     left:"42%",  top:"64%" },
  { id:"read",      icon:"📖", label:"Reading",    desc:"Interactive reading & writing practice island!",       left:"63%",  top:"66%" },
  { id:"videos",    icon:"📺", label:"Videos",     desc:"Fun explainer videos for every subject & topic!",     left:"50%",  top:"74%" },

  // 🪨 Small bottom-left island — 2 stops (Library + Career)
  { id:"library",   icon:"🏛️", label:"Library",    desc:"Unlock a huge book & notes library!",                 left:"21%",  top:"71%" },
  { id:"career",    icon:"🚀", label:"Career",     desc:"Explore future career paths powered by AI!",          left:"30%",  top:"77%" },
];

const CHR_MSGS = ["Let's learn something new! ✨","I love this island! 🏝️","Tap a stop to explore! 🎯","SOMA AI is my best friend! 🤖","Choose your world! 🌍"];

function Index() {
  const navigate = useNavigate();
  const [modal, setModal]   = useState(false);
  const [tab, setTab]       = useState<"login"|"signup">("signup");
  const [speech, setSpeech] = useState("Tap any stop to explore! 🗺️");
  const [msgIdx, setMsgIdx] = useState(0);
  const [muted, setMuted]   = useState(false);
  const [sunAngle, setSunAngle] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Autoplay music on mount
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.45;
    a.play().catch(() => {
      // Browser blocked autoplay — play on first click
      const unlock = () => { a.play().catch(()=>{}); document.removeEventListener("click", unlock); };
      document.addEventListener("click", unlock);
    });
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    const t = setInterval(() => setSunAngle(a => a + 0.4), 40);
    return () => clearInterval(t);
  }, []);

  const chrTap  = () => { setSpeech(CHR_MSGS[msgIdx % CHR_MSGS.length]); setMsgIdx(i=>i+1); };
  const stopTap = (desc: string) => setSpeech("🏝️ " + desc.slice(0, 58));

  return (
    <div style={{width:"100vw",height:"100vh",overflow:"hidden",position:"relative"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;800;900&display=swap');
        *{box-sizing:border-box;}
        .f1{font-family:'Fredoka One',cursive;}
        .f2{font-family:'Nunito',sans-serif;font-weight:800;}
        @keyframes drift  {from{transform:translateX(-260px)}to{transform:translateX(110vw)}}
        @keyframes bob    {0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes sway   {0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
        @keyframes swim   {from{left:-80px}to{left:110vw}}
        @keyframes swim2  {from{right:-80px}to{right:110vw}}
        @keyframes tpulse {0%,100%{transform:translateX(-50%) scale(1)}50%{transform:translateX(-50%) scale(1.3)}}
        @keyframes xps    {0%,100%{opacity:1}50%{opacity:.6}}
        @keyframes glow   {0%,100%{box-shadow:0 0 12px #ffe066,0 0 30px rgba(255,224,102,.3)}50%{box-shadow:0 0 24px #ffe066,0 0 55px rgba(255,224,102,.5)}}
        @keyframes muspulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}
        .stop-btn{cursor:pointer;transition:transform .2s,filter .2s;position:absolute;z-index:25;}
        .stop-btn:hover{transform:scale(1.2) translateY(-7px);filter:brightness(1.1);}
        .stop-btn:hover .tp{opacity:1;}
        .tp{position:absolute;bottom:115%;left:50%;transform:translateX(-50%);background:#1a0044;color:#fff;border-radius:12px;padding:6px 12px;font-family:'Fredoka One',cursive;font-size:12px;white-space:nowrap;z-index:80;pointer-events:none;opacity:0;transition:opacity .2s;border:2px solid #7c4dff;}
        .tp::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:#7c4dff;}
        .tgt{position:absolute;top:-16px;left:50%;transform:translateX(-50%);font-size:15px;animation:tpulse 1.4s ease-in-out infinite;}
        .fi{width:100%;padding:10px 14px;border-radius:12px;border:2.5px solid #ddd;font-family:'Nunito',sans-serif;font-weight:700;font-size:14px;color:#1a0044;margin-bottom:10px;outline:none;transition:border .2s;}
        .fi:focus{border-color:#7c4dff;}
        .gb{width:100%;padding:14px;border-radius:50px;border:none;background:linear-gradient(135deg,#7c4dff,#06b6d4);color:#fff;font-family:'Fredoka One',cursive;font-size:18px;cursor:pointer;margin-bottom:8px;border-bottom:4px solid #4a00cc;transition:transform .15s;}
        .gb:hover{transform:scale(1.04);}
        .fish-l{position:absolute;animation:swim linear infinite;}
        .fish-r{position:absolute;animation:swim2 linear infinite;}
      `}</style>

      {/* AUDIO */}
      <audio ref={audioRef} src="/landing page background music.mp3" loop />

      {/* ── OCEAN / SKY BG ── */}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#87d4f5 0%,#a8e6f8 22%,#c2eefa 42%,#7ad3f0 60%,#3ab8e8 72%,#1a9fd4 82%,#0e7ab0 92%,#0a628f 100%)",zIndex:0}} />

      {/* Animated wave shimmer on ocean */}
      {[18,38,58,75].map((pct,i)=>(
        <svg key={i} style={{position:"absolute",top:`${pct}%`,left:0,width:"100%",opacity:.22,zIndex:1,pointerEvents:"none"}} viewBox="0 0 800 18" preserveAspectRatio="none" height={14}>
          <path d={`M0 9 Q100 ${i%2===0?2:16} 200 9 Q300 ${i%2===0?16:2} 400 9 Q500 ${i%2===0?2:16} 600 9 Q700 ${i%2===0?16:2} 800 9`} fill="none" stroke="white" strokeWidth="2"/>
        </svg>
      ))}

      {/* Spinning sun */}
      <div style={{position:"absolute",top:22,right:"10%",width:68,height:68,borderRadius:"50%",background:"#ffe066",animation:"glow 3s ease-in-out infinite",zIndex:5}}>
        {Array.from({length:8}).map((_,i)=>(
          <div key={i} style={{position:"absolute",width:5,height:20,background:"#ffe066",borderRadius:3,top:"50%",left:"50%",transformOrigin:"2.5px -28px",opacity:.85,transform:`rotate(${i*45+sunAngle}deg) translateX(-50%)`}} />
        ))}
      </div>

      {/* Rainbow */}
      <svg style={{position:"absolute",top:"2%",left:"2%",width:240,height:140,opacity:.5,pointerEvents:"none",zIndex:4}} viewBox="0 0 240 140">
        {[["#ff6b6b",8],["#ff9500",7],["#ffd84d",7],["#4caf50",7],["#29b6f6",6],["#7c4dff",5]].map(([c,w],i)=>(
          <path key={i} d={`M${6+i*10},135 Q120,${-10+i*14} ${234-i*10},135`} fill="none" stroke={c as string} strokeWidth={w as number}/>
        ))}
      </svg>

      {/* Clouds */}
      {[{dur:"42s",del:"0s",w:210,t:28},{dur:"58s",del:"-20s",w:160,t:60},{dur:"50s",del:"-33s",w:185,t:18},{dur:"35s",del:"-10s",w:130,t:45}].map((cl,i)=>(
        <div key={i} style={{position:"absolute",top:cl.t,left:-cl.w,pointerEvents:"none",zIndex:6,animation:`drift ${cl.dur} linear infinite`,animationDelay:cl.del}}>
          <svg viewBox="0 0 160 60" width={cl.w} height={cl.w*0.37}>
            <ellipse cx="80" cy="42" rx="72" ry="18" fill="white" opacity=".97"/>
            <ellipse cx="55" cy="28" rx="34" ry="26" fill="white" opacity=".97"/>
            <ellipse cx="108" cy="26" rx="28" ry="21" fill="white" opacity=".97"/>
          </svg>
        </div>
      ))}

      {/* Birds */}
      {[{t:"7%",dur:"20s",del:"-2s",e:"🐦"},{t:"13%",dur:"29s",del:"-14s",e:"🐦"},{t:"5%",dur:"25s",del:"-8s",e:"🦜"},{t:"18%",dur:"33s",del:"-22s",e:"🐦"}].map((b,i)=>(
        <div key={i} style={{position:"absolute",top:b.t,left:-40,fontSize:17,pointerEvents:"none",zIndex:7,animation:`drift ${b.dur} linear infinite`,animationDelay:b.del}}>{b.e}</div>
      ))}

      {/* ── ISLAND PNG fills whole viewport ── */}
      <img
        src="/landing page island.png"
        alt="Soma AI Island"
        style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"contain",objectPosition:"center 55%",zIndex:8,pointerEvents:"none",userSelect:"none"}}
      />

      {/* ── LIFESPAN TIMELINE on top pyramid island ── */}
      <div style={{position:"absolute",left:"44%",top:"-2%",width:"14%",aspectRatio:"1",zIndex:15,pointerEvents:"none",opacity:.92,filter:"drop-shadow(0 4px 12px rgba(0,0,0,.3))"}}>
        <RiveAnimation src="/riv-animations/22180-41567-level-up-badges-animation.riv" className="w-full h-full" />
      </div>

      {/* ── WATER CREATURES (z above ocean, below island overlay) ── */}
      {/* Fish left→right */}
      {[{e:"🐠",t:"82%",dur:"13s",del:"0s"},{e:"🐡",t:"88%",dur:"19s",del:"-6s"},{e:"🦑",t:"78%",dur:"15s",del:"-11s"},{e:"🐬",t:"85%",dur:"22s",del:"-17s"}].map((f,i)=>(
        <div key={i} className="fish-l" style={{top:f.t,fontSize:26,animationDuration:f.dur,animationDelay:f.del,zIndex:4}}>{f.e}</div>
      ))}
      {/* Fish right→left */}
      {[{e:"🐟",t:"80%",dur:"17s",del:"-4s"},{e:"🐙",t:"91%",dur:"24s",del:"-13s"},{e:"🦀",t:"86%",dur:"20s",del:"-9s"}].map((f,i)=>(
        <div key={i} className="fish-r" style={{top:f.t,right:-60,fontSize:26,animationDuration:f.dur,animationDelay:f.del,zIndex:4,transform:"scaleX(-1)"}}>{f.e}</div>
      ))}
      {/* Boat, shark, whale */}
      <div style={{position:"absolute",bottom:"6%",left:-60,fontSize:42,animation:"drift 30s linear infinite",zIndex:5,filter:"drop-shadow(0 3px 0 rgba(0,0,0,.3))",animationDelay:"-5s"}}>⛵</div>
      <div style={{position:"absolute",bottom:"10%",left:-40,fontSize:30,animation:"drift 38s linear infinite",zIndex:4,opacity:.85,animationDelay:"-22s"}}>🦈</div>
      <div style={{position:"absolute",bottom:"7%",fontSize:38,animation:"drift 50s linear infinite",zIndex:4,animationDelay:"-35s"}}>🐋</div>
      {/* Bubbles */}
      {[12,28,45,62,78,90].map((l,i)=>(
        <div key={i} style={{position:"absolute",bottom:`${72+i*3}%`,left:`${l}%`,fontSize:11,opacity:.35,animation:`bob ${1.8+i*0.3}s ease-in-out infinite`,animationDelay:`${-i*0.4}s`,zIndex:3}}>🫧</div>
      ))}

      {/* ── STOPS spread across all islands ── */}
      {STOPS.map(s=>(
        <div key={s.id} className="stop-btn" style={{left:s.left,top:s.top}} onClick={()=>stopTap(s.desc)}>
          <div className="tp">{s.icon} {s.label}: {s.desc}</div>
          <div className="tgt">🎯</div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <span style={{fontSize:36,filter:"drop-shadow(0 3px 6px rgba(0,0,0,.45)) drop-shadow(0 1px 2px rgba(0,0,0,.3))",lineHeight:1}}>{s.icon}</span>
            <span className="f1" style={{fontSize:11,color:"#fff",textShadow:"0 1px 4px rgba(0,0,0,.9), 0 0 8px rgba(0,0,0,.6)",textAlign:"center",lineHeight:1.2}}>{s.label}</span>
          </div>
          <div style={{position:"absolute",bottom:-16,left:"50%",transform:"translateX(-50%)",background:"rgba(255,255,255,.92)",backdropFilter:"blur(4px)",borderRadius:20,padding:"2px 10px",fontFamily:"'Fredoka One',cursive",fontSize:9,whiteSpace:"nowrap",border:"1.5px solid rgba(0,0,0,.15)",color:"#333",boxShadow:"0 2px 6px rgba(0,0,0,.15)"}}>Tap!</div>
        </div>
      ))}

      {/* ── BOT GUIDE (bottom-left of main island) ── */}
      <div style={{position:"absolute",left:"6%",top:"55%",zIndex:30,cursor:"pointer",animation:"bob 2.5s ease-in-out infinite"}} onClick={chrTap}>
        <div style={{position:"absolute",bottom:"105%",left:"50%",transform:"translateX(-10%)",background:"#fff",border:"3px solid #7c4dff",borderRadius:14,padding:"8px 12px",fontFamily:"'Fredoka One',cursive",fontSize:12,color:"#1a0044",maxWidth:190,textAlign:"center",zIndex:31,boxShadow:"0 4px 16px rgba(124,77,255,.25)"}}>
          {speech}
          <div style={{position:"absolute",bottom:-12,left:18,borderWidth:7,borderStyle:"solid",borderColor:"#7c4dff transparent transparent transparent"}}/>
          <div style={{position:"absolute",bottom:-6,left:20,borderWidth:5,borderStyle:"solid",borderColor:"white transparent transparent transparent",zIndex:1}}/>
        </div>
        <div style={{width:96,height:96}}>
          <RiveAnimation src="/riv-animations/22673-42423-for-education-purpose.riv" className="w-full h-full"/>
        </div>
      </div>

      {/* ── TOP NAV ── */}
      <div style={{position:"absolute",top:0,left:0,width:"100%",padding:"14px 24px",zIndex:100,display:"flex",alignItems:"center",justifyContent:"space-between",background:"linear-gradient(180deg,rgba(5,2,20,.72),transparent)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <img src="/favicon.png" alt="Soma AI Logo" style={{width:44,height:44,objectFit:"contain",filter:"drop-shadow(0 2px 6px rgba(0,0,0,.4)) brightness(1.1)"}} />
          <div className="f1" style={{fontSize:30,background:"linear-gradient(130deg,#c084fc,#22d3ee,#86efac)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>SOMA AI</div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          {/* 🔊 Music toggle */}
          <button onClick={()=>setMuted(m=>!m)} title={muted?"Unmute music":"Mute music"} style={{width:44,height:44,borderRadius:"50%",border:"none",background:muted?"rgba(255,255,255,.15)":"linear-gradient(135deg,#22c55e,#16a34a)",cursor:"pointer",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 3px 12px rgba(0,0,0,.3)",animation:muted?"none":"muspulse 2s ease-in-out infinite",transition:"background .3s"}}>{muted?"🔇":"🔊"}</button>
          <button className="f1" style={{borderRadius:50,padding:"8px 20px",fontSize:14,background:"rgba(255,255,255,.18)",color:"#fff",border:"2px solid rgba(255,255,255,.4)",cursor:"pointer"}} onClick={()=>{setTab("login");setModal(true);}}>Log In</button>
          <button className="f1" style={{borderRadius:50,padding:"8px 20px",fontSize:14,background:"linear-gradient(135deg,#7c4dff,#06b6d4)",color:"#fff",border:"none",borderBottom:"3px solid #4a00cc",cursor:"pointer"}} onClick={()=>{setTab("signup");setModal(true);}}>Sign Up 🚀</button>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div style={{position:"absolute",bottom:0,left:0,width:"100%",zIndex:150,background:"linear-gradient(0deg,rgba(5,2,20,.92),rgba(5,2,20,.6),transparent)",padding:"12px 20px",display:"flex",gap:16,alignItems:"center",justifyContent:"center",flexWrap:"wrap",backdropFilter:"blur(3px)"}}>
        {[["🪙","1,840","#ffd84d"],["🔥","12-day streak","#ff8a65"],["⭐","Lv 8","#c084fc"],["🏆","4 trophies","#67e8f9"]].map(([ico,val,col])=>(
          <div key={val as string} className="f1" style={{display:"flex",alignItems:"center",gap:6,fontSize:16,color:col as string}}>{ico} {val}</div>
        ))}
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span className="f1" style={{fontSize:11,color:"rgba(255,255,255,.6)"}}>XP</span>
          <div style={{width:110,height:10,background:"rgba(255,255,255,.18)",borderRadius:5,overflow:"hidden"}}>
            <div style={{height:"100%",width:"74%",background:"linear-gradient(90deg,#a855f7,#22d3ee)",borderRadius:5,animation:"xps 2s ease-in-out infinite"}}/>
          </div>
          <span className="f1" style={{fontSize:11,color:"rgba(255,255,255,.6)"}}>1840/2500</span>
        </div>
        <button className="f1" style={{background:"linear-gradient(135deg,#f59e0b,#ef4444)",color:"#fff",border:"none",borderRadius:50,padding:"10px 24px",fontSize:18,cursor:"pointer",borderBottom:"4px solid #b91c1c"}} onClick={()=>{setTab("signup");setModal(true);}}>▶ Play Now!</button>
      </div>

      {/* ── MODAL ── */}
      {modal&&(
        <div style={{position:"absolute",inset:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{position:"absolute",inset:0,background:"rgba(5,2,20,.88)",backdropFilter:"blur(4px)"}} onClick={()=>setModal(false)}/>
          <div style={{position:"relative",zIndex:1,background:"#fff",borderRadius:28,width:340,padding:"24px 22px 20px",border:"4px solid #7c4dff",textAlign:"center"}}>
            <div style={{position:"absolute",top:10,right:14,fontSize:20,cursor:"pointer",color:"#bbb"}} onClick={()=>setModal(false)}>✕</div>
            <div className="f1" style={{fontSize:34,background:"linear-gradient(130deg,#a855f7,#06b6d4,#22c55e)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>✦ SOMA AI</div>
            <div className="f2" style={{fontSize:10,letterSpacing:3,color:"#7c4dff",marginBottom:16}}>YOUR LEARNING ADVENTURE</div>
            <div style={{display:"flex",background:"#f3eeff",borderRadius:14,padding:3,marginBottom:16}}>
              {(["login","signup"] as const).map(t=>(
                <button key={t} className="f1" style={{flex:1,padding:8,borderRadius:11,border:"none",cursor:"pointer",background:tab===t?"#7c4dff":"transparent",color:tab===t?"#fff":"#7c4dff",fontSize:14,transition:"all .2s"}} onClick={()=>setTab(t)}>{t==="login"?"Log In":"Sign Up"}</button>
              ))}
            </div>
            {tab==="login"?(
              <>
                <input className="fi f2" type="text" placeholder="👤 Username or Email"/>
                <input className="fi f2" type="password" placeholder="🔒 Password"/>
                <button className="gb" onClick={()=>navigate({to:"/login"})}>🚀 Enter the Island!</button>
                <div className="f2" style={{fontSize:11,color:"#7c4dff",marginTop:8,cursor:"pointer"}} onClick={()=>setTab("signup")}>No account? Sign up free →</div>
              </>
            ):(
              <>
                <input className="fi f2" type="text" placeholder="👤 Your Name"/>
                <input className="fi f2" type="email" placeholder="📧 Email"/>
                <select className="fi f2" defaultValue=""><option value="" disabled>🎓 Select grade</option>{["1","2","3","4","5","6"].map(g=><option key={g}>Primary {g}</option>)}</select>
                <button className="gb" onClick={()=>navigate({to:"/login"})}>🌟 Start My Adventure!</button>
                <div className="f2" style={{fontSize:11,color:"#7c4dff",marginTop:8,cursor:"pointer"}} onClick={()=>setTab("login")}>Already have an account? Log in →</div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
