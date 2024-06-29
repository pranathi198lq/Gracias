import React, { useContext, useEffect, useState } from 'react'
import './Feed.css'
import Share from '../Share/Share'
import Post from '../Post/Post'
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';

axios.defaults.baseURL = 'http://localhost:8000/api';

export default function Feed({username}) {
  const [posts, setPosts]= useState([]);
  const {user}= useContext(AuthContext);

  useEffect(() => {
    //use a separate func fetchPosts because we cannot use async and await for the useEffect function
    const fetchPosts = async () => {
        const res = username ? await axios.get(`/posts/profile/${username}`) : await axios.get(`/posts/timeline/${user._id}`);
        // setPosts(res.data)
        //gets the posts in order with the latest on the top
        setPosts(res.data.sort((p1, p2)=>{
          return new Date(p2.createdAt) - new Date(p1.createdAt); //closest date will be first, p1 and p2 exchange- closest date will be last 
        }))
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className='feed'>
      <div className="wrapper">
        {username === user.username &&<Share/>}
        {posts.map((p)=>( //for each post p- return post component
          <Post key={p._id} post={p}/>
        ))}
      </div>
    </div>
  )
}
