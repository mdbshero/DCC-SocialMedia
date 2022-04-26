import React, { useState, useEffect } from "react";
import axios from 'axios';
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const Profile = (props) => {
    
    const [post, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    const [allPosts, setAllPosts] = useState ([]);
    const [about, setAbout] = useState("");

    async function handleSubmit (event) {
        event.preventDefault();
        console.log (about)
    let newAboutMe = await axios.put(`http://localhost:3011/api/users/${user._id}/aboutMe/`, {
        "aboutMe" : about,
        
        
    })
    console.log(newAboutMe)
    setAbout("");
   
}
async function getPosts () {
    let response = await axios.get(`http://localhost:3011/api/users/${user._id}/posts/`) ;
        console.log(response.data);
        setAllPosts (response.data);
    }
    useEffect(() => {
		getPosts();
    },[user._id])

    
    return (
    <div>
        <form id="AboutMe" onSubmit={handleSubmit}>
        <label>About me:</label>
            <textarea className="form-control w-100 mt-2 mb-2" type="text" value={about} onChange={(e) => setAbout(e.target.value)}/>
            <input className="btn btn-info" type = 'submit' value = 'Add'/>        
        </form>
        <div className ="w-100 mt-3">
                    <h3 className="text-center">Posts</h3>
                    {allPosts.map((post) => { 
                        return (
                            <div className="list-group-item mb-3 ml-0 w-100 p-0">
                                <div className="d-flex bg-primary text-white p-2">
                                    <h5 className="w-75">Posted {post.dateAdded}</h5>
                                </div>
                                <p className="msgtxt p-3">{post.post} </p>
                                                              
                                                               
                            </div>                
                        )}
                    )}
        </div>
    </div>
    
    
)}   
        

    
 
export default Profile;