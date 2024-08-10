// src/components/profile/ProfilePost.tsx

import { useState } from "react";
import axios from "axios";
import { HOST } from "../../config";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

type Props = {
  id: number;
  imageData: string;
  isLike: boolean;
};

const Div = styled.div`
  width: 33%;
  margin: 1px 1px;

  position: relative;

  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  object-fit: cover;
`;

const LikeButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;

  background-color: transparent;
  border: none;
`;

const ProfilePost = ({ id, imageData, isLike }: Props) => {
  const [like, setLike] = useState(isLike);

  const onClickLike = () => {
    if (!like) {
      axios
        .post(`${HOST}/posts/${id}/like`, null, { withCredentials: true })
        .then(() => {
          setLike(!like);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .delete(`${HOST}/posts/${id}/like`, { withCredentials: true })
        .then(() => {
          setLike(!like);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Div>
      <Image
        onDoubleClick={onClickLike}
        src={`data:image/;base64,${imageData}`}
      />
      <LikeButton onClick={onClickLike}>
        {like ? (
          <FontAwesomeIcon icon={solidHeart} color="red" size="xl" />
        ) : (
          <FontAwesomeIcon icon={regularHeart} color="white" size="xl" />
        )}
      </LikeButton>
    </Div>
  );
};

export default ProfilePost;
