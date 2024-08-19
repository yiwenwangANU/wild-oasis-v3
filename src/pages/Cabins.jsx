import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import styled from "styled-components";
import AddNewCabin from "../features/cabins/AddNewCabin";
const StyledCabins = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
function Cabins() {
  return (
    <>
      <StyledCabins>
        <Row type="horizontal">
          <Heading as="h1">All cabins</Heading>
          <p>Filter/Sort</p>
        </Row>
        <CabinTable />
        <AddNewCabin />
      </StyledCabins>
    </>
  );
}

export default Cabins;
