import React, { useState, useEffect, useContext, useRef } from 'react'
import './Post.css'
import { FavoriteBorder, Favorite, BookmarkBorder, Bookmark, Edit, Delete, PermMedia} from '@mui/icons-material'
import axios from 'axios';
import { Link } from 'react-router-dom';
// import {format} from "timeago.js"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { AuthContext } from '../../context/AuthContext';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

export default function Post({ post }) {
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setLiked] = useState(false);
    const [user, setUser] = useState({});
    const {user: currUser} = useContext(AuthContext); //already another user here so make it currUser, currUSer is a nickname of the user
    const [isEditing, setIsEditing] = useState(false);
    const desc = useRef();
    const [imagePreview, setImagePreview] = useState("");
    

    //after refreshing, when we are liking it, it can show the respnse of the like in inspect network as post has been disliked because we liked it before the page refresh
    //we need to use useEffect for this:
    useEffect(()=>{
        setLiked(post.likes.includes(currUser._id)) //will be true if post.likes array includes the current user and false otherwise
    }, [currUser._id, post.likes])

    useEffect(() => {
        //use a separate func fetchPosts because we cannot use async and await for the useEffect function
        const fetchUsers = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`);
            setUser(res.data)
        };
        fetchUsers();
      }, [post.userId]);

    const likeHandler = async() => {
        //axios tosend requests
        try{
            await axios.put("/posts/"+ post._id + "/like", {userId: currUser._id})
        }catch(err){
            console.log(err)
        }
        setLike(isLiked ? like - 1 : like + 1)
        setLiked(!isLiked)
    }
    const [save, setSave] = useState(post.save);
    const [isSaved, setSaved] = useState(false);
    const saveHandler = () => {
        setSave(isSaved ? save - 1 : save + 1)
        setSaved(!isSaved)
    }

    const deleteHandler = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, { data: { userId: currUser._id } });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    // const updateHandler = async () => {
    //     const updatedPost = { ...post, desc: "Updated Description" }; // Example update
    //     try {
    //         await axios.put(`/posts/${post._id}`, updatedPost);
    //         window.location.reload();
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const updateHandler = async (e) => {
        e.preventDefault();
        const updatedPost = {
            userId: currUser._id,
            desc: desc.current.value,
        };
        if (imagePreview) {
            updatedPost.img = imagePreview; // Add logic to upload image and get URL
        }
        try {
            await axios.put(`/posts/${post._id}`, updatedPost);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    
    
    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                        <img src={user.profilePicture? PF+user.profilePicture : PF+"noPP.jpeg"} alt="" className="postpp" />
                        </Link>
                        <span className="postName">{user.username}</span>
                        {timeAgo.format(new Date(post.createdAt))}
                        {/* <span className="postDate">{format(post.createdAt)}</span>  */}
                        {/* post.date is used for dummy date */}
                    </div>
                    {post.userId === currUser._id && (
                        <div className="postTopRight">
                            <Edit htmlColor='gray' className="postIcon" onClick={() => setIsEditing(true)} />
                            <Delete htmlColor='gray' className="postIcon" onClick={deleteHandler} />
                        </div>
                    )}
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span> {/* ?- if post doesnt have any desc*/}
                    {post.img && <img src={post.img} alt="" className="postImg" />}
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {isLiked ? (
                            <Favorite htmlColor='red' className='likeicon' onClick={likeHandler} />
                        ) : (
                            <FavoriteBorder className='likeicon' onClick={likeHandler} />
                        )}
                        {isSaved ? (
                            <Bookmark htmlColor='blue' className='likeicon' onClick={saveHandler} />
                        ) : (
                            <BookmarkBorder className='likeicon' onClick={saveHandler} />
                        )}
                        <span className="postLikeCounter">{like} people liked this!</span>
                    </div>
                    <div className="postBottomRight">{post.comment} comments</div>
                </div>
            </div>
            {isEditing && (
                <div className='sharecont'>
                    <div className="sharewrapper">
                        <div className="sharetop">
                            <img src={user.profilePicture ? PF + user.profilePicture : PF + "noPP.jpeg"} alt="" className='sharepp' />
                            <input placeholder='Update your Thoughts' className='shareinput' ref={desc} defaultValue={post.desc} />
                        </div>
                        <hr className="sharehr" />
                        <form className="sharebottom" onSubmit={updateHandler}>
                            <div className="options">
                                <label htmlFor='file' className="opt">
                                    <PermMedia htmlColor='tomato' className='shareicon' />
                                    <span className="sharetext">Photo or Video</span>
                                    <input style={{ display: "none" }} type="file" id='file' accept='.png, .jpeg, .jpg' onChange={handleFileChange} />
                                </label>
                                
                            </div>
                            <button className="sharebutton" type='submit'>Update</button>
                        </form>
                        {imagePreview && (
                            <div className="shareImgContainer">
                                <img src={imagePreview} alt="Selected" className="shareImg" />
                                <button className="shareCancelImg" onClick={() => setImagePreview("")}>Remove</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
