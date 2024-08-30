import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

function useCheckIn(id) {
  const queryClient = useQueryClient();
  const { mutate: checkin, isPending } = useMutation({
    mutationFn: () => updateBooking(id, { status: "checked-in", isPaid: true }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getBooking"] });
      toast.success("Checked in Successfully.");
    },
    onError: () => {
      toast.error("Failed to checked in.");
    },
  });
  return { checkin, isPending };
}

export default useCheckIn;
