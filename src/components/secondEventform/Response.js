import React from "react";
import "./Response.css";
import { AiFillInstagram } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";

const Response = () => {
  let iconStyles = { color: "white", fontSize: "1.5em" };

  return (
    <div>
      <form id="form" style={{ minHeight: "100vh" }}>
        <div className="form-control">
          <div
            id="logo"
            class="flex flex-col justify-center items-center gap-3"
          >
            <img src="./dmce-logo.jpg" alt="123" />
            <h6> DATTA MEGHE COLLEGE OF ENGINEERING</h6>
          </div>
        </div>

        <div className="form-control">
          <div id="final">
            <h3 className="text-xl text-center">
              Your response has been recorded!
            </h3>
            <h4 className="text-lg font-bold mt-4"> Prerequisite</h4>
            <p>1. Bring your laptop fully-charged and install VS Code in it.</p>
            <p>2. Download this Setup file,from the given link and unzip it.</p>
            <p>
              3. Install Git from 
              <a href="https://git-scm.com/"> https://git-scm.com/</a>
            </p>
            <p>4. Also create your account on Github.</p>
          </div>
        </div>
        {/* <div className="form-control">
          <div id="lnk">
            <p>Download files for reference:</p>

            <a className="underline" href="https://github.com/jay-2000">
              GitHub Link
            </a>
            <br></br>
            <h1 className="font-bold">
              Event Timing:{" "}
              <span className="text-red-600">2:00PM to 5:00PM</span>
            </h1>
          </div>
        </div> */}

        <div className=" flex flex-row items-center justify-center  py-2">
          <a
            href="https://www.instagram.com/dmce_gits/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 mt-4 cursor-pointer inline-flex items-center rounded-full bg-[#000000] mx-1.5 text-xl hover:text-gray-100 hover:bg-[#fb3958] duration-300"
            title="Instagram"
          >
            <AiFillInstagram size={30} style={iconStyles} />
          </a>
          <a
            href="https://twitter.com/dmce_gits"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 mt-4  cursor-pointer inline-flex items-center rounded-full bg-[#000000] mx-1.5 text-xl hover:text-gray-100 hover:bg-[#1DA1F2] duration-300"
            title="Twitter"
          >
            <AiOutlineTwitter size={30} style={iconStyles} />
          </a>

          <a
            href="https://www.linkedin.com/company/dmce-gits/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-col shadow-lg  p-2 mt-4  cursor-pointer inline-flex items-center rounded-full bg-[#000000] mx-1.5 text-xl hover:text-gray-100 hover:bg-[#0072b1] duration-300"
            title="Linkedin"
          >
            <FaLinkedin size={30} style={iconStyles} />
          </a>
        </div>
      </form>
    </div>
  );
};

export default Response;
