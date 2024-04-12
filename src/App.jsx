import "./App.css";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import { Route, Routes } from "react-router-dom";
import Callback from "./Callback";

function App() {
  return (
    <>
      <Navbar />
      <div className="grid_wrapper">
        <Grid />
      </div>
      <Routes>
        <Route path="/callback" component={Callback} />
      </Routes>
    </>
  );
}

export default App;
