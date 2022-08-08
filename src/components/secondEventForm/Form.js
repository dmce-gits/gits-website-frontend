import { upload } from "@testing-library/user-event/dist/upload";
import { useState } from "react";
import {
  addEvent,
  getTransactionIds,
  addTransactionId,
} from "../../firebase/eventApi";
import "./Form.css";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";
import { firebaseApp } from "../../firebase/init";

const Form = ({ setRegisterSubmitClicked }) => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [year, setYear] = useState("SE");
  const [branch, setBranch] = useState("Information Technology");
  const [div, setDiv] = useState("A");
  const [rollNum, setRollNum] = useState("");
  const [grNum, setGrNum] = useState("");
  let event = "InterviewFair";
  const [transactionId, setTransactionId] = useState("");
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const uploader = (file) => {
    const storage = getStorage(firebaseApp);
    const imagesRef = storageRef(storage, `/InternshipFair/${transactionId}`);

    uploadBytes(imagesRef, file)
      .then(() => {
        alert("Image uploaded");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
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
    };

    let newErrors = {};

    if (name.trim() === "") {
      newErrors = { ...newErrors, name: true };
    }
    if (email.trim() === "") {
      newErrors = { ...newErrors, email: true };
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

    setErrors(newErrors);

    if (Object.keys(newErrors).length) {
      return;
    }

    getTransactionIds(
      { eventName: "internship-fair" },
      (transactionIds) => {
        if (transactionIds.includes(transactionId)) {
          alert(
            "This transaction ID is already in our database, please do not enter a duplicate transaction ID!"
          );
          return;
        } else {
          addTransactionId(
            { eventName: "interview-fair", transactionId, grNum },
            () => {
              addEvent(
                data,
                () => {
                  setRegisterSubmitClicked(true);
                },
                (err) => {
                  console.log(err);
                }
              );
              uploader(image);
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

  return (
    <>
      <form id="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <div id="logo">
            <div className="flex flex-row justify-between items-center mb-3">
              <img src="./dmce-logo.jpg" alt="logo" className="w-20 h-fit" />
              <img src="./GITS.png" alt="logo" className="w-20 h-fit" />
              <img src="./TechGits.png" alt="logo" className="w-20 h-fit" />
            </div>
            <h1 className="font-bold mb-0 text-center"> DMCE-GITS PRESENTS</h1>

            <h1 className="font-medium text-justify ">
              <center>INTERNSHIP FAIR</center>
              <br />
            </h1>
            <center>
              <p>
                WE , THE GITS COMMITTEE 22-23 , ORGANIZING A VERY INTERESTING
                MOCK INTERVIEW PROGRAM for FRESHERS.
              </p>
              <br />
              <p>
                <b>HUSTLE UP - First company for mock interviews is here</b>
              </p>
            </center>
            <br />
            <p>
              RED OWL SCHOOL in collaboration with Infinity Smart India is
              providing an enriching, hands-on experience ,with exposure to
              diverse projects while working alongside a team of incredibly
              driven and and passionate people.
              <br />
            </p>

            <p>
              <br />
              Opportunities don’t happen. You create them . To grab the
              opportunity , fill out your details below . . .
            </p>
            <br />
            <p>
              <b>Note :</b> Only one candidate will be allowed to sit for a
              single interview.
            </p>
            <div className="flex flex-col mt-2 justify-center">
              <h1 className="font-bold mb-0">
                Date:
                <span className="text-red-600"> 8th August </span>
              </h1>
              <h1 className="font-bold mb-0">
                Time:
                <span className="text-red-600"> Afternoon onwards(12pm) </span>
              </h1>
              <h1 className="font-bold mb-0">
                Venue:
                <span className="text-red-600">
                  Classroom - 809 or seminar hall{" "}
                </span>
              </h1>
            </div>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="name" className="font-bold mb-0" id="label-name">
            Name
          </label>
          {errors.name && <p className="text-red-600">Name is required!</p>}
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
          <label htmlFor="email" className="font-bold mb-0" id="label-email">
            Email
          </label>
          {errors.email && <p className="text-red-600">Email is required!</p>}
          {!errors.email && errors.emailInvalid && (
            <p className="text-red-600">Please enter a valid email address!</p>
          )}
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: false });
              setErrors({ ...errors, emailInvalid: false });
            }}
          />
        </div>

        <div className="form-control">
          <label htmlFor="div" className="font-bold mb-0" id="label-div">
            Year
          </label>
          {errors.year && <p className="text-red-600">Year is required!</p>}
          <select
            name="year"
            onChange={(e) => {
              setYear(e.target.value);
              setErrors({ ...errors, year: false });
            }}
          >
            <option value="SE">SE</option>
            <option value="TE">TE</option>
            <option value="BE">BE</option>
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="div" className="font-bold mb-0" id="label-div">
            Branch
          </label>
          {errors.branch && <p className="text-red-600">Branch is required!</p>}
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
            {/* <option value="Civil Engineering">Civil Engineering</option> */}
            {/* <option value="Civil & Infrastructure Engineering">
              Civil & Infrastructure Engineering
            </option> */}
            <option value="Electronics Engineering">
              Electronics Engineering
            </option>
            <option value="Artificial Intelligence and Data Science">
              Artificial Intelligence and Data Science
            </option>
            {/* <option value="Mechanical Engineering">
              Mechanical Engineering
            </option> */}
            {/* <option value="Chemical Engineering">Chemical Engineering</option> */}
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="div" className="font-bold mb-0" id="label-div">
            Div
          </label>
          {errors.div && <p className="text-red-600">Division is required!</p>}
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
          <label htmlFor="email" className="font-bold mb-0" id="label-email">
            Roll NO
          </label>
          {errors.rollNum && (
            <p className="text-red-600">Roll Number is required!</p>
          )}
          <input
            type="number"
            id="number"
            placeholder="Enter your rollno"
            onChange={(e) => {
              setRollNum(e.target.value);
              setErrors({ ...errors, rollNum: false });
            }}
          />
        </div>

        <div className="form-control">
          <label className="font-bold mb-0" htmlFor="email" id="label-email">
            GR Number
          </label>
          {errors.grNum && (
            <p className="text-red-600">GR Number is required!</p>
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
          <label htmlFor="email" className="font-bold mb-0" id="label-email">
            Phone Number
          </label>
          {errors.phone && (
            <p className="text-red-600">Phone Number is required!</p>
          )}
          <input
            type="number"
            id="number"
            placeholder="Enter your Phone Number "
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors({ ...errors, phone: false });
            }}
          />
        </div>
        <div className="flex-col flex items-center justify-center space-y-2">
          <span className="font-bold">
            UPI ID: <span className="text-red-600">ishikamore2001@oksbi</span>
            {" ; "}
            Amount: {branch === "Information Technology" ? "30 Rs" : "50 Rs"}
          </span>
          <img
            className="w-1/2 h-full"
            src={
              branch === "Information Technology"
                ? "./IT.jpeg"
                : "./others.jpeg"
            }
            alt="upiQR"
          />
        </div>
        <div class="form-control mt-4">
          <label className="font-bold mb-0">Enter your Transaction Id</label>
          {errors.transactionId && (
            <p className="text-red-600">Transaction ID is required!</p>
          )}
          <input
            type="text"
            name="transactionId"
            placeholder="('Example: OIB9FQP9H7')/"
            value={transactionId}
            onChange={(e) => {
              setTransactionId(e.target.value);
              setErrors({ ...errors, transactionId: false });
            }}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-bold mb-0 text-left pb-2">
            Upload Your Payment Screenshot
          </h1>
          <input
            className="mb-5"
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
        <div className="flex justify-center mx-3">
          <button
            onClick={onSubmit}
            className="bg-blue-800 px-4 py-2 rounded-lg hover:bg-red-500 text-white"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
