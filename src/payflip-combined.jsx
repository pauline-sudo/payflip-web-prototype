import { useState, useEffect, useRef } from "react";
import {
  CreditCard, Eye, CheckCircle, Lock, Key, X, Package, Home, Wallet,
  AlertCircle, ChevronRight, ChevronLeft, ChevronDown, ChevronUp, Snowflake, Smartphone, RefreshCw,
  Shield, Wifi, Search, BarChart3, Info, ShieldCheck, Zap, User, Globe,
  Plus, Camera, TrendingUp
} from "lucide-react";

/* ─── Tokens ─── */
const C = {
  pri: "#6C5CE7", priBg: "#F3F0FF", acc: "#00A99D", accBg: "#E8FBF9",
  bg: "#FAFAFD", bgCard: "#FFFFFF", bgEl: "#F5F5F8", bdr: "#EEEDF2",
  txt: "#220A35", txtM: "#7C7A9C", txtD: "#A9A8C2",
  grn: "#16A870", grnL: "#E3F9EF", red: "#E5484D", redBg: "#FEE8E9",
  org: "#E8890C", orgL: "#FFF7ED", blu: "#3B82F6", dark: "#220A35",
};
const ff = "'SF Pro Display',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,sans-serif";
const fmt = v => `€${Math.abs(v).toLocaleString("de-DE",{minimumFractionDigits:2})}`;

/* ─── Primitives ─── */
const Card = ({children,style:s,onClick,pad=16}) => (<div onClick={onClick} style={{background:C.bgCard,borderRadius:16,padding:pad,border:`1px solid ${C.bdr}`,cursor:onClick?"pointer":"default",...s}}>{children}</div>);
const Badge = ({children,color=C.pri,style:s}) => (<span style={{background:color+"14",color,padding:"3px 9px",borderRadius:20,fontSize:11,fontWeight:600,fontFamily:ff,display:"inline-flex",alignItems:"center",gap:4,whiteSpace:"nowrap",...s}}>{children}</span>);
const SectionLabel = ({children}) => (<div style={{color:C.txtD,fontSize:11,fontWeight:600,fontFamily:ff,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:4}}>{children}</div>);
const PayflipLogo = ({size=28}) => (<svg width={size} height={size} viewBox="0 0 62 62" fill="none"><rect width="62" height="62" rx="16" fill="#220A35"/><path d="M27.15 20.46C22.1 20.46 18 25.78 18 28.21V50.93H22.33C25 50.93 27.15 48.78 27.15 46.11V20.46Z" fill="url(#mlg0)"/><path d="M32.04 11H27.31C22.83 11 19.1 14.16 18.2 18.38C18.08 18.97 18 20.18 18 20.18V27.94C18 27.94 18.75 23.25 24.73 21.12C26.29 20.57 27.93 20.31 29.58 20.31H32.11C34.66 20.31 36.73 22.38 36.73 24.93C36.73 27.49 34.66 29.56 32.11 29.56H25.34C21.29 29.56 18.01 32.84 18.01 36.89V50.82C18.01 50.82 19.1 39.58 28.99 38.86H32.05C39.74 38.86 45.98 32.62 45.98 24.93C45.97 17.24 39.74 11 32.04 11Z" fill="url(#mlg1)"/><defs><linearGradient id="mlg0" x1="18" y1="35.7" x2="27.2" y2="35.7" gradientUnits="userSpaceOnUse"><stop offset=".012" stopColor="#FF2175"/><stop offset="1" stopColor="#F76DB6"/></linearGradient><linearGradient id="mlg1" x1="24.1" y1="30.9" x2="44.8" y2="30.9" gradientUnits="userSpaceOnUse"><stop stopColor="#F9C5E7"/><stop offset="1" stopColor="#FF2175"/></linearGradient></defs></svg>);
const PayflipWordmark = () => (<svg viewBox="1158 145 762 218" fill="none" style={{position:"absolute",right:"6%",top:"8%",width:"34%",opacity:0.85}}><path d="M1714.53 145.524H1665.23C1637.65 145.577 1621.14 153.399 1615.08 171.652C1611.97 181.028 1616.87 192.406 1625.72 196.805H1592.11V220.905H1610.81C1611.73 220.905 1612.5 221.642 1612.5 222.59V322.756H1639.02V222.59C1639.02 221.669 1639.78 220.905 1640.71 220.905H1665.54V196.805H1639.02V191.616C1639.02 175.787 1648.27 169.624 1665.54 169.624H1686.35C1687.27 169.624 1688.04 170.361 1688.04 171.309V322.782H1714.56V147.183H1714.53V145.524Z" fill="#F3F1FE"/><path d="M1552.84 196.752L1510.28 298.261L1474.3 196.752H1443.98L1489.6 317.672C1495.55 317.672 1499.61 323.73 1497.29 329.209L1483.47 362.211H1512.12L1582.47 196.752H1552.84Z" fill="#F3F1FE"/><path d="M1433.76 256.172C1432.37 220.141 1401.5 191.643 1364.52 194.118C1332.36 196.278 1306.29 222.459 1304.28 254.565C1301.94 292.177 1331.81 323.441 1369 323.441C1382.75 323.441 1395.49 319.147 1406 311.852C1407.14 311.061 1408.66 311.825 1408.66 313.195V323.177H1433.84V256.172H1433.76ZM1382.98 295.89C1353.17 306.215 1325.43 281.852 1329.73 252.695C1332.31 235.207 1346.77 221.326 1364.36 219.324C1388.23 216.638 1408.51 235.207 1408.64 258.437V258.648C1408.64 275.215 1398.6 290.491 1382.98 295.89Z" fill="#F3F1FE"/><path d="M1789.78 256.172V362.975H1814.96V313.195C1814.96 311.825 1816.52 311.061 1817.62 311.852C1828.1 319.147 1840.85 323.441 1854.63 323.441C1891.82 323.441 1921.69 292.203 1919.34 254.565C1917.34 222.459 1891.24 196.278 1859.11 194.118C1822.13 191.643 1791.23 220.141 1789.86 256.172H1789.78ZM1814.96 258.938V258.463C1815.09 236.734 1832.82 219.087 1854.63 219.087C1876.51 219.087 1894.32 236.866 1894.32 258.701C1894.32 280.535 1876.51 298.314 1854.63 298.314C1832.85 298.314 1815.09 280.667 1814.96 258.938Z" fill="#F3F1FE"/><path d="M1158 256.172V362.975H1183.18V313.195C1183.18 311.825 1184.73 311.061 1185.84 311.852C1196.32 319.147 1209.07 323.441 1222.85 323.441C1260.04 323.441 1289.9 292.203 1287.56 254.565C1285.56 222.459 1259.46 196.278 1227.32 194.118C1190.34 191.643 1159.45 220.141 1158.08 256.172H1158ZM1183.18 258.938V258.463C1183.31 236.734 1201.04 219.087 1222.85 219.087C1244.73 219.087 1262.54 236.866 1262.54 258.701C1262.54 280.535 1244.73 298.314 1222.85 298.314C1201.06 298.314 1183.31 280.667 1183.18 258.938Z" fill="#F3F1FE"/><path d="M1772.79 196.858H1746.14V323.125H1772.79V196.858Z" fill="#F3F1FE"/><path d="M1759.49 169.782H1759.44C1752.72 169.782 1747.3 164.33 1747.3 157.64C1747.3 150.923 1752.75 145.498 1759.44 145.498H1759.49C1766.21 145.498 1771.63 150.95 1771.63 157.64C1771.63 164.33 1766.18 169.782 1759.49 169.782Z" fill="#F3F1FE"/></svg>);

/* ─── Txn data ─── */
const txns=[{id:1,merchant:"NMBS / SNCB",cat:"Train ticket",amount:-12.80,date:"Today, 08:32",fullDate:"2025-03-07",emoji:"🚆",wallet:"mobility",status:"completed"},{id:2,merchant:"Delhaize City",cat:"Groceries",amount:-23.45,date:"Today, 12:15",fullDate:"2025-03-07",emoji:"🛒",wallet:"meal",status:"completed"},{id:3,merchant:"Uber",cat:"Ride",amount:-18.60,date:"Yesterday",fullDate:"2025-03-06",emoji:"🚗",wallet:"mobility",status:"completed"},{id:4,merchant:"Colruyt",cat:"Supermarket",amount:-34.20,date:"Mar 5",fullDate:"2025-03-05",emoji:"🛒",wallet:"meal",status:"completed"},{id:5,merchant:"Panos",cat:"Bakery",amount:-6.40,date:"Mar 5",fullDate:"2025-03-05",emoji:"🥐",wallet:"meal",status:"completed"},{id:6,merchant:"De Lijn",cat:"Public transport",amount:-3.00,date:"Mar 4",fullDate:"2025-03-04",emoji:"🚌",wallet:"mobility",status:"completed"},{id:7,merchant:"Shell",cat:"Fuel",amount:-68.50,date:"Mar 3",fullDate:"2025-03-03",emoji:"⛽",wallet:"mobility",status:"completed"},{id:8,merchant:"Cambio",cat:"Car sharing",amount:-22.40,date:"Mar 2",fullDate:"2025-03-02",emoji:"🚙",wallet:"mobility",status:"completed"},{id:9,merchant:"Albert Heijn",cat:"Groceries",amount:-41.15,date:"Mar 1",fullDate:"2025-03-01",emoji:"🛒",wallet:"meal",status:"completed"},{id:10,merchant:"Coolblue.be",cat:"Online purchase",amount:-249.00,date:"Feb 28",fullDate:"2025-02-28",emoji:"🛍️",wallet:"mobility",status:"declined"},{id:11,merchant:"TotalEnergies",cat:"EV Charging",amount:-14.30,date:"Feb 27",fullDate:"2025-02-27",emoji:"⚡",wallet:"mobility",status:"completed"},{id:12,merchant:"Exki",cat:"Restaurant",amount:-15.90,date:"Feb 26",fullDate:"2025-02-26",emoji:"🍽️",wallet:"meal",status:"completed"}];
const walletMeta={mobility:{label:"Mobility",color:C.acc},meal:{label:"Meals",color:"#FDCB6E"},ld:{label:"L&D",color:"#6C5CE7"},eyp:{label:"EYP",color:"#E17055"}};

const cardStatusInfo = (s) => {
  if (!s.hasCard) return null;
  if (s.frozen) return { label: "Frozen", color: C.red, bg: "rgba(229,72,77,0.15)" };
  if (!s.pinSet) return { label: "Virtual", color: "#A29BFE", bg: "rgba(162,155,254,0.15)" };
  if (!s.physicalIssued) return { label: "Virtual", color: "#A29BFE", bg: "rgba(162,155,254,0.15)" };
  return { label: "Active", color: C.grn, bg: "rgba(22,168,112,0.12)" };
};

