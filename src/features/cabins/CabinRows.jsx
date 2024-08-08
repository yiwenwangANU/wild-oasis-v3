import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import useGetCabins from "./useGetCabins";

function CabinRows() {
  const { cabins, isPending } = useGetCabins();
  if (isPending) return <Spinner />;
  return (
    <>
      {cabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </>
  );
}

export default CabinRows;
