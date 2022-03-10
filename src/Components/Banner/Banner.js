import React from "react";
import "./Banner.css";
import { Link } from "react-scroll/modules";

export default function Banner() {

    return (
        <div className="banner">
            <div className="banner-box">
                <h1>Tiramisu</h1>
                <hr />
                <h2>By Loïc Lécolier - 2022</h2>
                <Link to="container-home" spy={true} smooth={true} offset={-70}>
                  <div className="scroll-down">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                      >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="8 12 12 16 16 12"></polyline>
                          <line x1="12" y1="8" x2="12" y2="16"></line>
                      </svg>
                  </div>
                </Link>
            </div>
        </div>
    );
}
