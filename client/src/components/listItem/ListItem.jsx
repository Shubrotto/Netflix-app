import {
  Add,
  PlayArrow,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import "./listItem.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListItem = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/movies/find/" + item,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODFjZWUyODczN2Y4MTNiNWRhNjdmMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNTU4MjIxMSwiZXhwIjoxNzA2MDE0MjExfQ.wKlQ50GIL9RpeNXxD3MXlZxQZ2NJxmjwffz-Dzt6yH0",
            },
          }
        );
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovie();
  }, [item]);

  return (
    <Link to={{ pathname: "/watch", movie: movie }}>
      <div
        className="list_item"
        style={{ left: `${isHovered && index * 225 - 50 + index * 2.5}` }}
        onMouseLeave={() => setIsHovered(false)}
        onMouseEnter={() => setIsHovered(true)}
      >
        <img src={movie?.img} alt="" />
        {isHovered && (
          <>
            <video src={movie?.trailer} autoPlay={true} loop />
            <div className="item_info">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownAltOutlined className="icon" />
              </div>
              <div className="item_info_top">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default ListItem;
