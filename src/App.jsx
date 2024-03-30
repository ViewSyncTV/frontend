import "./App.css";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";

function App() {
  return (
    <>
      <Navbar />
      <div className="grid_wrapper">
        <Grid />
      </div>
    </>
  );
}

export default App;
