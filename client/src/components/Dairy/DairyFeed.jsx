// DairyFeed.js
import React, { useEffect, useState, useContext } from 'react';
import './DairyFeed.css';
import Entry from './Entry';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import AddEntry from './AddEntry';

axios.defaults.baseURL = 'http://localhost:8000/api';

export default function DairyFeed({ username }) {
    const [entries, setEntries] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const res = username ? await axios.get(`/dairy/dear/${username}`) : await axios.get(`/dairy/dear/${user.username}`);
                setEntries(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchEntries();
    }, [username, user.username]);

    const handleAddEntry = (newEntry) => {
        setEntries([...entries, newEntry]); // Update state to include new entry
    };

    return (
        <div className='dairy-feed'>
            <div className="dairy-wrapper">
                {entries.map((entry) => (
                    <Entry key={entry._id} entry={entry} />
                ))}
            </div>
            <AddEntry userId={user._id} onAddEntry={handleAddEntry} />
        </div>
    )
}
