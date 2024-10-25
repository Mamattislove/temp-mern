import { Form, Link, useSubmit } from "react-router-dom";
import FormRow from "./FormRow";
import FormDropDown from "./FormDropDown";
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from "../../utils/constants";
import { useAllJobsContext } from "../pages/AllJobs";

const SearchContainer = () => {
    const { searchValues } = useAllJobsContext();
    const submit = useSubmit();

    const debounce = (onChange) => {
        let timeout;
        return (e) => {
            const form = e.currentTarget.form;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                onChange(form);
            }, 2000);
        };
    };
    return (
        <div className="w-full bg-white p-5 ">
            <Form>
                <h1 className="text-xl font-bold">Search Form</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-end">
                    <FormRow
                        labelText={"Search"}
                        name={"search"}
                        onChange={debounce((form) => {
                            submit(form);
                        })}
                        defaultValue={searchValues.search}
                    />
                    <FormDropDown
                        labelText={"Job Status"}
                        name={"jobStatus"}
                        items={["all", ...Object.values(JOB_STATUS)]}
                        defaultValue={searchValues.jobStatus || "all"}
                        onChange={(e) => {
                            console.log(e.currentTarget.form);
                            submit(e.currentTarget.form);
                        }}
                    />
                    <FormDropDown
                        labelText={"Job Type"}
                        name={"jobType"}
                        items={["all", ...Object.values(JOB_TYPE)]}
                        defaultValue={searchValues.jobType}
                        onChange={(e) => {
                            console.log(e.currentTarget.form);
                            submit(e.currentTarget.form);
                        }}
                    />
                    <FormDropDown
                        labelText={"Sort"}
                        name={"sort"}
                        items={Object.values(JOB_SORT_BY)}
                        defaultValue={searchValues.sort}
                        onChange={(e) => {
                            console.log(e.currentTarget.form);
                            submit(e.currentTarget.form);
                        }}
                    />
                    <div className="w-full bg-teal-500 text-center py-1 mt-5 text-white rounded-md h-fit">
                        <Link to={"/dashboard/all-jobs"}>
                            Reset Search Values
                        </Link>
                    </div>
                </div>
            </Form>
        </div>
    );
};
export default SearchContainer;
