import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDataContext } from "~/context/appContext";
// import categories from "../../../public/data";
import { api } from "~/utils/api";

const Index = () => {
  // Redirect if not logged in
  const router = useRouter();

  const { dispatch } = useDataContext();

  const { state } = useDataContext();
  const { loggedInUser } = state;

  // console.log({ loggedInUser });

  useEffect(() => {
    if (loggedInUser.id == 0) {
      router.push("/").catch(console.error);
    } else {
      router.push("/categories").catch(console.error);
    }
  }, []);

  // Categories selected

  const { categoriesLiked } = loggedInUser;

  const updateCategoryMutation = api.user.updateCategoriesLiked.useMutation();

  const categoryHandler = async (value: string) => {
    try {
      if (!categoriesLiked.includes(value)) {
        dispatch({
          type: "SET_CATEGORY",
          payload: { category: value, type: "Add" },
        });

        const response = await updateCategoryMutation.mutateAsync({
          category: value,
          id: loggedInUser.id,
          type: "Add",
        });
      } else {
        dispatch({
          type: "SET_CATEGORY",
          payload: { category: value, type: "Filter" },
        });

        const response = await updateCategoryMutation.mutateAsync({
          category: value,
          id: loggedInUser.id,
          type: "Filter",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                    onChange={(e) => categoryHandler(e.target.value)}
                    value={category}
                    defaultChecked={
                      categoriesLiked.some((name) => name === category)
                        ? true
                        : false
                    }
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
