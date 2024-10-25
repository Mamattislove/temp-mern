import customFetch from "../../utils/customFetch";
import { FormRow } from "../components";
import SubmitButton from "../components/SubmitButton";
import {
    Form,
    redirect,
    useNavigation,
    useOutletContext,
} from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../utils/constants";
import { toast } from "react-toastify";
import FormDropDown from "../components/FormDropDown";

export const action = async ({ request }) => {
    console.log("Trigger Add Job Action");
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    // console.log(data);
    // return null;
    try {
        await customFetch.post("/jobs", data);
        toast.success("Job sucessfully added");
        return redirect("all-jobs");
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
};
const AddJob = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const { user } = useOutletContext();
    // console.log(user);

    return (
        <Form method="POST" className="w-full py-8">
            <div className="w-11/12 mx-auto bg-white p-5">
                <h1 className="text-3xl mb-8">Add Job</h1>
                <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <FormRow
                        type="position"
                        name={"position"}
                        labelText={"Position"}
                    />
                    <FormRow
                        type="company"
                        name={"company"}
                        labelText={"Company"}
                    />
                    <FormRow
                        type="jobLocation"
                        name={"jobLocation"}
                        labelText={"Job Location"}
                        defaultValue={user.location}
                    />
                    <FormDropDown
                        name="jobStatus"
                        labelText="Job Status"
                        items={Object.values(JOB_STATUS)}
                    />
                    <FormDropDown
                        name="jobType"
                        labelText="Job Type"
                        items={Object.values(JOB_TYPE)}
                    />
                    <SubmitButton isSubmitting={isSubmitting} />
                </div>
            </div>
        </Form>
    );
};

export default AddJob;
