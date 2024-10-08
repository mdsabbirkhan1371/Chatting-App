import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Chat from './Pages/Chat/Chat';
import Profile_Update from './Pages/Profile_Update/Profile_Update';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      {/* all routes  */}
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/profile" element={<Profile_Update />}></Route>
      </Routes>
    </>
  );
};

export default App;
