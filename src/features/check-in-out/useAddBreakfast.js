import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useAddBreakfast() {
  const { mutate: addBreakfast, isPending } = useMutation({
    mutationFn: ({ id, totalBreakfastPrice }) =>
      updateBooking(id, {
        hasBreakfast: true,
        extrasPrice: totalBreakfastPrice,
      }),
    onError: () => {
      toast.error("Failed to add breakfast.");
    },
  });
  return { addBreakfast, isPending };
}

export default useAddBreakfast;
