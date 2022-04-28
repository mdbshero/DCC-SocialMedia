import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const FriendsPage = () => {
  const [userFriends, setUserFriends] = useState();
  const [userPending, setUserPending] = useState();
  const [friends, setFriends] = useState([]);
  const [pending, setPending] = useState([]);

  async function getUserFriendInfo() {
    let userInfo = await axios.get(
      `http://localhost:3011/api/users/${user._id}`
    );
    console.log(userInfo.data.friends);
    console.log(userInfo.data.pending);
    setUserFriends(userInfo.data.friends);
    setUserPending(userInfo.data.pendingFriends)
  }


  async function getFriendInfo() {
    //console.log(`testing`, userFriends)
    for (let i = 0; i < userFriends.length; i++) {
      console.log(`userFullf:`, userFriends[i])
      await axios
        .get(`http://localhost:3011/api/users/${userFriends[i]}`)
        .then((response) =>
          setFriends((friends) => [...friends, response.data.name])
        );
    }
  }

  async function getPendingFriendInfo() {
    //console.log(`testing`, userFriends)
    for (let i = 0; i < userPending.length; i++) {
      console.log(`userFullp:`, userPending[i])
      await axios
        .get(`http://localhost:3011/api/users/${userPending[i]}`)
        .then((response) =>
          setPending((pending) => [...pending, response.data.name])
        );
    }
  }

  useEffect(() => {
    getUserFriendInfo();
  }, []);

  useEffect(() => {
    getFriendInfo();
  }, [userFriends]);

  useEffect(() => {
    getPendingFriendInfo();
  }, [userPending]);

  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1 className="container">Friends Page for {user.name}!</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Friends</th>
              <th>Pending Friends</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {friends &&
                friends.map((friend, index) => {
                  return (
                    <td key={index}>
                      <h5>{friend}</h5>
                    </td>
                  );
                })}
              {pending &&
                pending.map((e, index) => {
                  return (
                    <td key={index}>
                      <h5>{e}</h5>
                    </td>
                  );
                })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FriendsPage;
