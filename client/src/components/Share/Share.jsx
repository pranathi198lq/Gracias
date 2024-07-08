import React, { useContext, useRef, useState } from 'react'
import './Share.css'
import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material'
import { storage } from '../../Firebase'
import { AuthContext } from '../../context/AuthContext'
import axios from "axios"

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useContext(AuthContext);
    const desc = useRef();
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        //use firebase to upload images
        let imageUrl = "";

        if (file) {
            const storageRef = storage.ref();
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            imageUrl = await fileRef.getDownloadURL();
        }

        const newPost = {
            userId: user._id,
            desc: desc.current.value,
            img: imageUrl,
        }
        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (err) { }
    }

    //to get a preview of the post:
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };


    return (
        <div className='sharecont'>
            <div className="sharewrapper">
                <div className="sharetop">
                    <img src={user.profilePicture? PF+user.profilePicture : PF + "noPP.jpeg"} alt="" className='sharepp' />
                    <input placeholder='Share your Thoughts' className='shareinput' ref={desc} />

                </div>
                <hr className="sharehr" />
                <form className="sharebottom" onSubmit={handleSubmit}>
                    <div className="options">
                        <label htmlFor='file' className="opt">
                            <PermMedia htmlColor='tomato' className='shareicon' />
                            <span className="sharetext">Photo or Video</span>
                            {/* <input style={{display: "none"}} type="file" id='file' accept='.png, .jpeg, .jpg' onChange={(e)=>setFile(e.target.files[0])}/> */}
                            <input style={{ display: "none" }} type="file" id='file' accept='.png, .jpeg, .jpg' onChange={handleFileChange} />
                        </label>                        
                    </div>
                    <button className="sharebutton" type='submit'>Share</button>
                </form>

                {imagePreview && (
                    <div className="shareImgContainer">
                        <img src={imagePreview} alt="Selected" className="shareImg" />
                        <button className="shareCancelImg" onClick={() => setImagePreview("")}>Remove</button>
                    </div>
                )}
                
            </div>
        </div>
    )
}
