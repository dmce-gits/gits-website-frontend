import { useState, useEffect } from "react";
import "./App.css";
import Response from "./components/secondEventForm/Response";
import Form from "./components/secondEventForm/Form";
import HTML_CSS_JS_RESPONSES from "./components/firstEventForm/responses/HTML_CSS_JS_RESPONSES";
import INTERVIEWFAIR_RESPONSES from "./components/secondEventForm/responses/INTERVIEWFAIR_RESPONSES";
import { Route, Routes } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";
import ResponsesStopped from "./components/responsesStopped/ResponsesStopped";
import Home from "./components/secondEventForm/Home";
import NeonCricketForm from "./components/secondEventForm/NeonCricketForm";
import ResponseNeon from "./components/secondEventForm/ResponsesNeon";

function App() {
  const [accepting, setAccepting] = useState(true);
  const dbRef = ref(getDatabase());
  useEffect(() => {
    get(child(dbRef, `TAKING_RESPONSES/`))
      .then((snapshot) => {
        // setAccepting(snapshot.val());
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // get(child(dbRef, `Registration/InterviewFair/`))
    //   .then((snapshot) => {
    //     setAccepting(snapshot.val());
    //     if (snapshot.exists()) {
    //       // console.log(snapshot.val());
    //       Object.keys(snapshot.val()).length === 100
    //         ? setAccepting(false)
    //         : console.log("not 100");
    //       console.log(Object.keys(snapshot.val()).length);
    //     } else {
    //       // setAccepting(true);
    //       console.log("No data available");
    //     }
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  }, [dbRef]);
  const [registerSubmitClicked, setRegisterSubmitClicked] = useState(false);
  return (
    <div className="flex bg-backimage items-center justify-center bg-fixed">
      <Routes>
        <Route
          exact
          path="/"
          element={
            accepting === null ? (
              <div className="h-screen text-white flex justify-items-center justify-center items-center">
                Loading...
              </div>
            ) : accepting ? (
              !registerSubmitClicked ? (
                <Home setRegisterSubmitClicked={setRegisterSubmitClicked} />
              ) : (
                <Response />
              )
            ) : (
              <ResponsesStopped />
            )
          }
        />
        {/* <Route
          path="/HTML-CSS-JS-responses"
          element={<HTML_CSS_JS_RESPONSES />}
        />
        <Route
          path="/INTERVIEWFAIR-responses"
          element={<INTERVIEWFAIR_RESPONSES />}
        /> */}
        <Route
          path="/neon-cricket"
          element={
            accepting === null ? (
              <div className="h-screen text-white flex justify-items-center justify-center items-center">
                Loading...
              </div>
            ) : accepting ? (
              !registerSubmitClicked ? (
                <Home
                  neonCricket
                  setRegisterSubmitClicked={setRegisterSubmitClicked}
                />
              ) : (
                <ResponseNeon />
              )
            ) : (
              <ResponsesStopped />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
