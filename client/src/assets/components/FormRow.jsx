const FormRow = ({ type, name, labelText, defaultValue = "", onChange }) => {
    return (
        <div className="mt-3">
            <label htmlFor={name}>{labelText}</label>
            <input
                type={type || "text"}
                name={name}
                id={name}
                className="block border-solid border-2 w-full p-2 mt-3 hover:border-black rounded-md"
                defaultValue={defaultValue}
                onChange={onChange}
            />
        </div>
    );
};
export default FormRow;
