import Table from "../../ui/Table";
import useGetCabins from "./useGetCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

function CabinTable() {
  const { cabins, isPending } = useGetCabins();
  if (isPending) return <Spinner />;
  return (
    <Table
      columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"
      data={cabins}
      render={(cabin) => (
        <Table.TableRow>
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
