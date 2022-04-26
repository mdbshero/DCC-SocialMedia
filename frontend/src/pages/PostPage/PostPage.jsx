import axios from "axios";
import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";


const PostPage = (props) => {
    const { user } = useContext(AuthContext);
 


    async function handleNewPost (event) {
        event.preventDefault();
        const jwt = localStorage.getItem('token');
        console.log("JWT", jwt)
        console.log("User ID", user._id)
        // const post = {post: event.target.value}
        // const header = {
        //     headers: {
        //       "Content-Type": "application/json",
        //       "x-auth-token": `${jwt}`,
        //     }}
        //     console.log("User Post", post)
      
        // let res = await axios.put(`http://localhost:3011/api/users/${user._id}/newPost`, {headers : {Authorization: 'Bearer '+ jwt}}
        // );    
        const config = {
            'headers' : { 'Authorization' : `Bearer ${jwt}`}
        };
        const post = {post: event.target.post.value};
        const url = `http://localhost:3011/api/users/${user._id}/newPost`;
        let res = await axios.put(`http://localhost:3011/api/users/${user._id}/newPost`, post,config); 

        console.log(res)
    };

    return (
        <div className="container">
            <div className="postBox">
                <form onSubmit={handleNewPost}>
                    <input className="postBox"
                    type='text'
                    name="post"
                    required = "required"
                    placeholder="What's on your mind?"
                    />
                    <button type="submit">Post</button>
                </form>


            </div>
        </div>
    
    );
  };
 
export default PostPage;