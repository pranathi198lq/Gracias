import React from 'react'
import './Dairy.css'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import DairyFeed from '../../components/Dairy/DairyFeed'


export default function Dairy() {
  return (
    <>
    <Navbar/>
    <div className='dairy-main'>
      <Sidebar/>
      <div className="dairy-cont">
      <h2>Your Dairy Entries</h2>
        <DairyFeed />
      </div>
    </div>
    </>
  )
}
