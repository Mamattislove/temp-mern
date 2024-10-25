import { Link, useRouteError } from "react-router-dom";
import notFoundImage from "../images/not-found.svg";

const Error = () => {
    const error = useRouteError();
    if (error.status === 404) {
        return (
            <div className="w-full mx-3 mt-28 text-center">
                <img
                    src={notFoundImage}
                    alt="Image of Not Found"
                    className="w-4/5 md:w-2/5 block mx-auto"
                    sa
                />
                <h3 className="mt-5 text-5xl">Ohh! page not found</h3>
                <p className="text-slate-500 mt-3">
                    We can't seem to find page you're looking for
                </p>
                <Link to={"/"} className="text-teal-500">
                    Back Home
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h3>Something went wrong.</h3>
        </div>
    );
};
export default Error;
