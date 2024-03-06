import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import {
  Bar,
  BarChart,
  BarProps,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetSellersAnalyticsQuery } from "../../../redux/features/analytics/analyticsApi";
import styles from "../../../styles/styles";
import Loader from "../../Layout/Loader";

type Props = {
  isDashboard?: boolean;
};

interface CustomBarProps extends BarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  dataKey: string;
  payload: { name: string; count: number };
}

const CustomBar = (props: CustomBarProps) => {
  const { fill, x, y, width, height, payload } = props;

  const value = payload ? payload.count : "";

  const getPath = (x: number, y: number, width: number, height: number) => {
    const centerX = x + width / 2;
    const centerY = y + height / 2;
    const points = 5;
    const innerRadius = width / 4;
    const outerRadius = width / 2;
    let star = "";

    for (let i = 0; i < 2 * points; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI / points) * i;
      const px = centerX + radius * Math.sin(angle);
      const py = centerY - radius * Math.cos(angle);
      star += `${i === 0 ? "M" : "L"}${px},${py}`;
    }

    star += "Z";
    return star;
  };

  return (
    <g>
      <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        fill="#fff"
        fontSize="15px"
        dy=".3em"
      >
        {value}
      </text>
    </g>
  );
};

const colors = [
  "red",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF3399",
  "#99CC00",
  "#FF6600",
  "#0088FE",
  "pink",
  "#FF6666",
  "#33CCCC",
];

const SellersAnalytics = ({ isDashboard }: Props) => {
  const [timeFrame, setTimeFrame] = useState<string>("last12Months");
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, refetch } = useGetSellersAnalyticsQuery(timeFrame, {
    refetchOnMountOrArgChange: true,
  });

  console.log(data);

  useEffect(() => {
    refetch();
  }, [timeFrame]);

  const analyticsData: any = [];

  data?.shops?.analyticsData.forEach((item: any) =>
    analyticsData.push({ name: item.name, count: item.count })
  );
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            isDashboard ? "mt-[30px]shadow-sm rounded-sm pb-5" : "mt-[30px]"
          }`}
        >
          <div
            className={`${
              isDashboard ? "!ml-8 mb-5" : ""
            } flex items-center justify-between relative`}
          >
            <h1
              className={`${styles.title} !text-start px-5 ${
                isDashboard && "!hidden !text-[20px]"
              }`}
            >
              Sellers Analytics (
              {(timeFrame === "last12Months" && "Last 12 Months") ||
                (timeFrame === "last30Days" && "Last 30 Days") ||
                (timeFrame === "last24Hours" && "Last 24 Hours")}
              )
            </h1>
            <div className="pr-6 cursor-pointer" onClick={() => setOpen(!open)}>
              <IoFilter size={isDashboard ? 24 : 33} color="blue" />
            </div>
            {open && (
              <div
                className={`absolute z-10 ${
                  isDashboard ? "left-8" : "right-0 -top-4"
                }`}
              >
                <select
                  className={`mr-6 p-1 appearance-none cursor-pointer text-[20px] font-bold ${
                    isDashboard && "!text-[12px]"
                  }`}
                  onChange={(e) => setTimeFrame(e.target.value)}
                >
                  <option value={"last12Months"}>Last 12 Months</option>
                  <option value={"last30Days"}>Last 30 Days</option>
                  <option value={"last24Hours"}>Last 24 hours</option>
                </select>
              </div>
            )}
            {isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months Analytics data
              </p>
            )}
          </div>{" "}
          <div
            className={`w-full flex items-center justify-center ${
              isDashboard ? "h-[50vh]" : "h-[75vh]"
            }`}
          >
            <ResponsiveContainer width={isDashboard ? "100%" : "90%"}>
              <BarChart
                data={analyticsData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                  shape={(props: any) => <CustomBar {...props} />}
                >
                  {analyticsData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 12]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default SellersAnalytics;
