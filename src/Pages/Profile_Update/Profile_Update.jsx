import './Profile_Update.css';
import assets from '../../assets/assets';
import { useState } from 'react';

const Profile_Update = () => {
  const [image, setImage] = useState(false);
  return (
    <div className="profile">
      <div className="profile-container">
        <form>
          <h2>Profile Details</h2>
          <label htmlFor="avatar">
            <input
              onChange={e => setImage(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".jpg , .png, .jpeg"
              hidden
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar_icon}
              alt=""
            />
            upload profile image
          </label>
          <input type="text" placeholder="Your Name" required />
          <textarea placeholder="Write Profile Bio" required></textarea>
          <button type="submit">Save</button>
        </form>

        <img
          className="profile-pic"
          src={image ? URL.createObjectURL(image) : assets.logo_icon}
          alt=""
        />
      </div>
    </div>
  );
};

export default Profile_Update;
