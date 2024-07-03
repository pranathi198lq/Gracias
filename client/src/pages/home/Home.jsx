import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Feed from '../../components/Feed/Feed'
import Rightbar from '../../components/Rightbar/Rightbar'
import './home.css'


export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="homecont">
    <Sidebar/>
    <Feed/>
    <Rightbar/>
    </div>
    </>
  )
}
