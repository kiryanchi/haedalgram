// src/pages/ProfilePage.tsx

import styled from "styled-components";
import Navigation from "../components/navigation/Navigation";
import AddPostButton from "../components/post/AddPostButton";
import { useParams } from "react-router-dom";
import ProfileSection from "../components/profile/ProfileSection";
import { useEffect, useState } from "react";
import axios from "axios";
import { HOST } from "../config";
import ProfilePostSection from "../components/profile/ProfilePostSection";

type Response = {
  data: Data;
};

type Data = {
  id: number;
  username: string;
  imageData: string;
  isFollowing: boolean;
  bio: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
};

const Main = styled.main`
  width: 600px;
  position: absolute;
  left: 50%;
  transform: translate(-40%);
`;

const ProfilePage = () => {
  const { id } = useParams();
  const [data, setData] = useState<Data>({
    id: 0,
    username: "",
    imageData: "",
    isFollowing: false,
    bio: "",
    postCount: 0,
    followerCount: 0,
    followingCount: 0,
  });

  useEffect(() => {
    axios
      .get(`${HOST}/users/${id}/profile`, { withCredentials: true })
      .then((res: Response) => {
        setData(res.data);
      });
  }, [id]);

  return (
    <>
      <Navigation />
      <AddPostButton />
      <Main>
        <ProfileSection
          id={data.id}
          username={data.username}
          imageData={data.imageData}
          bio={data.bio}
          isFollowing={data.isFollowing}
          postCount={data.postCount}
          followerCount={data.followerCount}
          followingCount={data.followingCount}
        />
        <ProfilePostSection />
      </Main>
    </>
  );
};

export default ProfilePage;
