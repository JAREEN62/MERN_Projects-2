import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useLedgerStore } from "../../store/useLedgerStore";

const TransactionForm = () => {
  const addTransaction = useLedgerStore((state) => state.addTransaction);

  const [currTransaction, setCurrTransaction] = useState({
    description: "",
    amount: 0,
    type: "expense",
  });

  function handleAddTranaction() {
    if (currTransaction.description.trim().length == 0) return;
    if (currTransaction.amount <= 0) return;
    addTransaction({
      description: currTransaction.description,
      amount: parseFloat(currTransaction.amount),
      type: currTransaction.type,
    });

    setCurrTransaction({
      description: "",
      amount: 0,
      type: "expense",
    });

    console.log("allTransaction", useLedgerStore.getState().transactions);
  }

  return (
    <div
      className="w-full max-w-md mx-auto rounded-2xl p-6 border border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.2)] 
      bg-white/10 backdrop-blur-xl"
    >
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">
        Add Transaction
      </h2>

      <div className="space-y-5">
        {/* Description */}
        <div className="flex flex-col gap-2">
          <label htmlFor="des" className="text-sm font-medium text-gray-200">
            Description
          </label>
          <input
            onChange={(e) =>
              setCurrTransaction({
                ...currTransaction,
                description: e.target.value,
              })
            }
            value={currTransaction.description}
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/30 text-white 
              placeholder-gray-300 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
              transition backdrop-blur-md"
            id="des"
            type="text"
            placeholder="Ex: Grocery Shopping"
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-2">
          <label htmlFor="amount" className="text-sm font-medium text-gray-200">
            Amount
          </label>
          <input
            value={currTransaction.amount}
            onChange={(e) =>
              setCurrTransaction({
                ...currTransaction,
                amount: e.target.value,
              })
            }
            className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/30 text-white 
              placeholder-gray-300 outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 
              transition backdrop-blur-md"
            id="amount"
            type="number"
            placeholder="Enter amount"
          />
        </div>

        {/* Radio Buttons */}
        <div
          className="flex items-center justify-between px-4 py-3 rounded-xl 
          bg-white/10 border border-white/30 backdrop-blur-md"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              checked={currTransaction.type === "expense"}
              value="expense"
              onChange={() =>
                setCurrTransaction({ ...currTransaction, type: "expense" })
              }
              type="radio"
              name="type"
              className="accent-red-500 h-4 w-4"
            />
            <span className="text-white font-medium">Expense</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              checked={currTransaction.type === "income"}
              value="income"
              onChange={() =>
                setCurrTransaction({ ...currTransaction, type: "income" })
              }
              type="radio"
              name="type"
              className="accent-green-500 h-4 w-4"
            />
            <span className="text-white font-medium">Income</span>
          </label>
        </div>

        {/* Button */}
        <button
          onClick={handleAddTranaction}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
          bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 
          transition shadow-lg text-white font-semibold"
        >
          <Plus size={18} />
          Add Transaction
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;