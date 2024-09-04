import { useContext, useEffect } from 'react';
import ChatBox from '../../Components/ChatBox/ChatBox';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
import RightSideBar from '../../Components/RightSideBar/RightSideBar';
import './Chat.css';
import { AppContext } from '../../Context/AppContextProvider/AppContextProvider';

const Chat = () => {
  const { isLoading, setIsLoading, chatData, userData } =
    useContext(AppContext);

  useEffect(() => {
    setIsLoading(false);
  }, [chatData, userData]);

  return (
    <div className="chat">
      {isLoading ? (
        <p className="loading">Loading ....</p>
      ) : (
        <div className="chat-container">
          <LeftSideBar></LeftSideBar>
          <ChatBox></ChatBox>
          <RightSideBar></RightSideBar>
        </div>
      )}
    </div>
  );
};

export default Chat;
