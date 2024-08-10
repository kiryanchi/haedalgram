// src/pages/MainPage.tsx

import { useEffect, useState } from "react";
import Navigation from "../components/navigation/Navigation";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Post from "../components/post/Post";
import { TPost } from "../types";
import AddPostButton from "../components/post/AddPostButton";
import axios from "axios";
import { HOST } from "../config";

const Main = styled.main`
  width: 600px;
  position: absolute;
  left: 50%;
  transform: translate(-40%);
`;

const PostSection = styled.section``;

const MainPage = () => {
  const { isLoggedIn, user } = useUserStore();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Array<TPost>>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    axios
      .get(`${HOST}/posts/user/${user?.id}`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      });
  }, [user?.id]);

  return (
    <>
      <Navigation />
      <AddPostButton />
      <Main>
        <PostSection>
          {posts.map((post) => (
            <Post
              key={post.id}
              id={post.id}
              user={post.user}
              imageData={post.imageData}
              content={post.content}
              likeCount={post.likeCount}
              isLike={post.isLike}
              createdAt={post.createdAt}
            />
          ))}
        </PostSection>
      </Main>
    </>
  );
};

export default MainPage;
