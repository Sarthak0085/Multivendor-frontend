import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetOrdersAnalyticsQuery } from "../../../redux/features/analytics/analyticsApi";
import styles from "../../../styles/styles";
import Loader from "../../Layout/Loader";

type Props = {
  isDashboard?: boolean;
};

interface TriangleBarProps {
  fill: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const getPath = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
  Z`;
};

const TriangleBar = (props: TriangleBarProps) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const colors = [
  "red",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#0088FE",
  "pink",
  "#AF19FF",
  "#FF6666",
  "#33CCCC",
  "#FF3399",
  "#99CC00",
  "#FF6600",
];

const OrdersAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  const analyticsData: any = [];

  data?.orders?.last12Months.forEach((item: any) =>
    analyticsData.push({ name: item.month, count: item.count })
  );
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            isDashboard
              ? "mt-[30px] dark:bg-[#111c43] bg-gray-100 shadow-sm rounded-sm pb-5"
              : "mt-[30px]"
          }`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} !text-start px-5 ${
                isDashboard && "!text-[20px]"
              }`}
            >
              Orders Analytics
            </h1>
            {isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months Analytics data
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
                margin={{
                  top: 20,
                  right: 30,
                  bottom: 0,
                  left: 0,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#767616"
                  shape={(props: any) => <TriangleBar {...props} />}
                >
                  {analyticsData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
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

export default OrdersAnalytics;
