import { useEffect, useState } from "react";
import { fetchConflicts } from "./api";

export default function ConflictView() {
  const [conflicts, setConflicts] = useState([]);

  useEffect(() => {
    fetchConflicts().then(setConflicts);
  }, []);

  return (
    <div>
      <h2>Conflicts</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Product</th>
            <th>Hour</th>
            <th>Shortage</th>
          </tr>
        </thead>
        <tbody>
          {conflicts.map((c, i) => (
            <tr key={i}>
              <td>{c.productCode}</td>
              <td>{c.hour}</td>
              <td>{c.shortage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
