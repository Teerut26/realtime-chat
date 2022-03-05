import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { gql, ApolloServer } from "apollo-server-micro";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
var _ = require("lodash");

let rooms: Array<any> = [
  {
    id: "7ce249a9-23a3-4cdb-a8bb-e4cb057d2a09",
    title: "มาคุยกันครับ",
    messages: [
      {
        content: "สวัสดีครับ",
        author: {
          username: "teerut",
        },
      },
      {
        content: "สวัสดีครับ",
        author: {
          username: "teerut",
        },
      },
      {
        content: "สวัสดีครับ",
        author: {
          username: "teerut",
        },
      },
      {
        content: "สวัสดีครับ",
        author: {
          username: "teerut",
        },
      },
      {
        content: "สวัสดีครับ",
        author: {
          username: "teerut",
        },
      },
    ],
    members: [
      {
        username: "teerut",
      },
    ],
  },
];

const typeDefs = gql`
  type Member {
    username: String!
  }

  input MemberInput {
    username: String!
  }

  type Message {
    content: String!
    author: Member!
  }

  input MessageInput {
    content: String!
    author: MemberInput!
  }

  type Room {
    id: String!
    title: String!
    messages: [Message]
    members: [Member]
  }

  type Query {
    getRooms: [Room]
    getRoom(id: String): [Room]
  }

  type Mutation {
    addRoom(title: String, initMember: MemberInput!): Room
    sendMessage(
      content: String!
      roomID: String!
      author: MemberInput!
    ): Message
  }
`;

const resolvers = {
  Query: {
    getRooms: () => {
      return rooms;
    },
    getRoom: (_: any, { id }: any) => {
      return rooms.filter((item) => item.id === id);
    },
  },
  Mutation: {
    addRoom: (_: any, { title, initMember }: any) => {
      rooms.push({
        id: uuidv4(),
        title,
        members: [{ ...initMember, id: uuidv4() }],
      });
      return {
        id: uuidv4(),
        title,
        members: [{ ...initMember, id: uuidv4() }],
      };
    },
    sendMessage: (test: any, { content, roomID, author }: any) => {
      let result = _.find(rooms, { id: roomID });
      result.messages.push({
        content,
        author,
      });
      let index = _.findIndex(rooms, { id: roomID });
      rooms.splice(index, 1, result);
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
