import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <>
      <div className="bg-[#1e1e1e] h-screen flex flex-col justify-center items-center text-center p-2.5">
        <div className="text-white">
          <h1 className="text-8xl">Web Games</h1>
          <p className="text-2xl my-5">
            This Website For Web Games I Build It For Fun And For Practice On
            Web Development
          </p>
        </div>
        <Link
          to={"/home"}
          className="text-white bg-red-600 px-10 py-2 text-lg rounded-sm cursor-pointer duration-300 hover:bg-red-800"
        >
          GET START
        </Link>
      </div>
    </>
  );
}
