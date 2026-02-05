import { useEffect, useState } from "react";
import { getItems } from "../api";

export default function CatalogueView() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems().then(setItems);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Catalogue</h2>

      <ul>
        {items.map(i => (
          <li key={i._id}>
            {i.name} — Total: {i.totalQuantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
