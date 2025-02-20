import { useState } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import "./AddPost.scss";
import { postData } from "../../../libs/services";
import { useNavigate } from "react-router-dom";


const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [validateTitle, setValidateTitle] = useState("");
  const [validateDescription, setValidateDescription] = useState("");
  const navigate = useNavigate();

  const createPost = async (e) => {
    e.preventDefault();
    if (title.length < 5 || title.length > 80) {
      setValidateTitle(
        "Заголовок повинен бути не менше 5  і не більше 80 символів"
      );
      return;
    }
    setValidateTitle("");
    if (description.length < 20 || description.length > 15000) {
      setValidateDescription(
        "Текст повинен бути не менше 20 і не більше 15000 символів "
      );
      return;
    }
    try {
      const newPost = {
        title,
        description,
      };

      postData("/posts", newPost)
        .then((res) => {
          navigate("/posts");
        })
        .catch((error) => {
          if (error.status === 401) {
            navigate("/login");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="add-post">
      <h1 className="add-post__title h1-title">Додати пост</h1>

      <form onSubmit={createPost} className="add-post__form">
        <Input
          type="text"
          label="Заголовок"
          error={validateTitle}
          autoComplete="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          value={description}
          type="text"
          autoComplete="text"
          onChange={(e) => setDescription(e.target.value)}
          rows="15"
          textarea
          error={validateDescription}
          label="Опис"
        />

        {/* <Input type="file" name="img" label="додати фото" accept="image/*" /> */}

        <Button type="submit">Відправити</Button>
      </form>
    </div>
  );
};

export default AddPost;
