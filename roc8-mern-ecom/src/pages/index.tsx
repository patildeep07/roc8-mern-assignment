import Head from "next/head";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDataContext } from "~/context/appContext";
import { api } from "~/utils/api";

export default function Home() {
  const router = useRouter();

  const { dispatch } = useDataContext();

  type UserDetailsType = {
    name: string;
    email: string;
    password: string;
  };

  const [userDetails, setUserDetails] = useState<UserDetailsType>({
    name: "",
    email: "",
    password: "",
  });

  const verificationMutation = api.user.sendOtp.useMutation();

  const createNewUser = async () => {
    try {
      const { name, email, password } = userDetails;
      const min = 10000000;
      const max = 99999999;
      const otp = Math.floor(Math.random() * (max - min + 1)) + min;

      if ((name.length && email.length && password.length) > 0) {
        console.log({ userDetails });

        const response = await verificationMutation.mutateAsync({ email, otp });

        console.log(response);

        if (response) {
          dispatch({ type: "SET_OTP", payload: { otp, userDetails } });
          await router.replace("/activate-account");
        }
      } else {
        console.error("Fill all details");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Ecommerce app</title>
        <meta name="description" content="Roc8 Mern Assignment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto my-10 flex min-h-[calc(70vh)] max-w-fit flex-col items-start justify-start gap-5 rounded-lg border border-gray-400 px-10 py-7">
          <h1 className="self-center text-2xl font-bold">
            Create your account
          </h1>

          <div className="flex flex-col">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              placeholder="Enter"
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
              className="my-1 w-[35vw] min-w-[25vw] max-w-[80vw] rounded-md border border-gray-400 px-2 py-1"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Enter"
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              className="my-1 w-[35vw] min-w-[25vw] max-w-[80vw] rounded-md border border-gray-400 px-2 py-1"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Enter"
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
              className="my-1 w-[35vw] min-w-[25vw] max-w-[80vw] rounded-md border border-gray-400 px-2 py-1"
            />
          </div>

          <button
            onClick={createNewUser}
            className="w-full  self-center rounded-md bg-black px-5 py-2 tracking-wider text-white"
          >
            CREATE ACCOUNT
          </button>

          <p className="self-center text-gray-600">
            Have an account?{" "}
            <span className="mx-1 cursor-pointer font-semibold text-black">
              <Link href={"/login"}>LOGIN</Link>
            </span>
          </p>
        </div>
      </main>
    </>
  );
}
