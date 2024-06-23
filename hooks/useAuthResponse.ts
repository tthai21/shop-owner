// useAuth.js
import { useRouter } from 'next/router';

const useAuthResonse = () => {
  const router = useRouter();

  const authenticateAndRedirect = (token: string, refreshToken: string) => {
    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("refreshToken", refreshToken);
    router.push("/dashboard");
  };

  return authenticateAndRedirect;
};

export default useAuthResonse;