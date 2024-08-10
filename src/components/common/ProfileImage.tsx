// src/components/common/ProfileImage.tsx

import styled from "styled-components";
import default_profile from "../../assets/default_profile.png";

type Param = {
  size: string;
  src: string;
};

const ProfileImageWrapper = styled.div<{ size?: string }>`
  position: relative;
  width: ${(props) => (props.size ? props.size : "60px")};
  height: ${(props) => (props.size ? props.size : "60px")};
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  border-radius: 50%;
`;

const ProfileImage = ({ size, src }: Param) => {
  return (
    <ProfileImageWrapper size={size}>
      <Image src={src ? `data:image/;base64,${src}` : default_profile} />
    </ProfileImageWrapper>
  );
};

export default ProfileImage;
