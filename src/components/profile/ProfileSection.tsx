// src/components/profile/ProfileSection.tsx

import styled from "styled-components";
import ProfileImage from "../common/ProfileImage";
import useUserStore from "../../store/userStore";
import { useState } from "react";
import axios from "axios";
import { HOST } from "../../config";

type Props = {
  id: number;
  username: string;
  imageData: string;
  bio: string;
  isFollowing: boolean;
  postCount: number;
  followerCount: number;
  followingCount: number;
};

const Section = styled.section`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  border-bottom: 1px solid var(--color-grey-2);
  margin-bottom: 10px;
`;

const Div = styled.div`
  width: 40%;
  height: 40%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NameFollowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PostFollowerFollowingDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-grey-1);

  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-2);
  }
`;

const BioP = styled.p`
  height: 20%;
`;

const ProfileSection = ({
  id,
  username,
  imageData,
  bio,
  isFollowing,
  postCount,
  followerCount,
  followingCount,
}: Props) => {
  const { user } = useUserStore();
  const [following, setFollowing] = useState(isFollowing);

  const onClickFollow = () => {
    if (!following) {
      axios
        .post(`${HOST}/follows/${id}`, null, { withCredentials: true })
        .then(() => {
          setFollowing(!following);
        });
    } else {
      axios
        .delete(`${HOST}/follows/${id}`, { withCredentials: true })
        .then(() => {
          setFollowing(!following);
        });
    }
  };

  return (
    <Section>
      <ProfileImage size="140px" src={imageData} />
      <Div>
        <NameFollowDiv>
          <h1>{username}</h1>
          {user?.id == id ? (
            <Button>Edit Profile</Button>
          ) : following ? (
            <Button onClick={onClickFollow}>Following</Button>
          ) : (
            <Button onClick={onClickFollow}>Follow</Button>
          )}
        </NameFollowDiv>
        <PostFollowerFollowingDiv>
          <p>{postCount} posts</p>
          <p>{followerCount} followers</p>
          <p>{followingCount} followings</p>
        </PostFollowerFollowingDiv>
        <BioP>{bio}</BioP>
      </Div>
    </Section>
  );
};

export default ProfileSection;
