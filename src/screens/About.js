import React from "react";
import "./home.css";

const About = () => {
  return (
    <div style={{ height: "80vh" }}>
      <div
        style={{
          display: "IND",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "120px",
        }}
      >
        <h1 style={{ marginBottom: "120px" }}>About</h1>
        <p
          className="text-center"
          style={{ marginLeft: "20px", marginRight: "20px" }}
        >
          Hi, TEAM IND🇮🇳, and we provide clean and clear websites. <br />
          Check out the github repository and other projects I'd been working on{" "}
          <a
            style={{ textDecoration: "none", color: "red" }}
            target="_blank"
            href="https://github.com/sambhavsaxena"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default About;
