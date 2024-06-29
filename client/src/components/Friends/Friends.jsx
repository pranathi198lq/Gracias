import React, { useEffect, useState } from 'react'
import './Friends.css'
import axios from 'axios'

export default function Friends({user}) {
    const PF= process.env.REACT_APP_PUBLIC_FOLDER;

//     const [friends, setFriends]= useState([]); 

//   useEffect(()=>{
//     const getFriends= async()=>{
//       try{
//         const friendList= await axios.get("/users/friends/"+user._id);
//         console.log(friendList.data);
//         setFriends(friendList.data);
//       }catch(err){}
//     };
//     getFriends();
//   }, [user._id]);   

const [friends, setFriends] = useState([]);

useEffect(() => {
  const getFriends = async () => {
    try {
      const friendList = await axios.get(`/users/friends/${user._id}`);
      console.log("Friend list fetched: ", friendList.data); 
      setFriends(friendList.data);
    } catch (err) {
      console.error("Error fetching friends: ", err); 
    }
  };

  if (user && user._id) {
    getFriends();
  }
}, [user]);

    return (
        // <div>
        //     {friends.map(friend=>(
        //         <li className="sideItem">
        //         <img src={friend.profilePicture ? friend.profilePicture : PF+"noPP.jpeg"} alt="" className="sideimg" />
        //         <span className="sideName">{friend.username}</span>
        //     </li>
        //     ))}
        // </div>
        <div>
      {friends.length === 0 ? (
        <p>No friends to display</p>
      ) : (
        friends.map((friend) => (
          <li className="sideItem" key={friend._id}>
            <img
              src={friend.profilePicture ? friend.profilePicture : PF + "noPP.jpeg"}
              alt=""
              className="sideimg"
            />
            <span className="sideName">{friend.username}</span>
          </li>
        ))
      )}
    </div>
    )
}
