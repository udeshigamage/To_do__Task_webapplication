import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Todotask from "../TodotaskUI";

const Approutes: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todotask />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Approutes;
