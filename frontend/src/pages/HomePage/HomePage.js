import React, { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const HomePage = (props) => {
  const { user } = useContext(AuthContext);
  const [allFriendsPosts, setAllFriendsPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [userFriends, setUserFriends] = useState([]);

  async function getFriends() {
    console.log(user._id);
    let response = await axios.get(
      `http://localhost:3011/api/users/${user._id}`
    );
    console.log(response.data.friends);
    setUserFriends(response.data.friends);
  }
  async function getFriendPosts() {
    for (let i = 0; i < userFriends.length; i++) {
      console.log(`userFullf:`, userFriends[i]);
      await axios
        .get(`http://localhost:3011/api/users/${userFriends[i]}/posts`)
        .then(
          (response) => setFriends((friends) => [...friends, response.data])
        );
    }
  }

  const flatArray = friends.flatMap(item => item);
  console.log("flat", flatArray)

  const convertDate = flatArray.map(item => 
      ({...item,
      sortDate : new Date(item.dateAdded)
      })
  // console.log( new Date(item.dateAdded));
   // item.dateAdded = Date.parse(item.dateAdded)
  ).sort((date1, date2) => date2.sortDate - date1.sortDate);
  console.log(convertDate)

  useEffect(() => {
    getFriends();
  }, []);

  useEffect(() => {
    getFriendPosts();
    console.log(friends);
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
                    <h5>{f.post}</h5>
                  </td>
                  </tr>
                  )
                })
            }
      </tbody>
    </table>

    // <div>
    //   <h3>Friends Posts</h3>
    //   {friends &&
    //     friends.map((friend, i) => {
    //       return (
    //         <div key={i}>
    //           <div>
    //             <h5> {friend.likes}</h5>
    //           </div>
    //           {/* <p className="msgtxt p-3">{post.post} </p> */}
    //         </div>
    //       );
    //     })}
    // </div>
  );
};

export default HomePage;
