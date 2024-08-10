// src/components/common/Modal.tsx

import styled from "styled-components";

type Props = {
  title: string;
  close(): void;
  children: JSX.Element;
};

const BackgroundDiv = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
`;

const ContentDiv = styled.div`
  background-color: var(--color-white);
  z-index: 10;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 10px;
`;

const TitleP = styled.p`
  height: 40px;

  line-height: 40px;
  text-align: center;

  border-bottom: 1px solid var(--color-grey-2);
`;

const Modal = ({ title, close, children }: Props) => {
  return (
    <>
      <BackgroundDiv onClick={close} />
      <ContentDiv>
        <TitleP>{title}</TitleP>
        {children}
      </ContentDiv>
    </>
  );
};

export default Modal;
