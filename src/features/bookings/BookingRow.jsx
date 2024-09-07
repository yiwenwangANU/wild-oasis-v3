import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiClipboardCheck, HiDotsVertical } from "react-icons/hi";
import { HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const navigate = useNavigate();
  const { checkout } = useCheckout();
  const { deleteBooking, isPending: isDeleteBooking } = useDeleteBooking();
  const handleDeleteBooking = () => {
    deleteBooking(bookingId);
  };
  return (
    <>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus>
          <Menus.MenusOpen id={bookingId}>
            <HiDotsVertical />
          </Menus.MenusOpen>
          <Menus.MenusList id={bookingId}>
            <Menus.MenusItem
              onClick={() => {
                navigate(`/booking/${bookingId}`);
              }}
            >
              <HiEye /> See Detail
            </Menus.MenusItem>

            {status === "unconfirmed" && (
              <Menus.MenusItem
                onClick={() => {
                  navigate(`/checkin/${bookingId}`);
                }}
              >
                <HiClipboardCheck /> Check In
              </Menus.MenusItem>
            )}
            {status === "checked-in" && (
              <Menus.MenusItem onClick={() => checkout(bookingId)}>
                <HiClipboardCheck /> Check Out
              </Menus.MenusItem>
            )}
            <Modal.Open>
              <Menus.MenusItem>
                <HiTrash /> Delete Booking
              </Menus.MenusItem>
            </Modal.Open>
          </Menus.MenusList>
        </Menus>
        <Modal.Window>
          <ConfirmDelete
            resourceName={`Booking ${bookingId}`}
            onConfirm={handleDeleteBooking}
            disabled={isDeleteBooking}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingRow;
