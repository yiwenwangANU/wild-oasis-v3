import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

function useCheckIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkin, isPending } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, {
        status: "checked-in",
        isPaid: true,
      }),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getBooking"] });
      toast.success(`#${data.id} successfully checked in.`);
      navigate(-1);
    },
    onError: () => {
      toast.error("Failed to checked in.");
    },
  });
  return { checkin, isPending };
}

export default useCheckIn;
