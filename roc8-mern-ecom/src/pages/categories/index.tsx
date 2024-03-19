import Head from "next/head";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useDataContext } from "~/context/appContext";
// import categories from "../../../public/data";
import { api } from "~/utils/api";

const Index = () => {
  // Redirect if not logged in
  const { state } = useDataContext();
  const { loggedInUser } = state;

  if (!loggedInUser) {
    redirect("/");
  } else {
    console.log(loggedInUser);
  }

  // Pagination

  const [page, setPage] = useState(1);

  const categories = api.category.getCategories.useQuery().data;

  const displayCategoriesNumber = 6;
  const lastCategoryIndex = displayCategoriesNumber * page;
  const firstCategoryIndex = lastCategoryIndex - displayCategoriesNumber;
  const totalPages = (100 / displayCategoriesNumber).toFixed(0);

  const paginationNums = Array(Number(totalPages))
    .fill(1)
    .map((elem: number, idx: number): number => elem + idx);

  const displayCategories = categories?.slice(
    firstCategoryIndex,
    lastCategoryIndex,
  );

  return (
    <>
      <Head>
        <title>Categories - Ecommerce</title>
        <meta
          name="description"
          content="Activate account page for Roc8 Mern Assignment"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="mx-auto my-10 flex  min-w-[50%] max-w-fit flex-col items-start justify-start gap-5 rounded-lg border border-gray-400 px-10 py-7">
          <h1 className="self-center text-2xl font-bold">
            Please mark your interests!
          </h1>

          <p className="self-center">We will keep you notified.</p>

          <p className="font-semibold">My saved interests</p>

          <div>
            {displayCategories?.map(({ category_name: category }) => {
              return (
                <div key={category} className="flex  gap-2">
                  <input
                    className="cursor-pointer"
                    type="checkbox"
                    id={category}
                  />
                  <label className="cursor-pointer" htmlFor={category}>
                    {category}
                  </label>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap gap-5">
            <p>{"<"}</p>
            {paginationNums.map((number) => {
              return (
                <p
                  key={number}
                  onClick={() => setPage(number)}
                  className={`cursor-pointer  underline ${number == page ? "font-bold" : "font-normal"}`}
                >
                  {number}
                </p>
              );
            })}
            <p>{">"}</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
