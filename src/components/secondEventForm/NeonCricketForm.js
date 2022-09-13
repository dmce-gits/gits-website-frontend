import React, { useState, useRef } from "react";
import {
  addEvent,
  getTransactionIds,
  addTransactionId,
  addNeonCricket,
} from "../../firebase/eventApi";
import "./Form.css";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { firebaseApp } from "../../firebase/init";
import { useEffect } from "react";
import { getDatabase, ref, child, get } from "firebase/database";

const NeonCricketForm = ({ setRegisterSubmitClicked }) => {
  const [teamName, setTeamName] = useState("");
  let [p1name, setP1name] = useState("");
  let [p2name, setP2name] = useState("");
  let [p3name, setP3name] = useState("");
  let [p4name, setP4name] = useState("");
  let [p5name, setP5name] = useState("");
  let [p1phone, setP1phone] = useState("");
  let [p2phone, setP2phone] = useState("");
  let [p3phone, setP3phone] = useState("");
  let [p4phone, setP4phone] = useState("");
  let [p5phone, setP5phone] = useState("");
  let [college, setCollege] = useState("");
  const [grNum, setGrNum] = useState("");
  const [year, setYear] = useState("FE");
  const [teamType, setTeamType] = useState("Boys");

  let event = "NeonCricket";
  const [transactionId, setTransactionId] = useState("");
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [downloadURL, setDownloadURL] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [acceptingRes, setAcceptingRes] = useState(true);
  const dbRef = ref(getDatabase());

  useEffect(() => {
    get(child(dbRef, `TAKING_RESPONSES_NEON_CRICKET/`))
      .then((snapshot) => {
        setAcceptingRes(snapshot.val());
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const uploader = (file, callback) => {
    const storage = getStorage(firebaseApp);
    const imagesRef = storageRef(storage, `NeonCricket/${transactionId}`);

    uploadBytes(imagesRef, file)
      .then(() => {
        downloader(callback);
        alert("Payment screenshot uploaded successfully");
        console.log("Image uploaded successfully");
      })
      .catch((err) => {
        alert(err);
      });
    // downloader();
  };

  const downloader = (callback) => {
    const storage = getStorage(firebaseApp);
    const imagesRef = storageRef(storage, `NeonCricket/${transactionId}`);
    getDownloadURL(imagesRef)
      .then((url) => {
        setDownloadURL(url);
        callback(url);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      teamName,
      event,
      grNum,
      year,
      teamType,
      p1name,
      p2name,
      p3name,
      p4name,
      p5name,
      p1phone,
      p2phone,
      p3phone,
      p4phone,
      p5phone,
      college,
      transactionId,
      image,
      downloadURL,
    };

    let newErrors = {};

    if (teamName.trim() === "") {
      newErrors = { ...newErrors, teamName: true };
    }
    if (p1name.trim() === "") {
      newErrors = { ...newErrors, p1name: true };
    }
    if (p2name.trim() === "") {
      newErrors = { ...newErrors, p2name: true };
    }

    if (p3name.trim() === "") {
      newErrors = { ...newErrors, p3name: true };
    }
    if (p4name.trim() === "") {
      newErrors = { ...newErrors, p4name: true };
    }
    if (p5name.trim() === "") {
      newErrors = { ...newErrors, p5name: true };
    }
    if (p1phone.trim() === "") {
      newErrors = { ...newErrors, p1phone: true };
    }
    if (p2phone.trim() === "") {
      newErrors = { ...newErrors, p2phone: true };
    }
    if (p3phone.trim() === "") {
      newErrors = { ...newErrors, p3phone: true };
    }
    if (p4phone.trim() === "") {
      newErrors = { ...newErrors, p4phone: true };
    }
    if (p5phone.trim() === "") {
      newErrors = { ...newErrors, p5phone: true };
    }
    if (college.trim() === "") {
      newErrors = { ...newErrors, college: true };
    }
    if (transactionId.trim() === "") {
      newErrors = { ...newErrors, transactionId: true };
    }
    if (grNum.trim() === "") {
      newErrors = { ...newErrors, grNum: true };
    }
    if (year.trim() === "") {
      newErrors = { ...newErrors, year: true };
    }
    if (teamType.trim() === "") {
      newErrors = { ...newErrors, teamType: true };
    }
    if (image === null) {
      alert("Please upload Payment Screenshot");
      newErrors = { ...newErrors, image: true };
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length) {
      return;
    }

    getTransactionIds(
      { eventName: "NeonCricket" },
      (transactionIds) => {
        if (transactionIds.includes(transactionId)) {
          alert(
            "This transaction ID is already in our database, please do not enter a duplicate transaction ID!"
          );
          return;
        } else {
          addTransactionId(
            { eventName: "NeonCricket", transactionId, grNum: p1phone },
            () => {
              setUploadingImage(true);
              uploader(image, (url) => {
                setUploadingImage(false);
                addNeonCricket(
                  { ...data, downloadURL: url, transactionId: transactionId },
                  () => {
                    setRegisterSubmitClicked(true);
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              });
            },
            (err) => {
              console.error(err);
              alert("Something BAD happened! Please try again later!");
            }
          );
        }
      },
      (err) => {
        console.error(err);
        alert("Something BAD happened! Please try again later!");
      }
    );
  };
  if (acceptingRes) {
    return (
      <>
        <form id="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <div id="logo">
              <div className="flex flex-row justify-between items-center mb-3">
                <img src="./dmce-logo.jpg" alt="logo" className="w-20 h-fit" />
                <img
                  src="./GITS LOGO-modified.png"
                  alt="logo"
                  className="w-20 h-fit"
                />
                <img
                  src="./output-onlinepngtools.png"
                  alt="logo"
                  className="w-20 h-fit"
                />
              </div>
              <h1
                className="mt-8 my-4 text-white text-4xl text-center"
                style={{ fontFamily: "CounterStrike" }}
              >
                TECHNITUDE <br />
                2022
              </h1>

              <h1
                className="font-medium text-3xl italic text-white text-justify"
                style={{ fontFamily: "CounterStrike" }}
              >
                <center>Neon Cricket</center>
              </h1>
              <br />
              <p className="text-white text-center">
                <center className="italic">
                  "You have come to the right place if you want to experience
                  the glow of modern cricket"{" "}
                </center>
                <br />
                💭 So what are you waiting for 💭
                <br />
                ----✨🖥️ GITS DMCE 🖥️✨---- <br />
                <span className="">Presents</span> <br />
                <snap className="">
                  🏏 <span className="underline">Neon Cricket</span> 🏏
                </snap>
                <br />
                <span className="my-4 block">
                  👉 WE, THE GITS COMMITTEE OF 22-23, ARE ORGANIZING A NEON
                  CRICKET TOURNAMENT !!! 🏏⚾️💫🤩
                </span>
              </p>

              <div className="flex flex-col mt-2 mb-6 text-white justify-center">
                <div>
                  <span className="font-bold">🗓️ Date:</span> 15th and 16th Sept
                </div>
                <div>
                  <span className="font-bold">⌚ Time:</span> 10 AM Onwards{" "}
                </div>
                <div>
                  <span className="font-bold">📍 Venue:</span>{" "}
                  <a
                    href="https://www.google.com/maps/place/Datta+Meghe+College+Of+Engineering/@19.160322,72.9933793,17z/data=!3m1!4b1!4m5!3m4!1s0x3be7bf4daf8967d9:0xdd90bed2058f7eaa!8m2!3d19.160322!4d72.995568"
                    target={"_blank"}
                    rel="noreferrer noopener"
                    className="text-blue-400"
                  >
                    Datta Meghe College of Engineering, Airoli
                  </a>{" "}
                  (Room no:809)
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-2 text-[#1C6758] ">
              <div className="space-y-1  border-2 rounded-lg border-black p-3 bg-[#D2D79F]">
                <div>
                  <h1 className="font-mono font-semibold ">Team Name</h1>
                  <input
                    classname="rounded-md px-1 py-0"
                    type="text"
                    placeholder="Enter Team Name"
                    value={teamName}
                    onChange={(e) => {
                      setTeamName(e.target.value);
                      setErrors({ ...errors, teamName: false });
                    }}
                  />
                  {errors.teamName && (
                    <p className="text-red-600">Team Name is required!</p>
                  )}
                </div>
              </div>
              <div className="space-y-1  border-2 rounded-lg border-black p-3 bg-[#D2D79F]">
                <div>
                  <h1 className="font-mono font-semibold ">
                    Name of Player 1 (Captain):
                  </h1>
                  <input
                    classname="rounded-md px-1 py-0"
                    type="text"
                    placeholder="Enter Name"
                    value={p1name}
                    onChange={(e) => {
                      setP1name(e.target.value);
                      setErrors({ ...errors, p1name: false });
                    }}
                  />
                  {errors.p1name && (
                    <p className="text-red-600">Player 1 Name is required!</p>
                  )}
                </div>
                <div>
                  <h1 className="font-mono font-semibold ">
                    Player 1 Phone Number:
                  </h1>

                  <input
                    classname="rounded-md px-1 py-0"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder="Enter Phone Number"
                    value={p1phone}
                    onChange={(e) => {
                      setP1phone(e.target.value);
                      setErrors({ ...errors, p1phone: false });
                    }}
                  />
                  {errors.p1phone && (
                    <p className="text-red-600">Player 1 Phone is required!</p>
                  )}
                  <div>
                    <h1 className="font-mono font-semibold">GR Number:</h1>
                    <input
                      type="text"
                      value={grNum}
                      onChange={(e) => {
                        setGrNum(e.target.value);
                        setErrors({ ...errors, grNum: false });
                      }}
                      placeholder="Enter GR Number"
                    />
                  </div>
                  {errors.grNum && (
                    <p className="text-red-600">GR Number is required!</p>
                  )}
                  <div className="form-control">
                    <label
                      htmlFor="div"
                      className="font-bold mb-0  text-[#1C6758]"
                      id="label-div"
                    >
                      Year
                    </label>
                    {errors.year && (
                      <p className="text-red-600">Year is required!</p>
                    )}
                    <select
                      name="year"
                      onChange={(e) => {
                        setYear(e.target.value);
                        setErrors({ ...errors, year: false });
                      }}
                    >
                      <option value="FE">FE</option>
                      <option value="SE">SE</option>
                      <option value="TE">TE</option>
                      <option value="BE">BE</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="space-y-1  border-2 rounded-lg border-black p-3 bg-[#D2D79F]">
                <div>
                  <h1 className="font-mono font-semibold">Name of Player 2:</h1>
                  <input
                    classname="rounded-md px-1 py-0"
                    type="text"
                    placeholder="Enter Name"
                    value={p2name}
                    onChange={(e) => {
                      setP2name(e.target.value);
                      setErrors({ ...errors, p2name: false });
                    }}
                  />
                  {errors.p2name && (
                    <p className="text-red-600">Player 2 Name is required!</p>
                  )}
                </div>
                <div>
                  <h1 className="font-mono font-semibold">
                    Player 2 Phone Number:
                  </h1>

                  <input
                    classname="rounded-md px-1 py-0"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder="Enter Phone Number"
                    value={p2phone}
                    onChange={(e) => {
                      setP2phone(e.target.value);
                      setErrors({ ...errors, p2phone: false });
                    }}
                  />
                  {errors.p2phone && (
                    <p className="text-red-600">Player 2 Phone is required!</p>
                  )}
                </div>
              </div>
              <div className="space-y-1  border-2 rounded-lg border-black p-3 bg-[#D2D79F]">
                <div>
                  <h1 className="font-mono font-semibold">Name of Player 3:</h1>
                  <input
                    classname="rounded-md px-1 py-0"
                    type="text"
                    placeholder="Enter Name"
                    value={p3name}
                    onChange={(e) => {
                      setP3name(e.target.value);
                      setErrors({ ...errors, p3name: false });
                    }}
                  />
                  {errors.p3name && (
                    <p className="text-red-600">Player 3 Name is required!</p>
                  )}
                </div>
                <div>
                  <h1 className="font-mono font-semibold">
                    Player 3 Phone Number:
                  </h1>

                  <input
                    classname="rounded-md px-1 py-0"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder="Enter Phone Number"
                    value={p3phone}
                    onChange={(e) => {
                      setP3phone(e.target.value);
                      setErrors({ ...errors, p3phone: false });
                    }}
                  />
                  {errors.p3phone && (
                    <p className="text-red-600">Player 3 Phone is required!</p>
                  )}
                </div>
              </div>
              <div className="space-y-1  border-2 rounded-lg border-black p-3 bg-[#D2D79F]">
                <div>
                  <h1 className="font-mono font-semibold">Name of Player 4:</h1>
                  <input
                    classname="rounded-md px-1 py-0"
                    type="text"
                    placeholder="Enter Name"
                    value={p4name}
                    onChange={(e) => {
                      setP4name(e.target.value);
                      setErrors({ ...errors, p4name: false });
                    }}
                  />
                  {errors.p4name && (
                    <p className="text-red-600">Player 4 Name is required!</p>
                  )}
                </div>
                <div>
                  <h1 className="font-mono font-semibold">
                    Player 4 Phone Number:
                  </h1>

                  <input
                    classname="rounded-md px-1 py-0"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder="Enter Phone Number"
                    value={p4phone}
                    onChange={(e) => {
                      setP4phone(e.target.value);
                      setErrors({ ...errors, p4phone: false });
                    }}
                  />
                  {errors.p4phone && (
                    <p className="text-red-600">Player 4 Phone is required!</p>
                  )}
                </div>
              </div>
              <div className="space-y-1  border-2 rounded-lg border-black p-3 bg-[#D2D79F]">
                <div>
                  <h1 className="font-mono font-semibold">Name of Player 5:</h1>
                  <input
                    classname="rounded-md px-1 py-0"
                    type="text"
                    placeholder="Enter Name"
                    value={p5name}
                    onChange={(e) => {
                      setP5name(e.target.value);
                      setErrors({ ...errors, p5name: false });
                    }}
                  />
                  {errors.p5name && (
                    <p className="text-red-600">Player 5 Name is required!</p>
                  )}
                </div>
                <div>
                  <h1 className="font-mono font-semibold">
                    Player 5 Phone Number:
                  </h1>
                  <input
                    classname="rounded-md px-1 py-0"
                    type="number"
                    onWheel={(e) => e.target.blur()}
                    placeholder="Enter Phone Number"
                    value={p5phone}
                    onChange={(e) => {
                      setP5phone(e.target.value);
                      setErrors({ ...errors, p5phone: false });
                    }}
                  />
                  {errors.p5phone && (
                    <p className="text-red-600">Player 5 Phone is required!</p>
                  )}
                </div>
              </div>
              <div className="space-y-1  border-2 rounded-lg border-black p-3 bg-[#D2D79F]">
                <label
                  htmlFor="div"
                  className="font-bold mb-0  text-[#1C6758]"
                  id="label-div"
                >
                  Team Type:
                </label>
                {errors.teamType && (
                  <p className="text-red-600">Team Type is required!</p>
                )}
                <select
                  name="Team Type"
                  defaultValue={"Boys"}
                  onChange={(e) => {
                    setTeamType(e.target.value);
                    setErrors({ ...errors, teamType: false });
                  }}
                >
                  <option value="Boys">All Boys</option>
                  <option value="Mixed">Mixed (Girls+Boys)</option>
                  <option value="Girls">All Girls</option>
                </select>
              </div>
              <div className=" border-2 rounded-lg border-black p-3 bg-[#D2D79F]">
                <h1 className="font-mono font-semibold">College Name:</h1>
                <input
                  type="text"
                  placeholder="Enter College Name"
                  value={college}
                  onChange={(e) => {
                    setCollege(e.target.value);
                    setErrors({ ...errors, college: false });
                  }}
                ></input>
                {errors.college && (
                  <p className="text-red-600">College Name is required!</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col space-x-2 items-center justify-center">
            <span className="font-bold text-white">
              UPI ID:{" "}
              <span className="text-red-600 bg-white px-1">
                ishikamore2001@oksbi
              </span>
            </span>

            <span className="font-bold text-white">
              Amount:{" "}
              <span className="text-red-600 bg-white px-1">{" ₹ 200"}</span>
            </span>
            <img
              className="w-1/2 h-full my-5"
              src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
                `upi://pay?pa=ishikamore2001@oksbi&pn=ISHIKA%20MORE&am=200.00&cu=INR`
              )}`}
              alt="upiQR"
            />
          </div>
          <div className="form-control border-2 rounded-lg border-black p-3 bg-[#D2D79F]">
            <div className="flex flex-col">
              <h1 className="font-bold mb-0 text-left pb-2  text-[#1C6758]">
                Upload Your Payment Screenshot:
              </h1>
              <input
                className="mb-5  font-bold"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  console.log(e.target.files[0]);

                  // uploadImage(event.target.files[0], "image");
                  // console.log(e.target.files);
                  // uploader(e.target.files[0]);
                }}
              />
            </div>
            <div className="form-control mt-4">
              <label className="font-bold mb-0 text-[#1C6758] ">
                Enter your Transaction Id:
              </label>
              {errors.transactionId && (
                <p className="text-red-600">Transaction ID is required!</p>
              )}
              <input
                className="font-bold"
                type="text"
                name="transactionId"
                placeholder="Example: OIB9FQP9H7"
                value={transactionId}
                onChange={(e) => {
                  setTransactionId(e.target.value);
                  setErrors({ ...errors, transactionId: false });
                }}
              />
            </div>
          </div>

          {uploadingImage && (
            <span className="text-white">Uploading Image... Please wait!</span>
          )}
          <div className="flex justify-center mx-3">
            <button
              onClick={onSubmit}
              className="bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-600 text-white mt-4 disabled:bg-gray-500 disabled:cursor-not-allowed"
              disabled={uploadingImage}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </>
    );
  } else if (!acceptingRes) {
    return (
      <div className="flex flex-col items-center justify-center text-white h-screen">
        <h1 className="text-2xl">Sorry Bro Too late</h1>
        <h1>RESPONSES STOPPED</h1>
      </div>
    );
  }
};

export default NeonCricketForm;
