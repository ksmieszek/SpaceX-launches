import { useState, useRef, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { ListWrapper, Card, Caption, Image, List, Info, FormInputs } from "./Launches.styles";
import { LaunchBasic } from "types/interfaces";
import { QUERY_LAUNCHES } from "graphql/queries";
import { useDebounce } from "hooks/useDebounce";
import { useFilter } from "hooks/useFilter";
import { useSort } from "hooks/useSort";
import Select from "components/input/select/Select";
import TextInput from "components/input/text/TextInput";

const Launches = () => {
  const { filterValue, changeFilter } = useFilter();
  const debouncedFilterHandler = useDebounce(changeFilter);
  const [filterInput, setFilterInput] = useState(filterValue);
  const { sortValue, handleSort } = useSort();
  const observerTarget = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const { loading, error, data, fetchMore } = useQuery(QUERY_LAUNCHES, {
    variables: { order: sortValue, limit: 10, offset: 0, find: { mission_name: filterValue } },
    notifyOnNetworkStatusChange: true,
  });

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterInput(e.target.value);
    debouncedFilterHandler(e);
  };

  const getMoreLaunches = useCallback(() => {
    fetchMore({
      variables: {
        offset: data.launchesPast.length,
      },
    }).then((res: any) => res.data.launchesPast.length === 0 && setHasMore(false));
  }, [data]);

  useEffect(() => {
    setHasMore(true);
  }, [filterValue, sortValue]);

  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver((entries) => entries[0].isIntersecting && getMoreLaunches(), {
      root: document,
      rootMargin: "0px",
      threshold: 1,
    });
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [getMoreLaunches, hasMore]);

  const renderResults = (): Array<JSX.Element> => {
    return data?.launchesPast.map((launch: LaunchBasic, index: number) => {
      const videoLink = launch.links.video_link.split(/[/,=]/g);
      const videoLinkId = videoLink[videoLink.length - 1];
      return (
        <Card key={launch.id} to={`/launch/${launch.id}`} ref={data.launchesPast.length - 1 === index ? observerTarget : null}>
          <Image src={`https://i3.ytimg.com/vi/${videoLinkId}/hqdefault.jpg`} title="YouTube thumbnail" alt="YouTube thumbnail" />
          <Caption>{launch.mission_name}</Caption>
        </Card>
      );
    });
  };

  return (
    <>
      <FormInputs>
        <Select value={sortValue} onChange={handleSort}></Select>
        <TextInput value={filterInput} onChange={handleFilter} />
      </FormInputs>
      <ListWrapper>
        <List>{renderResults()}</List>
        {loading && (
          <Info>
            <h1>Loading...</h1>
          </Info>
        )}
        {error && (
          <Info>
            <h1>Couldn't load items</h1>
          </Info>
        )}
      </ListWrapper>
    </>
  );
};

export default Launches;
