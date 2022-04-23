const { User, validateLogin, validateUser } = require("../models/user");

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const bcrypt = require("bcrypt");
const express = require("express");
const { Post } = require("../models/post");
const router = express.Router();

//* POST register a new user
router.post("/register", async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send(`Email ${req.body.email} already claimed!`);

    const salt = await bcrypt.genSalt(10);
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      isAdmin: req.body.isAdmin,
    });

    await user.save();
    const token = user.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// POST a valid login attempt
// when a user logs in, a new JWT token is generated and sent if their email/password credentials are correct
router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(`Invalid email or password.`);

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const token = user.generateAuthToken();
    return res.send(token);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// Get all users
router.get("/", [auth], async (req, res) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// DELETE a single user from the database
router.delete("/:userId", [auth, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);
    await user.remove();
    return res.send(user);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

//put user post
//http://localhost:3011/api/users/
router.put("/:userId/newPost", [auth], async (req, res) => {
  try {
    let post = await User.findById(req.params.userId);
    if (!post)
      return res
        .status(400)
        .send(`Post with Id of ${req.params.userId} does not exist!`);

    let newPost = new Post({
      post: req.body.post,
    });
    console.log(newPost);
    post.post.push(newPost);
    await post.save();
    return res.status(201).send(post);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// delete a post
router.delete("/:userId/deletePost/:postId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    for (let i = 0; i < user.post.length; i++) {
      console.log(user.post[i]._id);
      console.log(req.params.postId);
      // if (!user.post[i]._id) {
      // return res
      //   .status(400)
      //   .send(`Post with Id of ${req.params.postId} does not exist!`);
      // }
      if (user.post[i]._id == req.params.postId) {
        user.post[i].remove();console.log("trigger")
        await user.save();
        return res.status(200).send("The post has been deleted!");
      }
    }
    return res.status(400).send("you cannot delete other user's posts");
  } catch (err) {
    res.status(500).send(err);
  }
});

//PUT add an about me
router.put("/:userId/aboutMe", [auth], async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(`User with id ${req.params.userId} does not exist!`);
    let about = await User.findByIdAndUpdate(req.params.userId, req.body);
    return res.send(about);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

// PUT likes and dislikes
router.put("/:userId/post/:postId", async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    if (!user)
      return res
        .status(400)
        .send(
          `Could not find any comments with the ID of ${req.params.userId}`
        );

    const post = user.post.id(req.params.postId);
    if (!post) return res.status(400).send(`There is no post.`);
    post.likes = req.body.likes;
    post.dislikes = req.body.dislikes;

    await user.save();
    return res.send(post);
  } catch (error) {
    return res.status(500).send(`internal server errror: ${error}`);
  }
});

// follow
router.put("/:userId", async (req, res) => {
  // if not same users
  if (req.body.userId !== req.params.userId) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId);
      const currentUser = await User.findById(req.body.userId);
      // if users' followers does not have this particular id
      // it means it is not in users followers list, and hence can be followed
      if (!user.friends.includes(req.body.userId)) {
        await user.updateOne({ $push: { friends: req.body.userId } });
        await currentUser.updateOne({ $push: { friends: req.params.userId } });
        res.status(200).send("User has been followed");
      } else {
        res.status(403).send("You already followed this user!");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(403)("You cannot follow yourself!");
  }
});

// unfollow
router.put("/:userId/unfollow", async (req, res) => {
  // if not same users
  if (req.body.userId !== req.params.userId) {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId);
      const currentUser = await User.findById(req.body.userId);
      if (user.friends.includes(req.body.userId)) {
        await user.updateOne({ $pull: { friends: req.body.userId } });
        await currentUser.updateOne({ $pull: { friends: req.params.userId } });
        res.status(200).send("User has been unfollowed!");
      } else {
        res.status(403).send("You already unfollowed this user!");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(403)("You cannot unfollow yourself!");
  }
});

module.exports = router;
