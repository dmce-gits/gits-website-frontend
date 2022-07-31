import React, { useEffect, useState } from "react";
import "./HTML_CSS_JS_RESPONSES.css";
import { getDatabase, ref, child, get } from "firebase/database";

const HTML_CSS_JS_RESPONSES = () => {
  const [data, setData] = useState({});
  const dbRef = ref(getDatabase());
  useEffect(() => {
    get(child(dbRef, `Registration/HTML-CSS-JS/`))
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
  }, [dbRef]);

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold my-3">
        {" "}
        1st Workshop : HTML CSS JS - RESPONSES
      </h1>
      <table className="tg mb-4">
        <thead>
          <tr>
            <th className="tg-0lax">
              <h1 className="font-semibold"> Sr. No.</h1>
            </th>
            <th className="tg-0lax">
              <h1 className="font-semibold">Name</h1>
            </th>
            <th className="tg-0lax">
              <h1 className="font-semibold">Email</h1>
            </th>
            <th className="tg-0lax">
              <h1 className="font-semibold">GR. No.</h1>
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
          {Object.keys(data).map((key, num) => {
            return (
              <tr>
                <td className="tg-0lax">{num + 1}</td>
                <td className="tg-0lax">{data[key].name}</td>
                <td className="tg-0lax">{data[key].email}</td>
                <td className="tg-0lax">{data[key].stdid}</td>
                <td className="tg-0lax">
                  {data[key].branch ?? "Information Technology"}
                </td>
                <td className="tg-0lax">{data[key].year}</td>
                <td className="tg-0lax">{data[key].division}</td>
                <td className="tg-0lax">{data[key].roll_no}</td>
                <td className="tg-0lax">{key}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HTML_CSS_JS_RESPONSES;
