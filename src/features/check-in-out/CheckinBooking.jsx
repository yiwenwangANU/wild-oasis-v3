import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useParams } from "react-router-dom";
import useGetBooking from "../bookings/useGetBooking";
import Spinner from "../../ui/Spinner";
import { formatCurrency } from "../../utils/helpers";
import Checkbox from "../../ui/Checkbox";
import { useState } from "react";
import useCheckIn from "./useCheckIn";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { checkInId } = useParams();
  const { booking, isPending: isGettingBooking } = useGetBooking(checkInId);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const { checkin, isPending: isCheckingIn } = useCheckIn(checkInId);
  if (isGettingBooking) return <Spinner />;
  const {
    id: bookingId,
    guests: { fullName: guestName },
    totalPrice,
  } = booking;

  function handleConfirmPayment() {
    setConfirmPayment(!confirmPayment);
  }
  function handleCheckin() {
    checkin();
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{checkInId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <Checkbox onChange={handleConfirmPayment} checked={confirmPayment}>
          I confirm that {guestName} has paid the total amount of{" "}
          {formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!confirmPayment || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button
          $variation="secondary"
          disabled={isCheckingIn}
          onClick={moveBack}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
