import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Login as LoginAPI } from "../../services/apiAuth";

function useLogin() {
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    status,
  } = useMutation({
    mutationFn: LoginAPI,
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("Login successfully.");
      navigate("/");
    },
    onError: () => toast.error("Failed to login. Incorrect password."),
  });
  return { login, isPending, status };
}

export default useLogin;
