import React, {useContext, useEffect, useState} from 'react'
import './Sidebar.css'
import { ViewTimeline, Chat, PlayCircleFilledOutlined, CollectionsBookmark, Bookmark, HelpOutline, WorkOutline} from '@mui/icons-material'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default function Sidebar() {
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;
    const {user}= useContext(AuthContext);
    const [friends, setFriends]= useState([]); 

  useEffect(()=>{
    const getFriends= async()=>{
        try{
            const friendList= await axios.get(`/users/friends/${user._id}`);
            setFriends(friendList.data);
        }catch(err){}
    };
    getFriends();
}, [user._id]);

console.log("Sideher is rendered")
  return (
      <div className='sidebar'>
        <div className="wrapper">
            <ul className="list">
                <li className="item">
                <Link to={"/profile/"+user.username} style={{textDecoration: "none", color: "black", alignContent: "center", display: "flex", alignItems: "center"   }}>
                    <ViewTimeline className='icon'/>
                    <span className="text">Timeline</span>
                </Link>
                </li>
                <li className="item">
                    <Link to={"/chats"} style={{textDecoration: "none", color: "black", alignContent: "center", display: "flex", alignItems: "center"}}>
                    <Chat className='icon'/>
                    <span className="text">Chats</span>
                    </Link>
                </li>
                <li className="item">
                    <Link to={"/dairy/"+user.username} style={{textDecoration: "none", color: "black", alignContent: "center", display: "flex", alignItems: "center"}}>
                    <CollectionsBookmark className='icon'/>
                    <span className="text">Dairy</span>
                    </Link>
                </li>
                <li className="item">
                    <Link to={"/saved"+user.username} style={{textDecoration: "none", color: "black", fontSize: "17px", display: "flex", alignItems: "center"}}>
                    <Bookmark className='icon'/>
                    <span className="text">Bookmarks</span>
                    </Link>
                </li>
                <li className="item">
                    <Link to={"/quiz"} style={{textDecoration: "none", color: "black", alignContent: "center", display: "flex", alignItems: "center"}}>
                    <HelpOutline className='icon'/>
                    <span className="text">Quiz</span>
                    </Link>
                </li>
            </ul>
            <button className="button">Show More</button>
            <hr className='sidehr' />
            <ul className="friendList">
                {friends.map(friend=>(
                    <li key={friend._id} className="sideItem">
                    <Link to={"/profile/"+friend.username} style={{textDecoration: "none", color: "black", fontSize: "17px", display: "flex", alignItems: "center"}}>
                <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"noPP.jpeg"} alt="" className="sideimg" />
                <span className="sideName">{friend.username}</span>
                </Link>
            </li>
            ))}
            </ul>
        </div>
    </div>
  )
}
