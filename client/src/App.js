import React, { useState } from "react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Resume from "./components/Resume";

const App = () => {
  const [resumeData, setResumeData] = useState({});

  return (
    <MantineProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home setResumeData={setResumeData} />} />
            <Route
              path="/resume"
              element={<Resume resumeData={resumeData} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </MantineProvider>
  );
};

export default App;

