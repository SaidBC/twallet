import getTransactions from "@/lib/getTransactions";
import NoTransactions from "./NoTransactions";
import TransactionsTable from "./TransactionsTable";

export default async function HistoryBox() {
  const transactions = await getTransactions();
  if (!Array.isArray(transactions)) return <>Error occured</>;
  return (
    <div className="bg-white w-full py-8 rounded-2xl shadow-xl mt-8 px-8">
      <TransactionsTable transactions={transactions} />
      {transactions.length === 0 && <NoTransactions />}
    </div>
  );
}
