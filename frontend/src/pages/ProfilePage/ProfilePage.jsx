import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import "./ProfilePage.css";
import PostFeed from "../../components/PostFeed/PostFeed";

const Profile = (props) => {
  const [post, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [allPosts, setAllPosts] = useState([]);
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const jwt = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${jwt}` } };
  const [userData, setUserData] = useState([]);

  async function getUserAboutMeInfo() {
    let userInfo = await axios.get(
      `http://localhost:3011/api/users/${user._id}`
    );
    //console.log(userInfo.data.friends);
    //console.log(userInfo.data.aboutMe);
    setAbout(userInfo.data.aboutMe);
    setImage(userInfo.data.image);
  }

  async function getUserInfo() {
    let userInfo = await axios.get(
      `http://localhost:3011/api/users/${user._id}`,
      config
    );
    console.log(userInfo.data.post);
    setUserData(userInfo.data.post);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    let newAboutMe = {
      aboutMe: about,
    };
    await axios.put(
      `http://localhost:3011/api/users/${user._id}/aboutMe/`,
      newAboutMe
    );
    //console.log(newAboutMe);
  }

  async function getPosts() {
    //console.log(user._id);
    let response = await axios.get(
      `http://localhost:3011/api/users/${user._id}/posts/`
    );
    setAllPosts(response.data);
    //console.log(response.data);
  }
  useEffect(() => {
    getUserAboutMeInfo();
    getPosts();
    getUserInfo();
  }, []);

  //console.log(`image`, image);
  return (
    <div className="container">
      <img src={`http://localhost:3011/${image}`}></img>
      <form
        className="form"
        id="AboutMe"
        onSubmit={(event) => handleSubmit(event)}
      >
        <label>Update About me:</label>
        <textarea
          className="form-control w-100 mt-2 mb-2"
          type="text"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
      <div className="p-3">
        <h2>About Me</h2>
        <div>
          <p className="p-2">{about}</p>
        </div>
      </div>

      <PostFeed userData={userData} getUserInfo={getUserInfo} />
    </div>
  );
};

export default Profile;
