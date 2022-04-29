import React, { useEffect } from "react";
import axios from 'axios';
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const LikeDislikes = (props) => {
    const { user } = useContext(AuthContext);
  
    async function handleLikes(_id,event){
    event.preventDefault();
    let newLike = await axios.put(`http://localhost:3011/api/users/${user._id}/posts/${props._id}`)
      props.getFriendPost();  
      console.log(`Likes: ${props.likes}`);
    }      
    useEffect(() => {
      handleLikes();
      },[props._id])

  async function handleDislikes(_id,event){
    event.preventDefault();
    let newDislike = await axios.put(`http://localhost:3011/api/users/${user._id}/posts/${props._id}`)
      props.getFriendPost();
      console.log(`Dislikes: ${props.dislikes}`);
    }
    useEffect(() => {
      handleDislikes();
      },[props._id])
    
  return ( 
    <div className="rate_post text-end"> 
      <div className="d-flex">                 
        <div className="mr-3">
          <form onSubmit = {handleLikes} >
            <input type="hidden" value="like" name="like" id="like" />
            <button type = "submit" class="bg-success m-3 text-white">Like {props.likes}</button>
          </form>
        </div>
        <div className="ml-3">          
          <form id="likes" onSubmit = {handleDislikes} >
            <input type="hidden" value="dislike" name="dislike" id="dislike" />
            <button type = "submit" class="bg-danger m-3 text-white">Dislike {props.dislikes}</button>
          </form>    
        </div>
      </div>
    </div>   
    );
}
export default LikeDislikes;