import React, { useState, useEffect } from "react";
import CustomPieChart from "../Charts/CustomPieChart";
import { generateVibrantColors } from "../../utils/helper";


const RecentIncomeWithChart = ({ data, totalIncome }) => {

    const [charData, setCharData] = useState([]);
    const [colors, setColors] = useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }));

        setCharData(dataArr);
        setColors(generateVibrantColors(dataArr.length));
    };


    useEffect(() => {
        prepareChartData();

        return () => { };
    }, [data]);


    return (
        <div className="card ">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 60 Days Income</h5>
            </div>

            <CustomPieChart
                data={charData}
                label="Total"
                totalAmount={`₹${totalIncome}`}
                colors={colors}
            />
        </div>
    );
};

export default RecentIncomeWithChart;