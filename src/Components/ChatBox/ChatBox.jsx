import { useContext, useEffect, useState } from 'react';
import assets from '../../assets/assets';
import './ChatBox.css';
import { AppContext } from '../../Context/AppContextProvider/AppContextProvider';
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../Config/firebase.config';
import { toast } from 'react-toastify';

const ChatBox = () => {
  const { userData, messagesId, chatUser, messages, setMessages } =
    useContext(AppContext);

  const [input, setInput] = useState('');

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, 'messages', messagesId), res => {
        setMessages(res.data().messages.reverse());
        console.log(res.data().messages.reverse());
      });
      return () => {
        unSub();
      };
    }
  }, [messagesId]);

  // get input message and send to fbd

  const sendMessage = async () => {
    try {
      if (input && messagesId) {
        await updateDoc(doc(db, 'messages', messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date(),
          }),
        });
        const userIDs = [chatUser.rId, userData.id];

        userIDs.forEach(async id => {
          const userChatsRef = doc(db, 'chats', id);
          const userChatsSnapShot = await getDoc(userChatsRef);
          if (userChatsSnapShot.exists()) {
            const userChatData = userChatsSnapShot.data();
            const chatIndex = userChatData.chatData.findIndex(
              c => c.messageId === messagesId
            );
            userChatData.chatData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatData[chatIndex].rId === userData.id) {
              userChatData.chatData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef, {
              chatData: userChatData.chatData,
            });
          }
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return chatUser ? (
    <div className="chat-box">
      {/* top side  */}
      <div className="chat-user">
        <img src={chatUser.userData.avatar} alt="" />
        <p>
          {chatUser.userData.name}
          <img className="dot" src={assets.green_dot} alt="" />
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
        <input
          onChange={e => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Send a message"
          name=""
          id=""
        />
        <input type="file" id="image" accept="image/jpeg,image/png" hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img onClick={sendMessage} src={assets.send_button} alt="" />
      </div>
    </div>
  ) : (
    <div className="chat-welcome">
      <img src={assets.logo} alt="" />
      <p>Chat any where, any time</p>
    </div>
  );
};

export default ChatBox;
