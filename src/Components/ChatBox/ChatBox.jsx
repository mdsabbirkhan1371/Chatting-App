import assets from '../../assets/assets';
import './ChatBox.css';

const ChatBox = () => {
  return (
    <div className="chat-box">
      {/* top side  */}
      <div className="chat-user">
        <img src={assets.profile_img} alt="" />
        <p>
          Richard Sanford <img className="dot" src={assets.green_dot} alt="" />
        </p>
        <img src={assets.help_icon} className="help" alt="" />
      </div>

      {/* message side or middle side  */}
      <div className="chat-msg">
        <div className="sender-msg">
          <p className="message">Hello Babe</p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:40 PM</p>
          </div>
        </div>
        <div className="sender-msg">
          <img className="msg-img" src={assets.pic1} alt="" />
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:40 PM</p>
          </div>
        </div>
        <div className="receiver-msg">
          <p className="message">Hello Babe</p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:40 PM</p>
          </div>
        </div>
      </div>
      {/* lower side  */}
      <div className="chat-input">
        <input type="text" placeholder="Send a message" name="" id="" />
        <input type="file" id="image" accept="image/jpeg,image/png" hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" />
      </div>
    </div>
  );
};

export default ChatBox;
