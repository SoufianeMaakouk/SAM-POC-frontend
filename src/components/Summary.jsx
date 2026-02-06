export default function Summary({ summary }) {
  if (!summary) return null;

  return (
    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
      <div className="card">
        <h3>Equipment Items</h3>
        <p>{summary.equipmentCount}</p>
      </div>

      <div className="card">
        <h3>Demand Hours</h3>
        <p>{summary.demandHours}</p>
      </div>
    </div>
  );
}
