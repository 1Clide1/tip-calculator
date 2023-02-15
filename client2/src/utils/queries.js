// import gql
import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      tipCount
      tipHistory {
        _id
        tip
      }
      percentages {
        _id
        percentage
      }
    }
  }
`;

export const GET_TIPS = gql`
  query tips {
    tips {
      tipHistory {
        tip
      }
    }
  }
`;
