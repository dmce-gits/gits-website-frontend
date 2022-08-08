import React, { useEffect, useState } from "react";
import "./INTERVIEWFAIR_RESPONSES.css";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAllTransactions } from "../../../firebase/eventApi";
import ImageViewer from "../../ImageViewer";

const INTERVIEWFAIR_RESPONSES = () => {
  const [data, setData] = useState({});
  const dbRef = ref(getDatabase());
  useEffect(() => {
    get(child(dbRef, `Registration/InterviewFair/`))
      .then((snapshot) => {
        const registrationData = { ...snapshot.val() };
        getAllTransactions({ eventName: "interview-fair" }, (data) => {
          Object.keys(data).map((el) => {
            Object.keys(registrationData).map((stdid) => {
              if (stdid === data[el].stdid) {
                console.log(stdid);
                registrationData[stdid].transaction_id = el;
                console.log(registrationData[stdid]);
              }
            });
          });
          setData(registrationData);
        });

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
      <h1 className="text-2xl font-bold my-3">INTERVIEW FAIR</h1>
      <table className="tg mb-4">
        <thead>
          <tr>
            <th className="tg-0lax">
              <h1 className="font-semibold">Sr. No.</h1>
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
            <th className="tg-0lax">
              <h1 className="font-semibold"> Transaction Id</h1>
            </th>
            <th className="tg-0lax">
              <h1 className="font-semibold">Download_link</h1>
            </th>
            <th className="tg-0lax">
              <h1 className="font-semibold"> Domains</h1>
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
                <td className="tg-0lax">{key}</td>
                <td className="tg-0lax">
                  {data[key].branch ?? "Information Technology"}
                </td>
                <td className="tg-0lax">{data[key].year}</td>
                <td className="tg-0lax">{data[key].division}</td>
                <td className="tg-0lax">{data[key].roll_no}</td>
                <td className="tg-0lax">{data[key].phone}</td>
                <td className="tg-0lax">{data[key].transaction_id}</td>
                <td className="tg-0lax flex items-center justify-center">
                  {/* <a
                    href={data[key].download_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  > */}
                  {/* <img
                      src={data[key].download_link}
                      alt="imagee"
                      className="h-full w-10"
                    ></img> */}
                  <ImageViewer
                    src={data[key].download_link}
                    // className="h-full w-10"
                  />
                  {/* </a> */}
                </td>
                <td className="tg-0lax">{data[key].domains}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default INTERVIEWFAIR_RESPONSES;
