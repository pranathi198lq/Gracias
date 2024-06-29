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
    // const [location, setLocation] = useState({ lat: null, lng: null });


    // useEffect(() => {
    //     const fetchUser = async () => {
    //       try {
    //         const res = await axios.get(`/api/users?username=${username}`);
    //         setUser(res.data);
    //       } catch (error) {
    //         console.error("Failed to fetch user", error);
    //       }
    //     };
    //     fetchUser();
    //   }, [username]);

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
            // location: { lat: location.lat, lng: location.lng },
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

    // const handleLocationClick = () => {
    //     if (navigator.geolocation) {
    //       navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //           setLocation({
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude,
    //           });
    //         },
    //         (error) => {
    //           console.error("Error getting location: ", error);
    //         }
    //       );
    //     } else {
    //       console.error("Geolocation is not supported by this browser.");
    //     }
    //   };


    return (
        <div className='sharecont'>
            <div className="sharewrapper">
                <div className="sharetop">
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "noPP.jpeg"} alt="" className='sharepp' />
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
                        {/* <div className="opt" onClick={handleLocationClick}> */}
                        <div className="opt">
                            <Label htmlColor='yellowgreen' className='shareicon' />
                            <span className="sharetext">Tag</span>
                        </div>
                        <div className="opt">
                            <Room htmlColor='green' className='shareicon' />
                            <span className="sharetext">Location</span>
                        </div>
                        <div className="opt">
                            <EmojiEmotions htmlColor='orange' className='shareicon' />
                            <span className="sharetext">Feelings</span>
                        </div>
                    </div>
                    <button className="sharebutton" type='submit'>Share</button>
                </form>
                {/* {location.lat && location.lng && (
            <div className="shareLocation">
              <span>Location: {location.lat}, {location.lng}</span>
            </div>
          )} */}
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
