import { gql } from "@apollo/client";

export const QUERY_LAUNCHES = gql`
  query LAUNCH_LIST($sort: String = "launch_date_utc", $order: String, $limit: Int, $offset: Int, $find: LaunchFind) {
    launchesPast(sort: $sort, order: $order, limit: $limit, offset: $offset, find: $find) {
      id
      mission_name
      links {
        video_link
      }
    }
  }
`;

export const QUERY_LAUNCH = gql`
  query Query($launchId: ID!) {
    launch(id: $launchId) {
      links {
        video_link
      }
      launch_success
      launch_year
      mission_name
      rocket {
        rocket_name
      }
    }
  }
`;

export const QUERY_LAUNCH_DETAILS = gql`
  query Query($launchId: ID!) {
    launch(id: $launchId) {
      launch_success
      launch_year
      rocket {
        rocket_name
      }
    }
  }
`;
