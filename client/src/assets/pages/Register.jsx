import {
    Link,
    redirect,
    useNavigation,
    Form,
    useActionData,
} from "react-router-dom";
import Logo from "../components/Logo";
import FormRow from "../components/FormRow";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import SubmitButton from "../components/SubmitButton";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        await customFetch.post("/auth/register", data);
        toast.success("Registration Success");
        return redirect("/login");
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
};

const Register = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <Form
            method="POST"
            className="w-4/5 py-8 sm:3/5 md:w-4/12 mx-auto border-solid border-2 border-t-8 rounded-md border-t-teal-500 mt-10 mb-5 shadow-md"
        >
            <div className="flex justify-center">
                <Logo otherClassName="block mx-auto mb-5" />
            </div>

            <h1 className="text-center text-3xl font-bold">Register</h1>
            <div className="px-10 pb-3 mt-1 text-lg text-slate-500">
                <FormRow type="text" name="name" labelText="Name" />
                <FormRow type="text" name="lastName" labelText="Last Name" />
                <FormRow type="text" name="location" labelText="Location" />
                <FormRow type="email" name="email" labelText="Email" />
                <FormRow type="password" name="password" labelText="Password" />
                <SubmitButton isSubmitting={isSubmitting} />
                <p className="text-center mt-4">
                    Already a member?{" "}
                    <Link to={"/login"} className="text-teal-500 font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </Form>
    );
};
export default Register;
