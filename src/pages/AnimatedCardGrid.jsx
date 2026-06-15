import React from "react";
import { motion } from "framer-motion";
import { FiStar, FiHeart, FiCoffee } from "react-icons/fi";

// Single Animated Card
const AnimatedCard = ({ title, description, icon, animationTimings }) => {
  const { initialDelay, duration, staggerChildren } = animationTimings;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: initialDelay,
        duration: duration,
        staggerChildren: staggerChildren,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="flex items-center mb-4" variants={itemVariants}>
        {icon || <FiStar size={24} />}
        <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      </motion.div>
      <motion.p
        className="text-gray-700 dark:text-gray-300"
        variants={itemVariants}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

// Grid of cards
const AnimatedCardGrid = () => {
  const cards = [
    {
      title: "Star Card",
      description: "Shining bright with precise timings.",
      icon: <FiStar size={24} />,
      animationTimings: {
        initialDelay: 0.1,
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    {
      title: "Heart Card",
      description: "Filled with love and animation.",
      icon: <FiHeart size={24} color="red" />,
      animationTimings: {
        initialDelay: 0.3,
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
    {
      title: "Coffee Card",
      description: "Fuel your day with smooth motion.",
      icon: <FiCoffee size={24} color="brown" />,
      animationTimings: {
        initialDelay: 0.5,
        duration: 0.7,
        staggerChildren: 0.2,
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <AnimatedCard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            animationTimings={card.animationTimings}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedCardGrid;
