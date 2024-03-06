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
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";

type Props = {
  isDashboard?: boolean;
};

const CouponsAnalytics = ({ isDashboard }: Props) => {
  const [timeFrame, setTimeFrame] = useState<string>("last12Months");
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, refetch } = useGetCouponsAnalyticsQuery(timeFrame, {
    refetchOnMountOrArgChange: true,
  });

  console.log(data);

  useEffect(() => {
    refetch();
  }, [timeFrame]);

  const analyticsData: any = [];

  data?.coupons?.analyticsData.forEach((item: any) =>
    analyticsData.push({ name: item.name, count: item.count })
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
              ? "mt-[30px] dark:bg-[#111c43] bg-gray-100 shadow-sm rounded-sm pb-5"
              : "mt-[30px]"
          }`}
        >
          <div
            className={`${
              isDashboard ? "!ml-8 mb-5" : ""
            } flex items-center justify-between relative`}
          >
            <h1
              className={`${styles.title} !text-start px-1 sm:px-5 ${
                isDashboard && "!text-[20px]"
              }`}
            >
              Coupons Analytics (
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
                  className="mr-6 p-1 appearance-none cursor-pointer text-[20px] font-bold"
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
                {(timeFrame === "last12Months" && "Last 12 Months") ||
                  (timeFrame === "last30Days" && "Last 30 Days") ||
                  (timeFrame === "last24Hours" && "Last 24 Hours")}{" "}
                Analytics data
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
