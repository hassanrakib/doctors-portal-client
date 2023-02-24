import React from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router";

const App = () => {
  return (
    <div className="max-w-[1440px] mx-auto">
      <RouterProvider router={router} />
      {/* This component will render all toasts */}
      <Toaster />
    </div>
  );
};

export default App;
