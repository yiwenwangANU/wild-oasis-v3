import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isPending } = useMutation({
    mutationFn: deleteBookingAPI,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getBookings"] });
      toast.success("Delete booking successfully.");
    },
    onError: () => toast.error("Failed to delete booking."),
  });
  return { deleteBooking, isPending };
}

export default useDeleteBooking;
