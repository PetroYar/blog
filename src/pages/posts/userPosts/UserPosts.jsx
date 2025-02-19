import { useEffect, useState } from "react";
import "./UserPosts.scss";
import { getData } from "../../../../libs/services";
import { useParams } from "react-router-dom";

const UserPosts = (props) => {
  const { id } = useParams();
  const [posts,setPosts] = useState(null)
  useEffect(() => {
    try {
      getData(`/posts/user/${id}`).then((res)=>{
      console.log(res)
      setPosts(res)
    });
    } catch (error) {
      console.error(error)
    }
    
  }, []);

  return <section className="user-posts">{posts&& JSON.stringify(posts)}</section>;
};

export default UserPosts;
