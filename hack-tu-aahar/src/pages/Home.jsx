/*home componenets goes here */
import { Link } from "react-router-dom";
import Hero from "../assets/hero.jpeg";
function Home() {
  return (
    <div className="grid sm:grid-cols-3 grid-cols-2 m-auto">
      <div className="col-span-2 m-5">
        <p className="font-roboto font-semibold text-8xl m-5">
          Sustainable <br /> farming for better tomorrow
        </p>
        <button className="font-roboto font-semibold text-3xl p-5 bg-green-500 m-5 rounded-full">
          Get Started Today
        </button>
      </div>
      <div>
        <img src={Hero} alt="hero" className="h-100" />
      </div>
    </div>
  );
}
export default Home;
