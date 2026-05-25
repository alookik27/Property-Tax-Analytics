import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

export default function ChartsSection({
  filteredData
}) {

  const cityStatusData = {};

  filteredData.forEach((item) => {

    const city = item.tenant;

    if (!cityStatusData[city]) {

      cityStatusData[city] = {
        city,
        Approved: 0,
        Rejected: 0,
        Pending: 0
      };

    }

    cityStatusData[city][item.status]++;

  });

  const chartData =
    Object.values(cityStatusData);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.5
      }}
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-amber-200
        bg-gradient-to-br
        from-white
        via-amber-50
        to-amber-100
        backdrop-blur-2xl
        p-6
        mb-8
        shadow-[0_20px_60px_rgba(0,0,0,0.06)]
        font-['Outfit']
      "
    >

      <div
        className="
          absolute
          -top-20
          -right-20
          w-72
          h-72
          rounded-full
          bg-amber-300/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-white/30
          backdrop-blur-[2px]
        "
      />

      <div className="relative z-10">

        <div
          className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-4
            mb-8
          "
        >

          <div>

            <h2
              className="
                text-3xl
                xl:text-4xl
                font-black
                tracking-tight
                text-neutral-900
              "
            >
              Property Status
              <span
                className="
                  bg-gradient-to-r
                  from-amber-500
                  to-yellow-600
                  bg-clip-text
                  text-transparent
                  ml-2
                "
              >
                Comparison
              </span>
            </h2>

            <p
              className="
                text-sm
                text-neutral-500
                mt-3
                max-w-2xl
                leading-relaxed
              "
            >
              Approved, rejected and pending
              properties comparison across
              all cities
            </p>

          </div>

        </div>

        <div
          className="
            w-full
            h-[500px]
            rounded-3xl
            border
            border-white/40
            bg-white/50
            backdrop-blur-xl
            p-4
            shadow-inner
          "
        >

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={chartData}
              barGap={10}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#F3E8D0"
                vertical={false}
              />

              <XAxis
                dataKey="city"
                tick={{
                  fill: "#78716C",
                  fontSize: 12,
                  fontWeight: 700
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#78716C",
                  fontSize: 12,
                  fontWeight: 700
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{
                  fill: "rgba(251,191,36,0.08)"
                }}
                contentStyle={{
                  background:
                    "rgba(255,255,255,0.9)",
                  border:
                    "1px solid #FCD34D",
                  borderRadius: "20px",
                  backdropFilter:
                    "blur(12px)",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)",
                  fontWeight: 600,
                  color: "#1F2937"
                }}
              />

              <Legend
                wrapperStyle={{
                  fontWeight: 700,
                  paddingTop: "24px",
                  color: "#44403C"
                }}
              />

              <Bar
                dataKey="Approved"
                fill="#F59E0B"
                radius={[12, 12, 0, 0]}
              />

              <Bar
                dataKey="Rejected"
                fill="#FBBF24"
                radius={[12, 12, 0, 0]}
              />

              <Bar
                dataKey="Pending"
                fill="#FCD34D"
                radius={[12, 12, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </motion.div>
  );
}