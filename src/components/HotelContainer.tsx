import React, { useEffect, useState } from "react";
import { HotelInterface } from "../interfaces/hotelInterface";
import { RoomInterface } from "../interfaces/roomInterface";
import ImagesSlider from "./ImagesSlider";
import RoomContainer from "./RoomContainer";
import styled from "styled-components";
import { Rating } from "react-simple-star-rating";

const HotelContainer: React.FC<HotelInterface> = ({
  id,
  name,
  address1,
  address2,
  images,
  starRating,
  adultsCounter,
  childrenCounter,
}) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${id}`)
      .then((responde) => responde.json())
      .then((data) => setRooms(data.rooms));
  }, []);

  return (
    <Wrapper>
      <Header>
        <ImageWrapper>
          <ImagesSlider images={images} />
        </ImageWrapper>
        <HotelDescription>
          <h2>{name}</h2>
          <p>{address1}</p>
          <p>{address2}</p>
        </HotelDescription>
        <Rating
          initialValue={0}
          ratingValue={starRating * 20} // I made this with 20 because library supports values 20-40-60-80-100
          readonly={true}
        />
      </Header>
      <RoomsWrapper>
        {rooms
          .filter((room: RoomInterface) => {
            if (adultsCounter <= room.occupancy.maxAdults) {
              return room;
            }
          })
          .filter((room: RoomInterface) => {
            if (childrenCounter <= room.occupancy.maxChildren) {
              return room;
            }
          })
          .map((room: RoomInterface) => (
            <RoomContainer
              key={room.id}
              id={room.id}
              name={room.name}
              longDescription={room.longDescription}
              occupancy={room.occupancy}
            />
          ))}
      </RoomsWrapper>
    </Wrapper>
  );
};

export default HotelContainer;

const Wrapper = styled.div`
  width: 60vw;
  margin: 40px;
  padding: 20px;
  box-shadow: 0 0 5px 2px gray;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid grey;
`;

const ImageWrapper = styled.div`
  margin-right: 5px;
`;

const HotelDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  & h2,
  p {
    margin: 0;
  }
  align-self: flex-start;
  margin-left: 10px;
  margin-right: auto;
`;

const RoomsWrapper = styled.div``;
