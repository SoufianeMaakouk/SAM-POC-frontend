import { useEffect, useState } from "react";
import { getAllocations } from "../api";

export default function ConflictView() {
  const [allocations, setAllocations] = useState([]);

  useEffect(() => {
    getAllocations().then(setAllocations);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Allocation Conflicts (POC)</h2>

      <ul>
        {allocations.map(a => (
          <li key={a._id}>
            {a.venueId?.name} — {a.itemId?.name} — {a.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
