import { useState, useEffect } from "react";
import "./App.css";
import Response from "./components/secondEventForm/Response.js";
import Form from "./components/secondEventForm/Form";
import HTML_CSS_JS_RESPONSES from "./components/firstEventForm/responses/HTML_CSS_JS_RESPONSES";
import OPENSOURCE_RESPONSES from "./components/secondEventForm/responses/OPENSOURCE_RESPONSES";
import { Route, Routes } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";
import ResponsesStopped from "./components/responsesStopped/ResponsesStopped";

function App() {
  const [accepting, setAccepting] = useState(false);
  const dbRef = ref(getDatabase());
  useEffect(() => {
    get(child(dbRef, `TAKING_RESPONSES/`))
      .then((snapshot) => {
        setAccepting(snapshot.val());
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dbRef]);
  const [registerSubmitClicked, setRegisterSubmitClicked] = useState(false);
  return (
    <div className="flex bg-backimage items-center justify-center bg-fixed">
      <Routes>
        <Route
          exact
          path="/"
          element={
            accepting ? (
              !registerSubmitClicked ? (
                <Form setRegisterSubmitClicked={setRegisterSubmitClicked} />
              ) : (
                <Response />
              )
            ) : (
              <ResponsesStopped />
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
