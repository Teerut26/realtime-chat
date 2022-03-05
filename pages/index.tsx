import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { client } from "./../config/ApolloClient";
import { gql } from "apollo-server-micro";
import RoomLists from "../components/RoomLists";
import WithNavbar from "../layouts/WithNavbar";
import { Room } from "../Interfaces/Room";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  const [RoomListsFromApi, setRoomListsFromApi] = useState<Array<Room>>([]);

  useEffect(() => {
    (async () => {
      let { data } = await client.query({
        query: gql`
          query {
            getRooms {
              id
              title
              members {
                username
              }
            }
          }
        `,
      });
      setRoomListsFromApi(data.getRooms);
    })();
  },[]);

  useEffect(() => {
    if (localStorage.getItem("username") === null) router.push("/username");
  }, []);

  return (
    <WithNavbar>
      <div className="flex flex-col justify-center items-center py-3 container-sm">
        <RoomLists RoomListsFromApi={RoomListsFromApi} />
      </div>
    </WithNavbar>
  );
};

export default connect((state) => {
  return state;
})(Home);
