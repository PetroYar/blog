import { Route, Routes } from "react-router-dom";
import Loyout from "./components/loyout/Loyout";
import "./style.scss";


import Posts from "./pages/posts/Posts";
import Post from "./pages/posts/post/Post";
import AddPost from "./pages/addPost/AddPost";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Tasks from "./pages/tasks/Tasks";
import EditPost from "./pages/posts/editPost/EditPost";


function App() {
  return (
    <Loyout>
      <Routes>
        
        <Route path="/" element={<Posts />} />
        <Route path="post/:postId" element={<Post />} />
        <Route path="create-post" element={<AddPost />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="posts/update/:postId" element={<EditPost />} />
      </Routes>
    </Loyout>
  );
}

export default App;
