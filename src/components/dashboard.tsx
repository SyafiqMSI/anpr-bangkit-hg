"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="bg-gradient-to-r from-blue-200 to-pink-200 p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">
        [C242-AP] Automatic Plate Number Recognition (APNR)
      </h1>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
        About
      </Button>
    </div>
  );
};

export default Dashboard;