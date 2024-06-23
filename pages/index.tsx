import Login from "@/components/Login";
import { GoogleOAuthProvider } from '@react-oauth/google';
import googleOAuthConfig from '../config/googleOAuthConfig';

export default function Home() {
  return (
    <GoogleOAuthProvider clientId={googleOAuthConfig.clientId}>
      <main>
        <Login />
      </main>
    </GoogleOAuthProvider>
  );
}
