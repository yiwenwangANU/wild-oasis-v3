import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";
import toast from "react-hot-toast";
function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSettings, isPending } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getSettings"] });
      toast.success("Setting updated successfully.");
    },
    onError: () => toast.error("Failed to update settings."),
  });
  return { updateSettings, isPending };
}

export default useUpdateSettings;
