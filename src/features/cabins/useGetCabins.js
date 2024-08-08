import { useQuery } from "@tanstack/react-query";
import { getCabins as getCabinsAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useGetCabins() {
  const {
    data: cabins,
    isPending,
    error,
  } = useQuery({ queryKey: ["getCabins"], queryFn: getCabinsAPI });
  if (error) {
    toast.error("Failed to get cabin data!");
  }
  return { cabins, isPending };
}

export default useGetCabins;
