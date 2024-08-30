import styled from "styled-components";
import Filter from "../ui/Filter";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import SortBy from "../ui/SortBy";
import BookingTable from "../features/bookings/BookingTable";
const StyledBookings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
`;
function Bookings() {
  return (
    <>
      <StyledBookings>
        <Row type="horizontal">
          <Heading as="h1">All Bookings</Heading>
          <StyledContainer>
            <Filter
              type="status"
              options={[
                { label: "All", value: "all" },
                { label: "Checked out", value: "checked-out" },
                { label: "Checked in", value: "checked-in" },
                { label: "Unconfirmed", value: "unconfirmed" },
              ]}
              defaultOption="all"
            />
            <SortBy
              type="sortby"
              options={[
                { label: "Sort by date(recent first)", value: "date-desc" },
                { label: "Sort by date(earlier first)", value: "date-asc" },
                { label: "Sort by amount(high first)", value: "price-desc" },
                { label: "Sort by amount(low first)", value: "price-asc" },
              ]}
            />
          </StyledContainer>
        </Row>
        <BookingTable />
      </StyledBookings>
    </>
  );
}

export default Bookings;
