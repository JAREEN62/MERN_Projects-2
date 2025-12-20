import React from "react";
import { useLedgerStore } from "../../store/useLedgerStore";
import { Trash2 } from "lucide-react";

const TransactionList = () => {
  const allTransaction = useLedgerStore((state) => state.transactions);
  const deleteTransaction = useLedgerStore((state) => state.deleteTransaction);

  function handleTransactionDelete(id) {
    deleteTransaction(id);
  }

  if (allTransaction.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-300 text-lg">
        No transactions yet
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-5 shadow-[0_0_35px_rgba(255,255,255,0.1)]">
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">
        Transaction History
      </h2>

      <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 custom-scroll">
        {allTransaction.map((trans) => (
          <div
            key={trans.id}
            className="flex items-center justify-between bg-white/10 border border-white/20 rounded-xl px-4 py-3 backdrop-blur-md hover:bg-white/20 transition"
          >
            {/* Left Info */}
            <div>
              <p className="text-white font-semibold text-lg">
                {trans.description}
              </p>
              <p className="text-gray-300 text-sm">
                {new Date(trans.date).toLocaleDateString()}
              </p>
            </div>

            {/* Amount */}
            <p
              className={`text-lg font-bold ${
                trans.type === "income" ? "text-green-400" : "text-red-400"
              }`}
            >
              {trans.type === "income" ? "+ " : "- "}₹{trans.amount}
            </p>

            {/* Delete */}
            <Trash2
              size={22}
              className="text-red-400 hover:text-red-500 cursor-pointer transition"
              onClick={() => handleTransactionDelete(trans.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
