import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts} from "../../services/posts";
import { addCommentToPost } from "../../services/comments";
import { getUserInfo } from "../../services/authentication";
import { createPost } from '../../services/posts'; 
import { getCommentsByPostId } from '../../services/comments'; 
import Post from "../../components/Post/Post";
import PostForm from "../../components/Post/PostForm";
import NavBar from "../../components/NavBar"
import UserInfo from "../../components/UserInfo"


export const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userInfo, setUserInfo] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const userInfoData = await getUserInfo(token);
          setUserInfo(userInfoData);
        } catch (err) {
          console.error('Error fetching user information:', err);
        }
  
        try {
          const fetchedPosts = await getPosts(token);
          const postWithComments = fetchedPosts.posts.map(post => ({
            ...post,
          }))
          setPosts(postWithComments);
        } catch (err) {
          console.error('Error fetching posts:', err);
        }
      } else {
        console.log('No token found, navigating to login.');
        navigate("/login");
      }
    };
  
    fetchData();
  }, [token, navigate]);

const handlePostSubmit = async (formData) => {
    try {
      await createPost(token, formData);
      const updatedPosts = await getPosts(token);
      setPosts(updatedPosts.posts);
    } catch (err) {
      console.error('Error creating post:', err.message);
    }
  };

const handleCommentSubmit = async (postId, commentText) => {
    try {
      const commentResponse = await addCommentToPost(token, postId, commentText);
      const newComment = commentResponse.comment; 
  
      setPosts(currentPosts => currentPosts.map(post => {
        if (post._id === postId) {
          const comments = Array.isArray(post.comments) ? post.comments : [];
          return { ...post, comments: [...comments, newComment] };
        }
        return post;
      }));
    } catch (err) {
      console.error('Error adding comment:', err.message);
    }
  };

  
return (
    <>
      <NavBar />
    {userInfo && (
      <UserInfo
        userName={userInfo.username || 'Default Username'} 
        userEmail={userInfo.email || 'Default Email'} 
        userPicture={userInfo.profilePic ? `http://localhost:3000/${userInfo.profilePic}` : 'default-picture-url'} 
        />
      )}   
      <h1>Create a new Post</h1>
      <PostForm onSubmit={handlePostSubmit} />
      <div className="feed" role="feed">
      {posts.slice().reverse().map((post) => (
      <Post key={post._id} post={post} onDelete={() => handleDelete(post._id)} showDeleteButton={false} onCommentSubmit={handleCommentSubmit} />
      ))}
    </div>
    </>
  );
};

export default FeedPage;