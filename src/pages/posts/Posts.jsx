import "./Posts.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteData, getData, updateData } from "../../../libs/services";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { formatDate } from "../../../libs/formatDate";
import { useAuth } from "../../../hooks/useAuth";
import { FaEdit, FaTrash } from "react-icons/fa";
import Author from "../../components/author/Author";
import Like from "../../components/like/Like";
import Loading from "../../components/loading/Loading";
import Categories from "../../components/categories/Categories";
const Posts = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    posts: [],
  });

  const _limit = 2;

  const fetchPosts = async (page = 1) => {
    const data = await getData(
      `/posts?_limit=${_limit}&_start=${(page - 1) * _limit}`
    );

    setData(data);
  };

  useEffect(() => {
    fetchPosts(data.currentPage);
  }, [data.currentPage]);

  const handlePrevPage = () => {
    if (data.prevPage) {
      fetchPosts(data.prevPage);

    }
  };

  const handleNextPage = () => {
    if (data.nextPage) {
      fetchPosts(data.nextPage);
    }
  };

  const handleDeletePost = async (postId) => {
    console.log(postId);
    try {
      deleteData(`/posts/${postId}`);
      setData((data) => ({
        ...data,
        posts: data.posts.filter((post) => post._id !== postId),
      }));
    } catch (error) {
      console.error(error);
    }
  };
  const toggleLikesPost = (id) => {
    try {
      updateData(`/posts/like/${id}`)
        .then((res) => {
        
          setData((prevData) => ({
            ...prevData,
            posts: prevData.posts.map((post) =>
              post._id === id
                ? {
                    ...post,
                    likes: res.likes,
                    likesBy: [...res.likesBy],
                  }
                : post
            ),
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {}
  };
  return (
    <section className="posts">
      <nav className="nav-posts">
        <ul className="nav-posts__list">
          <li className="nav-posts__item">
            <Link to={"/create-post"}>створити пост</Link>
          </li>
          <li className="nav-posts__item"> фільтрувати <Categories /></li>
         
        </ul>
      </nav>
      {!data.posts.length > 0 ? (
        <Loading />
      ) : (
        <div className="posts__wraper">
          <ul className="posts__list">
            {data?.posts.map((post) => {
              return (
                <li className="posts__item posts-item" key={post._id}>
                  <div className="posts-item__category">html</div>
                  <Link to={`/post/${post?._id}`}>
                    <h4 className="posts-item__title">{post?.title}</h4>
                  </Link>

                  <Author id={post?.user._id} userName={post.user.username} />
                  {formatDate(post.createdAt)}
                  <Like
                    onClick={() => toggleLikesPost(post?._id)}
                    count={post?.likes}
                  />

                  {post?.userId === user?._id && (
                    <div className="posts-item__option option">
                      <Link
                        className="option__edit"
                        to={`/posts/update/${post._id}`}
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="option__delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <button onClick={handlePrevPage}>
            <FaArrowLeft />
          </button>
          {data.currentPage}/{data.lastPage}
          <button onClick={handleNextPage}>
            <FaArrowRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default Posts;
