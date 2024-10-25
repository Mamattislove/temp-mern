import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAllJobsContext } from "../pages/AllJobs";

const PageBtnContainer = () => {
    const { numOfPage, currentPage } = useAllJobsContext();

    const nums = Array.from({ length: numOfPage }, (v, k) => k + 1);
    const { search, pathname } = useLocation();
    const navigate = useNavigate();
    console.log(search, pathname);

    const handlePageChange = (page) => {
        const searchParam = new URLSearchParams(search);
        searchParam.set("page", page);
        navigate(`${pathname}?${searchParam.toString()}`);
    };

    return (
        <div className="w-full mt-5 flex justify-center gap-x-2 text-sm">
            <button
                className="flex justify-center items-center bg-teal-500 text-white p-3"
                onClick={() => {
                    if (currentPage !== 1) {
                        const page = currentPage - 1;
                        handlePageChange(page);
                    }
                }}
            >
                <HiChevronDoubleLeft />
            </button>
            {nums.map((num) => {
                return (
                    <button
                        key={num}
                        className={`${
                            num === currentPage
                                ? "border border-teal-500 text-teal-500 font-bold"
                                : "bg-teal-500 text-white"
                        } p-3 w-10 h-10 flex justify-center`}
                        onClick={() => handlePageChange(num)}
                    >
                        {num}
                    </button>
                );
            })}
            <button
                className="flex justify-center items-center bg-teal-500 text-white p-3"
                onClick={() => {
                    if (currentPage !== numOfPage) {
                        const page = currentPage + 1;
                        handlePageChange(page);
                    }
                }}
            >
                <HiChevronDoubleRight />
            </button>
        </div>
    );
};
export default PageBtnContainer;
