import "./App.css";
import { EarthQuakeListing } from "./components/EarthQuakeListing";
import { Navbar } from "./layouts/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <EarthQuakeListing />
    </>
  );
}

export default App;
