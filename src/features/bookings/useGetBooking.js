import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

function useGetBooking(id) {
  const { data: booking, isPending } = useQuery({
    queryKey: ["getBooking"],
    queryFn: () => getBooking(id),
  });
  return { booking, isPending };
}

export default useGetBooking;
