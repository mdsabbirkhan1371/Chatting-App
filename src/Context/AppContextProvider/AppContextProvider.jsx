import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth, db } from '../../Config/firebase.config';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Create the context
export const AppContext = createContext(null);

// AppContextProvider component
const AppContextProvider = ({ children }) => {
  // declare variable and state

  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [chatUser, setChatUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesId, setMessagesId] = useState(null);
  const [chatVisible, setChatVisible] = useState(false);

  const navigate = useNavigate();

  // chatting related

  const loadUserData = async uid => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      setUserData(userData);
      if (userData.avatar && userData.name) {
        navigate('/chat');
      } else {
        navigate('/profile');
      }
      await updateDoc(userRef, {
        lastSeen: Date.now(),
      });
      setInterval(async () => {
        if (auth.chatUser) {
          await updateDoc(userRef, {
            lastSeen: Date.now(),
          });
        }
      }, 60000);
    } catch (error) {
      console.error(error);
    }
  };

  // for chatting next
  useEffect(() => {
    if (userData) {
      const chatRef = doc(db, 'chats', userData.id);
      const unSub = onSnapshot(chatRef, async res => {
        const chatItems = res.data()?.chatData;
        const tempData = [];
        for (const item of chatItems) {
          const userRef = doc(db, 'users', item.rId);
          const userSnap = await getDoc(userRef);
          const userData = userSnap.data();
          tempData.push({ ...item, userData });
        }
        setChatData(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
        // setIsLoading(false);
      });
      return () => {
        unSub();
      };
    }
  }, [userData]);

  // create user with email and password

  const signUp = (username, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async res => {
        const user = res.user;
        // console.log(user);
        if (user) {
          toast.success('Your Account has been created');
          await setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: '',
            avatar: '',
            bio: 'Hey, I am using Chat app',
            lastSeen: Date.now(),
          });
          await setDoc(doc(db, 'chats', user.uid), {
            chatData: [],
          });
        }
      })
      .catch(err => {
        console.error(err);
        toast.error(err.code.split('/')[1].split('-').join(' '));
      });
  };

  // sign in with email and password

  const signIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(res => {
        const user = res.user;
        if (user) {
          toast.success('Login Successful');
        }
      })
      .catch(err => {
        console.error(err);
        toast.error(err.code.split('/')[1].split('-').join(' '));
      });
  };
  // user exist or not exist in website

  useEffect(() => {
    onAuthStateChanged(auth, async user => {
      if (user) {
        // console.log(user);
        navigate('/chat');
        await loadUserData(user.uid);
      } else {
        navigate('/');
      }
    });
  }, []);
  // logout

  const logOut = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logout Success');
      })
      .catch(error => {
        // An error happened.
        toast.error(error.code);
      });
  };

  // reset password with email

  const resetPass = async email => {
    if (!email) {
      toast.error('Enter Your Email First');
      return null;
    }
    try {
      const userRef = collection(db, 'users');
      const q = query(userRef, where('email', '==', email));
      const querySnap = await getDocs(q);
      if (!querySnap.empty) {
        await sendPasswordResetEmail(auth, email);
        toast.success('Please check your email to reset pass');
      } else {
        toast.error('Email does not Exist');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.messages);
    }
  };

  const value = {
    resetPass,
    signUp,
    signIn,
    logOut,
    setChatData,
    setUserData,
    userData,
    chatData,
    loadUserData,
    isLoading,
    setIsLoading,
    chatUser,
    setChatUser,
    messagesId,
    setMessagesId,
    messages,
    setMessages,
    chatVisible,
    setChatVisible,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Define prop types for AppContextProvider
AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
