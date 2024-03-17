import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function Header() {
  return (
    <div>
      <div className="flex content-center justify-end gap-5 px-14 py-2 text-sm ">
        <p className="cursor-pointer">Help</p>
        <p className="cursor-pointer">Order & Returns</p>
        <p className="cursor-pointer">Help</p>
      </div>

      <div className="flex items-baseline justify-between gap-5 px-14 py-3">
        <h1 className="cursor-pointer text-3xl font-bold">ECOMMERCE</h1>

        <div className="flex justify-between gap-5 font-semibold ">
          <h3 className="cursor-pointer">Categories</h3>
          <h3 className="cursor-pointer">Sale</h3>
          <h3 className="cursor-pointer">Clearance</h3>
          <h3 className="cursor-pointer">New stock</h3>
          <h3 className="cursor-pointer">Trending</h3>
        </div>

        <div className="flex justify-between gap-5 ">
          <h3>Search</h3>
          <h3>Cart</h3>
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
