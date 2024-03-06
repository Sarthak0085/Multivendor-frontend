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
import { useGetWithdrawsAnalyticsQuery } from "../../../redux/features/analytics/analyticsApi";
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
  value: number;
  payload: { name: string; count: number };
}

const CustomBar = (props: CustomBarProps) => {
  const { fill, x, y, width, height, value } = props;

  const getPath = (x: number, y: number, width: number, height: number) => {
    const radius = width / 2;

    const centerX = x + width / 2;
    const centerY = y + height / 2;

    return `M${centerX},${centerY}m${-radius},0a${radius},${radius} 0 1,0 ${
      radius * 2
    },0a${radius},${radius} 0 1,0 ${-radius * 2},0`;
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

const WithdrawAnalytics = ({ isDashboard }: Props) => {
  const [timeFrame, setTimeFrame] = useState<string>("last12Months");
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, refetch } = useGetWithdrawsAnalyticsQuery(
    timeFrame,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  console.log(data);

  useEffect(() => {
    refetch();
  }, [timeFrame]);

  const analyticsData: any = [];

  data?.withdraws?.analyticsData.forEach((item: any) =>
    analyticsData.push({ name: item.name, count: item.count })
  );

  console.log("data:", data, "analytics:", analyticsData);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            isDashboard
              ? "mt-[30px] dark:bg-[#111c43] bg-gray-100 shadow-sm rounded-sm pb-2"
              : "mt-[30px]"
          }`}
        >
          <div
            className={`${
              isDashboard ? "!ml-8 mb-5" : ""
            } flex items-center justify-between relative`}
          >
            <h1
              className={`${styles.title} !text-start px-5 ${
                isDashboard && "!text-[20px]"
              }`}
            >
              Withdraw Analytics (
              {(timeFrame === "last12Months" && "Last 12 Months") ||
                (timeFrame === "last30Days" && "Last 30 Days") ||
                (timeFrame === "last24Hours" && "Last 24 Hours")}
              )
            </h1>
            <div className="pr-6 cursor-pointer" onClick={() => setOpen(!open)}>
              <IoFilter size={33} color="blue" />
            </div>
            {open && (
              <div className="absolute z-10 right-0 -top-4">
                <select
                  className="mr-6 p-1 appearance-none cursor-pointer font-bold"
                  onChange={(e) => setTimeFrame(e.target.value)}
                >
                  <option
                    className="font-bold text-[18px]"
                    value={"last12Months"}
                  >
                    Last 12 Months
                  </option>
                  <option
                    className="font-bold text-[18px]"
                    value={"last30Days"}
                  >
                    Last 30 Days
                  </option>
                  <option
                    className="font-bold text-[18px]"
                    value={"last24Hours"}
                  >
                    Last 24 hours
                  </option>
                </select>
              </div>
            )}
            {isDashboard && (
              <p className={`${styles.label} px-5`}>
                {(timeFrame === "last12Months" && "Last 12 Months") ||
                  (timeFrame === "last30Days" && "Last 30 Days") ||
                  (timeFrame === "last24Hours" && "Last 24 Hours")}{" "}
                Analytics data
              </p>
            )}
          </div>

          <div
            className={`w-full flex items-center justify-center ${
              isDashboard ? "h-[50vh]" : "h-[75vh]"
            }`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "50%" : "100%"}
            >
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
                  {analyticsData.map((_entry: any, index: number) => (
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

export default WithdrawAnalytics;
