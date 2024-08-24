import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ type, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSelect = (e) => {
    searchParams.set(type, e.target.value);
    setSearchParams(searchParams);
  };
  return (
    <Select onChange={handleSelect}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}

export default SortBy;
