import { useState, useRef, useEffect } from "react";

export default function Header({
  selectedCity,
  setSelectedCity,
  cities
}) {

  const [isOpen, setIsOpen] =
    useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {

    function handleClickOutside(
      event
    ) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {

        setIsOpen(false);

      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    document.addEventListener(
      "touchstart",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

      document.removeEventListener(
        "touchstart",
        handleClickOutside
      );

    };

  }, []);

  return (

    <header
      className="
        relative
        overflow-hidden
        rounded-[36px]
        border
        border-amber-100
        bg-gradient-to-br
        from-white
        via-amber-50
        to-yellow-50
        p-6
        md:p-8
        shadow-[0_25px_80px_rgba(251,191,36,0.15)]
        mb-8
      "
    >

      <div
        className="
          absolute
          top-0
          left-0
          h-full
          w-full
          bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.25),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(245,158,11,0.15),transparent_30%)]
        "
      />

      <div
        className="
          absolute
          inset-0
          opacity-[0.05]
          bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)]
          bg-[size:40px_40px]
        "
      />

      <div
        className="
          relative
          z-10
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-8
        "
      >

        <div
          className="
            flex
            flex-col
            gap-6
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              flex-wrap
            "
          >

            <div
              className="
                px-4
                py-1.5
                rounded-full
                border
                border-amber-200
                bg-amber-100/80
                text-amber-700
                text-xs
                font-bold
                tracking-[0.2em]
                uppercase
              "
            >
              UPYOG Platform
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                text-neutral-500
                text-sm
              "
            >

              <div
                className="
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-green-500
                "
              />

              Live Analytics

            </div>

          </div>

          <div>

            <h1
              className="
                text-4xl
                md:text-5xl
                xl:text-6xl
                font-black
                leading-[1]
                tracking-tight
                text-neutral-900
                max-w-4xl
              "
            >

              Property Tax
              <br />

              <span
                className="
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-amber-500
                  via-yellow-500
                  to-orange-500
                "
              >
                Intelligence Dashboard
              </span>

            </h1>

            <p
              className="
                mt-5
                max-w-2xl
                text-sm
                md:text-base
                leading-7
                text-neutral-600
              "
            >
              Monitor collections, tenant performance,
              pending dues, and analytics insights
              across multiple city administrations
              through a centralized dashboard system.
            </p>

          </div>

          <div
            className="
              flex
              flex-wrap
              gap-4
            "
          >

            <div
              className="
                min-w-[140px]
                rounded-2xl
                border
                border-white/60
                bg-white/70
                px-5
                py-4
                backdrop-blur-xl
                shadow-lg
              "
            >

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-neutral-500
                  mb-2
                "
              >
                Active Tenants
              </p>

              <h3
                className="
                  text-2xl
                  font-bold
                  text-neutral-900
                "
              >
                10+
              </h3>

            </div>

            <div
              className="
                min-w-[140px]
                rounded-2xl
                border
                border-white/60
                bg-white/70
                px-5
                py-4
                backdrop-blur-xl
                shadow-lg
              "
            >

              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.18em]
                  text-neutral-500
                  mb-2
                "
              >
                Properties
              </p>

              <h3
                className="
                  text-2xl
                  font-bold
                  text-neutral-900
                "
              >
                1000+
              </h3>

            </div>

          </div>

        </div>

        <div
          ref={dropdownRef}
          className="
            w-full
            xl:w-[340px]
            shrink-0
          "
        >

          <div
            className="
              rounded-[28px]
              border
              border-white/60
              bg-white/70
              p-5
              backdrop-blur-2xl
              shadow-[0_10px_40px_rgba(0,0,0,0.08)]
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
                mb-5
              "
            >

              <div>

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-neutral-500
                    mb-2
                  "
                >
                  Current Tenant
                </p>

                <h2
                  className="
                    text-neutral-900
                    text-xl
                    font-bold
                  "
                >
                  {selectedCity}
                </h2>

              </div>

              <div
                className="
                  h-12
                  w-12
                  rounded-2xl
                  bg-gradient-to-br
                  from-amber-400
                  to-orange-500
                  flex
                  items-center
                  justify-center
                  text-white
                  font-black
                  text-lg
                  shadow-lg
                "
              >
                {selectedCity.charAt(0)}
              </div>

            </div>

            <button
              onClick={() =>
                setIsOpen(!isOpen)
              }
              className="
                w-full
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-amber-100
                bg-white/80
                px-5
                py-4
                text-left
                text-neutral-900
                transition-all
                duration-300
                hover:border-amber-300
                hover:shadow-md
              "
            >

              <div>

                <p
                  className="
                    text-xs
                    text-neutral-500
                    mb-1
                  "
                >
                  Switch City
                </p>

                <span
                  className="
                    font-semibold
                  "
                >
                  {selectedCity}
                </span>

              </div>

              <svg
                className="
                  h-5
                  w-5
                  text-amber-500
                "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />

              </svg>

            </button>

            {isOpen && (

              <div
                className="
                  mt-4
                  rounded-2xl
                  border
                  border-amber-100
                  bg-white/95
                  overflow-hidden
                  shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                "
              >

                <div
                  className="
                    max-h-72
                    overflow-y-auto
                    p-2
                  "
                >

                  {cities.map((city) => {

                    const isSelected =
                      selectedCity === city;

                    return (

                      <button
                        key={city}
                        onClick={() => {

                          setSelectedCity(city);

                          setIsOpen(false);

                        }}
                        className={`
                          w-full
                          flex
                          items-center
                          justify-between
                          rounded-xl
                          px-4
                          py-3.5
                          text-sm
                          font-semibold
                          transition-all
                          duration-300
                          ${
                            isSelected
                              ? `
                                bg-gradient-to-r
                                from-amber-400
                                to-orange-500
                                text-white
                              `
                              : `
                                text-neutral-700
                                hover:bg-amber-50
                              `
                          }
                        `}
                      >

                        <span>
                          {city}
                        </span>

                        {isSelected && (

                          <svg
                            className="
                              w-4
                              h-4
                            "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >

                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />

                          </svg>

                        )}

                      </button>

                    );

                  })}

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>

  );

}