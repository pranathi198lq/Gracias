import React, { useState, useEffect, useContext } from 'react'
import './Post.css'
import { MoreVert, FavoriteBorder, Favorite, BookmarkBorder, Bookmark } from '@mui/icons-material'
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
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
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
        </div>
    )
}
