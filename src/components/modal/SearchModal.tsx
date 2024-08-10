// src/components/modal/SearchModal.tsx

import styled from "styled-components";
import useModalStore from "../../store/modalStore";
import Modal from "../common/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { HOST } from "../../config";
import useUserStore from "../../store/userStore";
import SearchModalItem from "./SearchModalItem";

type Data = {
  id: number;
  username: string;
  name: string;
  imageData: string;
  isFollowing: boolean;
};

type SearchResponse = {
  data: Data[];
};

const SearchDiv = styled.div`
  width: 600px;
  padding: 10px;

  display: flex;
  flex-direction: column;
`;

const SearchInput = styled.input`
  width: 580px;
  height: 50px;
  padding: 10px;

  font-size: 16px;

  border: none;
  border-radius: 5px;
  background-color: var(--color-grey-2);

  outline: none;
`;

const SearchesUl = styled.ul`
  margin-top: 10px;
  height: 500px;

  list-style: none;

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchModal = () => {
  const { user } = useUserStore();
  const { closeSearchModal } = useModalStore();
  const [searches, setSearches] = useState<Data[]>([]);
  const [username, setUsername] = useState("");

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    const params = { username: username };
    axios
      .get(`${HOST}/users`, { withCredentials: true, params })
      .then((res: SearchResponse) => {
        setSearches(res.data.filter((_user) => _user.id != user?.id));
        console.log(searches);
      });
  }, [searches, user?.id, username]);

  return (
    <Modal close={closeSearchModal} title="Make a following">
      <SearchDiv>
        <SearchInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={onChangeUsername}
        />
        <SearchesUl>
          {searches?.map((search) => (
            <SearchModalItem
              key={search.id}
              id={search.id}
              imageData={search.imageData}
              name={search.name}
              username={search.username}
              isFollowing={search.isFollowing}
            />
          ))}
        </SearchesUl>
      </SearchDiv>
    </Modal>
  );
};

export default SearchModal;
