import React from "react";
import { RoomInterface } from "../interfaces/roomInterface";
import styled from "styled-components";

const RoomContainer: React.FC<RoomInterface> = ({
  name,
  longDescription,
  occupancy,
}) => {
  return (
    <Wrapper>
      <RoomInfo>
        <h4>{name}</h4>
        <p>Adults: {occupancy.maxAdults}</p>
        <p>Children: {occupancy.maxChildren}</p>
      </RoomInfo>
      <h5>{longDescription}</h5>
    </Wrapper>
  );
};

export default RoomContainer;

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid grey;

  & h5 {
    width: 70%;
    margin-left: auto;
  }
`;

const RoomInfo = styled.div`
  flex-shrink: 2;
  width: 30%;
`;
