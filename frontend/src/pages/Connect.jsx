import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Connect(){

  const navigate = useNavigate();

  const [email,setEmail]=useState("");
  const [msg,setMsg]=useState("");
  const [success,setSuccess]=useState(false);
  const [loading,setLoading]=useState(false);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try{
      const {data}=await api.post("/api/subscribe",{email});

      setSuccess(true);
      setMsg(data.message);
      setEmail("");

      // redirect after user reads message
      setTimeout(()=>{
        navigate("/");
      },1800);

    }
    catch(err){
      setMsg(err.response?.data?.message || "Something went wrong");
    }
    finally{
      setLoading(false);
    }
  };

  return(
    <div style={styles.page}>

      {/* subtle grid background */}
      <div style={styles.grid}></div>

      <motion.div
        style={styles.card}
        initial={{opacity:0,y:60}}
        animate={{opacity:1,y:0}}
        transition={{duration:.6}}
      >

        {/* heading */}
        <motion.h1
          style={styles.title}
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          transition={{delay:.2}}
        >
          Connect with MPACT
        </motion.h1>

        {/* animated underline */}
        <motion.div
          style={styles.underline}
          initial={{width:0}}
          animate={{width:"70px"}}
          transition={{delay:.5,duration:.6}}
        />

        <motion.p
          style={styles.subtitle}
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:.8}}
        >
          Early access to collections & updates
        </motion.p>

        <form onSubmit={handleSubmit} style={{width:"100%"}}>

          <motion.input
            style={styles.input}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            whileFocus={{scale:1.02}}
            required
          />

          {/* shine button */}
          <motion.button
            style={styles.button}
            whileHover={{scale:1.04}}
            whileTap={{scale:.97}}
            disabled={loading}
          >
            <span style={{position:"relative",zIndex:2}}>
              {loading ? "Joining..." : "Join Now"}
            </span>

            <motion.span
              style={styles.shine}
              initial={{x:"-120%"}}
              whileHover={{x:"120%"}}
              transition={{duration:.8}}
            />
          </motion.button>

        </form>

        {/* success message */}
        <AnimatePresence>
        {success && (
          <motion.div
            initial={{opacity:0,y:10,scale:.9}}
            animate={{opacity:1,y:0,scale:1}}
            exit={{opacity:0}}
            transition={{duration:.3}}
            style={styles.success}
          >
            ✓ {msg}
          </motion.div>
        )}
        </AnimatePresence>

      </motion.div>
    </div>
  )
}


const styles={

page:{
  minHeight:"100vh",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  background:"#020617",
  position:"relative",
  overflow:"hidden",
  color:"white",
  fontFamily:"system-ui, sans-serif"
},

/* soft grid */
grid:{
  position:"absolute",
  inset:0,
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
  backgroundSize:"40px 40px",
  maskImage:"radial-gradient(circle at center, black 40%, transparent 100%)"
},

card:{
  width:"380px",
  padding:"42px",
  borderRadius:"20px",
  background:"rgba(255,255,255,0.04)",
  backdropFilter:"blur(12px)",
  border:"1px solid rgba(255,255,255,0.12)",
  textAlign:"center",
  zIndex:2
},

title:{
  fontSize:"34px",
  marginBottom:"6px",
  letterSpacing:".5px"
},

underline:{
  height:"2px",
  background:"linear-gradient(90deg,#22d3ee,#6366f1)",
  margin:"10px auto 16px"
},

subtitle:{
  opacity:.7,
  marginBottom:"26px"
},

input:{
  width:"100%",
  padding:"14px",
  borderRadius:"12px",
  border:"1px solid rgba(255,255,255,0.15)",
  background:"transparent",
  color:"white",
  marginBottom:"16px",
  outline:"none"
},

button:{
  width:"100%",
  padding:"14px",
  borderRadius:"12px",
  border:"none",
  background:"#0f172a",
  color:"white",
  fontWeight:600,
  position:"relative",
  overflow:"hidden",
  cursor:"pointer"
},

shine:{
  position:"absolute",
  inset:0,
  background:"linear-gradient(120deg,transparent,rgba(255,255,255,.35),transparent)"
},

success:{
  marginTop:"18px",
  color:"#4ade80",
  fontWeight:500
}
};
