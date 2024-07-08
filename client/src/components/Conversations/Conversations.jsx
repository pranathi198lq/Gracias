import React, { useEffect, useState } from 'react'
import './Conversations.css'
import axios from 'axios';

export default function Conversations({conv, currUser, onlineUsers}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser]=useState(null);
  const [isOnline, setIsOnline] = useState(false);



  useEffect(()=>{
    const friendId= conv?.members?.find((m)=>m!==currUser?._id);

    const getUser= async()=>{
      if(!friendId) return;
      try{
        const res= await axios.get(`/users?userId=${friendId}`);
        setUser(res.data);
        setIsOnline(onlineUsers.includes(friendId));
      }catch(err){
        console.log(err);
      }       
    };
    getUser();
  }, [currUser, conv, onlineUsers]);


  return (
    <div className="conversation">
        {/* <img className='conversationImg' src={user?.profilePicture ? user.profilePicture : PF+"noPP.jpeg"} alt="" /> */}
        <div className="conversationImgContainer">
        <img
          className="conversationImg"
          src={user?.profilePicture ? PF+user.profilePicture : PF + "noPP.jpeg"}
          alt=""
        />
        {isOnline && <div className="conversationOnlineBadge"></div>}
      </div>
        <span className='conversationName'>{user?.username}</span>
    </div>
  )
}
