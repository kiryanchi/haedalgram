// src/components/modal/SearchModalItem.tsx

import styled from "styled-components";
import ProfileImage from "../common/ProfileImage";
import { useState } from "react";
import axios from "axios";
import { HOST } from "../../config";

type Props = {
  id: number;
  imageData: string;
  name: string;
  username: string;
  isFollowing: boolean;
};

const SearchModalItemLi = styled.li`
  height: 60px;
  margin: 15px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  border-bottom: 1px solid var(--color-grey-2);
`;

const ProfileDiv = styled.div`
  display: flex;
`;

const InfoDiv = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const FollowButton = styled.button`
  width: 100px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-grey-1);

  cursor: pointer;

  &:hover {
    background-color: var(--color-grey-2);
  }
`;

const SearchModalItem = ({
  id,
  imageData,
  name,
  username,
  isFollowing,
}: Props) => {
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
    <SearchModalItemLi>
      <ProfileDiv>
        <ProfileImage size="40px" src={imageData} />
        <InfoDiv>
          <h3>{name}</h3>
          <p>{username}</p>
        </InfoDiv>
      </ProfileDiv>
      <FollowButton onClick={onClickFollow}>
        {following ? "Following" : "Follow"}
      </FollowButton>
    </SearchModalItemLi>
  );
};

export default SearchModalItem;
