const SubmitButton = ({ isSubmitting }) => {
    return (
        <button
            type="submit"
            className="block text-center w-full bg-teal-500 hover:bg-teal-600 text-white first-line:rounded mt-10 py-1 rounded-md"
            disabled={isSubmitting}
        >
            {isSubmitting ? "Submitting..." : "Submit"}
        </button>
    );
};
export default SubmitButton;
