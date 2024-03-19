import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";

export default function Header() {
  return (
    <div>
      <div className="flex content-center justify-center gap-5 px-14 py-2 text-sm sm:justify-end ">
        <p className="cursor-pointer">Help</p>
        <p className="cursor-pointer">Order & Returns</p>
        <p className="cursor-pointer">Hi, John</p>
      </div>

      <div className="flex flex-col flex-wrap items-center justify-center gap-5 px-14 py-3 text-center sm:flex-row sm:flex-nowrap sm:items-baseline sm:justify-between sm:text-start">
        <div className="flex-grow basis-full">
          <h1 className="cursor-pointer  text-3xl font-bold">ECOMMERCE</h1>
        </div>

        <div className="flex-grow basis-full">
          <div className="flex  flex-wrap justify-center  gap-5 font-semibold sm:flex-nowrap sm:justify-between">
            <h3 className="cursor-pointer">Categories</h3>
            <h3 className="cursor-pointer">Sale</h3>
            <h3 className="cursor-pointer">Clearance</h3>
            <h3 className="cursor-pointer text-nowrap">New stock</h3>
            <h3 className="cursor-pointer">Trending</h3>
          </div>
        </div>

        <div className="flex-grow basis-full">
          <div className="flex  justify-end gap-5">
            <CiSearch size={24} className="cursor-pointer" />
            <BsCart2 size={24} className="cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 bg-lighterGray py-3 text-center">
        <IoIosArrowBack size={18} />
        <p>Get 10% off on business sign up</p>
        <IoIosArrowForward size={18} />
      </div>
    </div>
  );
}
