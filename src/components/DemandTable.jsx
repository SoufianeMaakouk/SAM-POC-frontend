export default function DemandTable({ demands }) {
  if (!demands?.length) return null;

  return (
    <>
      <h3>Demands (preview)</h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Venue</th>
            <th>FA</th>
            <th>Sport</th>
            <th>Qty</th>
            <th>Hour</th>
          </tr>
        </thead>
        <tbody>
          {demands.map((d, i) => (
            <tr key={i}>
              <td>{d.productCode}</td>
              <td>{d.venue}</td>
              <td>{d.fa}</td>
              <td>{d.sport}</td>
              <td>{d.quantity}</td>
              <td>{d.hour}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
