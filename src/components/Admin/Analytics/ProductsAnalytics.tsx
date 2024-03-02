import {
  Bar,
  BarChart,
  BarProps,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetProductsAnalyticsQuery } from "../../../redux/features/analytics/analyticsApi";
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
  console.log(props);

  const value = payload ? payload.count : "";

  const getPath = (x: number, y: number, width: number, height: number) => {
    const centerX = x + width / 2;
    const centerY = y + height / 2;

    const points = [
      [centerX, y],
      [x + width, centerY - height / 3],
      [x + width / 2, y + height],
      [x, centerY - height / 3],
      [x + width / 2, y],
    ];

    const starPath =
      points
        .map((point, index) => {
          const cmd = index === 0 ? "M" : "L";
          return `${cmd} ${point.join(",")}`;
        })
        .join(" ") + " Z";

    return starPath;
  };

  return (
    <g>
      <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        fill="#000"
        fontSize="20px"
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

const ProductAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetProductsAnalyticsQuery({});

  const analyticsData: any = [];

  data?.products?.last12Months.forEach((item: any) =>
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
              Products Analytics
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
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="1 1" />
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

export default ProductAnalytics;
