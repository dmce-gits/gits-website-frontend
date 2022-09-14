import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { getAllTransactions } from "../../../firebase/eventApi";
import ImageViewer from "../../ImageViewer";
import DataTable from "react-data-table-component";
import styled from "styled-components";

const NeonCricketResponses = () => {
  const [data, setData] = useState({});
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dbRef = ref(getDatabase());

    onValue(
      child(dbRef, `Registration/NeonCricket/`),
      (snapshot) => {
        const registrationData = { ...snapshot.val() };
        getAllTransactions({ eventName: "NeonCricket" }, (data) => {
          console.log(data);
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
    }));

    setRows(tempRows);

    return () => {};
  }, [data]);

  const columns = [
    {
      name: "Sr. No.",
      selector: (row) => row.id + 1,
      width: "90px",
    },
    {
      name: "Team Name",
      selector: (row) => row.teamName,
      sortable: true,
      wrap: true,
    },
    {
      name: "Team Type",
      selector: (row) => row.teamType,
      sortable: true,
    },
    {
      name: "Player 1 Name",
      selector: (row) => row.p1name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Player 1 Phone",
      selector: (row) => row.p1phone,
      sortable: true,
    },
    {
      name: "Player 1 GR Number",
      selector: (row) => row.grNum,
      sortable: true,
    },
    {
      name: "Player 1 Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "College",
      selector: (row) => row.college,
      sortable: true,
      grow: 2,
    },
    {
      name: "Player 2 Name",
      selector: (row) => row.p2name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Player 2 Phone",
      selector: (row) => row.p2phone,
      sortable: true,
    },
    {
      name: "Player 3 Name",
      selector: (row) => row.p3name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Player 3 Phone",
      selector: (row) => row.p3phone,
      sortable: true,
    },
    {
      name: "Player 4 Name",
      selector: (row) => row.p4name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Player 4 Phone",
      selector: (row) => row.p4phone,
      sortable: true,
    },
    {
      name: "Player 5 Name",
      selector: (row) => row.p5name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Player 5 Phone",
      selector: (row) => row.p5phone,
      sortable: true,
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
    },
    {
      name: "Transaction ID Photo",
      selector: (row) => <ImageViewer src={row.downloadURL} />,
      sortable: true,
    },
  ];

  return (
    <div className="text-white w-full">
      <h1 className="text-2xl font-bold my-3">Neon Cricket</h1>
      <DataTable columns={columns} data={rows} progressPending={loading} />
    </div>
  );
};

export default NeonCricketResponses;
