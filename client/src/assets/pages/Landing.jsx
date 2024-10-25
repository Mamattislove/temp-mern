import leftImage from "../images/main.svg";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const Landing = () => {
    return (
        <div className="p-8">
            <Logo />
            <div className="w-full">
                <div className="flex">
                    <div className="w-full md:w-6/12">
                        <h1 className="text-5xl md:text-7xl font-extrabold mt-10 md:mt-32">
                            Job <span className="text-teal-500">Tracking</span>{" "}
                            app
                        </h1>
                        <p className="w-11/12 mt-5 md:my-10 md:w-9/12 text-slate-400 bg">
                            I'm baby wayfarers hoodie next level taiyaki
                            brooklyn cliche blue bottle single-origin coffee
                            chia. Aesthetic post-ironic venmo, quinoa lo-fi tote
                            bag adaptogen everyday carry meggings +1 brunch
                            narwhal.
                        </p>
                        <div className="mt-10">
                            <Link
                                to={"/register"}
                                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Register
                            </Link>
                            <Link
                                to={"/login"}
                                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded mx-5"
                            >
                                Login / Demo User
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block md:w-6/12">
                        <img src={leftImage} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Landing;
