import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import BookingRow from "./BookingRow";
import useGetBookings from "./useGetBookings";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { bookings, count, isPending } = useGetBookings();
  if (isPending) return <Spinner />;
  return (
    <Table
      $columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem"
      data={bookings}
      render={(booking) => (
        <Table.TableRow key={booking.id}>
          <BookingRow key={booking.id} booking={booking} />
        </Table.TableRow>
      )}
    >
      <Table.TableHeader>
        <div>Cabin</div>
        <div>Guest</div>
        <div>Dates</div>
        <div>Status</div>
        <div>Amount</div>
        <div></div>
      </Table.TableHeader>
      <Table.TableBody />
      <Table.TableFooter>
        <Pagination count={count} />
      </Table.TableFooter>
    </Table>
  );
}

export default BookingTable;
