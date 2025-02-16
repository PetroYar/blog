import "./Posts.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "../../../libs/services";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { formatDate } from "../../../libs/formatDate";
import { useAuth } from "../../../hooks/useAuth";
import { FaEdit, FaTrash } from "react-icons/fa";
const Posts = () => {
  const { user } = useAuth();
  const [data, setData] = useState({
    posts: [],
    currentPage: 1,
    totalPages: 1,
    nextPage: null,
    prevPage: null,
  });

  const _limit = 3;

  const fetchPosts = async (page = 1) => {
    const response = await getData(
      `/posts?_limit=${_limit}&_start=${(page - 1) * _limit}`
    );
    console.log(response);
    setData({
      posts: response.posts,
      currentPage: response.currentPage,
      totalPages: response.lastPage,
      nextPage: response.nextPage,
      prevPage: response.prevPage,
    });
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
  return (
    <section className="posts">
      <nav className="nav-posts">
        <ul className="nav-posts__list">
          <li className="nav-posts__item">
            <Link to={"/addPost"}>створити пост</Link>
          </li>
          <li className="nav-posts__item">
            <Link to={"/myPost"}>мої пости</Link>
          </li>
        </ul>
      </nav>
      {!data.posts.length > 0 ? (
        <span>loading...</span>
      ) : (
        <div className="posts__wraper">
          <ul className="posts__list">
            {data?.posts.map((post) => {
              return (
                <li className="posts__item posts-item" key={post._id}>
                  <Link to={`/post/${post._id}`}>
                    <h4 className="posts-item__title">{post.title}</h4>
                  </Link>
                  <span> Автор</span>
                  <Link
                    className="posts-item__user-name"
                    to={`/${post.user._id}`}
                  >
                    {post.user.username}
                  </Link>
                  {formatDate(post.createdAt)}
                  {post.userId === user._id && (
                    <div className="posts-item__option option">
                      <Link
                        className="option__edit"
                        to={`/post/id=${post._id}`}
                      >
                        <FaEdit />
                      </Link>

                      <button className="option__delete">
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
          {data.currentPage}/{data.totalPages}
          <button onClick={handleNextPage}>
            <FaArrowRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default Posts;
