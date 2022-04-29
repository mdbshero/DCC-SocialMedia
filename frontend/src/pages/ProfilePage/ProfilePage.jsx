import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import "bootstrap"


const Profile = (props) => {

  const [post, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [allPosts, setAllPosts] = useState([]);
  const [about, setAbout] = useState("");

  async function getUserAboutMeInfo() {
    let userInfo = await axios.get(
      `http://localhost:3011/api/users/${user._id}`
    );
    //console.log(userInfo.data.friends);
    console.log(userInfo.data.aboutMe);
    setAbout(userInfo.data.aboutMe);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let newAboutMe = await axios.put(
      `http://localhost:3011/api/users/${user._id}/aboutMe/`,
      {
        aboutMe: about,
      }
    );
    setAbout("");
    console.log(newAboutMe);
  }
  // useEffect(() => {
  //     handleSubmit();
  // },[user._id])

  async function getPosts() {
    console.log(user._id);
    let response = await axios.get(
      `http://localhost:3011/api/users/${user._id}/posts/`
    );
    setAllPosts(response.data);
    console.log(response.data);
  }
  useEffect(() => {
    getUserAboutMeInfo();
    getPosts();
  }, []);
  return (
    <div>
      <form id="AboutMe" onSubmit={handleSubmit}>
        <label>About me:</label>
        <textarea
          className="form-control w-100 mt-2 mb-2"
          type="text"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </form>
      <div className="p-3">
        <h2>About Me</h2>
        <div className="d-flex bg-light border border-dark text-dark mb-2">
          <p className="p-2">{about}</p>
        </div>
      </div>
      <div class="card mb-3">
        <h3 className="card_body">Posts</h3>
        {allPosts &&
          allPosts.map((post, i) => {
            return (
              <div key={i} className="card mb-3">
                <div className="d-flex bg-primary text-white p-2">
                  <h5 className="w-75">Posted {post.dateAdded}</h5>
                </div>
                <p className="msgtxt p-3">{post.post} </p>
              </div>
              
            );
          })}
      </div>
    </div>
  );
};

export default Profile;
