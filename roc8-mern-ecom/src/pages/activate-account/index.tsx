import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { number } from "zod";

const ActivateAccount = () => {
  const [otp, setOtp] = useState<string[]>(Array(8).fill(""));

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && index > 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const code = otp.join("");

  //   console.log({ code });

  return (
    <>
      <Head>
        <title>Activate account - Ecommerce</title>
        <meta
          name="description"
          content="Activate account page for Roc8 Mern Assignment"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto my-10 flex  max-w-fit flex-col items-start justify-start gap-7 rounded-lg border border-gray-400 px-10 py-7">
          <h1 className="self-center text-2xl font-bold">Verify your email</h1>

          <p>Enter the 8 digit code you have received on your email</p>

          <div>
            <p>Code</p>

            <div className="my-2 flex items-center justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="h-10 w-10 rounded border border-gray-300 text-center"
                />
              ))}
            </div>
          </div>

          <Link href={"/login"} className="w-full self-center">
            <button className="w-full  rounded-md bg-black px-5 py-2 tracking-wider text-white">
              Verify
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default ActivateAccount;
