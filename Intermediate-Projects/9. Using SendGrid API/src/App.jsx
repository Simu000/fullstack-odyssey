import "./App.css";
import React from "react";
import Navbar from "./Navbar";
import Main_box from "./Main_box";

function App() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <section className="p-4 h-180 flex items-center justify-center">
          <Main_box />
        </section>
      </main>
    </>
  );
}

export default App;
