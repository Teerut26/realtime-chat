import React from "react";
import { Room } from "../Interfaces/Room";
import { MdOutlineAddBox } from "react-icons/md";
import Link from "next/link";

interface RoomLists {
  RoomListsFromApi: Array<Room>;
}

export default function RoomLists(props: RoomLists) {
  return (
    <div className="flex flex-col gap-2 w-full max-w-xl mx-auto">
      <Link href="/create">
      <button className="btn-primary rounded-md flex items-center justify-center p-2 gap-1">
        <div className="text-xl">
          <MdOutlineAddBox />
        </div>
        <div>สร้างห้อง</div>
      </button></Link>
      <hr />
      <div>รายการห้อง</div>
      <div className="flex flex-col gap-3">
        {props.RoomListsFromApi.map((room) => (
         <Room room={room} />
        ))}
      </div>
    </div>
  );
}

const Room = (props: { room: Room }) => {
    return (
        <div className="flex justify-between w-full border-2 p-2 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-green-500 rounded-full" />
          <div>{props.room.title}</div>
        </div>
        <div>{props.room.members.length}</div>
      </div>
    )
};
