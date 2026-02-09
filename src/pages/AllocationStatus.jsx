import { useEffect, useState } from "react";
import { getAllocations, updateAllocationStatus } from "../services/api";

const statuses = [
  "ordered",
  "fulfilled",
  "delivered",
  "returned",
  "missing"
];

export default function AllocationStatus() {
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setAllocations(await getAllocations());
  };

  const changeStatus = async (id, status) => {
    await updateAllocationStatus(id, status);
    load();
  };

  return (
    <div>
      <h2>Allocation Tracking</h2>

      <table border="1" cellPadding="6">
        <thead>
          <tr>
            <th>Item</th>
            <th>Location</th>
            <th>Qty</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allocations.map(a => (
            <tr key={a._id}>
              <td>{a.item?.name}</td>
              <td>
                {a.space?.name ||
                  a.subVenue?.name ||
                  a.venue?.name}
              </td>
              <td>{a.quantity}</td>
              <td>
                <select
                  value={a.status}
                  onChange={e =>
                    changeStatus(a._id, e.target.value)
                  }
                >
                  {statuses.map(s => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
