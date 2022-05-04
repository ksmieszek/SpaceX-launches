import client from "graphql/client";
import { gql } from "@apollo/client";
import { LaunchDetails } from "types/interfaces";

export const getLaunchPortion = (id: string) =>
  client.readFragment({
    id: `Launch:${id}`,
    fragment: gql`
      fragment MyFragment on Launch {
        id
        mission_name
        links
      }
    `,
  });

export const getLaunch = (id: string) =>
  client.readFragment({
    id: `Launch:${id}`,
    fragment: gql`
      fragment getWholeLaunch on Launch {
        id
        mission_name
        links {
          video_link
        }
        launch_success
        launch_year
        rocket {
          rocket_name
        }
      }
    `,
  });

export const saveLaunchDetails = (data: LaunchDetails) => {
  const {
    id,
    launch_success,
    launch_year,
    rocket: { rocket_name },
  } = data;

  client.writeFragment({
    id: `Launch:${id}`,
    fragment: gql`
      fragment updateLaunchFragment on Launch {
        launch_success
        launch_year
        rocket {
          rocket_name
        }
      }
    `,
    data: {
      launch_success,
      launch_year,
      rocket: {
        rocket_name,
      },
    },
  });
};

export const saveLaunch = (data: LaunchDetails) => {
  const {
    id,
    mission_name,
    links: { video_link },
  } = data;

  client.writeFragment({
    id: `Launch:${id}`,
    fragment: gql`
      fragment updateWholeLaunchFragment on Launch {
        __typename
        id
        links {
          video_link
        }
        mission_name
      }
    `,
    data: {
      __typename: "Launch",
      id,
      links: {
        video_link,
      },
      mission_name,
    },
  });
  saveLaunchDetails(data);
};
