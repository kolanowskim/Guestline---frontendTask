import { useEffect, useState } from "react";
import HotelContainer from "./components/HotelContainer";
import { HotelInterface } from "./interfaces/hotelInterface";
import styled from "styled-components";
import { Rating } from "react-simple-star-rating";
import picture from "./assets/picture.jpg";

function App() {
  const [hotels, setHotels] = useState([]);
  const [searchReating, setSearchReating] = useState(-1); //-1 in the mount of the component
  const [adultsCounter, setAdultsCounter] = useState(0);
  const [childrenCounter, setChildrenCounter] = useState(0);

  const handleRating = (rate: number) => {
    setSearchReating(rate / 20); // I made this with 20 because library supports values 20-40-60-80-100
  };

  const handleAdultsCounter = (operation: string) => {
    if (operation === "minus" && adultsCounter > 0) {
      setAdultsCounter(adultsCounter - 1);
    }

    if (operation === "plus") {
      setAdultsCounter(adultsCounter + 1);
    }
  };

  const handleChildrenCounter = (operation: string) => {
    if (operation === "minus" && childrenCounter > 0) {
      setChildrenCounter(childrenCounter - 1);
    }

    if (operation === "plus") {
      setChildrenCounter(childrenCounter + 1);
    }
  };

  useEffect(() => {
    fetch(`https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG`)
      .then((responde) => responde.json())
      .then((data) => setHotels(data));
  }, []);

  return (
    <Wrapper>
      <Header>
        <CounterWrapper>
          <Rating initialValue={0} onClick={handleRating} ratingValue={0} />
          <AdultsWrapper>
            <p>Adults: </p>
            <button onClick={() => handleAdultsCounter("plus")}>+</button>
            <p>{adultsCounter}</p>
            <button onClick={() => handleAdultsCounter("minus")}>-</button>
          </AdultsWrapper>

          <ChildrenWrapper>
            <p>Children: </p>
            <button onClick={() => handleChildrenCounter("plus")}>+</button>
            <p>{childrenCounter}</p>
            <button onClick={() => handleChildrenCounter("minus")}>-</button>
          </ChildrenWrapper>
        </CounterWrapper>
      </Header>
      <HotelsWrapper>
        {searchReating > -1
          ? hotels
              .filter((hotel: HotelInterface) => {
                if (hotel.starRating == searchReating) {
                  return hotel;
                }
              })
              .map((hotel: HotelInterface) => (
                <HotelContainer
                  key={hotel.id}
                  id={hotel.id}
                  name={hotel.name}
                  address1={hotel.address1}
                  address2={hotel.address2}
                  description={hotel.description}
                  images={hotel.images}
                  starRating={hotel.starRating}
                  adultsCounter={adultsCounter}
                  childrenCounter={childrenCounter}
                ></HotelContainer>
              ))
          : hotels.map((hotel: HotelInterface) => (
              <HotelContainer
                key={hotel.id}
                id={hotel.id}
                name={hotel.name}
                address1={hotel.address1}
                address2={hotel.address2}
                description={hotel.description}
                images={hotel.images}
                starRating={hotel.starRating}
                adultsCounter={adultsCounter}
                childrenCounter={childrenCounter}
              ></HotelContainer>
            ))}
      </HotelsWrapper>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  background-color: black;
  background-image: url(${picture});
  background-position: center;
  width: 100vw;
  height: 20vh;
  position: relative;
`;

const HotelsWrapper = styled.div`
  margin-top: 50px;
`;

const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px 20px 5px 20px;
  box-shadow: 0 0 5px 2px gray;
  background-color: white;
  width: 550px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
`;
const AdultsWrapper = styled.div`
  display: flex;
  align-items: center;

  & button {
    margin: 5px;
    height: 20px;
    background: lightgray;
    border-radius: 20px;
    border: none;
    cursor: pointer;
  }
`;

const ChildrenWrapper = styled.div`
  display: flex;
  align-items: center;

  & button {
    margin: 5px;
    height: 20px;
    background: lightgray;
    border-radius: 20px;
    border: none;
    cursor: pointer;
  }
`;
