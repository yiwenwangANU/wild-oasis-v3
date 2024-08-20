import styled from "styled-components";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import CreateCabinForm from "./CreateCabinForm";
import useDuplicateCabin from "./useDuplicateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, image, name, maxCapacity, regularPrice, discount } = cabin;
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isDuplicating, duplicateCabin } = useDuplicateCabin();

  const handlePrice = (price) => `$${parseFloat(price).toFixed(2)}`;
  const handleDiscount = (discount) => {
    if (+discount <= 0) return "--";
    else return handlePrice(discount);
  };

  return (
    <Modal>
      <Table.TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fit up to {maxCapacity} guests</div>
        <Price>{handlePrice(regularPrice)}</Price>
        <Discount>{handleDiscount(discount)}</Discount>
        <div>
          <button
            onClick={() => duplicateCabin(cabin)}
            disabled={isDuplicating || isDeleting}
          >
            <HiSquare2Stack />
          </button>
          <Modal.Open name="editCabin">
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Open name="deleteCabin">
            <button disabled={isDuplicating || isDeleting}>
              <HiTrash />
            </button>
          </Modal.Open>
        </div>
      </Table.TableRow>
      <Modal.Window name="editCabin">
        <CreateCabinForm cabin={cabin} />
      </Modal.Window>
      <Modal.Window name="deleteCabin">
        <ConfirmDelete
          resourceName={cabin.name}
          disabled={isDuplicating || isDeleting}
          onConfirm={() => deleteCabin(id)}
        />
      </Modal.Window>
    </Modal>
  );
}

export default CabinRow;
