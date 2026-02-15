import { useEffect, useState } from "react";
import { getAllocations } from "../services/api";

export default function Allocations() {
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const data = await getAllocations();
    setAllocations(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Allocations</h1>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Item</th>
              <th className="px-6 py-3 text-left">Venue</th>
              <th className="px-6 py-3 text-left">Quantity</th>
              <th className="px-6 py-3 text-left">Day</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {allocations.map((a) => (
              <tr key={a._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{a.item?.name}</td>
                <td className="px-6 py-4">{a.venue?.name}</td>
                <td className="px-6 py-4 font-semibold">{a.quantity}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                    {a.deliveryDay}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={a.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    ORDERED: "bg-yellow-100 text-yellow-800",
    FULFILLED: "bg-blue-100 text-blue-800",
    DELIVERED: "bg-green-100 text-green-800",
    RETURNED: "bg-gray-200 text-gray-700",
    MISSING: "bg-red-100 text-red-800"
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full font-medium ${
        colors[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}
