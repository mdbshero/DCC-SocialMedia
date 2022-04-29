import React, {  useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const PostFeed = (props) => {
    const { user } = useContext(AuthContext);

    async function postDelete (_id, e) {
        e.preventDefault();        
        let res = await axios.delete(`http://localhost:3011/api/users/${user._id}/deletePost/${_id}`); 
        console.log(res)
        props.getUserInfo()
    };
    

    
    return ( 
        <div>
            {props.userData && props.userData.map((userData, key)=>{

                return(
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>{user.name} Post</th>
                                    <th>Likes</th>
                                    <th>Dislikes</th>
                                    <th>Delete</th>
                                </tr>                            
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{userData.post}</td>
                                    <td>{userData.likes}</td>
                                    <td>{userData.dislikes}</td>
                                    <td><button onClick={(e) => postDelete(userData._id, e)}  type="submit">Delete</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    // <div>
                    //     <p>{userData.post}</p>
                    // </div>
                );
            })};
        </div>
     );
}
 
export default PostFeed;