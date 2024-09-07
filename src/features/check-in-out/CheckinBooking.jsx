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
import useGetSettings from "../settings/useGetSettings";
import useAddBreakfast from "./useAddBreakfast";

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
  const [confirmBreakfast, setConfirmBreakfast] = useState(false);
  const { checkin, isPending: isCheckingIn } = useCheckIn();
  const { addBreakfast, isPending: isAddBreakfast } = useAddBreakfast();
  const { settings, isPending: isGetSettings } = useGetSettings();
  if (isGettingBooking || isGetSettings) return <Spinner />;

  const {
    id: bookingId,
    guests: { fullName: guestName },
    status,
    hasBreakfast,
    numNights,
    numGuests,
    isPaid,
    totalPrice,
  } = booking;
  const totalBreakfastPrice = numGuests * numNights * settings.breakfastPrice;
  function handleConfirmPayment() {
    setConfirmPayment(!confirmPayment);
  }
  function handleConfirmBreakfast() {
    setConfirmBreakfast(!confirmBreakfast);
  }
  function handleCheckin() {
    if (confirmBreakfast) addBreakfast({ id: checkInId, totalBreakfastPrice });
    checkin(checkInId);
  }
  if (status !== "unconfirmed") return null;
  else
    return (
      <>
        <Row type="horizontal">
          <Heading as="h1">Check in booking #{checkInId}</Heading>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />
        {!hasBreakfast && (
          <Box>
            <Checkbox
              onChange={handleConfirmBreakfast}
              checked={confirmBreakfast}
              disabled={isCheckingIn || isAddBreakfast}
            >
              Want to add breakfast for {formatCurrency(totalBreakfastPrice)} ?
            </Checkbox>
          </Box>
        )}
        {!isPaid && (
          <Box>
            <Checkbox
              onChange={handleConfirmPayment}
              checked={confirmPayment}
              disabled={isCheckingIn || isAddBreakfast}
            >
              I confirm that {guestName} has paid the total amount of{" "}
              {hasBreakfast || confirmBreakfast
                ? `${formatCurrency(
                    totalPrice + totalBreakfastPrice
                  )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                    totalBreakfastPrice
                  )})`
                : formatCurrency(totalPrice)}
            </Checkbox>
          </Box>
        )}
        <ButtonGroup>
          <Button
            onClick={handleCheckin}
            disabled={
              !isPaid && (!confirmPayment || isCheckingIn || isAddBreakfast)
            }
          >
            Check in booking #{bookingId}
          </Button>
          <Button
            $variation="secondary"
            disabled={isCheckingIn || isAddBreakfast}
            onClick={moveBack}
          >
            Back
          </Button>
        </ButtonGroup>
      </>
    );
}

export default CheckinBooking;
