import { useState } from "react";
import { addEvent } from "../../firebase/eventApi";
import "./Form.css";

const Form = ({ setRegisterSubmitClicked }) => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [year, setYear] = useState("SE");
  const [div, setDiv] = useState("A");
  const [rollNum, setRollNum] = useState("");
  const [grNum, setGrNum] = useState("");
  let event = "HTML-CSS-JS";
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      event,
      name,
      email,
      phone,
      year,
      div,
      rollNum,
      grNum,
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
    if (div.trim() === "") {
      newErrors = { ...newErrors, div: true };
    }
    if (rollNum.trim() === "") {
      newErrors = { ...newErrors, rollNum: true };
    }
    if (grNum.trim() === "") {
      newErrors = { ...newErrors, grNum: true };
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length) {
      return;
    }

    addEvent(
      data,
      () => {
        setRegisterSubmitClicked(true);
      },
      (err) => {
        console.log(err);
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
            <h1 className="font-bold text-center"> DMCE-GITS Presents</h1>

            <p className="font-medium text-justify ">
              The HTML and CSS Workshop takes you on a journey to learning how
              to create beautiful websites using your own content, understanding
              how they work, and how to manage them long-term.
            </p>
            <div className="flex flex-col mt-2 justify-center">
              <p>Event is conducted by :</p>
              <a
                className="underline"
                target="_blank"
                rel="noreferrer noopeners"
                href="https://www.linkedin.com/in/jay-r-parmar/"
              >
                1. Jay Parmar
              </a>

              <a
                className="underline"
                target="_blank"
                rel="noreferrer noopeners"
                href="https://www.linkedin.com/in/mrunmayee-jakate-2a15711bb/"
              >
                2. Mrunmayee Jakate
              </a>
              <h1 className="font-bold">
                Event Timing:{" "}
                <span className="text-red-600">2:00PM to 5:00PM</span>
              </h1>
            </div>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="name" id="label-name">
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
          <label htmlFor="email" id="label-email">
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
          <label htmlFor="div" id="label-div">
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
          <label htmlFor="div" id="label-div">
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
          <label htmlFor="email" id="label-email">
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
          <label htmlFor="email" id="label-email">
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
          <label htmlFor="email" id="label-email">
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
