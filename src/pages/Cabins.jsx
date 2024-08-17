import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import styled from "styled-components";
import { useState } from "react";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Modal from "../ui/Modal";
const StyledCabins = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
function Cabins() {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal = () => setIsOpen(true);
  return (
    <>
      <StyledCabins>
        <Row type="horizontal">
          <Heading as="h1">All cabins</Heading>
          <p>Filter/Sort</p>
        </Row>
        <CabinTable />
        <div>
          <Button onClick={() => handleOpenModal()}>Add new cabin</Button>
        </div>
        <Modal isOpen={isOpen} handleCloseModal={handleCloseModal}>
          <CreateCabinForm handleCloseModal={handleCloseModal} />
        </Modal>
      </StyledCabins>
    </>
  );
}

export default Cabins;
