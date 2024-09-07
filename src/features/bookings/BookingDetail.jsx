import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import useGetBooking from "./useGetBooking";
import useCheckout from "../check-in-out/useCheckout";
import Spinner from "../../ui/Spinner";
import useDeleteBooking from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { booking, isPending: isGetBooking } = useGetBooking(bookingId);
  const { checkout, isPending: isCheckout } = useCheckout();
  const { deleteBooking, isPending: isDeleteBooking } = useDeleteBooking();
  const handleCheckIn = () => {
    navigate(`/checkin/${bookingId}`);
  };
  const handleCheckOut = () => {
    checkout(bookingId, { onSettled: () => navigate(-1) });
  };
  const handleDeleteBooking = () => {
    deleteBooking(bookingId, { onSuccess: () => navigate(-1) });
  };
  if (isGetBooking) return <Spinner />;
  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[booking.status]}>
            {booking.status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button
            onClick={handleCheckIn}
            disabled={isCheckout || isDeleteBooking}
          >
            Check in
          </Button>
        )}
        {booking.status === "checked-in" && (
          <Button
            onClick={handleCheckOut}
            disabled={isCheckout || isDeleteBooking}
          >
            Check out
          </Button>
        )}
        <Modal.Open>
          <Button $variation="danger" disabled={isCheckout || isDeleteBooking}>
            Delete booking
          </Button>
        </Modal.Open>
        <Button
          $variation="secondary"
          onClick={moveBack}
          disabled={isCheckout || isDeleteBooking}
        >
          Back
        </Button>
      </ButtonGroup>
      <Modal.Window>
        <ConfirmDelete
          resourceName={`Booking ${bookingId}`}
          onConfirm={handleDeleteBooking}
          disabled={isCheckout || isDeleteBooking}
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingDetail;
