import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import styled from "styled-components";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
const StyledCabins = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
function Cabins() {
  const [showCreateCabinForm, setShowCreateCabinForm] = useState(false);
  const handleCloseForm = () => setShowCreateCabinForm(false);
  return (
    <>
      <StyledCabins>
        <Row type="horizontal">
          <Heading as="h1">All cabins</Heading>
          <p>Filter/Sort</p>
        </Row>
        <CabinTable />
        <div>
          <Button onClick={() => setShowCreateCabinForm(!showCreateCabinForm)}>
            Add new cabin
          </Button>
        </div>
      </StyledCabins>
      {showCreateCabinForm && (
        <CreateCabinForm handleCloseForm={handleCloseForm} />
      )}
    </>
  );
}

export default Cabins;
