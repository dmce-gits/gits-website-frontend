import { useState } from "react";
import "./App.css";
import Response from "./components/secondEventform/Response";
import Form from "./components/secondEventform/Form";
import TableFormat from "./components/tableformat/TableFormat";
import { Route, Routes } from "react-router-dom";

function App() {
  const [registerSubmitClicked, setRegisterSubmitClicked] = useState(false);
  return (
    <div className="flex bg-backimage items-center justify-center bg-fixed">
      <Routes>
        <Route
          exact
          path="/"
          element={
            !registerSubmitClicked ? (
              <Form setRegisterSubmitClicked={setRegisterSubmitClicked} />
            ) : (
              <Response />
            )
          }
        />
        <Route path="/responses" element={<TableFormat />} />
      </Routes>
    </div>
  );
}

export default App;
