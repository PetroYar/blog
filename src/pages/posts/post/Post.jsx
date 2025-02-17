import { useParams } from "react-router-dom";
import "./Post.scss";
import { useEffect, useState } from "react";
import { getData } from "../../../../libs/services";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getData(`/posts/${postId}`);
        console.log(data);
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, []);

  return (
    <>
      {!post ? (
        <span>loading..</span>
      ) : (
        <div className="post">
          <span>{post.user.username}</span>
          <h1 className="post__title h1-title">{post.title}</h1>
          <div className="post__img">{post?.img}</div>
          <p className="post__description">{post.description}</p>
          <div className="post__comments comments-post">
            <h2 className="comments-post__title h2-title">коментарі</h2>
            <Input textarea rows="5" />
            <Button>додати</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
