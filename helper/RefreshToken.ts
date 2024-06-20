import axios from "axios";
import { useRouter } from "next/router";

export const refreshToken = async () => {
  const router = useRouter();
  try {
    const response = await axios.post("/auth/refresh-token");
    const { authToken, refreshToken } = response.data;
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("refreshToken", refreshToken);
    return { authToken, refreshToken };
  } catch (error) {
    router.push("/session-expired");
    console.error("Failed to refresh token:", error);
    throw error;
  }
};
