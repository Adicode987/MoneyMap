import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomLegend from "./CustomLegend";
import CustomTooltip from "./CustomTooltip";

const CustomPieChart = ({ data, label, totalAmount, colors }) => {

  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          label={({ cx, cy }) => (
            <>
              <text
                x={cx}
                y={cy - 10}
                textAnchor="middle"
                fill="#666"
                fontSize="14"
              >
                {label}
              </text>
              <text
                x={cx}
                y={cy + 20}
                textAnchor="middle"
                fill="#333"
                fontSize="24"
                fontWeight="semi-bold"
              >
                {totalAmount}
              </text>
            </>
          )}

        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />

      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
