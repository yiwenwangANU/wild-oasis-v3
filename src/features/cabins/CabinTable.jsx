import Table from "../../ui/Table";
import useGetCabins from "./useGetCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { cabins, isPending } = useGetCabins();
  const [searchParams] = useSearchParams();
  if (isPending) return <Spinner />;

  const filterValue = searchParams.get("discount");
  const sortValue = searchParams.get("sortby");
  let filteredCabins =
    filterValue === "withDiscount"
      ? cabins.filter((cabin) => cabin.discount !== 0)
      : filterValue === "noDiscount"
      ? cabins.filter((cabin) => cabin.discount === 0)
      : cabins;

  let sortedCabins =
    sortValue === "name-asc"
      ? filteredCabins.sort((a, b) => a.name.localeCompare(b.name))
      : sortValue === "name-desc"
      ? filteredCabins.sort((a, b) => b.name.localeCompare(a.name))
      : sortValue === "price-asc"
      ? filteredCabins.sort((a, b) => a.regularPrice >= b.regularPrice)
      : sortValue === "price-desc"
      ? filteredCabins.sort((a, b) => a.regularPrice < b.regularPrice)
      : sortValue === "capacity-asc"
      ? filteredCabins.sort((a, b) => a.maxCapacity >= b.maxCapacity)
      : sortValue === "capacity-desc"
      ? filteredCabins.sort((a, b) => a.maxCapacity < b.maxCapacity)
      : filteredCabins;

  return (
    <Table
      columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"
      data={sortedCabins}
      render={(cabin) => (
        <Table.TableRow key={cabin.id}>
          <CabinRow key={cabin.id} cabin={cabin} />
        </Table.TableRow>
      )}
    >
      <Table.TableHeader>
        <div></div>
        <div>CABIN</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.TableHeader>
      <Table.TableBody />
    </Table>
  );
}

export default CabinTable;
