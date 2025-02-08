/*home componenets goes here */
import { Link } from "react-router-dom";
import Hero from "../assets/hero.jpeg";
import question_mark from "../assets/question_mark.svg";
import LanguageSwitcher from "../languageSwitcher";
function Home() {
  return (
    <>
      <div
        className="grid sm:grid-cols-3 grid-cols-2 m-auto"
        data-translate="message"
      >
        <div className="col-span-2 m-5 " data-translate="message">
          <p
            className="font-roboto font-semibold text-8xl m-5"
            data-translate="message"
          >
            Sustainable <br /> farming for better tomorrow
          </p>
          <Link
            to="/login"
            className="focus:outline-none text-black bg-emerald-400 hover:bg-emerald-500 focus:ring-4 focus:ring-emerald-300 font-semibold rounded-full text-3xl p-6 me-2 mb-2 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:ring-emerald-700 inline-block text-center"
            data-translate="message"
          >
            Get Started Today
          </Link>
        </div>
        <div data-translate="message">
          <img
            src={Hero}
            alt="hero"
            className="h-100"
            data-translate="message"
          />
        </div>
      </div>
      <div
        className="text-center font-roboto font-semibold text-5xl "
        data-translate="message"
      >
        What We Provide:
      </div>
      <div
        className="grid sm:grid-cols-2 grid-cols-2 "
        data-translate="message"
      >
        <div
          className="col-span-1 m-5 bg-white-300 rounded-2xl p-4 shadow-2xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
          data-translate="message"
        >
          <div
            className="font-roboto font-semibold text-3xl m-5 flex items-center justify-center"
            data-translate="message"
          >
            <img
              src={question_mark}
              alt="question_mark"
              className="h-8 inline mr-2"
              data-translate="message"
            />
            Environnmental protection
          </div>
          <p className="font-roboto text-l m-5" data-translate="message">
            By minimizing over-fertilization, the app reduces the risk of runoff
            and water pollution, helping to prevent eutrophication and protect
            aquatic ecosystems.
          </p>
        </div>
        <div
          className="col-span-1 m-5 bg-white-300 rounded-2xl p-4 shadow-2xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
          data-translate="message"
        >
          <div
            className="font-roboto font-semibold text-3xl m-5 flex items-center justify-center"
            data-translate="message"
          >
            <img
              src={question_mark}
              alt="question_mark"
              className="h-8 inline mr-2"
              data-translate="message"
            />
            Increased Agricultural Productivity:
          </div>
          <p className="font-roboto text-l m-5" data-translate="message">
            Optimized fertilizer usage ensures healthy crop growth, leading to
            improved yields and higher income for farmers, thus promoting
            economic sustainability.
          </p>
        </div>
        <div
          className="col-span-1 m-5 bg-white-300 rounded-2xl p-4 shadow-2xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
          data-translate="message"
        >
          <div
            className="font-roboto font-semibold text-3xl m-5 flex items-center justify-center"
            data-translate="message"
          >
            <img
              src={question_mark}
              alt="question_mark"
              className="h-8 inline mr-2"
              data-translate="message"
            />
            Community Building:
          </div>
          <p className="font-roboto text-l m-5" data-translate="message">
            The community page fosters collaboration and knowledge exchange
            among farmers, building resilience and strengthening social ties
            within agricultural communities.
          </p>
        </div>
        <div
          className="col-span-1 m-5 bg-white-300 rounded-2xl p-4 shadow-2xl transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
          data-translate="message"
        >
          <div
            className="font-roboto font-semibold text-3xl m-5 flex items-center justify-center"
            data-translate="message"
          >
            <img
              src={question_mark}
              alt="question_mark"
              className="h-8 inline mr-2"
              data-translate="message"
            />
            Cost Efficiency for Farmers:
          </div>
          <p className="font-roboto text-l m-5" data-translate="message">
            By accurately predicting the appropriate amount and type of
            fertilizer, the app helps farmers reduce unnecessary expenses,
            lowering their operational costs while maintaining high
            productivity.
          </p>
        </div>
        <LanguageSwitcher data-translate="message" />
      </div>
    </>
  );
}
export default Home;
