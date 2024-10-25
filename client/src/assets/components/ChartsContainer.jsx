import { useState } from "react";
import BarChartComponent from "./BarChartComponent";
import AreaChartComponent from "./AreaChartComponent";

const ChartsContainer = ({ data }) => {
    const [barChart, setBarChart] = useState(true);
    return (
        <div className="bg-white mt-10 p-5">
            <h4 className="text-2xl text-center">Montly Applications</h4>
            <button
                type="button"
                onClick={() => setBarChart(!barChart)}
                className=" block mx-auto my-3 text-teal-400"
            >
                {barChart ? "Area Chart" : "Bar Chart"}
            </button>
            <div>
                {barChart ? (
                    <AreaChartComponent data={data} />
                ) : (
                    <BarChartComponent data={data} />
                )}
            </div>
        </div>
    );
};
export default ChartsContainer;
