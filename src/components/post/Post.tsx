// src/components/post/Post.tsx

import styled from "styled-components";
import { TPost } from "../../types";
import ProfileImage from "../common/ProfileImage";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import axios from "axios";
import { HOST } from "../../config";

const Div = styled.div`
  padding: 12px;
  min-height: 700px;

  border-bottom: 1px solid var(--color-grey-2);
`;

const InfoDiv = styled.div`
  height: 48px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--color-black-2);
`;

const AuthorDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AuthorSpan = styled.span`
  margin: 0 8px;
  font-weight: bold;
`;

const TimestampSpan = styled.span`
  margin-left: 8px;

  font-weight: lighter;
  color: var(--color-grey-3);
`;

const LikeDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LikeCountP = styled.p`
  margin-right: 8px;
  font-weight: bold;
`;

const LikeButton = styled.button`
  background-color: transparent;

  border: none;
`;

const ImageWrapperDiv = styled.div`
  width: 100%;
  margin: 8px 0;

  position: relative;

  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  object-fit: cover;
`;

const ContentSpan = styled.span`
  white-space: pre-line;
`;

const Post = ({
  id,
  user,
  imageData,
  content,
  likeCount,
  isLike,
  createdAt,
}: TPost) => {
  const [like, setLike] = useState(isLike);
  const [count, setCount] = useState(likeCount);

  const onClickLike = () => {
    if (!like) {
      axios
        .post(`${HOST}/posts/${id}/like`, null, { withCredentials: true })
        .then(() => {
          setLike(!like);
          setCount(count + 1);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .delete(`${HOST}/posts/${id}/like`, { withCredentials: true })
        .then(() => {
          setLike(!like);
          setCount(count - 1);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Div>
      <InfoDiv>
        <AuthorDiv>
          <StyledLink to={`/${user.id}`}>
            <ProfileImage size="40px" src={user.imageData} />
          </StyledLink>
          <StyledLink to={`/${user.id}`}>
            <AuthorSpan>{user.name}</AuthorSpan>
          </StyledLink>
          <TimestampSpan>{` • ${createdAt}`}</TimestampSpan>
        </AuthorDiv>
        <LikeDiv>
          <LikeCountP>{count}</LikeCountP>
          <LikeButton onClick={onClickLike}>
            {like ? (
              <FontAwesomeIcon icon={solidHeart} size="xl" color="red" />
            ) : (
              <FontAwesomeIcon icon={regularHeart} size="xl" color="black" />
            )}
          </LikeButton>
        </LikeDiv>
      </InfoDiv>
      <ImageWrapperDiv onDoubleClick={onClickLike}>
        <Image src={`data:image/;base64,${imageData}`} />
      </ImageWrapperDiv>
      <AuthorSpan>{user.name}</AuthorSpan>
      <ContentSpan>{content}</ContentSpan>
    </Div>
  );
};

export default Post;
