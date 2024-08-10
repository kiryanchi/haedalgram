import styled from "styled-components";
import useModalStore from "../../store/modalStore";
import Modal from "../common/Modal";
import React, { useState } from "react";
import axios from "axios";
import { HOST } from "../../config";

const Div = styled.div`
  width: 800px;

  display: flex;
  flex-direction: row;
`;

const ImageDiv = styled.div`
  width: 500px;

  position: relative;

  border-right: 1px solid var(--color-grey-2);

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

  border-bottom-left-radius: 10px;

  object-fit: cover;
`;

const Label = styled.label`
  width: 80px;
  height: 30px;

  color: var(--color-white);
  text-align: center;

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  background-color: var(--color-blue-1);
  border-radius: 8px;

  &:hover {
    background-color: var(--color-blue-2);
  }
`;

const TextArea = styled.textarea`
  padding: 10px;
  width: 300px;
  height: 400px;

  outline: none;
  resize: none;
  border: none;
  border-bottom: 1px solid var(--color-grey-2);
`;

const UploadButton = styled.button`
  width: 60px;
  height: 30px;

  position: absolute;
  bottom: 20px;
  right: 30px;

  color: var(--color-white);
  text-align: center;

  background-color: var(--color-blue-1);
  border: none;

  border-radius: 8px;

  &:hover {
    background-color: var(--color-blue-2);
  }
`;

const AddPostModal = () => {
  const { closeAddPostModal } = useModalStore();
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState("");
  const [content, setContent] = useState("");

  const onChangeImgUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      const image = window.URL.createObjectURL(file);
      setImgUrl(image);
      setImgFile(file);
    }
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onClickUploadPost = () => {
    const formData = new FormData();

    formData.append("image", imgFile);
    formData.append("content", content);

    axios
      .post(`${HOST}/posts`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        closeAddPostModal();
      })
      .catch((err) => {
        console.log(err);
        alert("포스트 업로드에 실패하였습니다.");
      });
  };

  return (
    <Modal title="Create a new post" close={closeAddPostModal}>
      <Div>
        <ImageDiv>
          {imgUrl ? (
            <Image src={imgUrl} />
          ) : (
            <>
              <Label htmlFor="input">Upload</Label>
              <input
                id="input"
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={onChangeImgUrl}
              />
            </>
          )}
        </ImageDiv>
        <TextArea
          onChange={onChangeContent}
          value={content}
          placeholder="Write a caption..."
        />
        <UploadButton onClick={onClickUploadPost}>Add</UploadButton>
      </Div>
    </Modal>
  );
};

export default AddPostModal;
