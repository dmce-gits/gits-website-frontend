import { useState } from "react";
import "./App.css";
import Response from "./components/firstEventForm/Response";
import Form from "./components/firstEventForm/Form";

function App() {
  const [registerSubmitClicked, setRegisterSubmitClicked] = useState(false);
  return (
    <div className="flex bg-backimage items-center justify-center bg-fixed">
      {!registerSubmitClicked ? (
        <Form setRegisterSubmitClicked={setRegisterSubmitClicked} />
      ) : (
        <Response />
      )}
    </div>
  );
}

export default App;
