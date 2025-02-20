import React, { useEffect } from "react";

import "./EditPost.scss";
import { useNavigate, useParams } from "react-router-dom";
import { getData, updateData } from "../../../../libs/services";
import { useState } from "react";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
const EditPost = (props) => {
  const [post, setPost] = useState(null);
  const [validateTitle, setValidateTitle] = useState("");
  const [validateDescription, setValidateDescription] = useState("");
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await getData(`/posts/post/${postId}`);
       
        setPost({ title: data.title, description: data.description });
      } catch (error) {
        console.error(error);
      }
    };

    getPost();
  }, [postId]);

  const updatePost = async (e) => {
    e.preventDefault();
    if (post.title.length < 5 || post.title.length > 80) {
      setValidateTitle(
        "Заголовок повинен бути не менше 5  і не більше 80 символів"
      );
      return;
    }

    setValidateTitle("");
    if (post.description.length < 20 ) {
      setValidateDescription(
        "Текст повинен бути не менше 20 символів"
      );
      return;
    }
    try {
      updateData(`/posts/update/${postId}`, post).then(req=>{
        navigate(`/post/${postId}`);
        console.log(req)
      });
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="edit-post">
      {post ? (
        <form onSubmit={updatePost} className="add-post__form">
          <Input
            type="text"
            label="Заголовок"
            error={validateTitle}
            value={post.title}
            onChange={(e) =>
              setPost((prevPost) => ({ ...prevPost, title: e.target.value }))
            }
          />
          <Input
            value={post.description}
            type="text"
            onChange={(e) =>
              setPost((prevPost) => ({
                ...prevPost,
                description: e.target.value,
              }))
            }
            rows="15"
            textarea
            error={validateDescription}
            label="Опис"
          />

          <Input type="file" name="img" label="додати фото" accept="image/*" />

          <Button type="submit">Відправити</Button>
        </form>
      ) : (
        <span>loading..</span>
      )}
    </div>
  );
};

export default EditPost;
