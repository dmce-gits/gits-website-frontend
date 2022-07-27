import React from "react";
import "./Response.css";

const Response = () => {
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
          </div>
        </div>
        <div className="form-control">
          <div id="lnk">
            <p>Download files for reference:</p>

            <a className="underline" href="https://github.com/jay-2000">
              GitHub Link
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Response;
