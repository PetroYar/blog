import { Route, Routes } from "react-router-dom";
import Loyout from "./components/loyout/Loyout";
import "./style.scss";
import Home from "./pages/home/Home";
import Posts from "./pages/posts/Posts";
import Post from "./pages/posts/post/Post";
import AddPost from "./pages/posts/addPost/AddPost";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Tasks from "./pages/tasks/Tasks";

import { getData } from "../libs/services";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function App() {
  // const getProfile = async () => {
  //   try {
  //     const token =
  //       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWY1NzE1ZjhjZWE4MTQwMzk3MmM4NyIsImlhdCI6MTczOTYyNjMyMiwiZXhwIjoxNzQyMjE4MzIyfQ.ybQVFAcyn1zg7bR1gKUZBN69t_RmIZM7F5w102fPRwg";


  //     const response = await fetch("http://localhost:5000/api/user", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`, 
  //         "Content-Type": "application/json",
  //       },
  //     });


  //     const userData = await response.json();
  //     console.log("User data:", userData);
  //     return userData; 
  //   } catch (error) {
  //     console.error("Error fetching profile:", error);
  //   }
  // };
  // getProfile();
  // async function test(params) {
  //   console.log(await getData("/posts"));
  // }
  // test();

  // const { test1 } = useContext(AuthContext);
  // console.log(test1);
  return (
    <Loyout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="posts" element={<Posts />} />
        <Route path="post" element={<Post />} />
        <Route path="addPost" element={<AddPost />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="tasks" element={<Tasks />} />
      </Routes>
    </Loyout>
  );
}

export default App;
