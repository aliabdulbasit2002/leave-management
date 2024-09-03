import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-x-4 bg-[url('https://images.pexels.com/photos/6348118/pexels-photo-6348118.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-no-repeat bg-cover object-cover before:content-[''] before:absolute before:w-full before:h-full before:bg-black before:opacity-70 top-0 right-0 -z-30">
      <h1 className="text-7xl text-white font-extrabold relative">
        Easy <span className="text-red-500">Leave</span>
      </h1>
      <h3 className="my-10 relative text-white text-2xl">Request A Leave</h3>
      <div className="flex gap-x-10 relative">
        <Link
          to="/sign-up"
          className="text-white border border-white px-4 py-1 rounded-md"
        >
          Sign Up
        </Link>
        <Link
          to="/log-in"
          className="text-white border border-white px-4 py-1 rounded-md"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};
export default Home;
