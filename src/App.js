import { useState } from "react";
import "./App.css";
import Response from "./components/secondEventForm/Response";
import Form from "./components/secondEventForm/Form";
import HTML_CSS_JS_RESPONSES from "./components/firstEventForm/responses/HTML_CSS_JS_RESPONSES";
import OPENSOURCE_RESPONSES from "./components/secondEventForm/responses/OPENSOURCE_RESPONSES";
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
        <Route
          path="/HTML-CSS-JS-responses"
          element={<HTML_CSS_JS_RESPONSES />}
        />
        <Route path="/OPENSOURE-responses" element={<OPENSOURCE_RESPONSES />} />
      </Routes>
    </div>
  );
}

export default App;
