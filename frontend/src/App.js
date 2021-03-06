// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PostPage from "./pages/PostPage/PostPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import FriendsPage from "./pages/FriendsPage/FriendsPage"
import bootstrap from "bootstrap"

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";



function App() {
  return (
    <div>
      <Navbar />
      <body>
      <Routes>
        <Route path="/" element={
        <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/post" element={
          <PrivateRoute>
            <PostPage/>
          </PrivateRoute>
        }
        />

        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage/>
                    </PrivateRoute>
                  }
        />
        <Route path="/friends" element={
          <PrivateRoute>
            <FriendsPage/>
          </PrivateRoute>
        }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      </body>
      <Footer />
    </div>
  );
}

export default App;
