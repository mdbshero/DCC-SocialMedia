import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const HomePage = (props) => {
  const { user } = useContext(AuthContext);
  const [allFriendsPosts, setAllFriendsPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [userFriends, setUserFriends] = useState([]);

  async function getFriends () {
    console.log(user._id);
    let response = await axios.get(`http://localhost:3011/api/users/${user._id}/friends`,);
        console.log(response.data.friends);
        setUserFriends (response.data.friends);
    };
    async function getFriendPosts() {
        for (let i = 0; i < userFriends.length; i++) {
          console.log(`userFullf:`, userFriends[i])
          await axios
            .get(`http://localhost:3011/api/users/${userFriends[i]}`)
            .then((response) =>
              setFriends((friends) => [...friends, response.data]),
              console.log(friends)
            );
        }
      }


    useEffect(() => {
		getFriends();
    },[])

    useEffect(() => {
        getFriendPosts();
      }, [userFriends]);

return (

//   <div
//  <h1 className="container">Home Page for {user.name}!</h1>;
//   </div>

  <div className ="w-100 mt-3">
        <h3 className="text-center">Friends Posts</h3>
        {friends && friends.map((friend,i) => { 
            return (
                <div key= {i} className="list-group-item mb-3 ml-0 w-100 p-0">
                    <div className="d-flex bg-primary text-white p-2">
                    <h5 className="w-75"> {friend.post}</h5>
                    </div>
                    {/* <p className="msgtxt p-3">{post.post} </p> */}
                                                  
                                                    
                </div>                
            )}
        )}
    </div>

)};

export default HomePage;
