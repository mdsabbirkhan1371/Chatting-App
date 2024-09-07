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
import upload from '../../Lib/upload';

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

  // get input message and send to fbd send msg to chat

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
    setInput('');
  };

  // send image to chat
  const sendImageToChat = async e => {
    try {
      const fileUrl = await upload(e.target.files[0]);
      if (fileUrl && messagesId) {
        await updateDoc(doc(db, 'messages', messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            image: fileUrl,
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
            userChatData.chatData[chatIndex].lastMessage = 'Image';
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
      toast.error(error.message);
    }
  };

  // time stand fun
  const convertTimeStand = timesTamp => {
    let date = timesTamp.toDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    if (hour > 12) {
      return hour - 12 + ':' + minute + 'PM';
    } else {
      return hour + ':' + minute + 'AM';
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
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.sId === userData.id ? 'sender-msg' : 'receiver-msg'}
          >
            {msg['image'] ? (
              <img className="msg-image" src={msg.image} />
            ) : (
              <p className="message">{msg.text}</p>
            )}
            <div>
              <img
                src={
                  msg.sId === userData.id
                    ? userData.avatar
                    : chatUser.userData.avatar
                }
                alt=""
              />
              <p>{convertTimeStand(msg.createdAt)}</p>
            </div>
          </div>
        ))}
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
        <input
          onChange={sendImageToChat}
          type="file"
          id="image"
          accept="image/jpeg,image/png"
          hidden
        />
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
