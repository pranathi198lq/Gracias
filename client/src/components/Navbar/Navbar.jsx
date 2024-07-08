import React, { useContext } from 'react'
import './Navbar.css'
import { Search , Chat} from '@mui/icons-material'
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"
import { logout } from '../../apiCalls';

export default function Navbar() {
  const {user, dispatch} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleNavSignOut = () => {
    logout(
      dispatch
    );
  }

  return (
    <div className='navbar'>
        <div className="navleft">
          <Link to="/" style={{textDecoration:"none"}}>
            <img src="/assets/logo.png" alt="" />
            <span className='logo'>Gracias</span>
          </Link>
        </div>
        <div className="center">
          <div className="search">
            <Search className='searchIcon'/>
            <input placeholder='Search for friends, posts or videos' className='searchInput'/>
          </div>
        </div>
        <div className="navright">
          <div className="links">
            <Link to={"/"} style={{textDecoration: "none", color: "black", alignContent: "center", display: "flex"}}>
            <span className="navlink">Home</span>
            </Link>
            <Link to={"/profile/"+user.username} style={{textDecoration: "none", color: "black", alignContent: "center", display: "flex"}}>
            <span className="navlink">Timeline</span>
            </Link>
          </div>
          <div className="icons">
            <div className="iconcenter">
            <div className="iconitem">
              <Link to={"/chats"} style={{color: "white"}}>
              <Chat/>
              </Link>
            </div>
            </div>
            <Link to={`/profile/${user.username}`}>
            <img src={user.profilePicture? PF+user.profilePicture : PF+"noPP.jpeg"} alt="" className='pp'/>
            </Link>
            <button className="navSignOut" onClick={handleNavSignOut}>Sign Out</button>
          </div>
        </div>
    </div>
  )
}
