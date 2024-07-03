import React from 'react'
import './Profile.css'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Feed from '../../components/Feed/Feed'
import Rightbar from '../../components/Rightbar/Rightbar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
// import { storage } from '../../Firebase'
// import { CameraAlt } from '@mui/icons-material'

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username; //to pass it to the const res
  // const [pp, setPP] = useState(null);
  // const {user: currUser} = useContext(AuthContext);

  // const fetchUsers = async () => {
  //   try{
  //     const res= await axios.get("/users/"+currUser.username);
  //     setUser(res.data);
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  useEffect(() => {
    //use a separate func fetchPosts because we cannot use async and await for the useEffect function
    const fetchUsers = async () => {
      // const res = await axios.get(`/users/${post.userId}`); //when we got it from userid
      // const res = await axios.get(`/users?username=James`); //for a specific username
      const res = await axios.get(`/users?username=${username}`); //useParams for this
      setUser(res.data)
    };
    fetchUsers();
  }, [username]); //[post.userId]

  // const handlePPChange = (e) => {
  //   setPP(e.target.files[0]);
  // };

  // const handleFileUpload = async () => {
  //   if (pp) {
  //     const storageRef = storage.ref();
  //     const fileRef = storageRef.child(`profilePictures/${user._id}`);

  //     try {
  //       await fileRef.put(pp);
  //       const url = await fileRef.getDownloadURL();

  //       // Update user's profile picture URL in Firebase and in state
  //       await axios.put(`/users/${user._id}`, { profilePicture: url });
  //       setUser((prevUser) => ({
  //         ...prevUser,
  //         profilePicture: url
  //       }));

  //       console.log('File uploaded successfully!');
  //     } catch (error) {
  //       console.error('Error uploading file:', error);
  //       // Handle error
  //     }
  //   } else {
  //     console.log('No file selected');
  //   }
  // };


  return (
    <>
      <Navbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">

            <div className="profileCont">
              {/* <img src={`${PF}cover/1.jpg`} alt="" className="profileCoverImg" /> */}
              <img src={user.coverPicture || PF + "nocover.jpg"} alt="" className="profileCoverImg" />
              {/* <img src="assets/people/3.jpeg" alt="" className="profileImg" /> */}
              <div className="profileImgContainer">
                <img src={user.profilePicture || `${PF}noPP.jpeg`} alt="" className="profileImg" />
                {/* <label htmlFor="file" className="cameraIcon">
                  <CameraAlt htmlColor='green' onChange={handlePPChange}/>
                </label> */}
                {/* <input type="file" id="file" style={{ display: "none" }} accept=".png, .jpeg, .jpg" onChange={handleFileChange} />
                <button onClick={handleFileUpload}>Change it</button> */}
              </div>
            </div>
          </div>
          <div className="profileCont2">
            {/* <h4 className="profileName">Clary Fairchild</h4> */}
            <h4 className="profileName">{user.username}</h4>
            <div className="profileFollow">
              <span className="profileFriends">{user.followers?.length || 0} followers,</span>
              <span className="profileFriends"> {user.followings?.length || 0} following</span>
            </div>
            <h4 className="profileDesc">{user.desc}</h4>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}
