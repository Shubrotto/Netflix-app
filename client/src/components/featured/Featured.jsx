import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import "./featured.scss";

const Featured = ({ type }) => {
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantacy">Fantacy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img
        src="https://shoutingstars.com/wp-content/uploads/2022/06/kk.jpg"
        alt=""
      />
      <div className="info">
        <img
          src="https://www.themoviedb.org/t/p/original/lXMeUVvpo49g563COiVtK8I8u8r.png"
          alt=""
        />
        <span className="desc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente,
          culpa? Sunt, ad. Quisquam doloribus ipsam quis corrupti ipsa rerum,
          ratione, blanditiis eos dignissimos deserunt mollitia, repellendus
          eius praesentium expedita vitae!
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
