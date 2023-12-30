import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomList = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ODFjZWUyODczN2Y4MTNiNWRhNjdmMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMzk2MjQwNCwiZXhwIjoxNzA0Mzk0NDA0fQ.dQlVIawnwRfzK30LdVNGALVTKC2rzjw6z17qg4V3av4",
            },
          }
        );
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomList();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists?.map((list, _id) => (
        <List key={_id} list={list} />
      ))}
    </div>
  );
};

export default Home;
