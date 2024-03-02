import { useGetCouponsAnalyticsQuery } from "../../../redux/features/analytics/analyticsApi";
import {
  ComposedChart,
  Scatter,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Layout/Loader";
import styles from "../../../styles/styles";

type Props = {
  isDashboard?: boolean;
};

// const analyticsData = [
//     {name:"January", count:200},
//     {name:"Febuary", count:100},
//     {name:"March", count:20},
//     {name:"April", count:290},
//     {name:"May", count:90},
//     {name:"June", count:100},
//     {name:"July", count:50},
// ]

const CouponsAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetCouponsAnalyticsQuery({});

  const analyticsData: any = [];

  data?.events?.last12Months.forEach((item: any) =>
    analyticsData.push({ name: item.month, count: item.count })
  );

  const tickFormatter = (name: string) => {
    const [month, year] = name.split(" ");
    const shortYear = year.slice(2);
    return `${month} ${shortYear}`;
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            isDashboard
              ? "mt-[50px] dark:bg-[#111c43] bg-gray-100 shadow-sm rounded-sm pb-5"
              : "mt-[50px]"
          }`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} !text-start px-1 sm:px-5 ${
                isDashboard && "!text-[20px]"
              }`}
            >
              Coupons Analytics
            </h1>
            {isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months Analytics data
              </p>
            )}
          </div>

          <div
            className={`w-full flex items-center justify-center ${
              isDashboard ? "h-[50vh]" : "h-[70vh]"
            }`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "50%" : "100%"}
            >
              <ComposedChart
                data={analyticsData}
                margin={{
                  top: 20,
                  right: 30,
                  bottom: 0,
                  left: 0,
                }}
              >
                <XAxis dataKey="name" tickFormatter={tickFormatter} />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotoneY"
                  dataKey="count"
                  fill="#0088FE"
                  stroke="#4FFF4F"
                />
                <Scatter dataKey="count" fill="#6BDDE6" line shape="diamond" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CouponsAnalytics;
