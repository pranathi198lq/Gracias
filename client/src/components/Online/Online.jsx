import './Online.css'

export default function Online({user}) {
  const PF= process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
        <li className="rightItem">
            <div className="rightImgcont">
              <img src={PF+user.profilePicture || PF+"noPP.jpeg"} alt="" className="rightppImg" />
              <span className="rightOnlineIcon"></span>
            </div>
            <span className="rightOnlineName">{user.username}</span>
          </li>
    </div>
  )
}
