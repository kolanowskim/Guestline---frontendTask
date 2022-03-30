import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect } from "react";
import styled from "styled-components";

interface Images {
  images: {
    url: string;
  }[];
}

const ImagesSlider: React.FC<Images> = ({ images }) => {
  const [counter, setCounter] = useState(0);
  const [urlImage, setUrlImage] = useState("");

  const counterUndo = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  const counterForward = () => {
    if (counter < images.length - 1) {
      setCounter(counter + 1);
    }
  };

  const setCurrentImage = () => {
    setUrlImage(images[counter]?.url);
  };

  useEffect(() => {
    setCurrentImage();
  }, [counter]);

  return (
    <Wrapper url={urlImage}>
      <ArrowUndo onClick={counterUndo} />
      <ArrowForward onClick={counterForward} />
    </Wrapper>
  );
};

export default ImagesSlider;

const Wrapper = styled.div<{ url: string }>`
  width: 20vw;
  height: 15vh;
  position: relative;
  display: flex;
  align-items: center;
  background-image: url(${(p) => p.url});
  background-size: cover;
  background-position: center;
`;

const ArrowUndo = styled(ArrowBackIosIcon)`
  position: absolute;
  background-color: lightgray;
  border-radius: 10%;
  padding: 10px 3px 10px 10px;
  margin-left: 10px;
  cursor: pointer;
`;

const ArrowForward = styled(ArrowForwardIosIcon)`
  position: absolute;
  background-color: lightgray;
  border-radius: 10%;
  padding: 10px 6px 10px 7px;
  margin-right: 10px;
  cursor: pointer;
  right: 0;
`;
