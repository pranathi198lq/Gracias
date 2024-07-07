import React, { useEffect, useState, useContext } from 'react'
import './Dairy.css'
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import DairyFeed from '../../components/Dairy/DairyFeed'

axios.defaults.baseURL = 'http://localhost:8000/api';


export default function Dairy() {
//   const username= useParams().username;
//   const { user } = useContext(AuthContext);
//     const [entries, setEntries] = useState([]);
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');

    // useEffect(() => {
    //     const fetchEntries = async () => {
    //         try {
    //             const res = await axios.get(`/dear/${user.username}`);
    //             setEntries(res.data);
    //         } catch (err) {
    //             console.error("Error fetching entries:", err);
    //         }
    //     };

    //     fetchEntries();
    // }, [user.username]);

    // const handleAddEntry = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const newEntry = { title, content };
    //         const res = await axios.post(`/api/entries/${user.username}/entry`, newEntry);
    //         setEntries([...entries, res.data]);
    //         setTitle('');
    //         setContent('');
    //     } catch (err) {
    //         console.error("Error adding entry:", err);
    //     }
    // };


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
