import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useGetBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortValue = searchParams.get("sortby");
  const { data: bookings, isPending } = useQuery({
    queryKey: ["getBookings", filterValue, sortValue],
    queryFn: () => getBookings(filterValue, sortValue),
  });
  return { bookings, isPending };
}

export default useGetBookings;
