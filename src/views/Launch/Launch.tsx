import { useEffect, useState } from "react";
import { ApolloQueryResult } from "@apollo/client";
import { LaunchDetails } from "types/interfaces";
import { getLaunchPortion, saveLaunchDetails, getLaunch, saveLaunch } from "graphql/cacheQueries";
import { QUERY_LAUNCH, QUERY_LAUNCH_DETAILS } from "graphql/queries";
import { useLazyQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Wrapper } from "./Launch.styles";

const renderResult = ({ launch }: { launch: LaunchDetails }): JSX.Element => {
  const videoLink = launch.links.video_link.split(/[/,=]/g);
  const videoLinkId = videoLink[videoLink.length - 1];
  return (
    <>
      <iframe
        width="420"
        height="315"
        src={`https://youtube.com/embed/${videoLinkId}`}
        frameBorder="0"
        allowFullScreen
        title={launch.mission_name}
      ></iframe>
      <p>Mission name: {launch.mission_name}</p>
      <p>Launch success: {launch.launch_success ? "successed" : "failed"}</p>
      <p>Rocket name: {launch.rocket.rocket_name}</p>
      <p>Launch year: {launch.launch_year}</p>
    </>
  );
};

const Launch = () => {
  const { id }: { id: string } = useParams();
  const [launch, setLaunch] = useState<{
    loading: boolean;
    error: boolean;
    data:
      | undefined
      | {
          launch: LaunchDetails;
        };
  }>({
    loading: true,
    error: false,
    data: undefined,
  });
  const [getQueryLaunch] = useLazyQuery(QUERY_LAUNCH, {
    fetchPolicy: "no-cache",
  });
  const [getQueryLaunchDetails] = useLazyQuery(QUERY_LAUNCH_DETAILS, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    findCachedLaunch();
  }, []);

  const findCachedLaunch = () => {
    const launchData = getLaunch(id);
    if (launchData) {
      setLaunch({ ...launch, loading: false, data: { launch: { ...launchData } } });
    } else if (getLaunchPortion(id)) {
      fetchLaunch(getQueryLaunchDetails, saveLaunchDetails);
    } else {
      fetchLaunch(getQueryLaunch, saveLaunch);
    }
  };

  const fetchLaunch = (getFunc: (arg: any) => Promise<ApolloQueryResult<any>>, updateFunc: (arg: any) => void) => {
    getFunc({ variables: { launchId: id } })
      .then((res: any) => res.data.launch)
      .then((data: any) => updateFunc({ id, ...data }))
      .then(() => setLaunch({ ...launch, loading: false, data: { launch: { ...getLaunch(id) } } }))
      .catch(() => setLaunch({ ...launch, loading: false, error: true }));
  };

  return (
    <Wrapper>
      {launch.data && <div>{renderResult(launch.data)}</div>}
      {launch.loading && <h1>Loading...</h1>}
      {launch.error && <h1>Couldn't load item</h1>}
    </Wrapper>
  );
};

export default Launch;
