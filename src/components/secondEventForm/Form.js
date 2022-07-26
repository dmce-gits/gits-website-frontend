import { useState, useRef } from "react";
import {
  addEvent,
  getTransactionIds,
  addTransactionId,
} from "../../firebase/eventApi";
import "./Form.css";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { firebaseApp } from "../../firebase/init";
import Modal from "react-modal";

const events = {
  "snap-to-win": {
    name: "Snap To Win",
    fees: 30,
    helperText: "",
  },
  "pika-web": {
    name: "PikaWeb",
    fees: 30,
    helperText: "Each team member has to register separately.",
  },
  "kaun-banega-techgyani": {
    name: "Kaun Banega Techgyani",
    fees: 30,
    helperText: "",
  },
  photography: {
    name: "Picxellence",
    fees: 50,
    helperText: "",
  },
};

const Form = ({ setRegisterSubmitClicked }) => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [year, setYear] = useState("SE");
  const [branch, setBranch] = useState("Information Technology");
  const [div, setDiv] = useState("A");
  const [rollNum, setRollNum] = useState("");
  const [grNum, setGrNum] = useState("");
  let event = "Technitude";
  const [transactionId, setTransactionId] = useState("");
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const eventsContainer = useRef(null);
  const [eventsSelected, setEventsSelected] = useState([]);
  const [downloadURL, setDownloadURL] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentInfoModal, setCurrentInfoModal] = useState("");
  const [teamName, setTeamName] = useState("");
  const [college, setCollege] = useState("");
  const firstInput = useRef(null);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const uploader = (file, callback) => {
    const storage = getStorage(firebaseApp);
    const imagesRef = storageRef(storage, `Technitude/${transactionId}`);

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
    const imagesRef = storageRef(storage, `Technitude/${transactionId}`);
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
      teamName: teamName,
      event,
      name,
      email,
      phone,
      year,
      branch,
      div,
      rollNum,
      grNum,
      transactionId,
      image,
      downloadURL,
      college,
    };

    let newErrors = {};

    if (name.trim() === "") {
      newErrors = { ...newErrors, name: true };
    }
    if (email.trim() === "") {
      newErrors = { ...newErrors, email: true };
      console.log("email is true");
    }
    if (!validateEmail(email.trim())) {
      newErrors = { ...newErrors, emailInvalid: true };
    }
    if (phone.trim() === "") {
      newErrors = { ...newErrors, phone: true };
    }
    if (year.trim() === "") {
      newErrors = { ...newErrors, year: true };
    }
    if (branch.trim() === "") {
      newErrors = { ...newErrors, branch: true };
    }
    if (div.trim() === "") {
      newErrors = { ...newErrors, div: true };
    }
    if (rollNum.trim() === "") {
      newErrors = { ...newErrors, rollNum: true };
    }
    if (grNum.trim() === "") {
      newErrors = { ...newErrors, grNum: true };
    }
    if (transactionId.trim() === "") {
      newErrors = { ...newErrors, transactionId: true };
    }
    if (college.trim() === "") {
      newErrors = { ...newErrors, college: true };
    }
    if (eventsSelected.includes("pika-web") && teamName.trim() === "") {
      newErrors = { ...newErrors, teamName: true };
    }
    if (image === null) {
      alert("Please upload Payment Screenshot");
      newErrors = { ...newErrors, image: true };
    }

    const selectedEvents = [];
    const eventsInputs = eventsContainer.current.getElementsByTagName("input");
    for (let i of eventsInputs) {
      if (i.checked) {
        selectedEvents.push(i.value);
      }
    }

    if (!selectedEvents.length) {
      newErrors = { ...newErrors, events: true };
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length) {
      return;
    }

    data.eventsSelected = selectedEvents;

    console.log(data.eventsSelected);

    getTransactionIds(
      { eventName: "technitude" },
      (transactionIds) => {
        if (transactionIds.includes(transactionId)) {
          alert(
            "This transaction ID is already in our database, please do not enter a duplicate transaction ID!"
          );
          return;
        } else {
          addTransactionId(
            { eventName: "technitude", transactionId, grNum },
            () => {
              setUploadingImage(true);
              uploader(image, (url) => {
                setUploadingImage(false);
                addEvent(
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

  const onEventChange = () => {
    const selectedEvents = [];
    const eventsInputs = eventsContainer.current.getElementsByTagName("input");
    for (let i of eventsInputs) {
      if (i.checked) {
        selectedEvents.push(i.value);
      }
    }

    console.log(selectedEvents);

    setEventsSelected(selectedEvents);
  };

  return (
    <>
      {/* <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        
      </Modal> */}
      <Modal
        isOpen={modalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => setModalOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#E1FFEE",
          },
        }}
        contentLabel="Example Modal"
      >
        <div
          style={{
            backgroundColor: "#E1FFEE",
            padding: "20px",
            borderRadius: "10px",
            maxWidth: "500px",
            marginRight: 0,
          }}
        >
          {currentInfoModal === "snap-to-win" ? (
            <p className="text-black text-center">
              <center className="italic">
                💎" With all six stones , I could simply snap my fingers " 💎
              </center>
              <br />
              Hurry up and make today a treasure hunt of delight!🎉
              <br />
              ----✨🖥️ GITS DMCE 🖥️✨---- <br />
              <span className="">Presents</span> <br />
              <snap className="">
                🏏 <span className="underline">SNAP TO WIN</span> 🏏
              </snap>
              <br />
              <span className="my-4 block">
                📢WE , THE GITS COMMITTEE OF 22-23, ARE ORGANIZING A TREASURE
                HUNT COMPETITION !!! ✨
              </span>
              <span className="my-4 block">
                📌In this competition , you hunt for the prize with your coding
                skills.This event will be a one day event with lots of exciting
                surprises,prizes and goodies on your way. So put your coding
                glasses on 👓 and be a part of this amazing event.💥
                <br />
                This event will make you feel {"<3"} <br />“ I LOVE YOU 3000 ”
              </span>
            </p>
          ) : currentInfoModal === "kaun-banega-techgyani" ? (
            <>
              <p className="text-black text-center">
                <span className="italic">
                  💎 "देवियों और सज्जनों, चलो हम और आप मिलकर खेलते है <br />
                  KON BANEGA TECHGYANI" 💎
                </span>
                <br />
                Hurry up and let's play the KBC game of TECH!🎉
                <br />
                ----✨🖥️ GITS DMCE 🖥️✨---- <br />
                <span className="">Presents</span> <br />
                <snap className="">
                  💫 <span className="underline">Kaun Banega TechGyani</span>{" "}
                  💫
                </snap>
                <br />
                <span className="my-4 block">
                  📢 WE, THE GITS COMMITTEE OF 22-23, IS ORGANIZING A KBC Based
                  COMPETITION !!! ✨
                </span>
              </p>
              <p>
                📌 In this competition, you compete for the prize with your
                IT-based skills along with our KBC format.{" "}
              </p>
              <p>
                This event will be a one-day event with lots of exciting
                surprises, prizes and goodies on your way. <br /> So put your
                TECH skills glasses on 👓 and be a part of this amazing
                event.💥
              </p>
            </>
          ) : currentInfoModal === "pika-web" ? (
            <>
              <p className="text-black text-center">
                <span className="italic mb-2 block">
                  💎"Lets hit the nostalgia of childhood" 💎 <br />
                </span>
                Hurry up and lets play the Pokemon game of delight!🎉
                <br />
                ----✨🖥️ GITS DMCE 🖥️✨---- <br />
                <span className="">Presents</span> <br />
                <snap className="">
                  💫 <span className="underline">PikaWeb</span> 💫
                </snap>
                <br />
                <span className="my-4 block">
                  📢WE , THE GITS COMMITTEE OF 22-23, IS ORGANIZING A Web Based
                  Hackathon COMPETITION !!! ✨
                </span>
              </p>
              <p>
                📌In this competition , you compete for the prize with your WEB
                dev skills Along with your favourite Pokemon. This event will
                be a one day event with lots of exciting surprises, prizes and
                goodies on your way.
              </p>
              <p>
                So put your Frontend skills glasses on 👓 and be a part of this
                amazing event.💥
              </p>
            </>
          ) : currentInfoModal === "photography" ? (
            <>
              <p className="text-black text-center">
                <span className="italic mb-2 block">
                  “Anyone can shoot chaos. But the most perceptive
                  photographers can make compelling pictures out of
                  uninteresting moments.”
                  <br /> – Alex Tehrani <br />
                </span>
                So to bring out the best photographers ..
                <br />
                ----✨🖥️ GITS DMCE 🖥️✨---- <br />
                <span className="">Presents</span> <br />
                <snap className="">
                  💫📷 <span className="underline"> PICXELLENCE</span> 📷💫
                </snap>
                <br />
                <span className="my-4 block">
                  👉WE, THE GITS COMMITTEE OF 22-23, IS ORGANIZING A
                  PHOTOGRAPHY CONTEST🤩🤩💥
                </span>
              </p>
              <p>
                📌GITS-DMCE is holding a photography competition. This will be
                a one-day Event for which winners will be provided with
                exciting prizes.
              </p>
            </>
          ) : (
            ""
          )}
        </div>
      </Modal>
      <form id="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <div id="logo">
            <div className="flex flex-row justify-between items-center mb-3">
              <img src="./dmce-logo.jpg" alt="logo" className="w-20 h-20" />
              <img
                src="./GITS LOGO-modified.png"
                alt="logo"
                className="w-20 h-20"
              />
              <img
                src="./output-onlinepngtools.png"
                alt="logo"
                className="w-20 h-20"
              />
            </div>
            <h1
              className="mt-8 mb-4 text-white text-4xl text-center"
              style={{ fontFamily: "CounterStrike" }}
            >
              TECHNITUDE <br />
              2022
            </h1>

            <br />

            <p className="text-white text-center">
              ✨🖥️ GITS DMCE 🖥️✨ <br />
              <span className="">Presents</span> <br />
              <center className="">
                <b style={{ fontFamily: "CounterStrike", fontSize: 30 }}>
                  🔸TECHNITUDE🔸
                </b>{" "}
                <br /> A comprehensive annual event which brings students
                aspiring various interests together on one ground and gives
                them the opportunity to showcase their skills and talents
              </center>
              <br />
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
              </div>
            </div>
          </div>
        </div>
        <div className="form-control text-white">
          <label
            htmlFor="events"
            className="font-bold mb-0 text-xl"
            id="label-events"
          >
            Select the events you want to participate in:
          </label>
          {errors.events && (
            <p className="text-red-300">Select at least 1 event!</p>
          )}
          <div
            ref={eventsContainer}
            className="flex flex-col space-y-1  border-2 rounded-lg border-black p-3 bg-[#D2D79F] text-[#1C6758]"
          >
            {Object.keys(events).map((event) => (
              <div key={event}>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    name="events"
                    id={event}
                    value={event}
                    onChange={onEventChange}
                  />
                  <div className="flex flex-row">
                    <label htmlFor={event}>
                      {events[event].name}{" "}
                      <span className="opacity-70 text-[#1C6758]">
                        (₹{events[event].fees}/-)
                      </span>
                    </label>
                    <img
                      src="/help-icon.png"
                      onClick={() => {
                        setModalOpen(true);
                        setCurrentInfoModal(event);
                      }}
                      alt="help"
                      className="w-4 h-4 inline-block mt-1 ml-2 cursor-pointer text-blue-400"
                    />
                  </div>
                </div>
                <p className="ml-5 italic text-[#1C6758] opacity-90 text-sm">
                  {events[event].helperText}
                </p>
              </div>
            ))}
          </div>
        </div>
        {eventsSelected.includes("pika-web") && (
          <div className="form-control">
            <label
              htmlFor="teamName"
              className="font-bold mb-0 text-white"
              id="label-team-name"
            >
              Team Name (For Pika Web)
            </label>
            {errors.teamName && (
              <p className="text-red-300">
                Team Name is required for PikaWeb!
              </p>
            )}
            <input
              type="text"
              id="teamName"
              placeholder="Enter your Team Name"
              onChange={(e) => {
                setTeamName(e.target.value);
                setErrors({ ...errors, teamName: false });
              }}
            />
          </div>
        )}
        <div className="form-control">
          <label
            htmlFor="name"
            className="font-bold mb-0 text-white"
            id="label-name"
          >
            Name
          </label>
          {errors.name && <p className="text-red-300">Name is required!</p>}
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
              setErrors({ ...errors, name: false });
            }}
          />
        </div>
        <div className="form-control">
          <label
            htmlFor="email"
            className="font-bold mb-0 text-white"
            id="label-email"
          >
            Email
          </label>
          {errors.email && <p className="text-red-300">Email is required!</p>}
          {!errors.email && errors.emailInvalid && (
            <p className="text-red-300">Please enter a valid email address!</p>
          )}
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(e.target.value);
              setErrors({ ...errors, email: false, emailInvalid: false });
            }}
          />
        </div>
        <div className="form-control">
          <label
            htmlFor="div"
            className="font-bold mb-0 text-white"
            id="label-div"
          >
            Year
          </label>
          {errors.year && <p className="text-red-300">Year is required!</p>}
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
        <div className="form-control">
          <label
            htmlFor="div"
            className="font-bold mb-0 text-white"
            id="label-div"
          >
            Branch
          </label>
          {errors.branch && (
            <p className="text-red-300">Branch is required!</p>
          )}
          <select
            name="branch"
            onChange={(e) => {
              setBranch(e.target.value);
              setErrors({ ...errors, branch: false });
            }}
          >
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Civil & Infrastructure Engineering">
              Civil & Infrastructure Engineering
            </option>
            <option value="Electronics Engineering">
              Electronics Engineering
            </option>
            <option value="Artificial Intelligence and Data Science">
              Artificial Intelligence and Data Science
            </option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-control">
          <label
            htmlFor="div"
            className="font-bold mb-0  text-white"
            id="label-div"
          >
            Div
          </label>
          {errors.div && <p className="text-red-300">Division is required!</p>}
          <select
            name="div"
            onChange={(e) => {
              setDiv(e.target.value);
              setErrors({ ...errors, div: false });
            }}
          >
            <option value="A">A</option>
            <option value="B">B</option>
          </select>
        </div>
        <div className="form-control">
          <label
            htmlFor="rollnum"
            className="font-bold mb-0  text-white"
            id="label-rollnum"
          >
            Roll NO
          </label>
          {errors.rollNum && (
            <p className="text-red-300">Roll Number is required!</p>
          )}
          <input
            type="number"
            id="rollnum"
            placeholder="Enter your rollno"
            onChange={(e) => {
              setRollNum(e.target.value);
              setErrors({ ...errors, rollNum: false });
            }}
          />
        </div>
        <div className="form-control">
          <label
            className="font-bold mb-0 text-white"
            htmlFor="stdid"
            id="label-stdid"
          >
            GR Number/Student ID
          </label>
          <span className="italic text-gray-300 mb-2 block text-sm">
            (if not available, enter your mobile number)
          </span>
          {errors.grNum && (
            <p className="text-red-300">GR Number is required!</p>
          )}
          <input
            id="stdid"
            placeholder="Enter your GR Number "
            onChange={(e) => {
              setGrNum(e.target.value);
              setErrors({ ...errors, grNum: false });
            }}
          />
        </div>
        <div className="form-control">
          <label
            htmlFor="phonenum"
            className="font-bold mb-0  text-white"
            id="label-phonenum"
          >
            Phone Number
          </label>
          {errors.phone && (
            <p className="text-red-300">Phone Number is required!</p>
          )}
          <input
            type="number"
            id="phonenum"
            placeholder="Enter your Phone Number "
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors({ ...errors, phone: false });
            }}
          />
        </div>
        <div className="form-control">
          <label
            htmlFor="college"
            className="font-bold mb-0 text-white"
            id="label-college"
          >
            College
          </label>
          {errors.college && (
            <p className="text-red-300">College is required!</p>
          )}
          <input
            type="text"
            id="college"
            placeholder="Enter your College Name"
            onChange={(e) => {
              setCollege(e.target.value);
              setErrors({ ...errors, college: false });
            }}
          />
        </div>

        {eventsSelected.length > 0 ? (
          <>
            <div className="flex-col flex items-center justify-center space-y-2">
              <div className="flex flex-col space-x-2">
                <span className="font-bold  text-white">
                  UPI ID:{" "}
                  <span className="text-red-300 bg-white px-1">
                    ishikamore2001@oksbi
                  </span>
                </span>

                <span className="font-bold  text-white">
                  Amount:
                  <span className="bg-white text-red-300 px-1">
                    {"₹"}
                    {eventsSelected.reduce(
                      (acc, curr) => acc + events[curr].fees,
                      0
                    )}
                    /-
                  </span>
                </span>

                <span className="">
                  <span className="font-bold  text-white">Paying For:</span>{" "}
                  <br />
                  <span className="bg-white px-1">
                    {eventsSelected.map((el) => events[el].name).join(", ")}
                  </span>
                </span>
              </div>
              <img
                className="w-1/2 h-full"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
                  `upi://pay?pa=ishikamore2001@oksbi&pn=ISHIKA%20MORE&am=${eventsSelected.reduce(
                    (acc, curr) => acc + events[curr].fees,
                    0
                  )}.00&cu=INR`
                )}`}
                alt="upiQR"
              />
            </div>
            <div className="form-control mt-4">
              <label className="font-bold mb-0  text-white">
                Enter your Transaction Id
              </label>
              {errors.transactionId && (
                <p className="text-red-300">Transaction ID is required!</p>
              )}
              <input
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
            <div className="flex flex-col">
              <h1 className="font-bold mb-0 text-left pb-2  text-white">
                Upload Your Payment Screenshot
              </h1>
              <input
                className="mb-5  text-white"
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
          </>
        ) : (
          <p className="text-red-400 text-xl">Select at least 1 event!</p>
        )}
        {Object.keys(errors).length &&
        Object.values(errors).every((el) => el === true) ? (
          <p className="text-red-400 text-xl">
            Please fill all the required fields!
          </p>
        ) : (
          ""
        )}
        {uploadingImage && (
          <span className=" text-white">Uploading Image... Please wait!</span>
        )}
        <div className="flex justify-center mx-3">
          <button
            onClick={onSubmit}
            className="bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-600 text-white mt-4 disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={eventsSelected.length === 0}
          >
            SUBMIT
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
