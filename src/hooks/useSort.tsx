import { useHistory } from "react-router-dom";
import { SortEnum } from "types/enums";

export const useSort = () => {
  let history = useHistory();

  const sortValue = Object.values(SortEnum).find((item) => item === new URLSearchParams(window.location.search).get("sort")) || SortEnum.Desc;

  const handleSort = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const url = new URL(window.location.href);
    url.searchParams.set("sort", e.target.value);
    history.push(`${url.pathname}${url.search}`);
  };
  return { sortValue, handleSort };
};
