import { getDatabase, ref, get, child, set, update } from "firebase/database";
import { firebaseApp } from "./init";

const addEvent = (data, success, failure) => {
  const db = getDatabase();
  const eventRef = ref(db, `Registration/${data.event}/${data.phone}`);
  const input = {
    name: data.name,
    email: data.email,
    division: data.div,
    year: data.year,
    stdid: data.grNum,
    roll_no: data.rollNum,
  };

  set(eventRef, input)
    .then(() => {
      success();
    })
    .catch((err) => {
      failure(err);
    });
};

export { addEvent };
