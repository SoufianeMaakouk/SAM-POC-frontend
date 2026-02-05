export default function Navbar({ setView }) {
  return (
    <nav style={{ padding: 12, background: "#0b1c2d", color: "#fff" }}>
      <button onClick={() => setView("plans")}>Plans</button>
      <button onClick={() => setView("upload")}>Upload TEAP</button>
      <button onClick={() => setView("conflicts")}>Conflicts</button>
      <button onClick={() => setView("catalogue")}>Catalogue</button>
      <button onClick={() => setView("venues")}>Venues</button>
    </nav>
  );
}
