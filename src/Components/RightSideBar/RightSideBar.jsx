import { useContext, useEffect, useState } from 'react';
import assets from '../../assets/assets';
import './RightSideBar.css';
import { AppContext } from '../../Context/AppContextProvider/AppContextProvider';

const RightSideBar = () => {
  const { logOut, chatUser, messages } = useContext(AppContext);
  // for store the message images in user base in media
  const [msgImages, setMsgImages] = useState([]);

  useEffect(() => {
    let msgImageStore = [];
    messages.map(msg => {
      if (msg.image) {
        msgImageStore.push(msg.image);
      }
    });
    setMsgImages(msgImageStore);
  }, [messages]);
  return chatUser ? (
    <div className="right-side">
      <div className="rs-profile">
        <img src={chatUser.userData.avatar} alt="" />
        <h3>
          {chatUser.userData.name}
          {Date.now() - chatUser.userData.lastSeen <= 70000 ? (
            <img className="dot" src={assets.green_dot} alt="" />
          ) : null}
        </h3>
        <p>{chatUser.userData.bio}</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          {msgImages.map((url, index) => (
            <img key={index} onClick={() => window.open(url)} src={url} />
          ))}
          {/* <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" /> */}
        </div>
        <button onClick={() => logOut()}>LogOut</button>
      </div>
    </div>
  ) : (
    <div className="right-side">
      <button>LogOut</button>
    </div>
  );
};

export default RightSideBar;
