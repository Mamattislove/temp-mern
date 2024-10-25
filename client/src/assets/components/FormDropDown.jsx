const FormDropDown = ({
    name,
    labelText,
    items,
    defaultValue = "",
    onChange,
}) => {
    // console.log(items);

    return (
        <div className="mt-3">
            <label htmlFor={name}>{labelText}</label>

            <select
                name={name}
                className="block border-solid border-2 w-full p-2 mt-3 hover:border-black rounded-md bg-white"
                defaultValue={defaultValue}
                onChange={onChange}
            >
                {items.map((item) => {
                    return (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
export default FormDropDown;
