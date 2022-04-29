import axios from "axios";

import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import PostFeed from "../../components/PostFeed/PostFeed";
// import DeletePost from "../../components/DeletePost/DeletePost";


const PostPage = (props) => {
    const { user } = useContext(AuthContext);
    const jwt = localStorage.getItem('token');
    const config = {'headers' : { 'Authorization' : `Bearer ${jwt}`}};
    const [userData, setUserData] = useState([]);
    
    
    async function getUserInfo(){
        let userInfo = await axios.get(`http://localhost:3011/api/users/${user._id}`, config);
        console.log(userInfo.data.post)
        setUserData(userInfo.data.post)
    }
    useEffect(()=>{
        getUserInfo();
        },[]);


    async function handleNewPost (event) {
        event.preventDefault();        
        const post = {post: event.target.post.value};
        let res = await axios.put(`http://localhost:3011/api/users/${user._id}/newPost`, post, config); 
        console.log(res)
        getUserInfo()
    };

    return (
        <div className="container">
            <div className="inputBox">
                <form onSubmit={handleNewPost}>
                    <input className="postInput"
                    type='text'
                    name="post"
                    required = "required"
                    placeholder="What's on your mind?"
                    />
                    <button type="submit">Post</button>
                </form>
            </div>
           <div>
               <PostFeed userData={userData} getUserInfo = {getUserInfo}/>
           </div>
            
        </div>

    );
  };
 
export default PostPage;