import React, { useState } from "react";
import axios from "axios";

const Main_box = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-email", {
        to: email,
      });
      if (response.status === 200) {
        alert("Email sent!");
      } else {
        alert("Error sending email");
      }
    } catch (err) {
      alert("Error sending email");
    }
  };

  return (
    <>
      <div className=" w-lg">
        <div>
          <p className="text-2xl NavAndMain  text-white font-bold text-center p-5">
            Enter Your Mail
          </p>
        </div>

        <div className=" bg-amber-50  p-6 flex  justify-center ">
          <input
            className="shadow-xl p-3 m-2 w-sm"
            type="email"
            placeholder="enter your mail"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="NavAndMain text-amber-50 p-2 h-10 relative top-2 rounded-2xl"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Main_box;
