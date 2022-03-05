import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import WithNavbar from "./../layouts/WithNavbar";

const ADD_ROOM = gql`
  mutation ($title: String!, $username: String!) {
    addRoom(title: $title, initMember: { username: $username }) {
      id
    }
  }
`;

export default function create() {
  const [addRoom, { data }] = useMutation(ADD_ROOM);
  const router = useRouter();
  const [RoomName, setRoomName] = useState<string>("");
  const rounter = useRouter();

  useEffect(() => {
    if (localStorage.getItem("username") === null) router.push("/username");
  }, []);

  useEffect(() => {
    if (data) {
      rounter.push("/room/" + data.addRoom.id);
    }
  }, [data]);

  const Submit = (e: any) => {
    e.preventDefault();
    addRoom({
      variables: {
        title: RoomName,
        username: localStorage.getItem("username") || null,
      },
    });
  };

  return (
    <WithNavbar>
      <div className="py-3 max-w-xl mx-auto px-3 flex flex-col">
        <form onSubmit={Submit} className="flex flex-col gap-3">
          <div>
            <label htmlFor="exampleInputEmail1" className="form-label">
              ชื่อห้อง
            </label>
            <input
              onChange={(e) => setRoomName(e.target.value)}
              value={RoomName}
              type="text"
              className="form-control"
              placeholder="ชื่อห้อง"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            สร้างห้อง
          </button>
        </form>
      </div>
    </WithNavbar>
  );
}
