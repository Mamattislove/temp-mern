import {
    Link,
    Form,
    redirect,
    useNavigation,
    useActionData,
    useNavigate,
} from "react-router-dom";
import FormRow from "../components/FormRow";
import Logo from "../components/Logo";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";
import SubmitButton from "../components/SubmitButton";

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const errors = { msg: "" };
    // console.log(data);

    if (data.password.length < 3) {
        errors.msg = "password too short";
        return errors;
    }
    try {
        await customFetch.post("/auth/login", data);
        toast.success("Succesfully Login");
        return redirect("/dashboard");
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        // errors.msg = error.response.data.msg;
        console.log(error);

        return error;
    }
};

const Login = () => {
    const navigation = useNavigation();
    const errors = useActionData();
    const navigate = useNavigate();
    const loginDemoUser = async () => {
        const data = {
            name: "Chuckleberry",
            email: "test@test.com",
            password: "secret123",
            lastName: "Gigglepants",
            location: "Laughterland",
        };

        try {
            await customFetch.post("/auth/login", data);
            toast.success("take a test drive");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }
    };

    const isSubmitting = navigation.state === "submitting";
    return (
        <div>
            {errors && (
                <p className="w-full text-white bg-red-600 mt-5 text-center">
                    {errors.msg}
                </p>
            )}
            <Form
                method="post"
                className="w-4/5 sm:3/5 md:w-4/12 mx-auto border-solid border-2 border-t-8 rounded-md border-t-teal-500 mt-10 mb-5 shadow-md"
            >
                <div className="flex justify-center">
                    <Logo otherClassName="block mx-auto my-5" />
                </div>

                <h1 className="text-center text-3xl font-bold">Login</h1>
                <div className="px-10 pb-3 mt-1 text-lg text-slate-500">
                    <FormRow type="email" name="email" labelText="Email" />
                    <FormRow
                        type="password"
                        name="password"
                        labelText="Password"
                    />

                    <SubmitButton isSubmitting={isSubmitting} />
                    <button
                        type="button"
                        className="block text-center w-full bg-teal-500 hover:bg-teal-600 text-white first-line:rounded mt-5 py-1 rounded-md"
                        onClick={loginDemoUser}
                    >
                        Explore the App
                    </button>
                    <p className="text-center mt-4">
                        Not a member yet?{" "}
                        <Link
                            to={"/register"}
                            className="text-teal-500 font-semibold"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </Form>
        </div>
    );
};
export default Login;
