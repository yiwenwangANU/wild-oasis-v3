import { useQuery } from "@tanstack/react-query";
import { getSettings as getSettingsAPI } from "../../services/apiSettings";
function useGetSettings() {
  const { data: settings, isPending } = useQuery({
    queryKey: ["getSettings"],
    queryFn: getSettingsAPI,
  });
  return { settings, isPending };
}

export default useGetSettings;
