export default function EquipmentTable({ equipment }) {
  if (!equipment?.length) return null;

  return (
    <>
      <h3>Equipment (preview)</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Qty</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.totalQty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
