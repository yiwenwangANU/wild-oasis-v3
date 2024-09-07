import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkout, isPending } = useMutation({
    mutationFn: (id) => updateBooking(id, { status: "checked-out" }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getBookings"] });
      toast.success("Checkout successfully.");
      navigate("/bookings");
    },
    onError: () => toast.error("Failed to checkout."),
  });
  return { checkout, isPending };
}

export default useCheckout;
