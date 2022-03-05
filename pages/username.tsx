import React, { useEffect, useState } from "react";
import WithNavbar from "./../layouts/WithNavbar";

export default function username() {
  const [Username, setUsername] = useState<string>("");
  useEffect(() => {
    if (Username.length === 0) return;
    localStorage.setItem("username", Username);
  }, [Username]);

  useEffect(() => {
    if (localStorage.getItem("username") === null) return;
    setUsername(localStorage.getItem("username") as string)
  }, [])
  

  return (
    <WithNavbar>
      <div className="py-3 max-w-xl mx-auto px-3 flex flex-col">
        <form className="flex flex-col gap-2">
          <div>
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={Username}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Set Username
          </button>
        </form>
      </div>
    </WithNavbar>
  );
}
