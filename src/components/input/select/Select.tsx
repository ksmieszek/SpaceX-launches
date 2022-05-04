import { SortEnum } from "types/enums";
import { SelectInput } from "./Select.styles";

const Select = ({ value, onChange }: { value: string; onChange: (arg: React.ChangeEvent<HTMLSelectElement>) => void }) => {
  return (
    <SelectInput value={value} onChange={onChange}>
      <option>{SortEnum.Asc}</option>
      <option>{SortEnum.Desc}</option>
    </SelectInput>
  );
};

export default Select;
