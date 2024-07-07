// Entry.js
import React, { useState, useEffect } from 'react';
import './Entry.css';
import axios from 'axios';
import { KeyboardArrowDown } from '@mui/icons-material';

export default function Entry({ entry }) {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/users?userId=${entry.userId}`);
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();
    }, [entry.userId]);

    const [expanded, setExpanded] = useState(false);

    // const toggleExpand = (e) => {
    //     e.preventDefault();
    //     setExpanded(!expanded);
    // };

    return (
        <div className='entry'>
            <div className="entryWrapper">
                <div className="entryTop">
                    <div className="entryTopLeft">
                        <span className="entryName">{entry.title}</span>
                        <span className="entryDate">{new Date(entry.createdAt).toDateString()}</span>
                    </div>
                    {/* <div className="expandIcon" onClick={toggleExpand}>
                        <KeyboardArrowDown className='expandIcon'/>
                    </div> */}
                </div>
                {/* {expanded && ( */}
                    <div className="entryCenter">
                        <span className="entryText">{entry.desc}</span>
                    </div>
                {/* )} */}
                <div className="entryBottom">
                    {/* Additional functionality for entry actions */}
                </div>
            </div>
        </div>
    )
}
