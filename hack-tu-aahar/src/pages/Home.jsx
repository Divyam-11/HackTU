/*home componenets goes here */
import { Link } from "react-router-dom";
import Hero from "../assets/hero.jpeg";
import question_mark from "../assets/question_mark.svg";
function Home() {
  return (
    <>
      <div className="grid sm:grid-cols-3 grid-cols-2 m-auto">
        <div className="col-span-2 m-5">
          <p className="font-roboto font-semibold text-8xl m-5">
            Sustainable <br /> farming for better tomorrow
          </p>
          <Link
            to="/login"
            className="focus:outline-none text-black bg-emerald-400 hover:bg-emerald-500 focus:ring-4 focus:ring-emerald-300 font-semibold rounded-full text-3xl p-6 me-2 mb-2 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:ring-emerald-700 inline-block text-center"
          >
            Get Started Today
          </Link>
        </div>
        <div>
          <img src={Hero} alt="hero" className="h-100" />
        </div>
      </div>
      <div className="text-center font-roboto font-semibold text-5xl ">
        What We Provide:
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-2 ">
        <div className="col-span-1 m-5 bg-white-300 rounded-2xl p-4 shadow-2xl">
          <div className="font-roboto font-semibold text-3xl m-5 flex items-center justify-center">
            <img
              src={question_mark}
              alt="question_mark"
              className="h-8 inline mr-2"
            />
            Environnmental protection
          </div>
          <p className="font-roboto text-l m-5">
            By minimizing over-fertilization, the app reduces the risk of runoff
            and water pollution, helping to prevent eutrophication and protect
            aquatic ecosystems.
          </p>
        </div>
        <div className="col-span-1 m-5 bg-white-300 rounded-2xl p-4 shadow-2xl">
          <div className="font-roboto font-semibold text-3xl m-5 flex items-center justify-center">
            <img
              src={question_mark}
              alt="question_mark"
              className="h-8 inline mr-2"
            />
            Increased Agricultural Productivity:
          </div>
          <p className="font-roboto text-l m-5">
            Optimized fertilizer usage ensures healthy crop growth, leading to
            improved yields and higher income for farmers, thus promoting
            economic sustainability.
          </p>
        </div>
        <div className="col-span-1 m-5 bg-white-300 rounded-2xl p-4 shadow-2xl">
          <div className="font-roboto font-semibold text-3xl m-5 flex items-center justify-center">
            <img
              src={question_mark}
              alt="question_mark"
              className="h-8 inline mr-2"
            />
            Community Building:
          </div>
          <p className="font-roboto text-l m-5">
            The community page fosters collaboration and knowledge exchange
            among farmers, building resilience and strengthening social ties
            within agricultural communities.
          </p>
        </div>
        <div className="col-span-1 m-5 bg-white-300 rounded-2xl p-4 shadow-2xl">
          <div className="font-roboto font-semibold text-3xl m-5 flex items-center justify-center">
            <img
              src={question_mark}
              alt="question_mark"
              className="h-8 inline mr-2"
            />
            Cost Efficiency for Farmers:
          </div>
          <p className="font-roboto text-l m-5">
            By accurately predicting the appropriate amount and type of
            fertilizer, the app helps farmers reduce unnecessary expenses,
            lowering their operational costs while maintaining high
            productivity.
          </p>
        </div>
      </div>
    </>
  );
}
export default Home;
