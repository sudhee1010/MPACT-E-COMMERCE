import { useEffect, useState } from "react";
import api from "../api/axios";

export default function AdminSubscribers(){

  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(true);
  const [refreshing,setRefreshing] = useState(false);

  const fetchSubscribers = async ()=>{
    try{
      const {data} = await api.get("/api/subscribe");
      setUsers(data);
    }
    catch(err){
      console.log(err);
    }
    finally{
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(()=>{
    fetchSubscribers();
  },[]);

  const refreshHandler = ()=>{
    setRefreshing(true);
    fetchSubscribers();
  };

  return(
    <div style={styles.page}>

      <div style={styles.card}>

        {/* Header */}
        <div style={styles.header}>
          <h2>Subscribers</h2>

          <button
            onClick={refreshHandler}
            style={styles.refreshBtn}
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <p style={styles.count}>
          Total: {users.length}
        </p>

        {/* Content */}
        {loading ? (
          <div style={styles.center}>Loading subscribers...</div>
        ) : users.length === 0 ? (
          <div style={styles.center}>No subscribers yet</div>
        ) : (
          <div style={styles.list}>
            {users.map((user)=>(
              <div key={user._id} style={styles.row}>

                <div>
                  <div style={styles.email}>{user.email}</div>
                  <div style={styles.date}>
                    {new Date(user.createdAt).toLocaleString()}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

const styles={

page:{
  minHeight:"100vh",
  background:"#020617",
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
  color:"white",
  fontFamily:"system-ui, sans-serif"
},

card:{
  width:"700px",
  maxWidth:"95%",
  background:"rgba(255,255,255,0.04)",
  backdropFilter:"blur(10px)",
  border:"1px solid rgba(255,255,255,0.12)",
  borderRadius:"18px",
  padding:"30px"
},

header:{
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:"10px"
},

count:{
  opacity:.7,
  marginBottom:"18px"
},

refreshBtn:{
  padding:"8px 14px",
  borderRadius:"10px",
  border:"none",
  background:"#0f172a",
  color:"white",
  cursor:"pointer"
},

list:{
  display:"flex",
  flexDirection:"column",
  gap:"12px"
},

row:{
  padding:"14px 16px",
  background:"#0f172a",
  borderRadius:"12px",
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center"
},

email:{
  fontWeight:500
},

date:{
  fontSize:"12px",
  opacity:.6
},

center:{
  padding:"30px",
  textAlign:"center",
  opacity:.7
}

};
