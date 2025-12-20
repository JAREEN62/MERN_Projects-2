import React from "react";
import TransactionForm from "./Components/TransactionForm";
import TransactionList from "./Components/TransactionList";
import TotalAmounts from "./Components/TotalAmounts";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center p-10">
      {/* Summary Top */}
      <TotalAmounts />

      {/* Main Section */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        <TransactionForm />
        <TransactionList />
      </div>
    </div>
  );
};

export default App;
