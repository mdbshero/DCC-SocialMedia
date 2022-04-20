# SocialMedia_StarterCode-FullStack
Starter code for Social Media with both front/backend and working authentication system for user registration, log in, and log out.

## Directions for Set Up

1. Download the .zip file of the source code to your computer. (If you choose to clone the repository, make sure to remove the `.git` folder from the root directory).
2. Unzip and open the `SocialMedia_StarterCode-FullStack` folder in Visual Studio Code.

### For the `backend` Node/Express/MongoDb application
1. Change directory into the backend folder: `cd backend` from the Integrated Terminal in Visual Studio Code
2. Run the `npm install` command in your terminal to install dependencies from the `package.json` file
3. Create a `.env` file in the `backend` folder (it should rest at the same level in the directory as the `index.js` file)
4. Inside of the `.env` file, create three variables: `MONGODB_CONNECTION_STRING`, `JWT_SECRET`, `PORT`
5. The `MONGODB_CONNECTION_STRING` should be set to your connection string from MongoDb Atlas
6. `JWT_SECRET` can be a string of random numbers, letters, and characters - make it at least 32 characters long
7. Set the `PORT` variable to a four digit port, anything but the number "3000"
8. Save and run the `npm start` command to test your server is running correctly
9. Import the `Social Media Starter.postman_collection.json` file into Postman. For the URL of each request, make sure to change the port number to the one you set in your `.env` file.
10. Be sure to watch the walkthrough video for how to run each test in Postman to verify your server is set up correctly!

> ‼️ NOTE: BE SURE TO .gitignore the `.env` file in your backend before committing to GitHub!

### For the `frontend` React application
1. Change directory into the frontend folder: `cd frontend`. You may need to run the `cd ..` command to get back to your root directory first.
2. Run the `npm install` command to install Node dependencies.
3. Inside of `src/context/AuthContext.js`, find the `BASE_URL` variable (line 11) and make sure the port number of the URL matches the port number you set up in your backend.


