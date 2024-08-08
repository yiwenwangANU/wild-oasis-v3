import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import styled from "styled-components";
const StyledCabins = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
function Cabins() {
  return (
    <StyledCabins>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter/Sort</p>
      </Row>
      <CabinTable />
      <div>
        <Button>Add new cabin</Button>
      </div>
    </StyledCabins>
  );
}

export default Cabins;
