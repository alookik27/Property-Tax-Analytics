import { useState } from "react";

import Header from "./Components/Header";
import KPICards from "./Components/KPICards";
import ChartsSection from "./Components/ChartsSection";
import AIChat from "./Components/AIChat";

import data from "./data/properties.json";

export default function App() {

  const [
    selectedCity,
    setSelectedCity
  ] = useState("All Cities");

  const cities = [
    "All Cities",
    ...new Set(
      data.map(
        (item) => item.tenant
      )
    )
  ];

  const filteredData =
    selectedCity === "All Cities"
      ? data
      : data.filter(
          (item) =>
            item.tenant ===
            selectedCity
        );

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-gradient-to-br
        from-[#fffdf7]
        via-[#fff7e6]
        to-[#fef3c7]
        text-neutral-900
        p-4
        sm:p-8
        transition-all
        duration-500
        antialiased
        selection:bg-amber-400
        selection:text-white
      "
    >

      {/* Background Glow */}
      <div
        className="
          absolute
          top-0
          left-0
          w-[500px]
          h-[500px]
          bg-amber-300/20
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-0
          w-[500px]
          h-[500px]
          bg-yellow-200/20
          rounded-full
          blur-3xl
        "
      />

      {/* Grid Overlay */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      {/* Main Container */}
      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          space-y-6
        "
      >

        <Header
          selectedCity={selectedCity}
          setSelectedCity={
            setSelectedCity
          }
          cities={cities}
        />

        <KPICards
          filteredData={
            filteredData
          }
        />

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
          "
        >

          <ChartsSection
            filteredData={
              filteredData
            }
          />

          <AIChat
            filteredData={
              filteredData
            }
          />

        </div>

      </div>

    </div>
  );
}