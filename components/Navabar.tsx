import Link from "next/link";
import React from "react";

type NavbarType = {
  //   title: string;
};

export default function Navabar({}: NavbarType) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light z-40">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Realtime Chat
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item cursor-pointer">
                <Link href="/">
                  <div className="nav-link active">Rooms</div>
                </Link>
              </li>
              <li className="nav-item  cursor-pointer">
                <Link href="/username">
                  <div className="nav-link active">Username</div>
                </Link>
              </li>
            </ul>
            <form className="d-flex"></form>
          </div>
        </div>
      </nav>
    </>
  );
}
