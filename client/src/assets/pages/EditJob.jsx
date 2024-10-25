import { useLoaderData, Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../utils/customFetch";
import { FormRow, FormDropDown, SubmitButton } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../utils/constants";

export const loader = async ({ params }) => {
    try {
        const { data } = await customFetch.get(`/jobs/${params.id}`);
        return data.job;
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
};

export const action = async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    // console.log(data);
    try {
        await customFetch.patch(`/jobs/${params.id}`, data);
        toast.success("Job edited sucessfully");
        return redirect("/dashboard/all-jobs");
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
};

const EditJob = () => {
    const job = useLoaderData();
    return (
        <Form method="POST" className="w-full py-8">
            <div className="w-11/12 mx-auto bg-white p-5">
                <h1 className="text-3xl mb-8">Edit Job</h1>
                <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <FormRow
                        type="position"
                        name={"position"}
                        labelText={"Position"}
                        defaultValue={job.position}
                    />
                    <FormRow
                        type="company"
                        name={"company"}
                        labelText={"Company"}
                        defaultValue={job.company}
                    />
                    <FormRow
                        type="jobLocation"
                        name={"jobLocation"}
                        labelText={"Job Location"}
                        defaultValue={job.jobLocation}
                    />
                    <FormDropDown
                        name="jobStatus"
                        labelText="Job Status"
                        items={Object.values(JOB_STATUS)}
                        defaultValue={job.jobStatus}
                    />
                    <FormDropDown
                        name="jobType"
                        labelText="Job Type"
                        items={Object.values(JOB_TYPE)}
                        defaultValue={job.jobType}
                    />
                    <SubmitButton />
                </div>
            </div>
        </Form>
    );
};
export default EditJob;
