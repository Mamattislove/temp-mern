import { toast } from "react-toastify";
import { FormRow, SubmitButton } from "../components";
import { Form, useNavigation, useOutletContext } from "react-router-dom";
import customFetch from "../../utils/customFetch";

export const action = async ({ request }) => {
    const formData = await request.formData();

    const file = formData.get("avatar");
    console.log(file);

    if (file && file.size > 500000) {
        toast.error("Image size too large");
        return null;
    }

    try {
        await customFetch.patch("/users/update-user", formData);
        toast.success("Profile updated successfully");
    } catch (error) {
        toast.error(error?.response?.data?.msg);
    }
    return null;
};

const Profile = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const { user } = useOutletContext();
    // console.log(user);

    return (
        <Form
            method="POST"
            className="w-full py-8"
            encType="multipart/form-data"
        >
            <div className="w-11/12 mx-auto bg-white p-5">
                <h1 className="text-3xl mb-8">Profile</h1>
                <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                    <div className="mt-3">
                        <label htmlFor="avatar">
                            {"Select an image file (max 0.5 MB)"}
                        </label>
                        <input
                            type="file"
                            name="avatar"
                            id="avatar"
                            className="block border-solid border-2 w-full p-2 mt-3 hover:border-black rounded-md"
                            accept="image/*"
                        />
                    </div>

                    <FormRow
                        type={"text"}
                        name={"name"}
                        labelText={"Name"}
                        defaultValue={user.name}
                    />
                    <FormRow
                        type={"text"}
                        name={"lastName"}
                        labelText={"Last Name"}
                        defaultValue={user.lastName}
                    />
                    <FormRow
                        type={"email"}
                        name={"email"}
                        labelText={"Email"}
                        defaultValue={user.email}
                    />
                    <FormRow
                        type={"text"}
                        name={"location"}
                        labelText={"Location"}
                        defaultValue={user.location}
                    />

                    <SubmitButton isSubmitting={isSubmitting} />
                </div>
            </div>
        </Form>
    );
};
export default Profile;
