import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateCabin as duplicateCabinAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useDuplicateCabin() {
  const queryClient = useQueryClient();
  const { mutate: duplicateCabin, isPending: isDuplicating } = useMutation({
    mutationFn: duplicateCabinAPI,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getCabins"] });
      toast.success("Cabin duplicate successfully.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDuplicating, duplicateCabin };
}

export default useDuplicateCabin;
