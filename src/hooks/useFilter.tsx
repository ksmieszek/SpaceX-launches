import { useHistory } from "react-router-dom";

export const useFilter = () => {
  let history = useHistory();

  const filterValue = new URLSearchParams(window.location.search).get("filter") || "";

  const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = new URL(window.location.href);
    url.searchParams.set("filter", e.target.value);
    history.push(`${url.pathname}${url.search}`);
  };

  return { filterValue, changeFilter };
};
