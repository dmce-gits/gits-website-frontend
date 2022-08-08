import { getDatabase, ref, get, child, set, update } from "firebase/database";
import { firebaseApp } from "./init";
import { getApp } from "firebase/app";

// Get a non-default Storage bucket

const addEvent = (data, success, failure) => {
  const db = getDatabase();
  const eventRef = ref(db, `Registration/${data.event}/${data.grNum}`);
  const input = {
    name: data.name,
    email: data.email,
    division: data.div,
    year: data.year,
    branch: data.branch,
    phone: data.phone,
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

const getTransactionIds = (data, success, failure) => {
  const db = getDatabase();
  const transactionRef = ref(db, `Transaction/${data.eventName}`);
  get(transactionRef)
    .then((snap) => {
      const transactions = snap.val() ?? {};
      success(Object.keys(transactions));
    })
    .catch(failure);
};

const addTransactionId = (data, success, failure) => {
  const db = getDatabase();
  const transactionRef = ref(
    db,
    `Transaction/${data.eventName}/${data.transactionId}`
  );
  const input = {
    stdid: data.grNum,
  };

  set(transactionRef, input)
    .then(() => {
      success();
    })
    .catch((err) => {
      failure(err);
    });
};

export { addEvent, getTransactionIds, addTransactionId };
