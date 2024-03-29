import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "./list.scss";
import ListItem from "../listItem/ListItem";
import { useRef, useState } from "react";

const List = ({ list }) => {
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [clickLimit, setClckLimit] = useState(window.innerWidth / 230);

  const listRef = useRef();
  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      listRef.current.style.transform = `TranslateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 10 - clickLimit) {
      setSlideNumber(slideNumber + 1);
      listRef.current.style.transform = `TranslateX(${-230 + distance}px)`;
    }
  };

  return (
    <div className="list">
      <span className="list_title">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIos
          className="slider_arrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {list?.content.map((item, i) => (
            <ListItem key={i} item={item} />
          ))}
        </div>
        <ArrowForwardIos
          className="slider_arrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default List;
