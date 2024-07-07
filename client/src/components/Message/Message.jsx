import React from 'react'
import './Message.css'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

export default function Message({mes, own}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className={own ? "message own" : "message"}>
        <div className="messageTop">
            <img className='messageImg' src={mes.sender?.profilePicture ? mes.sender.profilePicture : `${PF}noPP.jpeg`} alt="" />
            <p className='messageText'>{mes.text}</p>
        </div>
        <div className="messageBottom">{timeAgo.format(new Date(mes.createdAt))}</div>
    </div>
  )
}
