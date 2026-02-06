export default function Navbar({ setView }) {
  return (
    <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
      <button onClick={() => setView("upload")}>Upload TEAP</button>
      <button onClick={() => setView("catalogue")}>Catalogue</button>
      <button onClick={() => setView("venues")}>Venues</button>
      <button onClick={() => setView("plans")}>Plans</button>
      <button onClick={() => setView("conflicts")}>Conflicts</button>
    </nav>
  );
}
