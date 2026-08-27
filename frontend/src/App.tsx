import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomeGate } from "./features/home/HomeGate";
import { QuestGate } from "./features/quest/QuestGate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuestGate />} />
        <Route path="/home" element={<HomeGate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
