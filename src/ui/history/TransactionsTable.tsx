import { TransactionType } from "@/types";

export default function TransactionsTable({
  transactions,
}: {
  transactions: TransactionType[];
}) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Id
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Method
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            From
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            To
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Amount
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {transactions.map((transaction) => {
          return (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap">{transaction.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {transaction.symbol}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-bold">
                {transaction.from.accountName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-bold">
                {transaction.to.accountName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-bold">
                {transaction.quantities}
              </td>
              <td className="px-6 py-4 whitespace-nowrap ">
                <div className="text-white bg-green-500/80 rounded-full py-1 text-center font-bold">
                  {transaction.status}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
