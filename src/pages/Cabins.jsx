import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import styled from "styled-components";
import AddNewCabin from "../features/cabins/AddNewCabin";
import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
`;
function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <StyledContainer>
          <Filter
            type="discount"
            options={[
              { label: "All", value: "all" },
              { label: "With Discount", value: "withDiscount" },
              { label: "No Discount", value: "noDiscount" },
            ]}
            defaultOption="all"
          />
          <SortBy
            type="sortby"
            options={[
              { label: "Sort by name(A-Z)", value: "name-asc" },
              { label: "Sort by name(Z-A)", value: "name-desc" },
              { label: "Sort by price(low first)", value: "price-asc" },
              { label: "Sort by price(high first)", value: "price-desc" },
              { label: "Sort by capacity(low first)", value: "capacity-asc" },
              {
                label: "Sort by capacity(high first)",
                value: "capacity-desc",
              },
            ]}
          />
        </StyledContainer>
      </Row>
      <CabinTable />
      <AddNewCabin />
    </>
  );
}

export default Cabins;
