const StatItem = ({
    icon,
    title,
    count,
    colorClassName,
    borderColorClassName,
    bgColorClassName,
}) => {
    return (
        <div
            className={`h-fit w-full px-10 pt-10 pb-5 border-b-4 rounded-lg bg-white ${colorClassName} ${borderColorClassName}`}
        >
            <div className="font-semibold flex justify-between items-center">
                <h1 className="text-6xl">{count}</h1>
                <h2
                    className={`h-fit p-3 text-3xl rounded-lg ${bgColorClassName}`}
                >
                    {icon}
                </h2>
            </div>
            <h1 className="text-black mt-16 text-2xl">{title}</h1>
        </div>
    );
};
export default StatItem;
