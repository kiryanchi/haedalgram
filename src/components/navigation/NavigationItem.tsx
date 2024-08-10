// src/components/navigation/NavigationItem.tsx

import { IconDefinition, SizeProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

type Props = {
  icon: IconDefinition;
  size: SizeProp;
  text: string;
  onClick?(): void;
};

const Div = styled.div`
  height: 50px;
  padding: 10px;

  display: flex;
  align-items: center;

  border-radius: 5px;

  cursor: pointer;

  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: var(--color-grey-2);
  }
`;

const P = styled.p`
  position: absolute;
  left: 50px;
`;

const NavigationItem = ({ icon, size, text, onClick }: Props) => {
  return (
    <Div onClick={onClick}>
      <FontAwesomeIcon icon={icon} size={size} />
      <P>{text}</P>
    </Div>
  );
};

export default NavigationItem;
