import styled from "styled-components";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import CreateCabinForm from "./CreateCabinForm";
import useDuplicateCabin from "./useDuplicateCabin";
import Modal from "../../ui/Modal";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
      <TableRow>
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
          <Modal.Open>
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <button
            onClick={() => deleteCabin(id)}
            disabled={isDuplicating || isDeleting}
          >
            <HiTrash />
          </button>
        </div>
      </TableRow>
      <Modal.Window>
        <CreateCabinForm cabin={cabin} />
      </Modal.Window>
    </Modal>
  );
}

export default CabinRow;
