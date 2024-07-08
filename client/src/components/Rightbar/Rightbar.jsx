import React, { useContext, useEffect, useState } from 'react'
import './Rightbar.css'
import {AuthContext} from '../../context/AuthContext'
import {Add, Remove} from '@mui/icons-material'
import axios from 'axios'
import {Link} from 'react-router-dom'


export default function Rightbar({user}) {

  const PF= process.env.REACT_APP_PUBLIC_FOLDER; 
  const {user: currUser, dispatch} =useContext(AuthContext);
  const [follow, setFollow] = useState(false);
  const [advice, setAdvice] = useState("");
  

  useEffect(()=>{
    setFollow(currUser.followings.includes(user?._id))
  }, [currUser, user]);

  const handleFollow= async()=>{
    try{  
      if(follow){
        await axios.put("/users/"+user._id+"/unfollow", {userId: currUser._id});
        dispatch({type: "UNFOLLOW", payload: user._id});
      }else{
        await axios.put("/users/"+user._id+"/follow", {userId: currUser._id});
        dispatch({type: "FOLLOW", payload: user._id});
      }
      // window.location.reload();
    }catch(err){
      console.log(err);
    }
    setFollow(!follow);
  };

  const fetchQuote= ()=>{
    axios.get("https://api.adviceslip.com/advice").then((response)=>{
      const {advice}= response.data.slip;
      setAdvice(advice);
      console.log(advice);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    fetchQuote();
  }, []);


  const HomeRightbar= ()=>{
    return(
      <>
      <div className="bookcont">
          <img src={`${PF}book.png`} alt="" className='bookImg' />
          <div className="bookRight">
            <div className='bookText'>Did you write your dairy today?</div>
            <Link to={"/dairy/"+currUser.username} style={{textDecoration: "none", color: "blueviolet"}}>
            <div className="bookText1">Let's do it!</div>
            </Link>
          </div>
        </div>
        <div className="rightDay">
          <p className='dayText'>Random is Fun!</p>
          <div className="quote">{advice}</div>
          <button className='quoteButton' onClick={fetchQuote}>More Fun</button>
          {/* <img src={`${PF}daily/1.jpg`} alt="" className="dayImg" /> */}
        </div>
        {/* <h4 className="rightTitle">Online Friends</h4>
        <ul className="rightList">
          {Users.map((u)=>(
            <Online key={u.id} user={u}/>
          ))}
        </ul> */}
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
      {
        user.username!==currUser.username && (
          <button className="rightFollow" onClick={handleFollow}>
            {follow ? "Unfollow" : "Follow"}
            {follow ? <Remove/> : <Add/>}
          </button>
        )
      }
        <div className="profileRightbar">
          <div className="profileImageContainer">
            {/* <img src={PF+user.profilePicture} alt="" className="bigProfileImg" /> */}
            <img src={user.profilePicture? PF+user.profilePicture : PF+"noPP.jpeg"} alt="" className="bigProfileImg" />
            <div className="profileTextOverlay">
              <span className="profileImgText">{user.username}, {user.age}</span>
            </div>
          </div>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Age:</span>
              <span className="rightbarInfoValue">{user.age}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Sign:</span>
              <span className="rightbarInfoValue">{user.sign}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship:</span>
              <span className="rightbarInfoValue">{user.relationship}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Hobbies:</span>
              <span className="rightbarInfoValue">{user.hobbies}</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className='rightbar'>
      <div className="rightWrapper">
      {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
