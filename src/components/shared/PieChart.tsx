import { Cell, Pie, PieChart } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface ICustomized {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index?: number;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: ICustomized) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// const tempdata = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 },
// ];

const PieChartAnalytics = ({ data }: { data: any }) => {
  return (
    <div className="my-5">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className={`flex items-center justify-around pl-[35px]`}>
        {data.map((item: { name: string; value: number }, index: number) => (
          <p key={index} className="font-bold cursor-pointer">
            {item?.name}
          </p>
        ))}
      </div>
      <div className={`flex items-center justify-around mt-[15px] pl-[35px]`}>
        {COLORS.slice(0, data?.length).map((color: string, index: number) => (
          <div
            key={index}
            className={`h-[30px] w-[30px] rounded-full `}
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PieChartAnalytics;
