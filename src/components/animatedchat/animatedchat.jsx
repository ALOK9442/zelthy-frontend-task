import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";

const messages = [
  "Are you available for a meet at 09:00 AM WIB?",
  "No! That's too late here 😅",
  "How about 03:00 PM EST? We're available at that time",
  "Not good for us. How about...",
];

export default function AnimatedChat() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (visibleMessages.length < messages.length) {
      const timer = setTimeout(() => {
        setVisibleMessages((prev) => [...prev, messages[prev.length]]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  
    if (visibleMessages.length === messages.length) {
      setTimeout(() => {
        setVisibleMessages([]);
        setShowCalendar(true);
      }, 2000);
    }
  }, [visibleMessages.length]);
  

  return (
    <div className="relative flex flex-col items-center justify-center h-[400px] w-full bg-gray-50">
      {!showCalendar ? (
        <div className="space-y-4 w-full">
          {visibleMessages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className={`p-3 rounded-xl ${
                index % 2 === 0 ? "bg-gray-200 text-black w-1/2 mr-auto" : "bg-blue-500 text-white w-1/2 ml-auto"
              }`}
            >
              {msg}
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="text-center md:text-left">
            <h3 className="text-blue-600 text-sm font-semibold tracking-wider uppercase">
              Select a Date
            </h3>
            <Calendar
              onChange={setDate}
              value={date}
              className="border border-gray-300 rounded-lg shadow-lg p-4 w-full mt-4"
            />
            <p className="text-gray-700 mt-2 text-sm">
              Selected Date: <b>{date.toDateString()}</b>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