/* ═══════════════════════════════════════════════════════════
   CARD VISUAL — status label ON the card, virtual indicator
═══════════════════════════════════════════════════════════ */
const CardVisual = ({ cardState, hideStatus, style: overrideStyle }) => {
  const { frozen, pinSet, physicalIssued } = cardState;
  const status = cardStatusInfo(cardState);
  const radius = overrideStyle?.borderRadius ?? 18;

  return (
    <div style={{ width: "100%", aspectRatio: "2064/1301", borderRadius: radius, overflow: "hidden", position: "relative", ...overrideStyle }}>
      {frozen && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(34,10,53,0.82)", borderRadius: radius, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, backdropFilter: "blur(3px)" }}>
          <Lock size={26} color="#fff" />
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: ff }}>Card frozen</div>
        </div>
      )}
      <div style={{ position: "relative", width: "100%", height: "100%", background: frozen ? "#0e0518" : "#180B2D", overflow: "hidden" }}>
        {!frozen && <><div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 15% 85%, rgba(61,133,233,0.25) 0%, transparent 60%)" }} /><div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 95% 15%, rgba(212,96,229,0.2) 0%, transparent 55%)" }} /></>}
        <div style={{ position: "absolute", inset: 0, boxShadow: "inset 5px 4px 4px rgba(255,255,255,0.12), inset -2px -2px 3px rgba(0,0,0,0.36)", borderRadius: radius, zIndex: 5 }} />
        <div style={{ position: "absolute", left: "7%", top: "36%", width: "9.5%", aspectRatio: "248/196", borderRadius: 5, background: "linear-gradient(145deg,#ABABAB,#fff 31%,#BDBDBD 63%,#5E5E5E)", boxShadow: "inset -2px -2px 0 rgba(0,0,0,0.12)" }}>
          <svg viewBox="144 428 249 196" fill="none" style={{width:"100%",height:"100%",display:"block"}}><path d="M144 495.837H228.575C233.93 477.72 248.986 440.388 266.374 436C272.831 438.493 287.919 447.469 296.613 463.425M144 558.667H228.575C228.575 589.782 253.774 612.52 266.374 620C287.541 612.421 303.858 575.953 309.37 558.667H393M393 510.797H309.37C305.59 502.985 300.298 484.967 309.37 475.393" stroke="url(#cL)" strokeWidth="3"/><defs><linearGradient id="cL" x1="153" y1="439" x2="390" y2="593"><stop stopColor="#7D7D7D"/><stop offset=".5" stopColor="#fff"/><stop offset="1" stopColor="#1C1C1C"/></linearGradient></defs></svg>
        </div>
        <div style={{ position: "absolute", right: -1, bottom: "18%", width: 22, height: 36, borderRadius: "50% 0 0 50%", border: "1.5px solid rgba(255,255,255,0.08)", borderRight: "none", background: "rgba(0,0,0,0.25)", zIndex: 4 }} />
        <PayflipWordmark />
        <svg viewBox="0 0 131 80" fill="none" style={{ position: "absolute", right: "6%", bottom: "12%", width: "14%", zIndex: 2, opacity: 0.55 }}><circle cx="40" cy="40" r="40" fill="rgba(255,255,255,0.6)"/><circle cx="91" cy="40" r="40" fill="rgba(255,255,255,0.6)"/><path d="M65.5 10.166C58.3 16 53.5 24.7 53.5 40s4.8 24 12 29.834C72.7 64 77.5 55.3 77.5 40S72.7 16 65.5 10.166Z" fill="rgba(255,255,255,0.9)"/></svg>
        {/* Status label on card — bottom left */}
        {status && !frozen && !hideStatus && (
          <div style={{ position: "absolute", left: "7%", bottom: "10%", zIndex: 6, display: "flex", alignItems: "center", gap: 5, background: status.bg, backdropFilter: "blur(8px)", borderRadius: 50, padding: "4px 10px 4px 8px" }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: status.color }} />
            <span style={{ color: "#fff", fontSize: 10, fontWeight: 600, fontFamily: ff, letterSpacing: "0.3px" }}>{status.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   ONBOARDING — three phases detected via backend polling:
   1. "noApp"    — no device registered → download CTA
   2. "settingUp" — app installed, biometrics pending → waiting
   3. "ready"    — app + biometrics confirmed → auto-create card
═══════════════════════════════════════════════════════════ */
const OnboardingPage = ({ appSetup, onSimulateNext, onClose, onOpenStore }) => {

  // Phase 1: No app — inspiring feature reveal, download is the hero action
  if (appSetup === "noApp") return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* X close */}
      <div style={{display:"flex",justifyContent:"flex-end",padding:"4px 0 8px"}}>
        {onClose&&<button onClick={onClose} style={{background:C.bgEl,border:"none",borderRadius:50,width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><X size={16} color={C.txtM}/></button>}
      </div>

      {/* Hero — card at angle with glow */}
      <div style={{background:"linear-gradient(160deg, #F3F0FF 0%, #FCF0F4 50%, #F3F0FF 100%)",borderRadius:20,padding:"28px 24px 24px",marginBottom:20,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-30%",right:"-20%",width:"60%",height:"60%",background:"radial-gradient(circle, rgba(108,92,231,0.12) 0%, transparent 70%)",borderRadius:"50%"}}/>
        <div style={{width:"58%",margin:"0 auto 20px",transform:"perspective(600px) rotateY(-10deg) rotateX(4deg)",transformOrigin:"center center"}}>
          <CardVisual cardState={{ hasCard: true, frozen: false, pinSet: false, physicalIssued: false }} hideStatus style={{borderRadius:10,boxShadow:"10px 8px 24px rgba(34,10,53,0.18)"}}/>
        </div>
        <div style={{textAlign:"center",position:"relative"}}>
          <div style={{color:C.txt,fontSize:18,fontWeight:700,fontFamily:ff,letterSpacing:"-0.3px",lineHeight:1.3}}>Your Payflip card<br/>is ready to set up</div>
          <div style={{color:C.txtM,fontSize:12,fontFamily:ff,marginTop:6,lineHeight:1.5}}>One card for meals and mobility.<br/>Pay anywhere, instantly.</div>
        </div>
      </div>

      {/* Why the app */}
      <div style={{background:C.bgEl,borderRadius:14,padding:"14px 16px",marginBottom:14}}>
        <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
          <Shield size={16} color={C.pri} style={{flexShrink:0,marginTop:1}}/>
          <div>
            <div style={{color:C.txt,fontSize:13,fontWeight:600,fontFamily:ff}}>Why do I need the app?</div>
            <div style={{color:C.txtM,fontSize:11,fontFamily:ff,lineHeight:1.6,marginTop:3}}>Your card is secured by Face ID. The app is needed to approve online payments, view your card details, and add to Apple Pay.</div>
          </div>
        </div>
      </div>

      {/* Primary CTA — download the app */}
      <div style={{marginBottom:6}}>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={onOpenStore} style={{ flex: 1, background: "#000", border: "none", borderRadius: 14, padding: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.55 4.28-3.74 4.25z"/></svg>
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: ff }}>App Store</span>
          </button>
          <button onClick={onOpenStore} style={{ flex: 1, background: "#000", border: "none", borderRadius: 14, padding: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302c.648.374.648 1.006 0 1.38l-2.302 1.302-2.533-2.534 2.533-2.45zM5.864 1.469L16.8 8.802l-2.302 2.302L5.864 1.469z"/></svg>
            <span style={{ color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: ff }}>Google Play</span>
          </button>
        </div>
      </div>

      {/* What you'll get — quick benefit list */}
      <div style={{display:"flex",flexDirection:"column",gap:6,padding:"10px 0 16px"}}>
        {["Virtual card — pay online immediately","Physical card — ships in 3–5 days","Apple Pay & Google Pay"].map(f=>(
          <div key={f} style={{display:"flex",alignItems:"center",gap:8}}>
            <CheckCircle size={14} color={C.pri} strokeWidth={2}/>
            <span style={{color:C.txt,fontSize:12,fontWeight:500,fontFamily:ff}}>{f}</span>
          </div>
        ))}
      </div>

      {/* Prototype: simulate */}
      <button onClick={onSimulateNext} style={{ background: C.bgEl, border: "none", borderRadius: 10, padding: "8px", cursor: "pointer", fontFamily: ff, fontSize: 10, fontWeight: 600, color: C.txtD, display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 12 }}>
        <ChevronRight size={11} />Simulate: app installed
      </button>
    </div>
  );

  // Phase 2: App detected, biometrics being set up
  if (appSetup === "settingUp") return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* X close */}
      <div style={{display:"flex",justifyContent:"flex-end"}}>
        {onClose&&<button onClick={onClose} style={{background:C.bgEl,border:"none",borderRadius:50,width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><X size={16} color={C.txtM}/></button>}
      </div>
      <div style={{ width: "100%", aspectRatio: "2064/1301", borderRadius: 18, overflow: "hidden", background: "linear-gradient(135deg, #220A35 0%, #3D1A55 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(108,92,231,0.2) 0%, transparent 70%)" }} />
        <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", animation: "pulse 2s ease-in-out infinite" }}>
          <Smartphone size={24} color="rgba(255,255,255,0.7)" />
        </div>
        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 600, fontFamily: ff }}>App detected</div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: ff }}>Setting up secure access…</div>
      </div>
      <Card pad={16}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: C.grnL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <CheckCircle size={19} color={C.grn} />
          </div>
          <div><div style={{ color: C.txt, fontSize: 13, fontWeight: 600, fontFamily: ff }}>Payflip app installed</div><div style={{ color: C.grn, fontSize: 11, fontWeight: 500, fontFamily: ff, marginTop: 1 }}>Detected</div></div>
        </div>
        <div style={{ height: 1, background: C.bdr, margin: "12px 0" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: C.priBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <ShieldCheck size={19} color={C.pri} />
          </div>
          <div><div style={{ color: C.txt, fontSize: 13, fontWeight: 600, fontFamily: ff }}>Set up biometric authentication</div><div style={{ color: C.txtM, fontSize: 11, fontFamily: ff, marginTop: 1 }}>Open the app and complete Face ID / fingerprint setup</div></div>
        </div>
      </Card>
      <div style={{ color: C.txtM, fontSize: 11, fontFamily: ff, textAlign: "center", lineHeight: 1.5 }}>
        Your card will be created automatically once biometrics are confirmed. No extra steps.
      </div>
      <button onClick={onSimulateNext} style={{ background: C.bgEl, border: "none", borderRadius: 10, padding: "10px", cursor: "pointer", fontFamily: ff, fontSize: 11, fontWeight: 600, color: C.txtD, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
        <ChevronRight size={12} />Simulate: biometrics confirmed
      </button>
    </div>
  );

  return null;
};

/* ─── Dialogs ─── */
const DialogBackdrop = ({children,onClose,mode="modal"}) => mode==="sheet" ? (
  <div onClick={onClose} style={{position:"absolute",inset:0,zIndex:200,background:"rgba(0,0,0,0.45)",backdropFilter:"blur(6px)",display:"flex",flexDirection:"column",justifyContent:"flex-end",borderRadius:46,overflow:"hidden"}}>
    <div onClick={e=>e.stopPropagation()} style={{background:C.bgCard,borderRadius:"24px 24px 0 0",maxHeight:"85%",overflow:"auto",boxShadow:"0 -10px 40px rgba(0,0,0,0.15)",animation:"slideUp .3s cubic-bezier(.16,1,.3,1)"}}>
      <div style={{width:36,height:4,borderRadius:2,background:C.bdr,margin:"10px auto 0"}}/>
      {children}
    </div>
  </div>
) : (
  <div onClick={onClose} style={{position:"absolute",inset:0,zIndex:200,background:"rgba(0,0,0,0.45)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:46,padding:20}}>
    <div onClick={e=>e.stopPropagation()} style={{background:C.bgCard,borderRadius:20,width:"100%",maxWidth:340,boxShadow:"0 20px 60px rgba(0,0,0,0.25)",overflow:"hidden"}}>{children}</div>
  </div>
);
const InAppAuthOverlay = ({label,onConfirm,onCancel}) => { const[ok,setOk]=useState(false); useEffect(()=>{const t=setTimeout(()=>{setOk(true);setTimeout(onConfirm,600)},2500);return()=>clearTimeout(t)},[]); return(<div style={{position:"absolute",inset:0,zIndex:200,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(6px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:46,padding:32,gap:14}}><div style={{width:64,height:64,borderRadius:20,background:ok?C.grnL:"rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",animation:ok?"none":"pulse 1.5s ease-in-out infinite"}}>{ok?<CheckCircle size={32} color={C.grn}/>:<Smartphone size={32} color="#fff"/>}</div><div style={{color:"#fff",fontSize:16,fontWeight:700,fontFamily:ff}}>{ok?"Confirmed":"Confirm in the app"}</div><div style={{color:"rgba(255,255,255,0.6)",fontSize:13,fontFamily:ff,textAlign:"center",lineHeight:1.5,maxWidth:240}}>{ok?"Identity verified":`Approve the request to ${label} in the Payflip app`}</div>{!ok&&<button onClick={onCancel} style={{background:"rgba(255,255,255,0.12)",border:"none",borderRadius:10,padding:"8px 20px",cursor:"pointer",fontFamily:ff,fontSize:13,color:"rgba(255,255,255,0.7)",marginTop:4}}>Cancel</button>}</div>);};

/* ─── Credential dialog (Wise-style) ─── */
const CredentialDialog = ({onClose,mode}) => { const[cd,setCd]=useState(60);const[copied,setCopied]=useState(null); useEffect(()=>{const t=setInterval(()=>setCd(c=>{if(c<=1){clearInterval(t);onClose();return 0}return c-1}),1000);return()=>clearInterval(t)},[]); const doCopy=(l,v)=>{navigator.clipboard?.writeText(v);setCopied(l);setTimeout(()=>setCopied(null),1500)}; const fields=[{label:"Cardholder name",value:"Ana Gordo",raw:"Ana Gordo"},{label:"Card number",value:"5412 7534 8821 4829",raw:"5412753488214829"},{label:"Expiry date",value:"09/28",raw:"09/28"},{label:"Security code",value:"847",raw:"847"}]; return(<DialogBackdrop onClose={onClose} mode={mode}><div style={{padding:"24px 24px 20px",position:"relative"}}><button onClick={onClose} style={{position:"absolute",top:16,right:16,background:C.bgEl,border:"none",borderRadius:50,width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><X size={16} color={C.txtM}/></button><div style={{textAlign:"center",marginBottom:24}}><div style={{color:C.txt,fontSize:20,fontWeight:700,fontFamily:ff}}>Card details</div><div style={{color:cd>15?C.txtD:C.red,fontSize:12,fontFamily:ff,marginTop:4}}>Visible for {cd}s</div></div><div style={{display:"flex",flexDirection:"column",gap:20,marginBottom:20}}>{fields.map(f=>(<div key={f.label} style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><div><div style={{color:C.txtM,fontSize:13,fontFamily:ff,marginBottom:4}}>{f.label}</div><div style={{color:C.txt,fontSize:15,fontWeight:600,fontFamily:"'SF Mono',monospace",letterSpacing:"0.5px"}}>{f.value}</div></div><button onClick={()=>doCopy(f.label,f.raw)} style={{background:copied===f.label?C.grnL:C.priBg,border:"none",borderRadius:50,padding:"7px 16px",cursor:"pointer",fontFamily:ff,fontSize:13,fontWeight:600,color:copied===f.label?C.grn:C.pri,transition:"all .15s",flexShrink:0}}>{copied===f.label?"Copied":"Copy"}</button></div>))}</div><div style={{height:3,background:C.bgEl,borderRadius:2,overflow:"hidden",marginBottom:8}}><div style={{height:"100%",width:`${(cd/60)*100}%`,background:cd>15?C.pri:C.red,borderRadius:2,transition:"width 1s linear"}}/></div><div style={{color:C.txtD,fontSize:9,fontFamily:ff,textAlign:"center",letterSpacing:"0.5px"}}>SECURED VIA ENFUCE · PCI DSS</div></div></DialogBackdrop>);};

/* ─── PIN dialog ─── */
const PinDialog = ({onClose,mode}) => { const[cd,setCd]=useState(30); useEffect(()=>{const t=setInterval(()=>setCd(c=>{if(c<=1){clearInterval(t);onClose();return 0}return c-1}),1000);return()=>clearInterval(t)},[]); return(<DialogBackdrop onClose={onClose} mode={mode}><div style={{padding:"20px 20px 16px"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:32,height:32,borderRadius:8,background:C.priBg,display:"flex",alignItems:"center",justifyContent:"center"}}><Key size={16} color={C.pri}/></div><span style={{color:C.txt,fontSize:15,fontWeight:700,fontFamily:ff}}>Your card PIN</span></div><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{color:cd>10?C.txtD:C.red,fontSize:11,fontWeight:600,fontFamily:ff}}>{cd}s</span><button onClick={onClose} style={{background:C.bgEl,border:"none",borderRadius:8,width:28,height:28,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><X size={14} color={C.txtD}/></button></div></div><div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:14}}>{"7391".split("").map((d,i)=>(<div key={i} style={{width:52,height:64,borderRadius:14,background:C.dark,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"#fff",fontSize:26,fontWeight:700,fontFamily:"monospace"}}>{d}</span></div>))}</div><div style={{height:3,background:C.bgEl,borderRadius:2,overflow:"hidden",marginBottom:14}}><div style={{height:"100%",width:`${(cd/30)*100}%`,background:cd>10?"#4A3BA8":C.red,borderRadius:2,transition:"width 1s linear"}}/></div><div style={{background:C.priBg,borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"flex-start",gap:10}}><Info size={14} color="#4A3BA8" style={{flexShrink:0,marginTop:1}}/><div><div style={{color:C.txt,fontSize:12,fontWeight:600,fontFamily:ff,marginBottom:2}}>Want a different PIN?</div><div style={{color:C.txtM,fontSize:11,fontFamily:ff,lineHeight:1.5}}>Change it at any ATM. Insert your card, select "Change PIN," enter the current PIN above.</div></div></div><div style={{color:C.txtD,fontSize:9,fontFamily:ff,textAlign:"center",letterSpacing:"0.5px",marginTop:12}}>SECURED VIA ENFUCE · PCI DSS</div></div></DialogBackdrop>);};

/* ─── Report dialog — 3 steps: confirm → physical? → address ─── */
const ReportDialog = ({cardState,setCardState,onClose,mode}) => { const[step,setStep]=useState("confirm"); const[address,setAddress]=useState({street:"Rue de la Loi 42",city:"Brussels",zip:"1000"}); const iS={width:"100%",background:C.bgEl,border:`1px solid ${C.bdr}`,borderRadius:10,padding:"10px 12px",fontFamily:ff,fontSize:13,color:C.txt,outline:"none",boxSizing:"border-box"};
  if(step==="confirm") return(<DialogBackdrop onClose={onClose} mode={mode}><div style={{padding:"24px 24px 20px",position:"relative"}}><button onClick={onClose} style={{position:"absolute",top:16,right:16,background:C.bgEl,border:"none",borderRadius:50,width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><X size={16} color={C.txtM}/></button><div style={{textAlign:"center",marginBottom:20}}><div style={{width:44,height:44,borderRadius:14,background:C.redBg,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}><AlertCircle size={22} color={C.red}/></div><div style={{color:C.txt,fontSize:18,fontWeight:700,fontFamily:ff}}>Report lost or stolen</div><div style={{color:C.txtM,fontSize:12,fontFamily:ff,marginTop:4}}>This cannot be undone</div></div><div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}><div style={{display:"flex",gap:10,alignItems:"flex-start"}}><div style={{width:26,height:26,borderRadius:7,background:C.redBg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><X size={12} color={C.red}/></div><div><div style={{color:C.txt,fontSize:13,fontWeight:600,fontFamily:ff}}>Credentials cancelled instantly</div><div style={{color:C.txtM,fontSize:11,fontFamily:ff,lineHeight:1.5,marginTop:2}}>{cardState.physicalIssued?"Physical card, contactless, and Apple Pay stop immediately.":"Virtual card number, expiry, and CVV invalidated."}</div></div></div><div style={{display:"flex",gap:10,alignItems:"flex-start"}}><div style={{width:26,height:26,borderRadius:7,background:C.accBg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}><RefreshCw size={12} color={C.acc}/></div><div><div style={{color:C.txt,fontSize:13,fontWeight:600,fontFamily:ff}}>New virtual card issued instantly</div><div style={{color:C.txtM,fontSize:11,fontFamily:ff,lineHeight:1.5,marginTop:2}}>New card number, expiry, and CVV so you can keep paying online.</div></div></div></div><div style={{display:"flex",gap:10}}><button onClick={onClose} style={{flex:1,background:C.bgEl,border:"none",borderRadius:12,padding:"13px",cursor:"pointer",fontFamily:ff,fontSize:14,fontWeight:600,color:C.txt}}>Cancel</button><button onClick={()=>setStep("askPhysical")} style={{flex:1,background:C.red,border:"none",borderRadius:12,padding:"13px",cursor:"pointer",fontFamily:ff,fontSize:14,fontWeight:600,color:"#fff"}}>Report card</button></div></div></DialogBackdrop>);
  if(step==="askPhysical") return(<DialogBackdrop onClose={()=>{}} mode={mode}><div style={{padding:"24px 24px 20px"}}><div style={{textAlign:"center",marginBottom:18}}><div style={{width:48,height:48,borderRadius:24,background:C.grnL,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}><CheckCircle size={24} color={C.grn}/></div><div style={{color:C.txt,fontSize:17,fontWeight:700,fontFamily:ff}}>New credentials issued</div><div style={{color:C.txtM,fontSize:12,fontFamily:ff,marginTop:4,lineHeight:1.5}}>Your virtual card has been refreshed.</div></div><div style={{background:C.bgEl,borderRadius:10,padding:"12px",marginBottom:16}}><div style={{color:C.txt,fontSize:13,fontWeight:600,fontFamily:ff,marginBottom:3}}>Need a new physical card?</div><div style={{color:C.txtM,fontSize:11,fontFamily:ff,lineHeight:1.5}}>Replacement ships in 3–5 days. If you only use Apple Pay, you may not need one.</div></div><button onClick={()=>setStep("pin")} style={{width:"100%",background:C.dark,border:"none",borderRadius:12,padding:"13px",cursor:"pointer",fontFamily:ff,fontSize:14,fontWeight:600,color:"#fff",marginBottom:8}}>Order replacement card</button><button onClick={()=>{setCardState(s=>({...s,physicalIssued:false,frozen:false,orderedReplacement:false,cardProductionStep:null}));onClose()}} style={{width:"100%",background:"none",border:"none",padding:"10px",cursor:"pointer",fontFamily:ff,fontSize:13,fontWeight:500,color:C.txtM}}>No thanks, I use Apple Pay</button></div></DialogBackdrop>);
  if(step==="pin") return(<PinChooseStep onNext={()=>setStep("address")} onBack={()=>setStep("askPhysical")} onClose={onClose} mode={mode}/>);
  return(<AddressStep address={address} setAddress={setAddress} onConfirm={()=>{setCardState(s=>({...s,physicalIssued:false,frozen:false,orderedReplacement:true,cardProductionStep:"ordered"}));onClose()}} onBack={()=>setStep("pin")} title="Delivery address" subtitle="Confirm where to ship your replacement card." mode={mode}/>);
};

/* ── Shared steps: PIN choose + Address ── */
const PinChooseStep = ({onNext,onBack,onClose,mode}) => {
  const [pin,setPin]=useState(["","","",""]);
  const [step,setStep]=useState("choose"); // choose or confirm
  const [chosenPin,setChosenPin]=useState(null);
  const [error,setError]=useState(false);
  const filled=pin.every(d=>d!=="");

  const handleConfirm = () => {
    if(step==="choose"){setChosenPin(pin.join(""));setPin(["","","",""]);setStep("confirm");setError(false);}
    else if(pin.join("")===chosenPin){onNext();}
    else{setError(true);setPin(["","","",""]);}
  };

  return(<DialogBackdrop onClose={onClose||onBack} mode={mode}><div style={{padding:"24px 24px 20px"}}>
    <div style={{textAlign:"center",marginBottom:20}}>
      <div style={{width:44,height:44,borderRadius:14,background:C.priBg,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}><Key size={20} color={C.pri}/></div>
      <div style={{color:C.txt,fontSize:17,fontWeight:700,fontFamily:ff}}>{step==="choose"?"Choose your PIN":"Confirm your PIN"}</div>
      <div style={{color:C.txtM,fontSize:12,fontFamily:ff,marginTop:4}}>{step==="choose"?"Pick a 4-digit PIN for your physical card":"Enter the same PIN again to confirm"}</div>
    </div>
    {/* PIN dots */}
    <div style={{display:"flex",gap:12,justifyContent:"center",marginBottom:8}}>
      {pin.map((_,i)=>(
        <div key={i} style={{width:44,height:52,borderRadius:12,background:C.bgEl,border:`1.5px solid ${error?C.red:pin[i]?C.pri:C.bdr}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,fontWeight:700,fontFamily:ff,color:C.txt}}>{pin[i]?"•":""}</div>
      ))}
    </div>
    {error&&<div style={{color:C.red,fontSize:11,fontWeight:500,fontFamily:ff,textAlign:"center",marginBottom:4}}>PINs don't match — try again</div>}
    {/* Numpad */}
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginBottom:16,marginTop:12}}>
      {[1,2,3,4,5,6,7,8,9,null,0,"⌫"].map((k,i)=>(
        <button key={i} onClick={()=>{
          if(k===null) return;
          if(k==="⌫"){setPin(p=>{const n=[...p];const li=n.findLastIndex(d=>d!=="");if(li>=0)n[li]="";return n;});setError(false);}
          else{setPin(p=>{const n=[...p];const fi=n.findIndex(d=>d==="");if(fi>=0)n[fi]=String(k);return n;});}
        }} style={{height:44,background:k===null?"transparent":C.bgEl,border:"none",borderRadius:10,cursor:k===null?"default":"pointer",fontFamily:ff,fontSize:k==="⌫"?16:18,fontWeight:600,color:k==="⌫"?C.txtM:C.txt,display:"flex",alignItems:"center",justifyContent:"center"}}>{k===null?"":k}</button>
      ))}
    </div>
    <button disabled={!filled} onClick={handleConfirm} style={{width:"100%",background:C.dark,border:"none",borderRadius:12,padding:"13px",cursor:filled?"pointer":"not-allowed",fontFamily:ff,fontSize:14,fontWeight:600,color:"#fff",opacity:filled?1:0.4,marginBottom:8}}>{step==="choose"?"Next":"Confirm PIN"}</button>
    {onBack&&<button onClick={onBack} style={{width:"100%",background:"none",border:"none",padding:"8px",cursor:"pointer",fontFamily:ff,fontSize:13,fontWeight:500,color:C.txtM}}>Back</button>}
  </div></DialogBackdrop>);
};

const AddressStep = ({address,setAddress,onConfirm,onBack,title,subtitle,mode}) => {
  const iS={width:"100%",background:C.bgEl,border:`1px solid ${C.bdr}`,borderRadius:10,padding:"10px 12px",fontFamily:ff,fontSize:13,color:C.txt,outline:"none",boxSizing:"border-box"};
  return(<DialogBackdrop onClose={onBack} mode={mode}><div style={{padding:"24px 24px 20px"}}>
    <div style={{color:C.txt,fontSize:17,fontWeight:700,fontFamily:ff,marginBottom:4}}>{title||"Delivery address"}</div>
    <div style={{color:C.txtM,fontSize:12,fontFamily:ff,marginBottom:18,lineHeight:1.5}}>{subtitle||"Confirm where to ship your card."}</div>
    <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:18}}>
      <div><div style={{color:C.txtM,fontSize:11,fontWeight:600,fontFamily:ff,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.5px"}}>Street & number</div><input value={address.street} onChange={e=>setAddress(a=>({...a,street:e.target.value}))} style={iS}/></div>
      <div style={{display:"flex",gap:10}}>
        <div style={{flex:1}}><div style={{color:C.txtM,fontSize:11,fontWeight:600,fontFamily:ff,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.5px"}}>Zip code</div><input value={address.zip} onChange={e=>setAddress(a=>({...a,zip:e.target.value}))} style={iS}/></div>
        <div style={{flex:2}}><div style={{color:C.txtM,fontSize:11,fontWeight:600,fontFamily:ff,marginBottom:4,textTransform:"uppercase",letterSpacing:"0.5px"}}>City</div><input value={address.city} onChange={e=>setAddress(a=>({...a,city:e.target.value}))} style={iS}/></div>
      </div>
    </div>
    <div style={{background:C.priBg,borderRadius:10,padding:"10px 12px",display:"flex",alignItems:"flex-start",gap:8,marginBottom:16}}><CreditCard size={14} color={C.pri} style={{flexShrink:0,marginTop:1}}/><div style={{color:C.txtM,fontSize:11,fontFamily:ff,lineHeight:1.5}}>Usually arrives in <strong style={{color:C.txt,fontWeight:600}}>3–5 business days</strong>.</div></div>
    <button onClick={onConfirm} style={{width:"100%",background:C.dark,border:"none",borderRadius:12,padding:"13px",cursor:"pointer",fontFamily:ff,fontSize:14,fontWeight:600,color:"#fff",marginBottom:8}}>Confirm & order card</button>
    <button onClick={onBack} style={{width:"100%",background:"none",border:"none",padding:"8px",cursor:"pointer",fontFamily:ff,fontSize:13,fontWeight:500,color:C.txtM}}>Back</button>
  </div></DialogBackdrop>);
};

/* ── Physical Card Dialog — first time ordering: PIN → Address ── */
const PhysicalCardDialog = ({setCardState,onClose}) => {
  const [step,setStep]=useState("pin");
  const [address,setAddress]=useState({street:"Rue de la Loi 42",city:"Brussels",zip:"1000"});
  if(step==="pin") return <PinChooseStep onNext={()=>setStep("address")} onBack={onClose} onClose={onClose}/>;
  return <AddressStep address={address} setAddress={setAddress} onConfirm={()=>{setCardState(s=>({...s,pinSet:true,orderedReplacement:true,cardProductionStep:"ordered"}));onClose()}} onBack={()=>setStep("pin")} title="Delivery address" subtitle="Confirm where to ship your physical card."/>;
};

/* ═══════════════════════════════════════════════════════════
   QUICK ACTIONS + REPORT ENTRY
═══════════════════════════════════════════════════════════ */
const QuickActions = ({frozen,pinSet,physicalIssued,onDetails,onFreeze,onPin,onReport}) => {
  const Btn = ({icon:I,label,onClick,danger,disabled}) => (
    <button onClick={onClick} style={{
      background: "none", border: "none", padding: 0,
      cursor: disabled ? "default" : "pointer",
      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      fontFamily: ff, opacity: disabled ? 0.4 : 1,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 24,
        background: danger ? "#F9D2D4" : "#E8D5FC",
        border: "none",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <I size={19} color={danger ? C.red : "#2D0B4E"} />
      </div>
      <span style={{ color: danger ? C.red : C.txt, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>{label}</span>
    </button>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{display:"flex",gap:16,justifyContent:"center"}}>
        <Btn icon={Eye} label="Details" onClick={onDetails} disabled={frozen} />
        {pinSet && <Btn icon={Key} label="View PIN" onClick={()=>!frozen&&onPin()} disabled={frozen} />}
        <Btn icon={frozen ? Lock : Snowflake} label={frozen ? "Unfreeze" : "Freeze"} onClick={onFreeze} danger={frozen} />
      </div>
      {frozen&&(<button onClick={onReport} style={{width:"100%",background:C.redBg,border:`1px solid ${C.red}20`,borderRadius:12,padding:"12px 16px",cursor:"pointer",fontFamily:ff,display:"flex",alignItems:"center",gap:10}}><AlertCircle size={16} color={C.red} style={{flexShrink:0}}/><div style={{flex:1,textAlign:"left"}}><div style={{color:C.txt,fontSize:13,fontWeight:600}}>{physicalIssued ? "Card lost or stolen?" : "Card compromised?"}</div><div style={{color:C.txtM,fontSize:11,marginTop:1}}>{physicalIssued ? "Cancel credentials and get a replacement" : "Refresh your virtual card credentials"}</div></div><ChevronRight size={16} color={C.txtD}/></button>)}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   POST-REPORT BANNERS — horizontal bar tracker + wallet CTA
═══════════════════════════════════════════════════════════ */
const stepsData = [
  { id:"ordered", label:"Ordered", est:"Production starts tonight. Arrives in 3–5 days." },
  { id:"production", label:"In production", est:"Being printed. 2–4 days remaining." },
  { id:"shipped", label:"Shipped", est:"On its way. 1–2 days remaining." },
  { id:"delivered", label:"Delivered", est:"Your card has arrived." },
];

const ContextualBanners = ({cardState,setCardState,onOrderPhysical}) => {
  const {physicalIssued, pinSet, orderedReplacement, cardProductionStep} = cardState;
  const isVirtualOnly = !physicalIssued && !orderedReplacement;
  const [historyOpen, setHistoryOpen] = useState(false);
  const stepIdx = stepsData.findIndex(s=>s.id===cardProductionStep);

  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {/* Virtual only — no physical ordered yet */}
      {isVirtualOnly && (
        <>
          {/* Order physical card — opens PIN + address flow */}
          <Card pad={14} onClick={onOrderPhysical} style={{cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{width:36,height:36,borderRadius:10,background:C.bgEl,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <CreditCard size={17} color={C.txtM}/>
              </div>
              <div style={{flex:1}}>
                <div style={{color:C.txt,fontSize:13,fontWeight:600,fontFamily:ff}}>Get a physical card</div>
                <div style={{color:C.txtM,fontSize:11,fontFamily:ff,marginTop:1}}>Pay in-store & at terminals · ships in 3–5 days</div>
              </div>
              <ChevronRight size={16} color={C.txtD}/>
            </div>
          </Card>

          {/* Apple Pay — informational only */}
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"2px 4px"}}>
            <Smartphone size={13} color={C.txtD}/>
            <span style={{color:C.txtM,fontSize:11,fontFamily:ff}}>You can add this card to Apple Pay or Google Pay via the app</span>
          </div>
        </>
      )}

      {/* Physical card delivery tracker — works for both initial order and replacement */}
      {orderedReplacement && cardProductionStep && cardProductionStep !== "delivered" && (
        <Card pad={16}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Package size={16} color={C.pri}/>
              <span style={{color:C.txt,fontSize:14,fontWeight:600,fontFamily:ff}}>{stepsData[stepIdx]?.label}</span>
            </div>
            
          </div>
          <div style={{display:"flex",gap:3,marginBottom:12}}>
            {stepsData.map((_,i)=>(<div key={i} style={{flex:1,height:4,borderRadius:2,background:i<=stepIdx?C.pri:C.bgEl,transition:"background .3s"}}/>))}
          </div>
          <div style={{color:C.txtM,fontSize:12,fontFamily:ff,lineHeight:1.5}}>{stepsData[stepIdx]?.est}</div>
          {stepIdx > 0 && (
            <button onClick={()=>setHistoryOpen(!historyOpen)} style={{background:"none",border:"none",padding:"8px 0 0",cursor:"pointer",fontFamily:ff,fontSize:11,fontWeight:600,color:C.txtD,display:"flex",alignItems:"center",gap:4}}>
              {historyOpen?<ChevronUp size={13}/>:<ChevronDown size={13}/>}
              {historyOpen?"Hide":"Show"} history
            </button>
          )}
          {historyOpen && (
            <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:6}}>
              {stepsData.slice(0,stepIdx+1).map((s,i)=>(
                <div key={s.id} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0"}}>
                  <CheckCircle size={12} color={i<stepIdx?C.grn:C.pri}/>
                  <span style={{color:i<stepIdx?C.txtD:C.txt,fontSize:12,fontFamily:ff,fontWeight:i===stepIdx?600:400}}>{s.label}</span>
                  {i<stepIdx&&<span style={{color:C.txtD,fontSize:10,fontFamily:ff,marginLeft:"auto"}}>Done</span>}
                  {i===stepIdx&&<span style={{color:C.pri,fontSize:10,fontFamily:ff,fontWeight:600,marginLeft:"auto"}}>Current</span>}
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

    </div>
  );
};

/* ─── Budget data + detail ─── */
const cardBudgets=[{id:"meal",emoji:"🍴",name:"Meal Vouchers",color:"#FDCB6E",note:"Works anywhere food is sold",highlight:"Unlike traditional meal vouchers, yours work at any place that sells food. No merchant contracts or restrictions.",subs:[{label:"Restaurants & cafés",brands:[{name:"Panos",desc:"Bakery & café",accepted:true},{name:"Le Pain Quotidien",desc:"Bakery & restaurant",accepted:true},{name:"Exki",desc:"Healthy fast food",accepted:true},{name:"Starbucks",desc:"Coffee & snacks",accepted:true}]},{label:"Food delivery",brands:[{name:"Takeaway.com",desc:"Food delivery",accepted:true},{name:"Deliveroo",desc:"Food delivery",accepted:true},{name:"Uber Eats",desc:"Food delivery",accepted:true}]},{label:"Supermarkets",brands:[{name:"Aldi",desc:"Accepted",accepted:true},{name:"Lidl",desc:"Accepted",accepted:true},{name:"Delhaize",desc:"In negotiation",accepted:false},{name:"Colruyt",desc:"In negotiation",accepted:false},{name:"Albert Heijn",desc:"In negotiation",accepted:false},{name:"Carrefour",desc:"In negotiation",accepted:false}]}]},{id:"mobility",emoji:"🚆",name:"Mobility",color:C.acc,note:"Everyday transport",subs:[{label:"Public transport",brands:[{name:"NMBS/SNCB",desc:"National rail",accepted:true},{name:"De Lijn",desc:"Flanders buses & tram",accepted:true},{name:"STIB/MIVB",desc:"Brussels metro & bus",accepted:true},{name:"TEC",desc:"Wallonia buses",accepted:true}]},{label:"Shared mobility",brands:[{name:"Cambio",desc:"Car sharing",accepted:true},{name:"Poppy",desc:"Car & scooter sharing",accepted:true},{name:"Bolt",desc:"Rides & scooters",accepted:true},{name:"Uber",desc:"Rides",accepted:true},{name:"Voi",desc:"E-scooters",accepted:true}]},{label:"Fuel & charging",brands:[{name:"Shell",desc:"Fuel stations",accepted:true},{name:"TotalEnergies",desc:"Fuel stations",accepted:true},{name:"Q8",desc:"Fuel stations",accepted:true},{name:"Fastned",desc:"EV fast charging",accepted:true}]},{label:"Parking",brands:[{name:"Indigo",desc:"Parking garages",accepted:true},{name:"4411",desc:"Mobile parking",accepted:true},{name:"Yellowbrick",desc:"Mobile parking",accepted:true}]}]}];

const BudgetDetailView = ({budget,onBack}) => (
  <div style={{display:"flex",flexDirection:"column",gap:16}}>
    <div style={{display:"flex",alignItems:"center",gap:12}}>
      <button onClick={onBack} style={{background:C.bgEl,border:"none",borderRadius:10,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}><ChevronRight size={18} color={C.txt} style={{transform:"rotate(180deg)"}}/></button>
      <div style={{width:38,height:38,borderRadius:10,background:budget.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{budget.emoji}</div>
      <div><h1 style={{color:C.txt,fontSize:18,fontWeight:700,fontFamily:ff,margin:0}}>{budget.name}</h1><div style={{color:C.txtD,fontSize:12,fontFamily:ff}}>{budget.note}</div></div>
    </div>

    {/* Highlight callout — prominent key message */}
    {budget.highlight && (
      <div style={{background:budget.color+"15",borderRadius:14,padding:"14px 16px",borderLeft:`3px solid ${budget.color}`}}>
        <div style={{color:C.txt,fontSize:13,fontWeight:600,fontFamily:ff,lineHeight:1.5}}>{budget.highlight}</div>
      </div>
    )}

    {/* Merchant categories */}
    {budget.subs.map(sub=>(
      <div key={sub.label}>
        <div style={{color:C.txtD,fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:8,fontFamily:ff}}>{sub.label}</div>
        <Card pad={0}>{sub.brands.map((b,i)=>(
          <div key={b.name}>
            <div style={{display:"flex",alignItems:"center",padding:"12px 14px",gap:12,opacity:b.accepted?1:0.55}}>
              <div style={{width:36,height:36,borderRadius:10,background:b.accepted?budget.color+"15":C.bgEl,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontSize:13,fontWeight:700,color:b.accepted?budget.color:C.txtD,fontFamily:ff}}>{b.name.charAt(0)}</span>
              </div>
              <div style={{flex:1}}>
                <div style={{color:b.accepted?C.txt:C.txtM,fontSize:14,fontWeight:600,fontFamily:ff}}>{b.name}</div>
                <div style={{color:C.txtD,fontSize:11,fontFamily:ff}}>{b.desc}</div>
              </div>
              {b.accepted
                ? <CheckCircle size={16} color={budget.color} strokeWidth={2.5} />
                : <div style={{width:16,height:16,borderRadius:8,border:`1.5px dashed ${C.txtD}`,flexShrink:0}} />
              }
            </div>
            {i<sub.brands.length-1&&<div style={{height:1,background:C.bdr,margin:"0 14px"}}/>}
          </div>
        ))}</Card>
      </div>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════
   CARD PAGE
═══════════════════════════════════════════════════════════ */
const CardPage = ({cardState,setCardState,appLinked,onBack,onOpenStore}) => {
  const [view,setView]=useState(null);
  const [authFlow,setAuthFlow]=useState(null);
  const [dialog,setDialog]=useState(null);

  // Onboarding — no card yet (backend-detected phases)
  if (!cardState.hasCard) {
    const handleNext = () => {
      if (cardState.appSetup === "noApp") {
        setCardState(s => ({ ...s, appSetup: "settingUp" }));
      } else if (cardState.appSetup === "settingUp") {
        setCardState(s => ({ ...s, hasCard: true, appSetup: "ready", pinSet: false, physicalIssued: false }));
      }
    };
    return (<div style={{display:"flex",flexDirection:"column",gap:0}}>
      <OnboardingPage appSetup={cardState.appSetup || "noApp"} onSimulateNext={handleNext} onClose={onBack} onOpenStore={onOpenStore} />
    </div>);
  }

  if(view?.startsWith("budget:")) return <BudgetDetailView budget={cardBudgets.find(b=>b.id===view.split(":")[1])} onBack={()=>setView(null)}/>;
  if(view==="report") return null;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {/* X close — overlay style */}
      <div style={{display:"flex",justifyContent:"flex-end"}}>
        {onBack&&<button onClick={onBack} style={{background:C.bgEl,border:"none",borderRadius:50,width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><X size={16} color={C.txtM}/></button>}
      </div>

      <CardVisual cardState={cardState}/>

      {appLinked&&(
        <QuickActions frozen={cardState.frozen} pinSet={cardState.pinSet} physicalIssued={cardState.physicalIssued}
          onDetails={()=>{if(!cardState.frozen) setAuthFlow({label:"view card details",fn:()=>{setAuthFlow(null);setDialog("credentials")}})}}
          onFreeze={()=>setCardState(s=>({...s,frozen:!s.frozen}))}
          onPin={()=>{if(!cardState.frozen) setAuthFlow({label:"view your PIN",fn:()=>{setAuthFlow(null);setDialog("pin")}})}}
          onReport={()=>setDialog("report")}
        />
      )}

      {!appLinked&&(<Card pad={16} style={{background:C.bgCard}}><div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}><PayflipLogo size={36}/><div style={{flex:1}}><div style={{color:C.txt,fontSize:14,fontWeight:600,fontFamily:ff}}>Get the Payflip app</div><div style={{color:C.txtM,fontSize:12,fontFamily:ff,marginTop:1}}>Some features are only available in the app</div></div></div><div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14,paddingLeft:48}}>{["View card details, PIN & freeze","Request a physical card","Add to Apple Pay / Google Pay","Report lost or stolen"].map(f=>(<div key={f} style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:5,height:5,borderRadius:3,background:C.pri,flexShrink:0}}/><span style={{color:C.txtM,fontSize:12,fontFamily:ff}}>{f}</span></div>))}</div><button onClick={onOpenStore} style={{width:"100%",background:C.pri,border:"none",borderRadius:12,padding:"12px",cursor:"pointer",fontFamily:ff,fontSize:14,fontWeight:600,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}><Smartphone size={16}/>Download the app</button></Card>)}

      {/* Contextual cards — virtual only, physical delivery, or post-report */}
      {appLinked && (
        <ContextualBanners cardState={cardState} setCardState={setCardState} onOrderPhysical={()=>setDialog("physicalCard")} />
      )}

      <div style={{marginTop:-4}}>
        <SectionLabel>Works with this card</SectionLabel>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {cardBudgets.map(b=>(<Card key={b.id} pad={0} onClick={()=>setView("budget:"+b.id)}><div style={{display:"flex",alignItems:"center",padding:"14px 16px",gap:12}}><div style={{width:38,height:38,borderRadius:10,background:b.color+"18",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{b.emoji}</div><div style={{flex:1}}><div style={{color:C.txt,fontSize:14,fontWeight:600,fontFamily:ff}}>{b.name}</div><div style={{color:C.txtD,fontSize:11,fontFamily:ff,marginTop:2}}>{b.note}</div></div><ChevronRight size={16} color={C.txtD} style={{flexShrink:0}}/></div></Card>))}
        </div>
      </div>

      {authFlow&&<InAppAuthOverlay label={authFlow.label} onConfirm={authFlow.fn} onCancel={()=>setAuthFlow(null)}/>}
      {dialog==="credentials"&&<CredentialDialog onClose={()=>setDialog(null)}/>}
      {dialog==="pin"&&<PinDialog onClose={()=>setDialog(null)}/>}
      {dialog==="report"&&<ReportDialog cardState={cardState} setCardState={setCardState} onClose={()=>setDialog(null)}/>}
      {dialog==="physicalCard"&&<PhysicalCardDialog setCardState={setCardState} onClose={()=>setDialog(null)}/>}
    </div>
  );
};

/* ─── Wallet Page — card entry + budgets + activity ─── */
const WalletPage = ({cardState,onGoToCard}) => {
  const [filter,setFilter]=useState("all");const[q,setQ]=useState("");const[exp,setExp]=useState(null);
  const [searchOpen,setSearchOpen]=useState(false);
  const allItems=[
    ...txns.map(t=>({...t,kind:"card",via:"Card"})),
    ...pastExpenses.map(r=>{const rc=expenseCats.find(c=>c.id===r.cat);return{id:"exp_"+r.id,merchant:r.desc,cat:rc?.name||r.cat,amount:-r.amount,date:r.paidDate||r.date,emoji:rc?.emoji||"🧾",wallet:r.cat,status:r.status==="paid"?"completed":"review",kind:"expense",via:"Platform"}}),
    ...pendingExpenses.map(r=>{const rc=expenseCats.find(c=>c.id===r.cat);return{id:"pend_"+r.id,merchant:r.desc,cat:rc?.name||r.cat,amount:-r.amount,date:r.date,emoji:rc?.emoji||"🧾",wallet:r.cat,status:"review",kind:"expense",via:"Platform"}})
  ];
  const list=allItems.filter(t=>filter==="all"||t.wallet===filter).filter(t=>!q||t.merchant.toLowerCase().includes(q.toLowerCase()));

  // Fullscreen search overlay
  if (searchOpen) return (
    <div style={{display:"flex",flexDirection:"column",gap:12,minHeight:"100%"}}>
      {/* Search header */}
      <div style={{display:"flex",alignItems:"center",gap:10}}>
        <div style={{flex:1,position:"relative"}}>
          <Search size={15} color={C.txtD} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search activity..." autoFocus style={{width:"100%",background:C.bgEl,border:"none",borderRadius:10,padding:"11px 12px 11px 36px",fontFamily:ff,fontSize:14,color:C.txt,outline:"none",boxSizing:"border-box"}}/>
        </div>
        <button onClick={()=>{setSearchOpen(false);setQ("")}} style={{background:"none",border:"none",cursor:"pointer",fontFamily:ff,fontSize:13,fontWeight:600,color:C.pri,padding:"8px 0",flexShrink:0}}>Cancel</button>
      </div>

      {/* Filters */}
      <div style={{display:"flex",gap:6}}>{[{id:"all",label:"All"},{id:"mobility",label:"Mobility"},{id:"meal",label:"Meals"}].map(f=>(<button key={f.id} onClick={()=>setFilter(f.id)} style={{background:filter===f.id?C.dark:C.bgEl,color:filter===f.id?"#fff":C.txtM,border:"none",borderRadius:50,padding:"7px 14px",fontSize:12,fontWeight:600,fontFamily:ff,cursor:"pointer"}}>{f.label}</button>))}</div>

      {/* Results */}
      {q&&list.length===0 ? (
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,paddingTop:40}}>
          <Search size={24} color={C.txtD}/>
          <div style={{color:C.txtM,fontSize:13,fontFamily:ff}}>No results for "{q}"</div>
        </div>
      ) : (
        <Card pad={0}>{list.map((t,i)=>(<div key={t.id}><div onClick={()=>setExp(exp===t.id?null:t.id)} style={{display:"flex",alignItems:"center",padding:"12px 14px",gap:12,cursor:"pointer",background:exp===t.id?C.bgEl+"80":"transparent"}}><div style={{width:36,height:36,borderRadius:10,background:(walletMeta[t.wallet]?.color||C.bgEl)+"15",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{t.emoji}</div><div style={{flex:1,minWidth:0}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{color:C.txt,fontSize:13,fontWeight:600,fontFamily:ff,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.merchant}</span>{t.status==="declined"&&<Badge color={C.red} style={{fontSize:9,padding:"1px 6px"}}>Declined</Badge>}{t.status==="review"&&<Badge color={C.org} style={{fontSize:9,padding:"1px 6px"}}>Review</Badge>}</div><div style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}><Badge color={walletMeta[t.wallet]?.color} style={{fontSize:9,padding:"1px 7px"}}>{walletMeta[t.wallet]?.label}</Badge><span style={{color:C.txtD,fontSize:11,fontFamily:ff}}>· {t.via}</span><span style={{color:C.txtD,fontSize:11,fontFamily:ff}}>· {t.date}</span></div></div><div style={{color:t.status==="declined"?C.red:C.txt,fontSize:14,fontWeight:600,fontFamily:ff,textDecoration:t.status==="declined"?"line-through":"none",flexShrink:0}}>{fmt(Math.abs(t.amount))}</div></div>{exp===t.id&&(<div style={{padding:"0 14px 12px 62px",display:"flex",gap:16,flexWrap:"wrap"}}>{[{label:"Paid via",value:t.via},{label:"Category",value:t.cat},{label:"Status",value:t.status==="completed"?"Approved":t.status==="review"?"In review":"Declined"}].map(d=>(<div key={d.label}><div style={{color:C.txtD,fontSize:9,fontWeight:600,fontFamily:ff,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:1}}>{d.label}</div><div style={{color:C.txt,fontSize:12,fontWeight:500,fontFamily:ff}}>{d.value}</div></div>))}</div>)}{i<list.length-1&&<div style={{height:1,background:C.bdr,margin:"0 14px"}}/>}</div>))}</Card>
      )}
    </div>
  );

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <h1 style={{color:C.txt,fontSize:20,fontWeight:700,fontFamily:ff,margin:0}}>Wallet</h1>

      {/* Card entry — mini card visual */}
      <Card pad={12} onClick={onGoToCard} style={{cursor:"pointer"}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:56,height:35,borderRadius:6,background:"#180B2D",overflow:"hidden",position:"relative",flexShrink:0}}>
            <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 15% 85%, rgba(61,133,233,0.25) 0%, transparent 60%)"}}/>
            <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 95% 15%, rgba(212,96,229,0.2) 0%, transparent 55%)"}}/>
            <svg viewBox="0 0 131 80" fill="none" style={{position:"absolute",right:"5%",bottom:"8%",width:"22%",opacity:0.45}}><circle cx="40" cy="40" r="40" fill="rgba(255,255,255,0.6)"/><circle cx="91" cy="40" r="40" fill="rgba(255,255,255,0.6)"/></svg>
          </div>
          <div style={{flex:1}}>
            <div style={{color:C.txt,fontSize:14,fontWeight:600,fontFamily:ff}}>Payflip Card</div>
            <div style={{color:C.txtD,fontSize:11,fontFamily:ff,marginTop:1}}>{cardState.hasCard?(cardState.frozen?"Frozen":"Active · Mastercard"):"Set up your card"}</div>
          </div>
          <ChevronRight size={16} color={C.txtD}/>
        </div>
      </Card>

      {/* Budgets */}
      <SectionLabel>Budgets</SectionLabel>
      <Card pad={0}>
        {[...expenseWallets,{id:"meal_wallet",name:"Meal Vouchers",balance:132.80,emoji:"🍴",color:"#FDCB6E"}].map((w,i,arr)=>(
          <div key={w.id}>
            <div style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px"}}>
              <span style={{fontSize:17}}>{w.emoji}</span>
              <span style={{flex:1,color:C.txt,fontSize:14,fontWeight:600,fontFamily:ff}}>{w.name}</span>
              <span style={{color:C.txt,fontSize:14,fontWeight:600,fontFamily:ff}}>{fmt(w.balance)}</span>
            </div>
            {i<arr.length-1&&<div style={{height:1,background:C.bdr,margin:"0 16px"}}/>}
          </div>
        ))}
      </Card>

      {/* Activity — fake search bar triggers overlay */}
      <SectionLabel>Activity</SectionLabel>
      <button onClick={()=>setSearchOpen(true)} style={{width:"100%",background:C.bgEl,border:"none",borderRadius:12,padding:"11px 12px 11px 36px",fontFamily:ff,fontSize:13,color:C.txtM,outline:"none",boxSizing:"border-box",cursor:"pointer",textAlign:"left",position:"relative"}}>
        <Search size={15} color={C.txtM} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)"}}/>
        Search activity...
      </button>

      {/* Recent activity preview — first 3 items */}
      <Card pad={0}>{allItems.slice(0,3).map((t,i)=>(<div key={t.id}><div style={{display:"flex",alignItems:"center",padding:"12px 14px",gap:12}}><div style={{width:36,height:36,borderRadius:10,background:(walletMeta[t.wallet]?.color||C.bgEl)+"15",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{t.emoji}</div><div style={{flex:1,minWidth:0}}><div style={{display:"flex",alignItems:"center",gap:6}}><span style={{color:C.txt,fontSize:13,fontWeight:600,fontFamily:ff,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.merchant}</span>{t.status==="review"&&<Badge color={C.org} style={{fontSize:9,padding:"1px 6px"}}>Review</Badge>}</div><div style={{display:"flex",alignItems:"center",gap:6,marginTop:2}}><Badge color={walletMeta[t.wallet]?.color} style={{fontSize:9,padding:"1px 7px"}}>{walletMeta[t.wallet]?.label}</Badge><span style={{color:C.txtD,fontSize:11,fontFamily:ff}}>· {t.via}</span></div></div><div style={{color:C.txt,fontSize:14,fontWeight:600,fontFamily:ff,flexShrink:0}}>{fmt(Math.abs(t.amount))}</div></div>{i<2&&<div style={{height:1,background:C.bdr,margin:"0 14px"}}/>}</div>))}</Card>
      <button onClick={()=>setSearchOpen(true)} style={{background:"none",border:"none",cursor:"pointer",fontFamily:ff,fontSize:12,fontWeight:600,color:C.pri,padding:"2px 0",alignSelf:"center"}}>View all activity</button>
    </div>
  );
};

/* ─── Benefits Page — unified card style for all benefit types ─── */
const BenefitRow = ({emoji,name,desc,status,statusColor,color,onClick}) => (
  <Card pad={14} onClick={onClick} style={{cursor:"pointer"}}>
    <div style={{display:"flex",alignItems:"center",gap:12}}>
      <div style={{width:42,height:42,borderRadius:12,background:color+"15",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <span style={{fontSize:20}}>{emoji}</span>
      </div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{color:C.txt,fontSize:14,fontWeight:600,fontFamily:ff}}>{name}</div>
        <div style={{color:C.txtM,fontSize:11,fontFamily:ff,marginTop:2}}>{desc}</div>
        {status&&<div style={{marginTop:5}}><Badge color={statusColor||C.grn}>{status}</Badge></div>}
      </div>
      <ChevronRight size={16} color={C.txtD} style={{flexShrink:0}}/>
    </div>
  </Card>
);

const BenefitsPage = () => (
  <div style={{display:"flex",flexDirection:"column",gap:10}}>
    <h1 style={{color:C.txt,fontSize:20,fontWeight:700,fontFamily:ff,margin:0}}>Benefits</h1>

    <BenefitRow emoji="📱" name="Smartphone" desc="Pick any phone you want" color="#6C5CE7"/>
    <BenefitRow emoji="💻" name="Laptop" desc="The setup you actually want" status="MacBook Air M2" statusColor="#0984E3" color="#0984E3"/>
    <BenefitRow emoji="📟" name="Tablet" desc="Work and read, anywhere" status="Out for delivery" statusColor={C.org} color="#00B894"/>
    <BenefitRow emoji="⌚" name="Smartwatch" desc="Stay connected on your wrist" color="#E17055"/>
    <BenefitRow emoji="📈" name="Warrants" desc="Tax-optimised investment from your bonus" color="#ec4899" status="Active · €1,200" statusColor={C.grn}/>
    <BenefitRow emoji="🏦" name="Pension savings" desc="Employer pension top-up via flex budget" color="#6C5CE7" status="Pending setup" statusColor={C.org}/>
    <BenefitRow emoji="🌴" name="Extra holidays" desc="Buy up to 10 extra days off" color="#00A99D"/>
    <BenefitRow emoji="🛡️" name="Health insurance" desc="Upgrade your group insurance coverage" color="#E8890C" status="Active · Alan plan" statusColor={C.grn}/>
  </div>
);

/* ─── Profile Page ─── */
const ProfilePage = () => (
  <div style={{display:"flex",flexDirection:"column",gap:14}}>
    <h1 style={{color:C.txt,fontSize:20,fontWeight:700,fontFamily:ff,margin:0}}>Profile</h1>
    <Card pad={18}>
      <div style={{display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:52,height:52,borderRadius:50,background:"#6D32C7",backgroundImage:"radial-gradient(ellipse at 30% 30%, rgba(238,145,243,0.4) 0%, transparent 60%)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:20,fontWeight:600,fontFamily:ff,boxShadow:"0 3px 10px rgba(109,50,199,0.2)"}}>A</div>
        <div>
          <div style={{color:C.txt,fontSize:16,fontWeight:600,fontFamily:ff}}>Ana Gordo</div>
          <div style={{color:C.txtM,fontSize:12,fontFamily:ff}}>ana.gordo@company.com</div>
          <div style={{color:C.txtD,fontSize:11,fontFamily:ff,marginTop:2}}>Engineering · EMP-2847</div>
        </div>
      </div>
    </Card>

    <SectionLabel>Active choices</SectionLabel>
    <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,margin:"0 -20px",padding:"0 20px 4px"}}>
      {[
        {emoji:"💻",label:"MacBook Air M2",sub:"Laptop · until Mar 2026",color:"#0984E3"},
        {emoji:"📈",label:"€1,200 in warrants",sub:"Warrants · active",color:"#ec4899"},
        {emoji:"🛡️",label:"Alan plan",sub:"Health insurance · active",color:"#E8890C"},
      ].map(c=>(
        <div key={c.label} style={{minWidth:140,background:C.bgCard,border:`1px solid ${C.bdr}`,borderRadius:14,padding:"12px 14px",flexShrink:0}}>
          <span style={{fontSize:20}}>{c.emoji}</span>
          <div style={{color:C.txt,fontSize:12,fontWeight:600,fontFamily:ff,marginTop:8}}>{c.label}</div>
          <div style={{color:C.txtD,fontSize:10,fontFamily:ff,marginTop:2}}>{c.sub}</div>
        </div>
      ))}
    </div>

    <SectionLabel>Settings</SectionLabel>
    <Card pad={0}>
      {[{emoji:"📄",label:"Documents"},{emoji:"🔔",label:"Notifications"},{emoji:"🌐",label:"Language & Region"},{emoji:"❓",label:"Help & Support"}].map((item,i,arr)=>(
        <div key={item.label}>
          <div style={{display:"flex",alignItems:"center",padding:"13px 16px",gap:12,cursor:"pointer"}}>
            <span style={{fontSize:16}}>{item.emoji}</span>
            <span style={{flex:1,color:C.txt,fontSize:13,fontWeight:500,fontFamily:ff}}>{item.label}</span>
            <ChevronRight size={16} color={C.txtD}/>
          </div>
          {i<arr.length-1&&<div style={{height:1,background:C.bdr,margin:"0 16px"}}/>}
        </div>
      ))}
    </Card>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   EXPENSE DATA — wallets, categories, reimbursements
═══════════════════════════════════════════════════════════ */
const expenseWallets = [
  { id: "ld_wallet", name: "Learning & Development", balance: 421, limit: 500, color: "#6C5CE7", taxRate: 0, budgetType: "company", emoji: "🎓", short: "L&D" },
  { id: "mobility_wallet", name: "Mobility", balance: 535, limit: 725, color: "#00A99D", taxRate: 0.35, budgetType: "mobility", emoji: "🚆", short: "Mobility" },
  { id: "eyp_wallet", name: "End of Year Premium", balance: 1240, limit: 2000, color: "#E17055", taxRate: 0.35, budgetType: "earned", emoji: "🍾", short: "EYP", mobilityExcluded: true },
];

const expenseCats = [
  { id: "ld", name: "Learning & Development", walletId: "ld_wallet", color: "#6C5CE7", emoji: "🎓", examples: "Online courses, conference tickets, professional books", rules: "Must relate to your role or professional growth." },
  { id: "mobility", name: "Mobility", walletId: "mobility_wallet", color: "#00A99D", emoji: "🚆", examples: "Train passes, fuel, parking, Bolt/Uber, bike sharing", rules: "Covers commuting and business travel. Keep proof." },
  { id: "eyp", name: "End of Year Premium", walletId: "eyp_wallet", color: "#E17055", emoji: "🍾", examples: "Electronics, home office, wellbeing, gifts", rules: "Cannot be spent on mobility. Unspent is paid out." },
];

const pastExpenses = [
  { id: 1, desc: "NMBS Monthly Pass — Feb", cat: "mobility", amount: 85, date: "Feb 1", status: "paid", paidDate: "Feb 5" },
  { id: 2, desc: "React Advanced — Udemy", cat: "ld", amount: 89, date: "Jan 22", status: "paid", paidDate: "Jan 27" },
  { id: 3, desc: "Cambio — 3 trips", cat: "mobility", amount: 22.40, date: "Jan 15", status: "paid", paidDate: "Jan 20" },
];

const pendingExpenses = [
  { id: 10, desc: "AWS Certification exam", cat: "ld", amount: 150, date: "Feb 4", status: "review" },
  { id: 11, desc: "Shell fuel — 42L", cat: "mobility", amount: 68.50, date: "Feb 3", status: "review" },
];

/* ═══════════════════════════════════════════════════════════
   EXPENSE DETAIL — view a single expense
═══════════════════════════════════════════════════════════ */
const ExpenseDetail = ({ expense, onClose }) => {
  const rc = expenseCats.find(c => c.id === expense.cat);
  const w = rc ? expenseWallets.find(wl => wl.id === rc.walletId) : null;
  const taxSaving = w?.taxRate ? expense.amount * w.taxRate : 0;
  const isPaid = expense.status === "paid";
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      <div style={{display:"flex",alignItems:"center",gap:12,padding:"4px 0"}}>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",padding:0}}><ChevronLeft size={24} color={C.txt}/></button>
        <span style={{color:C.txt,fontSize:18,fontWeight:600,fontFamily:ff}}>Expense details</span>
      </div>
      <Card pad={16}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <span style={{fontSize:20}}>{rc?.emoji||"🧾"}</span>
          <div style={{flex:1}}>
            <div style={{color:C.txt,fontSize:16,fontWeight:600,fontFamily:ff}}>{expense.desc}</div>
            <div style={{color:C.txtD,fontSize:12,fontFamily:ff}}>{rc?.name} · {expense.date}</div>
          </div>
          <Badge color={isPaid?C.grn:C.org}>{isPaid?"Paid":"In review"}</Badge>
        </div>
        <div style={{height:1,background:C.bdr,marginBottom:12}}/>
        {[
          {label:"Amount",value:fmt(expense.amount),bold:true},
          {label:"Category",value:rc?.name||"—"},
          {label:"Receipt",value:"1 file"},
          ...(w?.budgetType==="company"?[{label:"Cost to you",value:fmt(0),color:C.pri}]:w?.taxRate?[{label:`Tax saved (~${Math.round(w.taxRate*100)}%)`,value:fmt(taxSaving),color:C.grn}]:[]),
          ...(isPaid&&expense.paidDate?[{label:"Paid on",value:expense.paidDate}]:[]),
        ].map((r,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0"}}>
            <span style={{color:C.txtM,fontSize:13,fontFamily:ff}}>{r.label}</span>
            <span style={{color:r.color||C.txt,fontSize:r.bold?17:13,fontWeight:r.bold?600:500,fontFamily:ff}}>{r.value}</span>
          </div>
        ))}
      </Card>
      {!isPaid&&(
        <Card pad={16}>
          <div style={{color:C.txt,fontSize:14,fontWeight:700,fontFamily:ff,marginBottom:14}}>What happens next</div>
          {[{label:"Submitted",sub:`You submitted on ${expense.date}`,done:true},{label:"Admin review",sub:"Your admin is reviewing",active:true},{label:"On your March payslip",sub:fmt(expense.amount)}].map((s,i)=>(
            <div key={i} style={{display:"flex",gap:12,paddingBottom:i<2?16:0,position:"relative"}}>
              {i<2&&<div style={{position:"absolute",left:9,top:22,width:2,height:"calc(100% - 8px)",background:s.done?C.pri:C.bdr,borderRadius:1}}/>}
              <div style={{width:20,height:20,borderRadius:10,background:s.done?C.pri:s.active?"#D4D2E0":C.bgEl,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,zIndex:1}}>
                {s.done&&<CheckCircle size={12} color="#fff" strokeWidth={3}/>}
                {s.active&&<div style={{width:6,height:6,borderRadius:3,background:"#fff"}}/>}
              </div>
              <div style={{flex:1}}>
                <div style={{color:s.done?C.pri:C.txt,fontSize:13,fontWeight:600,fontFamily:ff}}>{s.label}</div>
                <div style={{color:C.txtM,fontSize:11,fontFamily:ff,marginTop:1}}>{s.sub}</div>
              </div>
            </div>
          ))}
        </Card>
      )}
      {isPaid&&(<div style={{background:C.grnL,borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:8}}><CheckCircle size={14} color={C.grn}/><span style={{color:C.grn,fontSize:13,fontWeight:500,fontFamily:ff}}>Reimbursed on {expense.paidDate}</span></div>)}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   REIMBURSEMENT FLOW — full expense form
═══════════════════════════════════════════════════════════ */
const ReimbursementFlow = ({ onClose, onComplete }) => {
  const [cat, setCat] = useState(null);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [receipts, setReceipts] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showTaxDetail, setShowTaxDetail] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [autoDetected, setAutoDetected] = useState(false);
  const [showCatPicker, setShowCatPicker] = useState(false);

  const amtNum = parseFloat(amount) || 0;
  const selCat = expenseCats.find(c => c.id === cat);
  const selWallet = selCat ? expenseWallets.find(w => w.id === selCat.walletId) : null;
  const exceeds = selCat && amtNum > 0 && amtNum > (selWallet?.balance || 0);
  const taxSaving = selWallet ? amtNum * selWallet.taxRate : 0;
  const canSubmit = receipts.length > 0 && amtNum > 0 && cat && !exceeds;

  const handleClose = () => { if ((amount||desc||receipts.length>0)&&!submitted) setShowExitConfirm(true); else onClose(); };
  const handleUpload = () => {
    if (!receipts.length) {
      const mocks = [{amount:"85.00",desc:"NMBS Monthly Pass",cat:"mobility",detectedType:"Public transport",file:"nmbs_receipt.jpg"},{amount:"89.00",desc:"React Advanced — Udemy",cat:"ld",detectedType:"Online course",file:"udemy_invoice.pdf"},{amount:"68.50",desc:"Shell fuel — 42L",cat:"mobility",detectedType:"Fueling costs",file:"shell_receipt.jpg"}];
      const m = mocks[Math.floor(Math.random()*mocks.length)];
      setReceipts([{name:m.file,size:"1.2 MB"}]); setAmount(m.amount); setDesc(m.desc); setCat(m.cat); setAutoDetected(m.detectedType);
    } else { setReceipts([...receipts,{name:`receipt_${receipts.length+1}.jpg`,size:"1.2 MB"}]); }
  };
  const handleSubmit = () => { setSubmitting(true); setTimeout(()=>{setSubmitting(false);setSubmitted(true)},1200); };

  /* ── Success screen ── */
  if (submitted) return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100%",gap:16,textAlign:"center",padding:"40px 0"}}>
      <div style={{width:56,height:56,borderRadius:28,background:"#6D32C7",backgroundImage:"radial-gradient(ellipse at 30% 30%, rgba(238,145,243,0.4) 0%, transparent 60%)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(109,50,199,0.25)"}}><CheckCircle size={28} color="#fff"/></div>
      <div style={{color:C.txt,fontSize:20,fontWeight:700,fontFamily:ff}}>You're all set</div>
      <div style={{color:C.txtM,fontSize:14,fontFamily:ff}}>{fmt(amtNum)} {desc&&<>for <strong style={{color:C.txt}}>{desc}</strong></>}</div>

      {/* What happens next — step bar */}
      <Card pad={16} style={{width:"100%",textAlign:"left"}}>
        <div style={{color:C.txt,fontSize:14,fontWeight:700,fontFamily:ff,marginBottom:14}}>What happens next</div>
        {[
          {label:"Submitted",sub:"Just now",done:true},
          {label:"Admin review",sub:"Usually within 2 days",active:true},
          {label:"On your March payslip",sub:fmt(amtNum),done:false},
        ].map((s,i)=>(
          <div key={i} style={{display:"flex",gap:12,paddingBottom:i<2?16:0,position:"relative"}}>
            {i<2&&<div style={{position:"absolute",left:9,top:22,width:2,height:"calc(100% - 8px)",background:s.done?C.pri:C.bdr,borderRadius:1}}/>}
            <div style={{width:20,height:20,borderRadius:10,background:s.done?C.pri:s.active?"#D4D2E0":C.bgEl,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,zIndex:1}}>
              {s.done&&<CheckCircle size={12} color="#fff" strokeWidth={3}/>}
              {s.active&&<div style={{width:6,height:6,borderRadius:3,background:"#fff"}}/>}
            </div>
            <div style={{flex:1}}>
              <div style={{color:s.done?C.pri:C.txt,fontSize:13,fontWeight:600,fontFamily:ff}}>{s.label}</div>
              <div style={{color:C.txtM,fontSize:11,fontFamily:ff,marginTop:1}}>{s.sub}</div>
            </div>
          </div>
        ))}
      </Card>

      <button onClick={()=>{onComplete();onClose()}} style={{width:"100%",background:C.dark,border:"none",borderRadius:14,padding:"14px",cursor:"pointer",fontFamily:ff,fontSize:14,fontWeight:600,color:"#fff"}}>Done</button>
      <button onClick={()=>{setSubmitted(false);setCat(null);setAmount("");setDesc("");setReceipts([]);setAutoDetected(false);setShowCatPicker(false)}} style={{background:"none",border:"none",color:C.pri,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:ff}}>Submit another</button>
    </div>
  );

  /* ── Form ── */
  return (
    <div style={{display:"flex",flexDirection:"column",gap:12,minHeight:"100%"}}>
      {showExitConfirm&&(<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.4)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:46,padding:20}} onClick={()=>setShowExitConfirm(false)}>
        <Card style={{maxWidth:300}} onClick={e=>e.stopPropagation()}>
          <div style={{color:C.txt,fontSize:17,fontWeight:600,marginBottom:6,fontFamily:ff}}>Discard expense?</div>
          <div style={{color:C.txtM,fontSize:13,marginBottom:16,fontFamily:ff}}>You have unsaved changes.</div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setShowExitConfirm(false)} style={{flex:1,background:C.bgEl,border:"none",borderRadius:14,padding:"11px",cursor:"pointer",fontFamily:ff,fontSize:13,fontWeight:600,color:C.txt}}>Cancel</button>
            <button onClick={onClose} style={{flex:1,background:C.dark,border:"none",borderRadius:14,padding:"11px",cursor:"pointer",fontFamily:ff,fontSize:13,fontWeight:600,color:"#fff"}}>Discard</button>
          </div>
        </Card>
      </div>)}

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"4px 0"}}>
        <span style={{color:C.txt,fontSize:18,fontWeight:700,fontFamily:ff}}>New expense</span>
        <button onClick={handleClose} style={{background:C.bgEl,border:"none",borderRadius:50,width:32,height:32,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}><X size={16} color={C.txtM}/></button>
      </div>

      {/* Receipt upload */}
      {!receipts.length ? (
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          <button onClick={handleUpload} style={{width:"100%",background:C.bgCard,border:`1.5px dashed ${C.bdr}`,borderRadius:14,padding:"28px 16px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8,fontFamily:ff,boxSizing:"border-box"}}>
            <Camera size={24} color={C.pri}/>
            <span style={{color:C.txt,fontSize:14,fontWeight:600}}>Snap or upload receipt</span>
          </button>
          {/* Email forward as tip */}
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"0 4px"}}>
            <span style={{fontSize:13}}>💡</span>
            <span style={{color:C.txtM,fontSize:11,fontFamily:ff}}>You can also forward receipts to <strong style={{color:C.pri,fontWeight:600}}>expenses@payflip.be</strong></span>
          </div>
        </div>
      ) : (<>
        {/* Uploaded files — visual receipt thumbnails */}
        <Card pad={14}>
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {receipts.map((r,i)=>(
              <div key={i} style={{background:C.priBg,borderRadius:12,padding:"10px 12px",display:"flex",alignItems:"center",gap:10}}>
                {/* Receipt thumbnail */}
                <div style={{width:40,height:40,borderRadius:8,background:"#E8E0F8",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer",overflow:"hidden"}}>
                  {r.name.endsWith(".pdf") ?
                    <span style={{color:C.pri,fontSize:10,fontWeight:700,fontFamily:ff}}>PDF</span> :
                    <div style={{width:"100%",height:"100%",background:"linear-gradient(135deg, #D4C5F0 0%, #E8D5FC 40%, #F0E8FF 100%)",display:"flex",alignItems:"center",justifyContent:"center"}}><Camera size={16} color={C.pri} strokeWidth={1.5}/></div>
                  }
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{color:C.txt,fontSize:13,fontWeight:500,fontFamily:ff,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.name}</div>
                  <div style={{color:C.txtD,fontSize:10,fontFamily:ff,marginTop:1}}>Tap to preview</div>
                </div>
                <button onClick={()=>setReceipts(receipts.filter((_,idx)=>idx!==i))} style={{background:"none",border:"none",cursor:"pointer",padding:2}}><X size={14} color={C.txtD}/></button>
              </div>
            ))}
            <button onClick={handleUpload} style={{background:C.bgEl,border:"none",borderRadius:10,padding:"9px 12px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:5,fontFamily:ff}}>
              <Plus size={14} color={C.pri}/><span style={{color:C.pri,fontSize:12,fontWeight:600}}>Add page</span>
            </button>
          </div>
        </Card>

        {/* Category + Budget + Amount — one unified card */}
        <Card pad={16}>
          {/* Category */}
          <div style={{color:C.txtM,fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:10,fontFamily:ff}}>Category</div>
          {autoDetected&&cat&&!showCatPicker ? (
            <div>
              <div style={{background:C.priBg,borderRadius:12,padding:"11px 14px",display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:17}}>{selCat.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{color:C.txt,fontSize:14,fontWeight:600,fontFamily:ff}}>{autoDetected}</div>
                  <div style={{color:C.txtM,fontSize:11,fontFamily:ff,marginTop:1}}>Paid from {selWallet?.name} budget</div>
                </div>
                <Badge color={C.pri}>Auto</Badge>
              </div>
              <button onClick={()=>setShowCatPicker(true)} style={{background:"none",border:"none",cursor:"pointer",padding:"6px 0 0",fontFamily:ff}}><span style={{color:C.txtD,fontSize:11,fontWeight:500}}>Change</span></button>
            </div>
          ) : (
            <div style={{display:"flex",gap:6}}>
              {expenseCats.map(c=>{
                const active=cat===c.id;
                return (<button key={c.id} onClick={()=>{setCat(c.id);if(autoDetected)setShowCatPicker(false)}} style={{flex:1,background:active?c.color+"10":C.bgEl,border:active?`1.5px solid ${c.color}`:"1.5px solid transparent",borderRadius:12,padding:"12px 8px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,fontFamily:ff}}>
                  <span style={{fontSize:17}}>{c.emoji}</span>
                  <span style={{color:active?c.color:C.txt,fontSize:11,fontWeight:600}}>{c.name==="Learning & Development"?"L&D":c.name==="End of Year Premium"?"EYP":c.name}</span>
                </button>);
              })}
            </div>
          )}

          {/* Divider */}
          <div style={{height:1,background:C.bdr,margin:"16px 0"}}/>

          {/* Budget */}
          <div style={{color:C.txtM,fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:8,fontFamily:ff}}>Budget</div>
          {selCat&&selWallet ? (
            <div style={{background:C.priBg,borderRadius:12,padding:"11px 14px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:15}}>💰</span>
                <span style={{color:C.pri,fontSize:13,fontWeight:600,fontFamily:ff}}>{selWallet.name}</span>
              </div>
              <span style={{color:C.txt,fontSize:14,fontWeight:700,fontFamily:ff}}>{fmt(selWallet.balance)} left</span>
            </div>
          ) : (
            <div style={{background:C.bgEl,borderRadius:12,padding:"11px 14px",color:C.txtD,fontSize:12,fontFamily:ff}}>Select a category first</div>
          )}

          {/* Divider */}
          <div style={{height:1,background:C.bdr,margin:"16px 0"}}/>

          {/* Amount */}
          <div style={{color:C.txtM,fontSize:11,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:8,fontFamily:ff}}>Amount</div>
          <div style={{background:C.bgEl,borderRadius:12,padding:"12px 14px",display:"flex",alignItems:"center",gap:4}}>
            <span style={{color:C.txtD,fontSize:18,fontFamily:ff}}>€</span>
            <input type="number" inputMode="decimal" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0.00" style={{background:"none",border:"none",outline:"none",fontSize:22,fontWeight:600,color:exceeds?C.red:C.txt,width:"100%",fontFamily:ff}}/>
          </div>
          {exceeds&&(<div style={{marginTop:6,background:C.redBg,color:C.red,fontSize:11,fontWeight:500,padding:"6px 10px",borderRadius:8,display:"inline-flex",alignItems:"center",gap:4,fontFamily:ff}}><AlertCircle size={12}/>Exceeds budget by {fmt(amtNum-(selWallet?.balance||0))}</div>)}
          {!exceeds&&amtNum>0&&selWallet&&selWallet.budgetType!=="company"&&(
            <button onClick={()=>setShowTaxDetail(!showTaxDetail)} style={{marginTop:6,background:"none",border:"none",cursor:"pointer",padding:0,color:C.pri,fontSize:11,fontWeight:500,display:"inline-flex",alignItems:"center",gap:4,fontFamily:ff}}>
              <TrendingUp size={12}/>Save {fmt(taxSaving)} vs. cash out
              <ChevronDown size={11} style={{transform:showTaxDetail?"rotate(180deg)":"none",transition:"transform .2s"}}/>
            </button>
          )}
          {showTaxDetail&&(<div style={{background:C.priBg,borderRadius:10,padding:10,marginTop:6}}>
            {[{label:"Expense",value:fmt(amtNum)},{label:`Tax saved (~${Math.round((selWallet?.taxRate||0)*100)}%)`,value:fmt(taxSaving),color:C.pri},{label:"Gross equivalent",value:fmt(amtNum/(1-(selWallet?.taxRate||0.01))),dim:true}].map((r,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"2px 0"}}><span style={{color:r.dim?C.txtD:C.txtM,fontSize:11,fontFamily:ff}}>{r.label}</span><span style={{color:r.color||C.txt,fontSize:11,fontWeight:600,fontFamily:ff}}>{r.value}</span></div>
            ))}
          </div>)}
        </Card>

        {/* Status line */}
        {selWallet&&amtNum>0&&!exceeds&&(
          <div style={{display:"flex",alignItems:"center",gap:6,padding:"0 4px"}}><CheckCircle size={13} color={C.pri}/><span style={{color:C.txtM,fontSize:12,fontWeight:500,fontFamily:ff}}>{fmt((selWallet?.balance||0)-amtNum)} left after this</span></div>
        )}
      </>)}

      {/* Submit */}
      <div style={{flex:1,minHeight:12}}/>
      {receipts.length>0&&(
        <button disabled={!canSubmit||submitting} onClick={handleSubmit} style={{width:"100%",background:C.dark,border:"none",borderRadius:14,padding:"14px",cursor:(!canSubmit||submitting)?"not-allowed":"pointer",fontFamily:ff,fontSize:14,fontWeight:600,color:"#fff",opacity:(!canSubmit||submitting)?0.4:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
          {submitting?<><div style={{width:14,height:14,border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .6s linear infinite"}}/>Submitting...</>:canSubmit?`Submit · ${fmt(amtNum)}`:"Submit expense"}
        </button>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   HOME PAGE — card nudge + expense submission
═══════════════════════════════════════════════════════════ */
const HomePage = ({ cardState, onGoToCard, onStartExpense }) => {
  const hasCard = cardState?.hasCard;

  return (
    <div style={{display:"flex",flexDirection:"column",gap:14}}>
      <div style={{paddingBottom:2}}>
        <div style={{color:C.txtM,fontSize:13,fontFamily:ff}}>Good morning</div>
        <div style={{color:C.txt,fontSize:22,fontWeight:700,letterSpacing:"-0.3px",fontFamily:ff}}>Ana 👋</div>
      </div>

      {/* Get reimbursed — full width */}
      <div onClick={onStartExpense} style={{display:"flex",flexDirection:"column",alignItems:"flex-start",gap:8,background:C.bgCard,border:`1px solid ${C.bdr}`,borderRadius:16,padding:"14px 18px",cursor:"pointer"}}>
        <div style={{width:36,height:36,borderRadius:18,background:"#6D32C7",backgroundImage:"radial-gradient(ellipse at 30% 30%, rgba(238,145,243,0.4) 0%, transparent 60%)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 3px 10px rgba(109,50,199,0.2)"}}>
          <Plus size={18} color="#fff" strokeWidth={2.5}/>
        </div>
        <div>
          <div style={{color:C.txt,fontSize:14,fontWeight:700,fontFamily:ff}}>Get reimbursed</div>
          <div style={{color:C.txtM,fontSize:11,fontFamily:ff,marginTop:1}}>Upload a receipt</div>
        </div>
      </div>

      {/* Card nudge — only shown when no card */}
      {!hasCard && (
        <div onClick={onGoToCard} style={{borderRadius:16,overflow:"hidden",border:"none",boxShadow:"0 4px 20px rgba(108,92,231,0.12), 0 1px 4px rgba(0,0,0,0.04)",cursor:"pointer"}}>
          <div style={{background:"linear-gradient(135deg, #F3F1FE 0%, #FCF0F4 100%)",padding:"24px 24px 20px",display:"flex",justifyContent:"center"}}>
            <div style={{width:"55%",transform:"perspective(600px) rotateY(-12deg) rotateX(5deg)",transformOrigin:"center center"}}>
              <CardVisual cardState={{hasCard:true,frozen:false,pinSet:true,physicalIssued:true}} hideStatus style={{borderRadius:10,boxShadow:"12px 8px 24px rgba(34,10,53,0.2)"}}/>
            </div>
          </div>
          <div style={{background:"#fff",padding:"14px 20px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{color:"#0F0D28",fontSize:15,fontWeight:700,fontFamily:ff}}>Payflip Card</div>
              <div style={{color:"#50545E",fontSize:12,fontFamily:ff,marginTop:2}}>Enjoy Payflip's payment solutions</div>
            </div>
            <ChevronRight size={18} color={C.txtD}/>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Shell ─── */
const BottomTabs = ({active,onNav}) => (<div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(255,255,255,0.95)",backdropFilter:"blur(12px)",borderTop:`1px solid ${C.bdr}`,display:"flex",zIndex:100,paddingBottom:8}}>{[{id:"home",icon:Home,label:"Home"},{id:"benefits",icon:Zap,label:"Benefits"},{id:"wallet",icon:Wallet,label:"Wallet"},{id:"profile",icon:User,label:"Profile"}].map(tab=>{const a=active===tab.id;return(<button key={tab.id} onClick={()=>onNav(tab.id)} style={{flex:1,background:"none",border:"none",padding:"10px 0 8px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,fontFamily:ff}}><tab.icon size={20} color={a?C.pri:C.txtD}/><span style={{fontSize:10,fontWeight:a?600:500,color:a?C.pri:C.txtD}}>{tab.label}</span></button>)})}</div>);

const WebToolContent = ({onOpenStore,cardState,setCardState,appLinked,setAppLinked}) => {
  const [page,setPage]=useState("home");
  const D={hasCard:true,frozen:false,pinSet:true,physicalIssued:true,orderedReplacement:false,cardProductionStep:null,appSetup:"ready"};
  const [showReimburse,setShowReimburse]=useState(false);
  const [viewExpense,setViewExpense]=useState(null);
  const [showCard,setShowCard]=useState(false);
  const scrollRef=useRef(null);
  useEffect(()=>{scrollRef.current?.scrollTo(0,0)},[page,showReimburse,viewExpense,showCard]);

  const scenarios=[
    {id:"noApp",label:"No app",state:{...D,hasCard:false,appSetup:"noApp"},app:true},
    {id:"settingUp",label:"Setting up",state:{...D,hasCard:false,appSetup:"settingUp"},app:true},
    {id:"virtual",label:"Virtual",state:{...D,pinSet:false,physicalIssued:false},app:true},
    {id:"ordering",label:"Ordering",state:{...D,pinSet:false,physicalIssued:false,orderedReplacement:true,cardProductionStep:"production"},app:true},
    {id:"shipped",label:"Shipped",state:{...D,physicalIssued:false,orderedReplacement:true,cardProductionStep:"shipped"},app:true},
    {id:"active",label:"Active",state:{...D},app:true},
    {id:"frozen",label:"Frozen",state:{...D,frozen:true},app:true},
    {id:"webOnly",label:"Web only",state:{...D},app:false},
  ];

  const goToCard = () => { setPage("wallet"); setShowCard(true); };
  const isOverlay = showReimburse || viewExpense || showCard;

  const renderContent = () => {
    if (showReimburse) return <ReimbursementFlow onClose={()=>setShowReimburse(false)} onComplete={()=>{}}/>;
    if (viewExpense) return <ExpenseDetail expense={viewExpense} onClose={()=>setViewExpense(null)}/>;
    if (showCard) return <CardPage cardState={cardState} setCardState={setCardState} appLinked={appLinked} onBack={()=>setShowCard(false)} onOpenStore={onOpenStore}/>;
    if (page==="home") return <HomePage cardState={cardState} onGoToCard={goToCard} onStartExpense={()=>setShowReimburse(true)}/>;
    if (page==="benefits") return <BenefitsPage/>;
    if (page==="wallet") return <WalletPage cardState={cardState} onGoToCard={()=>setShowCard(true)}/>;
    if (page==="profile") return <ProfilePage/>;
    return null;
  };

  return (<>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 24px 0",fontFamily:ff,flexShrink:0}}><span style={{fontSize:15,fontWeight:600,color:C.txt,letterSpacing:"-0.3px"}}>9:41</span><div style={{display:"flex",gap:6,alignItems:"center"}}><Wifi size={14} color={C.txt}/><div style={{width:25,height:11,borderRadius:3,border:`1.5px solid ${C.txt}`,display:"flex",alignItems:"center",padding:1.5}}><div style={{width:"75%",height:"100%",background:C.txt,borderRadius:1.5}}/></div></div></div>
    <div style={{margin:"6px 16px 0",display:"flex",alignItems:"center",gap:6,background:C.bgEl,borderRadius:10,padding:"7px 10px",flexShrink:0}}>
      <Lock size={10} color={C.txtD}/>
      <span style={{color:C.txtM,fontSize:11,fontFamily:ff,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>app.payflip.be</span>
      <Globe size={12} color={C.txtD}/>
    </div>
    <div ref={scrollRef} style={{flex:1,overflow:"auto",padding:"12px 20px 80px"}}>{renderContent()}</div>
    {!isOverlay&&<BottomTabs active={page} onNav={p=>{setShowReimburse(false);setViewExpense(null);setShowCard(false);setPage(p)}}/>}
  </>);
};

/* ═══════════════════════════════════════════════════════════
   APP STORE PAGE — bridge between web and app
═══════════════════════════════════════════════════════════ */
const AppStorePage = ({onOpenApp,onBackToWeb}) => {
  const [downloaded,setDownloaded]=useState(false);
  const [downloading,setDownloading]=useState(false);

  const handleDownload = () => { setDownloading(true); setTimeout(()=>{setDownloading(false);setDownloaded(true)},1500); };

  return (<>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 24px 0",fontFamily:ff,flexShrink:0}}><span style={{fontSize:15,fontWeight:600,color:C.txt,letterSpacing:"-0.3px"}}>9:41</span><div style={{display:"flex",gap:6,alignItems:"center"}}><Wifi size={14} color={C.txt}/><div style={{width:25,height:11,borderRadius:3,border:`1.5px solid ${C.txt}`,display:"flex",alignItems:"center",padding:1.5}}><div style={{width:"75%",height:"100%",background:C.txt,borderRadius:1.5}}/></div></div></div>
    {/* Store header */}
    <div style={{padding:"8px 20px 0",flexShrink:0}}>
      <button onClick={onBackToWeb} style={{background:"none",border:"none",cursor:"pointer",padding:"4px 0",display:"flex",alignItems:"center",gap:4,fontFamily:ff}}>
        <ChevronLeft size={18} color="#007AFF"/>
        <span style={{color:"#007AFF",fontSize:14,fontWeight:500}}>Safari</span>
      </button>
    </div>
    <div style={{flex:1,overflow:"auto",padding:"12px 20px 40px"}}>
      {/* App listing */}
      <div style={{display:"flex",gap:14,alignItems:"center",marginBottom:20}}>
        <div style={{width:64,height:64,borderRadius:16,overflow:"hidden",flexShrink:0}}>
          <PayflipLogo size={64}/>
        </div>
        <div style={{flex:1}}>
          <div style={{color:C.txt,fontSize:17,fontWeight:700,fontFamily:ff}}>Payflip</div>
          <div style={{color:C.txtM,fontSize:12,fontFamily:ff}}>Your employee benefits</div>
          <div style={{display:"flex",alignItems:"center",gap:4,marginTop:4}}>
            {"★★★★★".split("").map((s,i)=><span key={i} style={{color:"#FF9500",fontSize:11}}>{s}</span>)}
            <span style={{color:C.txtD,fontSize:10,fontFamily:ff,marginLeft:2}}>4.8 · 2.3K</span>
          </div>
        </div>
        {!downloaded ? (
          <button onClick={handleDownload} disabled={downloading} style={{background:"#007AFF",border:"none",borderRadius:50,padding:"8px 22px",cursor:downloading?"default":"pointer",fontFamily:ff,fontSize:14,fontWeight:700,color:"#fff",flexShrink:0,minWidth:72,display:"flex",alignItems:"center",justifyContent:"center"}}>
            {downloading ? <div style={{width:14,height:14,border:"2px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin .6s linear infinite"}}/> : "GET"}
          </button>
        ) : (
          <button onClick={onOpenApp} style={{background:"#007AFF",border:"none",borderRadius:50,padding:"8px 20px",cursor:"pointer",fontFamily:ff,fontSize:14,fontWeight:700,color:"#fff",flexShrink:0}}>OPEN</button>
        )}
      </div>

      {/* Screenshots */}
      <div style={{display:"flex",gap:10,overflowX:"auto",margin:"0 -20px",padding:"0 20px 16px"}}>
        {["Card management","Apple Pay","Transactions"].map((s,i)=>(
          <div key={i} style={{width:140,height:250,borderRadius:16,background:`linear-gradient(160deg, ${i===0?"#481570":"#220A35"} 0%, ${i===0?"#220A35":"#481570"} 100%)`,flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,padding:16}}>
            <CreditCard size={28} color="rgba(255,255,255,0.4)"/>
            <span style={{color:"rgba(255,255,255,0.6)",fontSize:11,fontWeight:600,fontFamily:ff,textAlign:"center"}}>{s}</span>
          </div>
        ))}
      </div>

      {/* Description */}
      <div style={{marginBottom:16}}>
        <div style={{color:C.txt,fontSize:15,fontWeight:700,fontFamily:ff,marginBottom:8}}>About</div>
        <div style={{color:C.txtM,fontSize:13,fontFamily:ff,lineHeight:1.6}}>
          Manage your Payflip card, approve online payments with biometrics, add to Apple Pay, and track your meal voucher & mobility spending — all in one app.
        </div>
      </div>

      {/* Info grid */}
      <div style={{display:"flex",gap:1,background:C.bdr,borderRadius:12,overflow:"hidden"}}>
        {[{label:"Size",value:"24 MB"},{label:"Age",value:"4+"},{label:"Category",value:"Finance"}].map(i=>(
          <div key={i.label} style={{flex:1,background:C.bgCard,padding:"12px 8px",textAlign:"center"}}>
            <div style={{color:C.txtD,fontSize:9,fontWeight:600,fontFamily:ff,textTransform:"uppercase",letterSpacing:"0.5px"}}>{i.label}</div>
            <div style={{color:C.txt,fontSize:13,fontWeight:600,fontFamily:ff,marginTop:4}}>{i.value}</div>
          </div>
        ))}
      </div>
    </div>
  </>);
};

/* ═══════════════════════════════════════════════════════════
   MOBILE APP — simplified but faithful key screens
═══════════════════════════════════════════════════════════ */
const MobileStatusBar = () => (
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 24px 0",fontFamily:ff,flexShrink:0}}>
    <span style={{fontSize:15,fontWeight:600,color:C.txt,letterSpacing:"-0.3px"}}>9:41</span>
    <div style={{display:"flex",gap:6,alignItems:"center"}}><Wifi size={14} color={C.txt}/><div style={{width:25,height:11,borderRadius:3,border:`1.5px solid ${C.txt}`,display:"flex",alignItems:"center",padding:1.5}}><div style={{width:"75%",height:"100%",background:C.txt,borderRadius:1.5}}/></div></div>
  </div>
);

const MobileLoginScreen = ({onLogin}) => {
  const [loading,setLoading]=useState(false);
  const handleLogin = () => { setLoading(true); setTimeout(()=>{setLoading(false);onLogin()},1200); };
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:"#FAFAFE",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-80,right:-60,width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle, rgba(108,92,231,0.18) 0%, transparent 70%)",filter:"blur(50px)"}}/>
      <div style={{position:"absolute",bottom:-40,left:-80,width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle, rgba(255,33,117,0.12) 0%, transparent 70%)",filter:"blur(60px)"}}/>
      <MobileStatusBar/>
      <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"0 28px",position:"relative",zIndex:1}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:16}}><PayflipLogo size={56}/></div>
          <h1 style={{color:C.txt,fontSize:24,fontWeight:700,fontFamily:ff,margin:0,letterSpacing:"-0.3px"}}>Welcome to Payflip</h1>
          <p style={{color:C.txtM,fontSize:14,fontFamily:ff,margin:"8px 0 0"}}>Sign in with your existing account</p>
        </div>
        <div style={{display:"flex",gap:10,marginBottom:20}}>
          <button onClick={handleLogin} style={{flex:1,background:"#fff",border:`1px solid ${C.bdr}`,borderRadius:14,padding:"14px",cursor:"pointer",fontFamily:ff,fontSize:13,fontWeight:600,color:C.txt,display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google
          </button>
          <button onClick={handleLogin} style={{flex:1,background:"#fff",border:`1px solid ${C.bdr}`,borderRadius:14,padding:"14px",cursor:"pointer",fontFamily:ff,fontSize:13,fontWeight:600,color:C.txt,display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
            <svg width="18" height="18" viewBox="0 0 23 23"><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>
            Microsoft
          </button>
        </div>
        <button onClick={handleLogin} disabled={loading} style={{width:"100%",background:loading?C.bgEl:C.dark,border:"none",borderRadius:14,padding:"16px",cursor:loading?"default":"pointer",fontFamily:ff,fontSize:16,fontWeight:600,color:loading?C.txtM:"#fff",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:loading?"none":`0 4px 14px ${C.dark}25`}}>
          {loading?<><div style={{width:16,height:16,border:`2px solid ${C.bdr}`,borderTopColor:C.pri,borderRadius:"50%",animation:"spin .6s linear infinite"}}/>Signing in...</>:"Sign in with email"}
        </button>
      </div>
    </div>
  );
};

const FaceIdIcon = ({size=44,color="#4A3BA8"}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 3H5a2 2 0 0 0-2 2v2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M17 21h2a2 2 0 0 0 2-2v-2"/>
    <circle cx="9" cy="9" r="0.5" fill={color}/><circle cx="15" cy="9" r="0.5" fill={color}/>
    <path d="M12 13a2 2 0 0 1-2 2"/><path d="M8 16s1.5 2 4 2 4-2 4-2"/>
  </svg>
);

const MobileBiometricSetup = ({onComplete}) => (
  <div style={{display:"flex",flexDirection:"column",height:"100%",background:"#FAFAFE",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:-60,right:-40,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle, rgba(108,92,231,0.12) 0%, transparent 70%)",filter:"blur(45px)"}}/>
    <MobileStatusBar/>
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 28px",gap:16,position:"relative",zIndex:1}}>
      <div style={{width:88,height:88,borderRadius:44,background:"#E4DEFA",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <FaceIdIcon size={44} color="#4A3BA8"/>
      </div>
      <h2 style={{color:C.txt,fontSize:22,fontWeight:700,fontFamily:ff,margin:0,textAlign:"center",letterSpacing:"-0.3px"}}>Enable Face ID</h2>
      <p style={{color:C.txtM,fontSize:15,fontFamily:ff,textAlign:"center",lineHeight:1.6,margin:0,maxWidth:280}}>
        Required to approve online payments and securely access your card details.
      </p>
      <div style={{display:"flex",flexDirection:"column",gap:12,marginTop:16,width:"100%"}}>
        {[{icon:Shield,label:"Approve online payments (3DS)"},{icon:Eye,label:"View card credentials securely"},{icon:Lock,label:"Protect your account from misuse"}].map((f,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10}}>
            <f.icon size={16} color="#4A3BA8" style={{flexShrink:0}}/>
            <span style={{color:C.txtM,fontSize:14,fontFamily:ff}}>{f.label}</span>
          </div>
        ))}
      </div>
    </div>
    <div style={{padding:"0 24px 40px",position:"relative",zIndex:1}}>
      <button onClick={onComplete} style={{width:"100%",background:C.dark,border:"none",borderRadius:14,padding:"16px",cursor:"pointer",fontFamily:ff,fontSize:16,fontWeight:600,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",gap:8,boxShadow:`0 4px 14px ${C.dark}25`}}>
        Enable Face ID
      </button>
    </div>
  </div>
);

const MobileApplePaySetup = ({onComplete,onSkip}) => (
  <div style={{display:"flex",flexDirection:"column",height:"100%",background:"#FAFAFE",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:-60,right:-40,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle, rgba(108,92,231,0.1) 0%, transparent 70%)",filter:"blur(45px)"}}/>
    <MobileStatusBar/>
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 28px",gap:16,position:"relative",zIndex:1}}>
      <div style={{width:88,height:88,borderRadius:44,background:"#E4DEFA",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Smartphone size={44} color="#4A3BA8"/>
      </div>
      <h2 style={{color:C.txt,fontSize:22,fontWeight:700,fontFamily:ff,margin:0,textAlign:"center",letterSpacing:"-0.3px"}}>Add to Apple Wallet</h2>
      <p style={{color:C.txtM,fontSize:15,fontFamily:ff,textAlign:"center",lineHeight:1.6,margin:0,maxWidth:280}}>
        Your virtual card is ready. Add it to your wallet to start paying contactless immediately.
      </p>
      <div style={{display:"flex",flexDirection:"column",gap:12,marginTop:16,width:"100%"}}>
        {[{icon:Wifi,label:"Contactless payments with no limit"},{icon:Shield,label:"Secured by Face ID or fingerprint"},{icon:CreditCard,label:"Works before your physical card arrives"}].map((f,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10}}>
            <f.icon size={16} color="#4A3BA8" style={{flexShrink:0}}/>
            <span style={{color:C.txtM,fontSize:14,fontFamily:ff}}>{f.label}</span>
          </div>
        ))}
      </div>
    </div>
    <div style={{padding:"0 24px 40px",position:"relative",zIndex:1,display:"flex",flexDirection:"column",gap:10}}>
      <button onClick={onComplete} style={{width:"100%",background:"#000",border:"1px solid #555",borderRadius:14,padding:"14px 20px",cursor:"pointer",fontFamily:ff,display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"none"}}>
        {/* Apple Wallet icon */}
        <svg width="28" height="22" viewBox="0 0 35 27" fill="none">
          <rect x="3" y="0" width="29" height="22" rx="4" fill="#ddd"/>
          <rect x="3" y="0" width="29" height="5.5" rx="2" fill="#3BA5F7"/>
          <rect x="3" y="4.5" width="29" height="5.5" rx="0" fill="#F5D849"/>
          <rect x="3" y="9" width="29" height="5.5" rx="0" fill="#5BC759"/>
          <rect x="3" y="13.5" width="29" height="8.5" rx="4" fill="#F76B6B"/>
          <path d="M3 17.5 C3 17.5 17.5 13 32 17.5 L32 18 C32 20.2 30.2 22 28 22 L7 22 C4.8 22 3 20.2 3 18Z" fill="#F76B6B"/>
        </svg>
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-start",lineHeight:1.1}}>
          <span style={{color:"#fff",fontSize:11,fontWeight:400}}>Add to</span>
          <span style={{color:"#fff",fontSize:17,fontWeight:600,letterSpacing:"-0.2px"}}>Apple Wallet</span>
        </div>
      </button>
      <button onClick={onSkip} style={{width:"100%",background:"none",border:"none",padding:"12px",cursor:"pointer",fontFamily:ff,fontSize:14,fontWeight:500,color:C.txtM}}>
        I'll do this later
      </button>
    </div>
  </div>
);

const MobileCelebration = ({onContinue}) => {
  const [confettiDone,setConfettiDone]=useState(false);
  useEffect(()=>{setTimeout(()=>setConfettiDone(true),2000)},[]);
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",background:"#FAFAFE",position:"relative",overflow:"hidden"}}>
      {/* Confetti particles */}
      {!confettiDone&&<div style={{position:"absolute",inset:0,zIndex:10,pointerEvents:"none",overflow:"hidden"}}>
        {Array.from({length:24}).map((_,i)=>{
          const colors=["#6C5CE7","#FF2175","#00A99D","#E8890C","#FDCB6E","#A29BFE"];
          const c=colors[i%colors.length];
          const l=10+Math.random()*80;
          const d=Math.random()*1.5;
          const dur=1.5+Math.random()*1.5;
          const sz=4+Math.random()*6;
          const rot=Math.random()*360;
          return <div key={i} style={{position:"absolute",left:`${l}%`,top:-10,width:sz,height:sz*1.5,borderRadius:sz>7?2:1,background:c,opacity:0.9,transform:`rotate(${rot}deg)`,animation:`confettiFall ${dur}s ease-in ${d}s forwards`}}/>;
        })}
      </div>}
      <MobileStatusBar/>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 28px",gap:14,position:"relative",zIndex:1}}>
        <div style={{width:88,height:88,borderRadius:44,background:"#6D32C7",backgroundImage:"radial-gradient(ellipse at 30% 30%, rgba(238,145,243,0.4) 0%, transparent 60%)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 6px 20px rgba(109,50,199,0.3)",animation:"celebPulse 1.5s ease-in-out"}}>
          <CheckCircle size={44} color="#fff"/>
        </div>
        <h2 style={{color:C.txt,fontSize:24,fontWeight:700,fontFamily:ff,margin:0,textAlign:"center",letterSpacing:"-0.3px"}}>You're all set!</h2>
        <p style={{color:C.txtM,fontSize:14,fontFamily:ff,textAlign:"center",lineHeight:1.6,margin:0,maxWidth:280}}>
          Your Payflip card is ready for spending. Pay for meals and mobility anywhere.
        </p>

        {/* What this app does */}
        <div style={{width:"100%",marginTop:4}}>
          <div style={{color:C.txt,fontSize:13,fontWeight:700,fontFamily:ff,marginBottom:8}}>In this app you can</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {["View & copy your card details","Freeze or unfreeze your card","Approve online payments (3DS)","Add to Apple Pay or Google Pay"].map(f=>(
              <div key={f} style={{display:"flex",alignItems:"center",gap:8}}>
                <CheckCircle size={14} color={C.pri} strokeWidth={2}/>
                <span style={{color:C.txt,fontSize:12,fontWeight:500,fontFamily:ff}}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{padding:"0 24px 28px",position:"relative",zIndex:1,display:"flex",flexDirection:"column",gap:8}}>
        <button onClick={onContinue} style={{width:"100%",background:C.dark,border:"none",borderRadius:14,padding:"15px",cursor:"pointer",fontFamily:ff,fontSize:15,fontWeight:600,color:"#fff",boxShadow:`0 4px 14px ${C.dark}25`}}>
          View virtual card
        </button>
        <div style={{color:C.txtD,fontSize:11,fontFamily:ff,textAlign:"center",lineHeight:1.5,marginTop:2}}>
          Benefits, expenses & budgets live on the web tool
        </div>
      </div>
    </div>
  );
};

/* iOS Apple Wallet provisioning sheet */
const AppleWalletSheet = ({onDone,onCancel}) => {
  const [step,setStep]=useState("terms"); // terms → adding → done
  useEffect(()=>{if(step==="adding") setTimeout(()=>setStep("done"),2000)},[step]);

  return (
    <div style={{position:"absolute",inset:0,zIndex:300,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(6px)",display:"flex",flexDirection:"column",justifyContent:"flex-end",borderRadius:46,overflow:"hidden"}}>
      <div style={{background:"#F2F2F7",borderRadius:"24px 24px 0 0",height:"75%",display:"flex",flexDirection:"column",animation:"slideUp .3s cubic-bezier(.16,1,.3,1)"}}>
        {/* iOS sheet header */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px 12px",borderBottom:"1px solid #D1D1D6",flexShrink:0}}>
          <button onClick={onCancel} style={{background:"none",border:"none",cursor:"pointer",fontFamily:ff,fontSize:14,fontWeight:400,color:"#007AFF"}}>Cancel</button>
          <span style={{color:"#000",fontSize:15,fontWeight:600,fontFamily:ff}}>Add to Apple Wallet</span>
          <div style={{width:50}}/>
        </div>

        {step==="terms"&&(
          <div style={{flex:1,overflow:"auto",padding:"20px 20px 24px",display:"flex",flexDirection:"column"}}>
            {/* Card preview */}
            <div style={{background:"#fff",borderRadius:16,padding:16,marginBottom:16,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                <div style={{width:44,height:28,borderRadius:6,background:"#180B2D",overflow:"hidden",position:"relative",flexShrink:0}}>
                  <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 15% 85%, rgba(61,133,233,0.25) 0%, transparent 60%)"}}/>
                  <svg viewBox="0 0 131 80" fill="none" style={{position:"absolute",right:"5%",bottom:"8%",width:"22%",opacity:0.45}}><circle cx="40" cy="40" r="40" fill="rgba(255,255,255,0.6)"/><circle cx="91" cy="40" r="40" fill="rgba(255,255,255,0.6)"/></svg>
                </div>
                <div>
                  <div style={{color:"#000",fontSize:14,fontWeight:600,fontFamily:ff}}>Payflip Mastercard</div>
                  <div style={{color:"#8E8E93",fontSize:12,fontFamily:ff}}>Debit · ••••4829</div>
                </div>
              </div>
              <div style={{height:1,background:"#E5E5EA",marginBottom:12}}/>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <span style={{color:"#8E8E93",fontSize:12,fontFamily:ff}}>Issuer</span>
                <span style={{color:"#000",fontSize:12,fontWeight:500,fontFamily:ff}}>Enfuce Financial Services</span>
              </div>
            </div>
            {/* Terms */}
            <div style={{background:"#fff",borderRadius:16,padding:16,marginBottom:16,boxShadow:"0 1px 3px rgba(0,0,0,0.08)"}}>
              <div style={{color:"#000",fontSize:13,fontWeight:600,fontFamily:ff,marginBottom:8}}>Terms and Conditions</div>
              <div style={{color:"#8E8E93",fontSize:11,fontFamily:ff,lineHeight:1.6,maxHeight:100,overflow:"auto"}}>
                By adding this card to Apple Wallet, you agree to the Enfuce Financial Services Cardholder Agreement and Apple Pay Terms and Conditions. Your card information will be securely stored on this device. Transactions made with Apple Pay are protected by Face ID or your device passcode.
              </div>
            </div>
            <div style={{flex:1}}/>
            <button onClick={()=>setStep("adding")} style={{width:"100%",background:"#007AFF",border:"none",borderRadius:14,padding:"15px",cursor:"pointer",fontFamily:ff,fontSize:16,fontWeight:600,color:"#fff"}}>
              Agree & Add Card
            </button>
          </div>
        )}

        {step==="adding"&&(
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,padding:"0 28px"}}>
            <div style={{width:56,height:56,borderRadius:28,background:"#E5E5EA",display:"flex",alignItems:"center",justifyContent:"center",animation:"pulse 1.2s ease-in-out infinite"}}>
              <svg width="28" height="22" viewBox="0 0 35 27" fill="none"><rect x="3" y="0" width="29" height="22" rx="4" fill="#ddd"/><rect x="3" y="0" width="29" height="5.5" rx="2" fill="#3BA5F7"/><rect x="3" y="4.5" width="29" height="5.5" fill="#F5D849"/><rect x="3" y="9" width="29" height="5.5" fill="#5BC759"/><rect x="3" y="13.5" width="29" height="8.5" rx="4" fill="#F76B6B"/></svg>
            </div>
            <div style={{color:"#000",fontSize:17,fontWeight:600,fontFamily:ff}}>Adding Card…</div>
            <div style={{color:"#8E8E93",fontSize:13,fontFamily:ff,textAlign:"center"}}>Contacting your card issuer</div>
          </div>
        )}

        {step==="done"&&(
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,padding:"0 28px"}}>
            <div style={{width:64,height:64,borderRadius:32,background:"#34C759",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <CheckCircle size={32} color="#fff"/>
            </div>
            <div style={{color:"#000",fontSize:20,fontWeight:700,fontFamily:ff}}>Card Added</div>
            <div style={{color:"#8E8E93",fontSize:14,fontFamily:ff,textAlign:"center",lineHeight:1.5}}>Your Payflip Mastercard is now available in Apple Wallet. You can use it for contactless payments.</div>
            <button onClick={onDone} style={{width:"100%",background:"#007AFF",border:"none",borderRadius:14,padding:"15px",cursor:"pointer",fontFamily:ff,fontSize:16,fontWeight:600,color:"#fff",marginTop:8}}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* Mobile PIN choose flow — reuses shared PinChooseStep and AddressStep */
const MobilePhysicalCardFlow = ({onComplete,onCancel}) => {
  const [step,setStep]=useState("pin");
  const [address,setAddress]=useState({street:"Rue de la Loi 42",city:"Brussels",zip:"1000"});
  if(step==="pin") return <PinChooseStep onNext={()=>setStep("address")} onBack={onCancel} onClose={onCancel} mode="sheet"/>;
  return <AddressStep address={address} setAddress={setAddress} onConfirm={onComplete} onBack={()=>setStep("pin")} title="Delivery address" subtitle="Confirm where to ship your physical card." mode="sheet"/>;
};

const MobileCardScreen = ({onBackToWeb,cardState,setCardState}) => {
  const [dialog,setDialog]=useState(null); // "credentials" | "pin" | "report" | null
  const [showWalletSheet,setShowWalletSheet]=useState(false);
  const [showPhysicalFlow,setShowPhysicalFlow]=useState(false);
  const {frozen,physicalIssued,pinSet,orderedReplacement,cardProductionStep} = cardState;
  const walletAdded = cardState.walletAdded||false;
  const isVirtualOnly = !physicalIssued && !orderedReplacement;
  const stepIdx = stepsData.findIndex(s=>s.id===cardProductionStep);
  const [historyOpen,setHistoryOpen]=useState(false);

  const handleFreeze = () => setCardState(s=>({...s,frozen:!s.frozen}));

  return (<>
    <MobileStatusBar/>
    <div style={{flex:1,overflow:"auto",padding:"0 20px 40px"}}>
      <div style={{padding:"16px 0 12px"}}>
        <h1 style={{color:C.txt,fontSize:24,fontWeight:700,fontFamily:ff,margin:0,letterSpacing:"-0.3px"}}>Card</h1>
      </div>
      {/* Card visual */}
      <div style={{marginBottom:16}}><CardVisual cardState={cardState}/></div>
      {/* Quick actions */}
      <div style={{display:"flex",gap:16,justifyContent:"center",marginBottom:frozen?12:16}}>
        {[
          {icon:Eye,label:"Details",disabled:frozen,onClick:()=>!frozen&&setDialog("credentials")},
          {icon:Key,label:"View PIN",disabled:frozen,onClick:()=>!frozen&&setDialog("pin")},
          {icon:frozen?Lock:Snowflake,label:frozen?"Unfreeze":"Freeze",onClick:handleFreeze,danger:frozen}
        ].map((a,i)=>(
          <button key={i} onClick={a.onClick} style={{background:"none",border:"none",padding:0,cursor:a.disabled&&!a.danger?"default":"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,fontFamily:ff,opacity:a.disabled&&!a.danger?0.4:1}}>
            <div style={{width:48,height:48,borderRadius:24,background:a.danger?"#F9D2D4":"#E8D5FC",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <a.icon size={19} color={a.danger?C.red:"#2D0B4E"}/>
            </div>
            <span style={{color:a.danger?C.red:C.txt,fontSize:11,fontWeight:600}}>{a.label}</span>
          </button>
        ))}
      </div>
      {/* Report lost/stolen — shown when frozen */}
      {frozen&&(
        <div onClick={()=>setDialog("report")} style={{width:"100%",background:C.redBg,border:`1px solid ${C.red}20`,borderRadius:12,padding:"12px 16px",cursor:"pointer",fontFamily:ff,display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <AlertCircle size={16} color={C.red} style={{flexShrink:0}}/>
          <div style={{flex:1,textAlign:"left"}}>
            <div style={{color:C.txt,fontSize:13,fontWeight:600}}>Card lost or stolen?</div>
            <div style={{color:C.txtM,fontSize:11,marginTop:1}}>Cancel credentials and get a replacement</div>
          </div>
          <ChevronRight size={16} color={C.txtD}/>
        </div>
      )}
      {/* Physical card delivery tracker */}
      {orderedReplacement && cardProductionStep && cardProductionStep !== "delivered" && (
        <Card pad={16} style={{marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <Package size={16} color={C.pri}/>
              <span style={{color:C.txt,fontSize:14,fontWeight:600,fontFamily:ff}}>{stepsData[stepIdx]?.label}</span>
            </div>
            
          </div>
          <div style={{display:"flex",gap:3,marginBottom:12}}>
            {stepsData.map((_,i)=>(<div key={i} style={{flex:1,height:4,borderRadius:2,background:i<=stepIdx?C.pri:C.bgEl,transition:"background .3s"}}/>))}
          </div>
          <div style={{color:C.txtM,fontSize:12,fontFamily:ff,lineHeight:1.5}}>{stepsData[stepIdx]?.est}</div>
          {stepIdx > 0 && (
            <button onClick={()=>setHistoryOpen(!historyOpen)} style={{background:"none",border:"none",padding:"8px 0 0",cursor:"pointer",fontFamily:ff,fontSize:11,fontWeight:600,color:C.txtD,display:"flex",alignItems:"center",gap:4}}>
              {historyOpen?<ChevronUp size={13}/>:<ChevronDown size={13}/>}
              {historyOpen?"Hide":"Show"} history
            </button>
          )}
          {historyOpen && (
            <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:6}}>
              {stepsData.slice(0,stepIdx+1).map((s,i)=>(
                <div key={s.id} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 0"}}>
                  <CheckCircle size={12} color={i<stepIdx?C.grn:C.pri}/>
                  <span style={{color:i<stepIdx?C.txtD:C.txt,fontSize:12,fontFamily:ff,fontWeight:i===stepIdx?600:400}}>{s.label}</span>
                  {i<stepIdx&&<span style={{color:C.txtD,fontSize:10,fontFamily:ff,marginLeft:"auto"}}>Done</span>}
                  {i===stepIdx&&<span style={{color:C.pri,fontSize:10,fontFamily:ff,fontWeight:600,marginLeft:"auto"}}>Current</span>}
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
      {/* Apple Wallet CTA */}
      {!frozen&&!walletAdded&&<Card pad={14} onClick={()=>setShowWalletSheet(true)} style={{marginBottom:12,cursor:"pointer"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:38,height:38,borderRadius:10,background:"#000",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <svg width="20" height="16" viewBox="0 0 35 27" fill="none"><rect x="3" y="0" width="29" height="22" rx="4" fill="#ddd"/><rect x="3" y="0" width="29" height="5.5" rx="2" fill="#3BA5F7"/><rect x="3" y="4.5" width="29" height="5.5" fill="#F5D849"/><rect x="3" y="9" width="29" height="5.5" fill="#5BC759"/><rect x="3" y="13.5" width="29" height="8.5" rx="4" fill="#F76B6B"/></svg>
          </div>
          <div style={{flex:1}}>
            <div style={{color:C.txt,fontSize:13,fontWeight:600,fontFamily:ff}}>Add to Apple Wallet</div>
            <div style={{color:C.txtM,fontSize:11,fontFamily:ff,marginTop:1}}>Pay contactless with no limit</div>
          </div>
          <ChevronRight size={16} color={C.txtD}/>
        </div>
      </Card>}
      {/* Get physical card — hidden once ordered */}
      {!frozen&&isVirtualOnly&&<Card pad={14} onClick={()=>setShowPhysicalFlow(true)} style={{marginBottom:12,cursor:"pointer"}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:38,height:38,borderRadius:10,background:C.bgEl,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <CreditCard size={17} color={C.txtM}/>
          </div>
          <div style={{flex:1}}>
            <div style={{color:C.txt,fontSize:13,fontWeight:600,fontFamily:ff}}>Get a physical card</div>
            <div style={{color:C.txtM,fontSize:11,fontFamily:ff,marginTop:1}}>Pay in-store & at terminals · ships in 3–5 days</div>
          </div>
          <ChevronRight size={16} color={C.txtD}/>
        </div>
      </Card>}
      {/* Budget categories */}
      <SectionLabel>Works with this card</SectionLabel>
      {[{emoji:"🍴",name:"Meal Vouchers",note:"Works anywhere food is sold"},{emoji:"🚆",name:"Mobility",note:"Everyday transport"}].map(b=>(
        <Card key={b.name} pad={0} style={{marginBottom:8}}>
          <div style={{display:"flex",alignItems:"center",padding:"14px 16px",gap:12}}>
            <span style={{fontSize:18}}>{b.emoji}</span>
            <div style={{flex:1}}><div style={{color:C.txt,fontSize:14,fontWeight:600,fontFamily:ff}}>{b.name}</div><div style={{color:C.txtD,fontSize:11,fontFamily:ff,marginTop:2}}>{b.note}</div></div>
            <ChevronRight size={16} color={C.txtD}/>
          </div>
        </Card>
      ))}
      {/* Back to web */}
      <div style={{marginTop:24,paddingTop:16,borderTop:`1px solid ${C.bdr}`,textAlign:"center"}}>
        <div style={{color:C.txtD,fontSize:10,fontFamily:ff,marginBottom:6}}>Opened from</div>
        <button onClick={onBackToWeb} style={{background:C.bgEl,border:"none",cursor:"pointer",fontFamily:ff,fontSize:12,fontWeight:600,color:C.txtM,display:"inline-flex",alignItems:"center",gap:5,padding:"8px 14px",borderRadius:50}}>
          <Globe size={12}/>app.payflip.be
        </button>
      </div>
    </div>
    {/* Overlays — iOS bottom sheets */}
    {dialog==="credentials"&&<CredentialDialog onClose={()=>setDialog(null)} mode="sheet"/>}
    {dialog==="pin"&&<PinDialog onClose={()=>setDialog(null)} mode="sheet"/>}
    {dialog==="report"&&<ReportDialog cardState={cardState} setCardState={setCardState} onClose={()=>setDialog(null)} mode="sheet"/>}
    {showWalletSheet&&<AppleWalletSheet onDone={()=>{setShowWalletSheet(false);setCardState(s=>({...s,walletAdded:true}))}} onCancel={()=>setShowWalletSheet(false)}/>}
    {showPhysicalFlow&&<MobilePhysicalCardFlow onComplete={()=>{setShowPhysicalFlow(false);setCardState(s=>({...s,pinSet:true,orderedReplacement:true,cardProductionStep:"ordered"}))}} onCancel={()=>setShowPhysicalFlow(false)}/>}
  </>);
};

const MobileAppContent = ({onBackToWeb,onCardSetupComplete,cardState,setCardState}) => {
  const [screen,setScreen]=useState("login");
  const handleCelebrationContinue = () => { if(onCardSetupComplete) onCardSetupComplete(); setScreen("card"); };
  if(screen==="login") return <MobileLoginScreen onLogin={()=>setScreen("biometrics")}/>;
  if(screen==="biometrics") return <MobileBiometricSetup onComplete={()=>setScreen("applePay")}/>;
  if(screen==="applePay") return <MobileApplePaySetup onComplete={()=>setScreen("celebration")} onSkip={()=>setScreen("celebration")}/>;
  if(screen==="celebration") return <MobileCelebration onContinue={handleCelebrationContinue}/>;
  return <MobileCardScreen onBackToWeb={onBackToWeb} cardState={cardState} setCardState={setCardState}/>;
};

/* ═══════════════════════════════════════════════════════════
   WEB-ONLY PROTOTYPE — web tool surface in iPhone frame
═══════════════════════════════════════════════════════════ */
export default function WebOnlyPrototype() {
  const D={hasCard:true,frozen:false,pinSet:true,physicalIssued:true,orderedReplacement:false,cardProductionStep:null,appSetup:"ready"};
  const [cardState,setCardState]=useState({...D,hasCard:false,appSetup:"noApp"});
  const [appLinked,setAppLinked]=useState(true);

  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",minHeight:"100vh",background:"#E8E8ED",padding:"24px 0",fontFamily:ff}}>
      <div style={{width:390,background:"#000",borderRadius:52,padding:8,boxShadow:"0 25px 80px rgba(0,0,0,0.25)"}}>
        <div style={{background:C.bg,borderRadius:46,overflow:"hidden",height:844,position:"relative",display:"flex",flexDirection:"column"}}>
          {/* Dynamic Island */}
          <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:126,height:34,background:"#000",borderRadius:"0 0 22px 22px",zIndex:100,display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:10}}><div style={{width:12,height:12,background:"#220A35",borderRadius:"50%",border:"2px solid #3D1A55"}}/></div>

          <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            <WebToolContent onOpenStore={()=>{}} cardState={cardState} setCardState={setCardState} appLinked={appLinked} setAppLinked={setAppLinked}/>
          </div>
        </div>
      </div>

      <div style={{width:390,marginTop:16,textAlign:"center"}}>
        <div style={{background:"#fff",border:`1px solid ${C.bdr}`,borderRadius:14,padding:"10px 8px",fontFamily:ff}}>
          <div style={{fontSize:12,fontWeight:600,color:C.txt}}>🌐 Web tool</div>
          <div style={{fontSize:9,marginTop:2,opacity:0.6,color:C.txt}}>app.payflip.be</div>
        </div>
      </div>
      <style>{`
        *{box-sizing:border-box}
        input::placeholder{color:${C.txtD}}
        @keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.08);opacity:.7}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
      `}</style>
    </div>
  );
}
