// src/components/profile/ProfilePostSection.tsx

import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { HOST } from "../../config";
import { TPost } from "../../types";
import ProfilePost from "./ProfilePost";
import { useParams } from "react-router-dom";

type Response = {
  data: TPost[];
};

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const ProfilePostSection = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState<TPost[]>([]);

  useEffect(() => {
    axios
      .get(`${HOST}/posts/user/${id}`)
      .then((res: Response) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <Section>
      {posts.map((post) => (
        <ProfilePost
          key={post.id}
          id={post.id}
          imageData={post.imageData}
          isLike={post.isLike}
        />
      ))}
    </Section>
  );
};

export default ProfilePostSection;
