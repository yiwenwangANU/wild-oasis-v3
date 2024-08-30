import styled from "styled-components";
import useDeleteCabin from "./useDeleteCabin";
import { HiDotsVertical, HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import CreateCabinForm from "./CreateCabinForm";
import useDuplicateCabin from "./useDuplicateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

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
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fit up to {maxCapacity} guests</div>
      <Price>{handlePrice(regularPrice)}</Price>
      <Discount>{handleDiscount(discount)}</Discount>
      <div>
        <Menus>
          <Menus.MenusOpen id={id}>
            <HiDotsVertical />
          </Menus.MenusOpen>
          <Menus.MenusList id={id}>
            <div
              onClick={() => duplicateCabin(cabin)}
              disabled={isDuplicating || isDeleting}
            >
              <Menus.MenusItem>
                <HiSquare2Stack /> <div>Duplicate</div>
              </Menus.MenusItem>
            </div>

            <Modal.Open name="editCabin" variant="line">
              <Menus.MenusItem>
                <HiPencil /> Edit
              </Menus.MenusItem>
            </Modal.Open>

            <Modal.Open name="deleteCabin" variant="line">
              <div disabled={isDuplicating || isDeleting}>
                <Menus.MenusItem>
                  <HiTrash /> Delete
                </Menus.MenusItem>
              </div>
            </Modal.Open>
          </Menus.MenusList>
        </Menus>
      </div>

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
