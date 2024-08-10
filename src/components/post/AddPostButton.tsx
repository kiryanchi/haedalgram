// src/components/post/AddPostButton.tsx

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import useModalStore from "../../store/modalStore";
import AddPostModal from "../modal/AddPostModal";

const Button = styled.button`
  width: 50px;
  height: 50px;

  position: fixed;
  bottom: 40px;
  right: 64px;

  border: none;
  background-color: var(--color-blue-1);
  border-radius: 20px;

  &:hover {
    background-color: var(--color-blue-2);
  }
`;

const AddPostButton = () => {
  const { isOpenAddPostModal, openAddPostModal } = useModalStore();

  const onClickOpenAddPostModal = () => {
    openAddPostModal();
  };

  return (
    <>
      <Button onClick={onClickOpenAddPostModal}>
        <FontAwesomeIcon icon={faPlus} size="xl" color="white" />
      </Button>
      {isOpenAddPostModal && <AddPostModal />}
    </>
  );
};

export default AddPostButton;
