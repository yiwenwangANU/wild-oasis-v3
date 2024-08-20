import CabinRows from "./CabinRows";
import Table from "../../ui/Table";

function CabinTable() {
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.TableHeader>
        <div></div>
        <div>CABIN</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.TableHeader>
      <CabinRows />
    </Table>
  );
}

export default CabinTable;
