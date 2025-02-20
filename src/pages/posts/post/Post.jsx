import { Link, useNavigate, useParams } from "react-router-dom";
import "./Post.scss";
import { useEffect, useState } from "react";
import {
  deleteData,
  getData,
  postData,
  updateData,
} from "../../../../libs/services";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { formatDate } from "../../../../libs/formatDate";
import { useAuth } from "../../../../hooks/useAuth";
import Author from "../../../components/author/Author";
import Like from "../../../components/like/Like";
import Loading from "../../../components/loading/Loading";

const Post = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const { user } = useAuth();
  const [data, setData] = useState({
    comments: [],
  });
  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await getData(`/posts/${postId}`);
        setData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, []);

  const addComment = async (postId) => {

    if (description) {
      const newComment = {
        description,
        postId,
      };
      try {
        const addedComment = await postData(`/comments`, newComment);
        setData((prevData) => ({
          ...prevData,
          comments: [...prevData.comments, addedComment],
        }));
        console.log(addedComment);
        setDescription("");
      } catch (error) {
        if (error.status === 401) {
          navigate("/login?msg=need to be authorized");
        }
      }
    }
  };

  const handleDeleteComment = (id) => {
    try {
      deleteData(`/comments/${id}`).then((res) => {
        console.log(res);
        setData((data) => ({
          ...data,
          comments: data.comments.filter((comment) => comment._id !== id),
        }));
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeletePost = async (postId) => {
    console.log(data);
    try {
      deleteData(`/posts/${postId}`).then((res) => {
        navigate("/posts");
        setData({});
      });
    } catch (error) {
      console.error(error);
    }
  };
  const toggleLikesComment = (id) => {
    try {
      updateData(`/comments/like/${id}`)
        .then((res) => {
          console.log(res);
          setData((prevData) => ({
            ...prevData,
            comments: prevData.comments.map((comment) =>
              comment._id === id
                ? {
                    ...comment,
                    likes: res.likes,
                    likesBy: [...res.likesBy],
                  }
                : comment
            ),
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {}
  };
  const toggleLikesPost = (id) => {
    try {
      updateData(`/posts/like/${id}`)
        .then((res) => {
          console.log(res);
          setData((prevData) => ({
            ...prevData,
            likes: res.likes,
            likesBy: [...res.likesBy],
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {}
  };

  return (
    <>
      {!data.title ? (
        <Loading />
      ) : (
        <div className="post">
          <article className="post__wraper">
            <Author userName={data?.user?.username} id={data?.user?._id} />
            <h1 className="post__title h1-title">{data.title}</h1>
            <div className="post__img">{data?.img}</div>
            <p className="post__description">{data.description}</p>

            <Like
              onClick={() => toggleLikesPost(data?._id)}
              count={data?.likes}
            />

            {data?.userId === user?._id && (
              <div className="option">
                <Link className="option__edit" to={`/posts/update/${data._id}`}>
                  <FaEdit />
                </Link>

                <button
                  onClick={() => handleDeletePost(data?._id)}
                  className="option__delete"
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </article>
          <div className="post__comments comments-post">
            <h2 className="comments-post__title h2-title">коментарі</h2>
            {data.comments.length > 0 ? (
              <>
                <ul className="comments-post__list">
                  {data?.comments.map((comment) => {
                    return (
                      <li className="comments-post__item" key={comment._id}>
                        <Author
                          userName={comment?.user?.username}
                          id={comment?.user?._id}
                        />

                        <p>{comment.description}</p>
                        <span>{formatDate(comment?.createdAt)}</span>
                        <button>
                          <Like
                            onClick={() => toggleLikesComment(comment?._id)}
                            count={comment.likes}
                          />
                        </button>
                        {comment?.user?._id === user?._id && (
                          <div className="option">
                            <Link
                              className="edit"
                              // to={`/posts/update/${post._id}`}
                            >
                              <FaEdit />
                            </Link>
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              className="delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : (
              <Loading />
            )}

            <Input
              textarea
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button className="add" onClick={() => addComment(data?._id)}>
              додати
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
