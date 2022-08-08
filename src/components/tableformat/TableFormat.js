import React, { useEffect, useState } from "react";
import "./TableFormat.css";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAllTransactions } from "../../firebase/eventApi";

const TableFormat = () => {
  const [data, setData] = useState({});
  const [registrations, setRegistrations] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const dbRef = ref(getDatabase());
  useEffect(() => {
    get(child(dbRef, `Registration/OPENSOURCE/`))
      .then((snapshot) => {
        setData(snapshot.val());
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    getAllTransactions({ eventName: "interview-fair" }, (data) => {
      setTransactions(data);
    });
  }, [dbRef]);

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold my-3">RESPONSES</h1>
      <table className="tg mb-4">
        <thead>
          <tr>
            <th className="tg-0lax">
              <h1 className="font-semibold"> Sr. No.</h1>
            </th>
            <th className="tg-0lax">
              <h1 className="font-semibold">GR. No.</h1>
            </th>
            <th className="tg-0lax">
              <h1 className="font-semibold">Name</h1>
            </th>
            <th className="tg-0lax">
              <h1 className="font-semibold">Transaction ID</h1>
            </th>
            <th className="tg-0lax">
              <h1 className="font-semibold">Email</h1>
            </th>
            <th className="tg-0lax">
              <h1 className="font-semibold">Branch</h1>
            </th>
            <th className="tg-0lax">
              <h1 className="font-semibold">Year</h1>
            </th>
            <th className="tg-0lax">
              <h1 className="font-semibold">Div</h1>
            </th>
            <th className="tg-0lax">
              <h1 className="font-semibold">Roll No.</h1>
            </th>
            <th className="tg-0lax">
              <h1 className="font-semibold"> Phone No.</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((grNum, num) => {
            return (
              <tr>
                <td className="tg-0lax">{num + 1}</td>
                <td className="tg-0lax">{grNum}</td>
                <td className="tg-0lax">{data[grNum].name}</td>
                <td className="tg-0lax">{data[grNum].transactionID}</td>
                <td className="tg-0lax">{data[grNum].email}</td>
                <td className="tg-0lax">
                  {data[grNum].branch ?? "Information Technology"}
                </td>
                <td className="tg-0lax">{data[grNum].year}</td>
                <td className="tg-0lax">{data[grNum].division}</td>
                <td className="tg-0lax">{data[grNum].roll_no}</td>
                <td className="tg-0lax">{data[grNum].phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableFormat;
