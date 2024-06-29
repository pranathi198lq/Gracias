import React, {useContext, useEffect, useState} from 'react'
import './Sidebar.css'
import { RssFeed, Chat, PlayCircleFilledOutlined, CollectionsBookmark, Bookmark, HelpOutline, WorkOutline, Event, School} from '@mui/icons-material'
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

  return (
    <div className='sidebar'>
        <div className="wrapper">
            <ul className="list">
                <li className="item">
                    <RssFeed className='icon'/>
                    <span className="text">Feed</span>
                </li>
                <li className="item">
                    <Chat className='icon'/>
                    <span className="text">Chats</span>
                </li>
                <li className="item">
                    <PlayCircleFilledOutlined className='icon'/>
                    <span className="text">Videos</span>
                </li>
                <li className="item">
                    <Link to={"/dairy/"+user.username}>
                    <CollectionsBookmark className='icon'/>
                    <span className="text">Gratitude Dairy</span>
                    </Link>
                </li>
                <li className="item">
                    <Link to={"/saved/"+user.username} style={{textDecoration: "none", color: "black", fontSize: "17px", display: "flex", alignItems: "center"}}>
                    <Bookmark className='icon'/>
                    <span className="text">Bookmarks</span>
                    </Link>
                </li>
                <li className="item">
                    <HelpOutline className='icon'/>
                    <span className="text">Questions</span>
                </li>
                <li className="item">
                    <WorkOutline className='icon'/>
                    <span className="text">Jobs</span>
                </li>
                <li className="item">
                    <Event className='icon'/>
                    <span className="text">Events</span>
                </li>
                <li className="item">
                    <School className='icon'/>
                    <span className="text">Courses</span>
                </li>
            </ul>
            <button className="button">Show More</button>
            <hr className='sidehr' />
            <ul className="friendList">
                {friends.map(friend=>(
                    <li className="sideItem">
                    <Link to={"/profile/"+friend.username} style={{textDecoration: "none", color: "black", fontSize: "17px", display: "flex", alignItems: "center"}}>
                <img src={friend.profilePicture ? friend.profilePicture : PF+"noPP.jpeg"} alt="" className="sideimg" />
                <span className="sideName">{friend.username}</span>
                </Link>
            </li>
            ))}
            </ul>
        </div>
    </div>
  )
}
