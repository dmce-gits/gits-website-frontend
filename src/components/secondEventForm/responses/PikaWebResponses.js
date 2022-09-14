import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { getAllTransactions } from "../../../firebase/eventApi";
import ImageViewer from "../../ImageViewer";
import DataTable from "react-data-table-component";
import styled from "styled-components";

const eventKeysToNames = {
  "pika-web": "Pika Web",
  "kaun-banega-techgyani": "Kaun Banega Techgyani",
  "snap-to-win": "Snap To Win",
  photography: "Picxellence",
};

const TechnitudeResponses = () => {
  const [data, setData] = useState({});
  const [rows, setRows] = useState([]);
  const [hidePikaWebColumn, setHidePikaWebColumn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(getDatabase());

    onValue(
      child(dbRef, `Registration/Technitude/`),
      (snapshot) => {
        const registrationData = { ...snapshot.val() };
        getAllTransactions({ eventName: "Technitude" }, (data) => {
          Object.keys(data).forEach((el) => {
            Object.keys(registrationData).forEach((stdid) => {
              if (stdid === data[el].stdid) {
                console.log(stdid);
                registrationData[stdid].transaction_id = el;
                console.log(registrationData[stdid]);
              }
            });
          });
          setData(registrationData);
          setLoading(false);
        });

        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    const tempRows = Object.keys(data).map((key, ind) => ({
      ...data[key],
      id: ind,
      grNum: key,
    }));

    setRows(tempRows);

    return () => {};
  }, [data]);

  const onEventChange = (e) => {
    if (e.target.value === "pika-web" || e.target.value === "all") {
      setHidePikaWebColumn(false);
    } else {
      setHidePikaWebColumn(true);
    }

    const eventKey = e.target.value;

    const tempRows = Object.keys(data)
      .filter((key) => {
        if (eventKey === "all") return true;

        return data[key].events[eventKey];
      })
      .map((key, ind) => ({
        ...data[key],
        id: ind,
        grNum: key,
      }));

    setRows(tempRows);
  };

  const columns = [
    {
      name: "Sr. No.",
      selector: (row) => row.id + 1,
      width: "90px",
    },
    {
      name: "Pika Web Team Name",
      selector: (row) => row.teamName,
      omit: hidePikaWebColumn,
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      minWidth: "200px",
      wrap: true,
    },
    {
      name: "GR Number",
      selector: (row) => row.grNum,
      sortable: true,
      wrap: true,
      minWidth: "140px",
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Division",
      selector: (row) => row.division,
      sortable: true,
    },
    {
      name: "Roll Num",
      selector: (row) => row.roll_no,
      sortable: true,
    },
    {
      name: "College",
      selector: (row) => row.college,
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: "Branch",
      selector: (row) => row.branch,
      sortable: true,
      minWidth: "130px",
      wrap: true,
    },
    {
      name: "Events Participated",
      selector: (row) => (
        <div className="flex flex-col">
          {Object.keys(row.events).map((key) => (
            <div key={key}>{eventKeysToNames[key]}</div>
          ))}
        </div>
      ),
      sortable: true,
      wrap: true,
      minWidth: "200px",
    },
    {
      name: "Timestamp",
      selector: (row) =>
        new Date(row.timestamp ?? 1663050651 * 1000).toLocaleString(),
      sortable: true,
      wrap: true,
      minWidth: "200px",
    },
    {
      name: "Transaction ID",
      selector: (row) => row.transactionId,
      sortable: true,
      wrap: true,
      minWidth: "200px",
    },
    {
      name: "Transaction ID Photo",
      selector: (row) => <ImageViewer src={row.download_link} />,
      sortable: true,
    },
  ];

  return (
    <div className="text-white w-full">
      <h1 className="text-2xl font-bold my-3">Technitude Event Responses</h1>
      <select className="my-4 text-black text-xl p-2" onChange={onEventChange}>
        <option value="all">All Events (Technical + Picxellence)</option>
        <option value="pika-web">Pika Web</option>
        <option value="kaun-banega-techgyani">Kaun Banega Techgyani</option>
        <option value="snap-to-win">Snap To Win</option>
        <option value="photography">Picxellence</option>
      </select>
      <DataTable columns={columns} data={rows} progressPending={loading} />
    </div>
  );
};

export default TechnitudeResponses;
