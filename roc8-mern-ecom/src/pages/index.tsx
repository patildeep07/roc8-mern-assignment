import Head from "next/head";
import Link from "next/link";

export default function Home() {
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
              className="my-1 w-[35vw] min-w-[25vw] max-w-[80vw] rounded-md border border-gray-400 px-2 py-1"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Enter"
              className="my-1 w-[35vw] min-w-[25vw] max-w-[80vw] rounded-md border border-gray-400 px-2 py-1"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Enter"
              className="my-1 w-[35vw] min-w-[25vw] max-w-[80vw] rounded-md border border-gray-400 px-2 py-1"
            />
          </div>

          <Link href={"/activate-account"} className="w-full self-center">
            <button className="w-full  rounded-md bg-black px-5 py-2 tracking-wider text-white">
              CREATE ACCOUNT
            </button>
          </Link>

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
