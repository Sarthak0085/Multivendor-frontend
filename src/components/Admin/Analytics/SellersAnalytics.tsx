import { useGetSellersAnalyticsQuery } from "../../../redux/features/analytics/analyticsApi";
import {
  ComposedChart,
  Bar,
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

const SellersAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetSellersAnalyticsQuery({});

  console.log(data);

  const analyticsData: any = [];

  data?.users?.last12Months.forEach((item: any) =>
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
              ? "mt-[30px] bg-gray-100 shadow-sm rounded-sm pb-5"
              : "mt-[30px]"
          }`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} !text-start px-5 ${
                isDashboard && "!text-[20px]"
              }`}
            >
              Sellers Analytics
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
              <ComposedChart
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
                <Area
                  type="monotone"
                  dataKey="count"
                  fill="red"
                  stroke="#87C1FF"
                />
                <Bar dataKey="count" barSize={1} fill="blue" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default SellersAnalytics;
