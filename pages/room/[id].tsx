import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { Member } from "../../Interfaces/Member";
import { Message } from "../../Interfaces/Message";
import WithNavbar from "../../layouts/WithNavbar";

const GET_ROOM = gql`
  query ($id: String) {
    getRoom(id: $id) {
      id
      title
      messages {
        content
        author {
          username
        }
      }
      members {
        username
      }
    }
  }
`;

export default function Room() {
  const rounter = useRouter();
  const { id } = rounter.query;
  const { loading, error, data, refetch } = useQuery(GET_ROOM, {
    variables: { id },
  });
  const [Data, setData] = useState(null);

  useEffect(() => {
    if (data) {
      if (data.getRoom.length !== 0) {
        setData(data.getRoom[0]);
      }
    }
  }, [data]);

  useEffect(() => {
    setInterval((): void => {
      refetch();
    }, 1000);
  }, []);

  if (!Data) {
    return <></>;
  }

  return (
    <>
      <WithNavbar>
        {/* <div
          onClick={() => refetch()}
          className="btn btn-primary absolute z-99"
        >
          adsf
        </div> */}
        <Panel Data={Data} />
      </WithNavbar>
    </>
  );
}

interface Panel {
  Data: {
    id: string;
    title: string;
    messages: Array<Message>;
    members: Array<Member>;
  };
}

const Panel = (props: Panel) => {
  const SEND_MESSAGE = gql`
    mutation ($content: String!, $roomID: String!, $author: MemberInput!) {
      sendMessage(content: $content, roomID: $roomID, author: $author) {
        content
        author {
          username
        }
      }
    }
  `;
  const [message, setMessage] = useState<string>("");
  const [sendMessage, { data, loading, error }] = useMutation(SEND_MESSAGE);

  const Submit = (e: any) => {
    e.preventDefault();
    if (message.length === 0) return;
    sendMessage({
      variables: {
        content: message,
        roomID: props.Data.id,
        author: {
          username: localStorage.getItem("username"),
        },
      },
    });
    setMessage("");
  };

  return (
    <>
      <div className="top-[3.5rem] z-10 bottom-[2.5rem] right-0 left-0 absolute flex flex-col gap-2 p-3">
        <div>{props.Data.title}</div>
        <div className="flex h-full w-full">
          <div className="flex flex-col gap-2 -full w-full">
            <div className="border rounded-xl h-[90%] w-full flex flex-col p-3 overflow-y-auto gap-3">
              {props.Data.messages.map((message, index) => (
                <div
                  className={`flex ${
                    message.author.username === localStorage.getItem("username")
                      ? "justify-end"
                      : "justify-start"
                  }`}
                  key={index}
                >
                  <div className="flex flex-col ">
                    {message.author.username !==
                    localStorage.getItem("username") ? (
                      <div className="drop-shadow-md">
                        {message.author.username}
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="border-2 px-3 rounded-lg shadow-md">
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={Submit} className="input-group">
              <input
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                type="text"
                className="form-control"
                placeholder="Username"
              />
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </form>
          </div>
          <div className="flex flex-col px-3">
            {props.Data.members.map((item, index) => (
              <div key={index}>{item.username}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
