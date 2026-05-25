import { motion } from "framer-motion";

import {
  Building2,
  CheckCircle,
  XCircle,
  IndianRupee,
  Clock3,
} from "lucide-react";

export default function KPICards({ filteredData }) {
  const totalProperties = filteredData.length;

  const approvedProperties = filteredData.filter(
    (item) => item.status === "Approved",
  ).length;

  const rejectedProperties = filteredData.filter(
    (item) => item.status === "Rejected",
  ).length;

  const pendingProperties = filteredData.filter(
    (item) => item.status === "Pending",
  ).length;

  const totalCollection = filteredData.reduce(
    (sum, item) => sum + (item.collection_inr || 0),
    0,
  );

  const containerVariants = {
    hidden: {},

    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },

    show: {
      opacity: 1,
      y: 0,
      scale: 1,

      transition: {
        type: "spring",
        stiffness: 100,
        damping: 14,
      },
    },
  };

  const cards = [
    {
      title: "Total Properties",

      value: totalProperties.toLocaleString(),

      icon: (
        <Building2
          className="
            w-6
            h-6
            text-amber-500
          "
        />
      ),

      gradient: "from-white via-amber-50 to-amber-100",

      iconBg: "bg-white/70 backdrop-blur-xl",

      border: "border-amber-200",

      glow: "bg-amber-400/20",
    },

    {
      title: "Approved",

      value: approvedProperties.toLocaleString(),

      icon: (
        <CheckCircle
          className="
            w-6
            h-6
            text-green-500
          "
        />
      ),

      gradient: "from-white via-green-50 to-emerald-100",

      iconBg: "bg-white/70 backdrop-blur-xl",

      border: "border-green-200",

      glow: "bg-green-400/20",
    },

    {
      title: "Rejected",

      value: rejectedProperties.toLocaleString(),

      icon: (
        <XCircle
          className="
            w-6
            h-6
            text-red-500
          "
        />
      ),

      gradient: "from-white via-red-50 to-rose-100",

      iconBg: "bg-white/70 backdrop-blur-xl",

      border: "border-red-200",

      glow: "bg-red-400/20",
    },

    {
      title: "Pending",

      value: pendingProperties.toLocaleString(),

      icon: (
        <Clock3
          className="
            w-6
            h-6
            text-orange-500
          "
        />
      ),

      gradient: "from-white via-orange-50 to-amber-100",

      iconBg: "bg-white/70 backdrop-blur-xl",

      border: "border-orange-200",

      glow: "bg-orange-400/20",
    },

    {
      title: "Total Collection",

      value: `₹${totalCollection.toLocaleString()}`,

      icon: (
        <IndianRupee
          className="
            w-6
            h-6
            text-yellow-600
          "
        />
      ),

      gradient: "from-white via-yellow-50 to-amber-100",

      iconBg: "bg-white/70 backdrop-blur-xl",

      border: "border-yellow-200",

      glow: "bg-yellow-400/20",
    },
  ];

  return (
    <motion.div
      className="
        grid
        grid-cols-2
        xl:grid-cols-5
        gap-5
        mb-8
        font-['Outfit']
      "
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{
            y: -6,
            scale: 1.02,
          }}
          className={`
            group
            relative
            overflow-hidden
            rounded-[28px]
            border
            ${card.border}
            bg-gradient-to-br
            ${card.gradient}
            backdrop-blur-2xl
            p-6
            min-h-[170px]
            transition-all
            duration-500
            hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          `}
        >
          <div
            className={`
              absolute
              -top-10
              -right-10
              w-20
              h-20
              rounded-full
              blur-3xl
              ${card.glow}
              opacity-60
            `}
          />

          <div
            className="
              absolute
              inset-0
              bg-white/30
              backdrop-blur-[2px]
            "
          />

          <div
            className="
              relative
              z-10
              flex
              items-start
              justify-between
              h-full
            "
          >
            <div className="space-y-4">
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.22em]
                  font-bold
                  text-neutral-500
                "
              >
                {card.title}
              </p>

              <h2
                className="
                  text-2xl
                  xl:text-[2rem]
                  font-black
                  tracking-tight
                  text-neutral-900
                  leading-none
                "
              >
                {card.value}
              </h2>
            </div>

            <div
              className={`
                w-14
                h-14
                rounded-2xl
                ${card.iconBg}
                border
                border-white/50
                shadow-lg
                flex
                items-center
                justify-center
                transition-all
                duration-500
                group-hover:scale-110
                group-hover:rotate-3
                flex-shrink-0
              `}
            >
              {card.icon}
            </div>
          </div>

          <div
            className="
              absolute
              bottom-0
              left-0
              h-[4px]
              w-full
              bg-gradient-to-r
              from-transparent
              via-amber-400
              to-transparent
              opacity-70
            "
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
