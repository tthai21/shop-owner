import React, { useState } from "react";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import { useRouter } from "next/router";
import { Spinner } from "@radix-ui/themes";
import {axiosInstance} from "@/utils/axios";
import CustomGoogleLoginButton from "./CustomGoogleLoginButton";
import useAuthResonse from "@/hooks/useAuthResponse";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("cosynails@gmail.com");
  const [password, setPassword] = useState<string>("cosynails@gmail.com");
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleAuthResponse = useAuthResonse();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/authenticate", payload);

      console.log(response.data);
      if (response.status === 200) {
        handleAuthResponse(response.data.token, response.data.refreshToken)
        setEmail("");
        setPassword("");
      } else {
        throw new Error("Failed to submit booking.");
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return (
    <div className="relative lg:grid lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-2xl text-slate-900 -mt-20 mb-10">
          Shop Owner login
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-3">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className={`mb-4 text-red-700 ${!error && "hidden"} `}>
              Email or password invalid
            </div>
            <div className="flex flex-col items-center justify-between space-y-4">
              <CustomGoogleLoginButton updateLoading={setLoading}/>
              <button
                type="submit"
                className="w-full flex justify-center items-center h-[40px] bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loading ? <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                  <Spinner />
                </div> : "Login"}
              </button>
            </div>
            <div className="mt-5 cursor-pointer">
              <ForgotPasswordDialog />
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center justify-between mt-4 ">
          <div className="mt-4">Or</div>
          <button
            onClick={() => router.push("/signup")}
            className=" mt-4 w-full flex justify-center items-center h-[40px] bg-slate-900 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Join Us Now
          </button>
        </div>
        <div className="cursor-pointer absolute bottom-8">
          Language - Support - Privacy Policy
        </div>
      </div>
      <div>
        <img
          src="https://media.istockphoto.com/id/618331956/photo/staying-connected.jpg?s=1024x1024&w=is&k=20&c=bim23K-awtDZLZRJacck6To1s0-Dua_tVnpa6pcLRk8="
          alt="shop-owner"
          className="object-cover w-full h-full hidden lg:block"
        />
      </div>
    </div>
  );
};

export default Login;
