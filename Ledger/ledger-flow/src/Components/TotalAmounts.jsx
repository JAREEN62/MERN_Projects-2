import React, { useEffect, useState } from "react";
import { useLedgerStore } from "../../store/useLedgerStore";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const TotalAmounts = () => {
  const [summaryObj, setSummaryObj] = useState({});
  const transactions = useLedgerStore((state) => state.transactions);
  const summary = useLedgerStore((state) => state.totalSummary);

  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    setSummaryObj(summary());
  }, [transactions]);

  const data = [
    { name: "Income", value: summaryObj.totalIncome || 0 },
    { name: "Expense", value: summaryObj.totalExpense || 0 },
  ];

  const COLORS = ["#4ade80", "#f87171"];

  const onPieEnter = (_, index) => setActiveIndex(index);

  return (
    <div className="w-full max-w-6xl mx-auto mb-10">
      <div
        className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6
      bg-white/10 border border-white/20 rounded-2xl backdrop-blur-xl px-6 py-6
      shadow-[0_0_40px_rgba(255,255,255,0.15)]"
      >
        {/* Income */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-5 backdrop-blur-md text-center hover:bg-white/20 transition">
          <p className="text-gray-300 text-sm mb-1 tracking-wide">
            Total Income
          </p>
          <h2 className="text-3xl font-bold text-green-400">
            ₹{summaryObj.totalIncome || 0}
          </h2>
        </div>

        {/* Expense */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-5 backdrop-blur-md text-center hover:bg-white/20 transition">
          <p className="text-gray-300 text-sm mb-1 tracking-wide">
            Total Expense
          </p>
          <h2 className="text-3xl font-bold text-red-400">
            ₹{summaryObj.totalExpense || 0}
          </h2>
        </div>

        {/* Balance */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-5 backdrop-blur-md text-center hover:bg-white/20 transition">
          <p className="text-gray-300 text-sm mb-1 tracking-wide">
            Total Balance
          </p>
          <h2 className="text-3xl font-bold text-indigo-400">
            ₹{summaryObj.totalBalance || 0}
          </h2>
        </div>
      </div>

      <div
        className="mt-8 bg-white/10 border border-white/20 rounded-2xl px-6 py-6 backdrop-blur-xl
        shadow-[0_0_40px_rgba(255,255,255,0.15)] flex justify-center"
      >
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={140}
            innerRadius={70}
            activeIndex={activeIndex}
            onMouseEnter={onPieEnter}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              background: "#ffffff",
              borderRadius: "10px",
              border: "1px solid #ffffff30",
              color: "#000000",
            }}
          />

          <Legend
            wrapperStyle={{
              color: "white",
              fontSize: 14,
            }}
          />
        </PieChart>
      </div>
    </div>
  );
};

export default TotalAmounts;