import { useEffect, useState } from "react";
import { getPlans, createPlan } from "../api";

export default function PlansView() {
  const [plans, setPlans] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getPlans().then(setPlans);
  }, []);

  async function addPlan() {
    await createPlan({ name, version: "v1" });
    setName("");
    setPlans(await getPlans());
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>TEAP Plans</h2>

      <input
        placeholder="Plan name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={addPlan}>Create Draft</button>

      <ul>
        {plans.map(p => (
          <li key={p._id}>
            {p.name} — <b>{p.status}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
