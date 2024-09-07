import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

function useGetBookings() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const sortValue = searchParams.get("sortby");
  const pageValue = searchParams.get("page") || 1;
  const { data, isPending } = useQuery({
    queryKey: ["getBookings", filterValue, sortValue, pageValue],
    queryFn: () => getBookings(filterValue, sortValue, pageValue),
  });
  const bookings = data?.data || [];
  const count = data?.count || 0;
  return { bookings, count, isPending };
}

export default useGetBookings;
