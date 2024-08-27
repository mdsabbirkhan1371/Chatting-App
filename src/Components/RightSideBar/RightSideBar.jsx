import React from 'react';
import assets from '../../assets/assets';
import './RightSideBar.css';

const RightSideBar = () => {
  return (
    <div className="right-side">
      <div className="rs-profile">
        <img src={assets.profile_img} alt="" />
        <h3>
          Richard Sanford <img className="dot" src={assets.green_dot} alt="" />
        </h3>
        <p>Hey,there i am Richard Sanford using chat app</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default RightSideBar;
