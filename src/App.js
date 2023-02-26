import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Router";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="max-w-[1440px] mx-auto">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      {/* This component will render all toasts */}
      <Toaster
        toastOptions={{
          success: {
            duration: 5000,
          },
        }}
      />
    </div>
  );
};

export default App;
