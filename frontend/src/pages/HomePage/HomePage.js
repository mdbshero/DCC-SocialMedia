import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import LikeDislike from "../../components/LikeDislikes/LikeDislikes";

const HomePage = (props) => {
  const { user } = useContext(AuthContext);
  const [allFriendsPosts, setAllFriendsPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [userFriends, setUserFriends] = useState([]);

  async function getFriends() {
    //console.log(user._id);
    let response = await axios.get(
      `http://localhost:3011/api/users/${user._id}`
    );
    //console.log(response.data);
    setUserFriends(response.data.friends);
  }
  async function getFriendPosts() {
    setFriends([]);
    for (let i = 0; i < userFriends.length; i++) {
      await axios
        .get(`http://localhost:3011/api/users/${userFriends[i]}/posts`)
        .then(
          (response) => {
            //console.log(response.data)
            setFriends((friends) =>[...friends, response.data])
          });
    }
  }

  const flatArray = friends.flatMap(item => item);
  //console.log("flat", flatArray)

  const convertDate = flatArray.map(item => 
      ({...item,
      sortDate : new Date(item.dateAdded)
      })
  // console.log( new Date(item.dateAdded));
   // item.dateAdded = Date.parse(item.dateAdded)
  ).sort((date1, date2) => date2.sortDate - date1.sortDate);
  //console.log(convertDate)

  useEffect(() => {
    getFriends();
  }, []);

  useEffect(() => {
    getFriendPosts();
    //console.log(friends);
  }, [userFriends]);

  return (
    //   <div>
    //  <h1 className="container">Home Page for {user.name}!</h
    //   </div>
    <table>
      <thead>
        <tr>
          <td>Friends Posts</td>
        </tr>
      </thead>
      <tbody>
          {convertDate &&
            convertDate.map((f, i) => {
              return (
                  <tr>
                  <td key={i}>
                    <h4>{f.name}</h4>
                    <h5>{f.post}</h5>
                    <LikeDislike f = {f}  getFriendPosts={getFriendPosts}/>
                  </td>
                  </tr>
                  )
                })
            }
      </tbody>
    </table>
  );
};


export default HomePage;
