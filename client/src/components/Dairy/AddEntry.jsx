// AddEntry.jsx
import React, { useState } from 'react';
import './AddEntry.css'; // Create AddEntry.css for styling if necessary
import { Add } from '@mui/icons-material'; // Import the add icon from MUI or another icon library
import axios from 'axios';

export default function AddEntry({ userId, onAddEntry }) {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleAddEntry = async () => {
        const newEntry = { userId, title, desc };
        try {
            const response = await axios.post('/dairy', newEntry); // Adjust API endpoint as needed
            // await axios.post('/diary', newEntry);
            onAddEntry(response.data); // Pass newly created entry back to parent component
            setTitle(''); // Clear input fields after successful creation
            setDesc('');
            setIsOpen(false); // Close the pop-up
            window.location.reload();
        } catch (error) {
            console.error('Error adding entry:', error);
            // Handle error gracefully
        }
    };

    return (
        <div>
            <button className="addButton" onClick={togglePopup}>
                <Add />
            </button>
            {isOpen && (
                <div className="popup">
                    <div className="popupInner">
                        <h3>Add New Diary Entry</h3>
                        <textarea
                            rows={1}
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            rows={5}
                            placeholder="Description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <button onClick={handleAddEntry}>Add Entry</button>
                        <button onClick={togglePopup}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}
