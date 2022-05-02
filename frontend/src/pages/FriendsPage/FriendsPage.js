import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import jwtDecode from "jwt-decode";
import "./FriendsPage.css";

const FriendsPage = () => {
  const [userFriends, setUserFriends] = useState([]);
  const [userPending, setUserPending] = useState([]);
  const [friends, setFriends] = useState([]);
  const [pending, setPending] = useState([]);
  const [allPeople, setAllPeople] = useState([]);
  const jwt = localStorage.getItem("token");
  const config = { headers: { Authorization: "Bearer " + jwt } };

  async function getUserFriendInfo() {
    setUserFriends([]);
    setUserPending([]);
    setFriends([]);
    setPending([]);
    let userInfo = await axios.get(
      `http://localhost:3011/api/users/${user._id}`
    );
    //console.log(userInfo.data.friends);
    //console.log(userInfo.data.pending);
    setUserFriends(userInfo.data.friends);
    setUserPending(userInfo.data.pendingFriends);
  }

  async function getAll() {
    setAllPeople([]);
    console.log(jwt);
    let res = await axios.get(`http://localhost:3011/api/users`, config);
    for (let i = 0; i < res.data.length; i++) {
      if (user._id !== res.data[i]._id) {
        setAllPeople((allPeople) => [...allPeople, res.data[i]]);
      }
    }
  }

  async function getFriendInfo() {
    //console.log(`testing`, userFriends)
    setFriends([]);
    for (let i = 0; i < userFriends.length; i++) {
      //console.log(`userFullf:`, userFriends[i]);
      await axios
        .get(`http://localhost:3011/api/users/${userFriends[i]}`)
        .then((response) =>
          setFriends((friends) => [...friends, response.data])
        );
      console.log(friends);
    }
  }

  async function getPendingFriendInfo() {
    setPending([]);
    //console.log(`testing`, userFriends)
    for (let i = 0; i < userPending.length; i++) {
      //console.log(`userFullp:`, userPending[i])
      await axios
        .get(`http://localhost:3011/api/users/${userPending[i]}`)
        .then((response) =>
          setPending((pending) => [...pending, response.data])
        );
    }
  }

  async function handleClickUnfollow(event, unfollowed) {
    event.preventDefault();
    let mainUser = user._id;
    unfollowed = {
      userId: unfollowed._id,
    };
    //console.log(unfollowed);
    await axios.put(
      `http://localhost:3011/api/users/${mainUser}/unfollow`,
      unfollowed
    );
    getUserFriendInfo();
  }

  async function handleClickDecline(event, declined) {
    event.preventDefault();
    setFriends([]);
    setPending([]);
    let mainUser = user._id;
    console.log(declined._id);
    await axios.delete(
      `http://localhost:3011/api/users/${mainUser}/decline/${declined._id}`
    );
    getUserFriendInfo();
  }

  async function handleClickAccept(event, accepted) {
    event.preventDefault();
    setFriends([]);
    setPending([]);
    let mainUser = user._id;
    accepted = {
      userId: accepted._id,
    };
    //console.log(unfollowed);
    await axios.put(`http://localhost:3011/api/users/${mainUser}`, accepted);
    getUserFriendInfo();
  }

  async function handlePendingSubmit(event, requested) {
    event.preventDefault();
    let sender = {
      userId: user._id,
    };
    requested = requested._id;
    await axios.put(
      `http://localhost:3011/api/users/${requested}/pending`,
      sender
    );
  }

  useEffect(() => {
    getUserFriendInfo();
    getAll();
  }, []);

  useEffect(() => {
    getFriendInfo();
  }, [userFriends]);

  useEffect(() => {
    getPendingFriendInfo();
  }, [userPending]);

  const { user } = useContext(AuthContext);
  return (
    <div className="container">
      <h3>Friends Page for {user.name}!</h3>
      <div className="row">
        <div className="col-sm">
          <table className="table">
            <thead>
              <tr>
                <th>Friends</th>
              </tr>
            </thead>
            <tbody>
              {friends &&
                friends.map((friend, index) => {
                  return (
                    <tr>
                      <td key={index}>
                        <img
                          src={`http://localhost:3011/${friend.image}`}
                        ></img>
                        <h5>{friend.name}</h5>
                        <button
                          type="submit"
                          id="deleteFriendButton"
                          onClick={(event) =>
                            handleClickUnfollow(event, friend)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="col-sm">
          <table className="table">
            <thead>
              <tr>
                <th>Pending Friends</th>
              </tr>
            </thead>
            <tbody>
              {pending &&
                pending.map((e, index) => {
                  return (
                    <tr>
                      <td key={index}>
                        <img src={`http://localhost:3011/${e.image}`}></img>
                        <h5>{e.name}</h5>
                        <button
                          type="delete"
                          id="declinePendingButton"
                          onClick={(event) => handleClickAccept(event, e)}
                        >
                          Accept
                        </button>
                        <button
                          type="delete"
                          id="declinePendingButton"
                          onClick={(event) => handleClickDecline(event, e)}
                        >
                          Decline
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="col-sm">
          <table className="table">
            <thead>
              <tr>
                <th>Send Friend Request</th>
              </tr>
            </thead>
            <tbody>
              {allPeople &&
                allPeople.map((a, index) => {
                  return (
                    <tr>
                      <td key={index}>
                        <img src={`http://localhost:3011/${a.image}`}></img>
                        <h5>{a.name}</h5>
                        <button
                          type="submit"
                          id="SendPendingButton"
                          onClick={(event) => handlePendingSubmit(event, a)}
                        >
                          Send Request
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
