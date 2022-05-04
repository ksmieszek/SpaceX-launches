import { Input } from "./TextInput.styles";

const TextInput = ({ value, onChange }: { value: string; onChange: (arg: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return <Input value={value} onChange={onChange} />;
};

export default TextInput;
