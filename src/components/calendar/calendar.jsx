import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getUnavailableSlots, markUnavailableSlot } from "../../firebase/slots";
import { Timestamp } from "firebase/firestore";

const CalendarComponent = ( userId ) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [unavailableSlots, setUnavailableSlots] = useState([]);

  // useEffect(() => {
  //   const fetchSlots = async () => {
  //     const slots = await getUnavailableSlots(
  //       userId,
  //       selectedDate.toISOString().split("T")[0]
  //     );
  //     if (slots.length > 0) {
  //       setUnavailableSlots(slots);
  //     }
  //   };
  //   fetchSlots();
  // }, [selectedDate, userId]);

  const handleSave = async () => {
    if (!startTime || !endTime) {
      alert("Please select start and end time.");
      return;
    }
    const startDateTime = new Date(selectedDate);
    const endDateTime = new Date(selectedDate);
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    startDateTime.setHours(startHours, startMinutes, 0);
    endDateTime.setHours(endHours, endMinutes, 0);
    console.log("selectedDate", typeof selectedDate);
    console.log("starttime", typeof startDateTime);
    // console.log("endtime", endTime);
    await markUnavailableSlot(
      userId,
      Timestamp.fromDate(startDateTime),
      Timestamp.fromDate(endDateTime),
    );
    alert("Time slot marked as unavailable!");
    setStartTime("");
    setEndTime("");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        Mark Your Unavailable Slots
      </h2>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        className="border p-2 rounded-lg w-full"
      />

      <div className="mt-4">
        <label className="block font-medium">Start Time</label>
        <input
          type="time"
          className="border rounded p-2 w-full"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="block font-medium">End Time</label>
        <input
          type="time"
          className="border rounded p-2 w-full"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      <button
        className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
        onClick={handleSave}
      >
        Save Unavailable Slot
      </button>

      <h3 className="mt-6 text-lg font-medium">Your Unavailable Slots</h3>
      {unavailableSlots.length > 0 ? (
        unavailableSlots.map((slot) => (
          <div key={slot.id} className="p-2 mt-2 bg-gray-200 rounded">
            {slot.date} | {slot.startTime} - {slot.endTime}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No unavailable slots marked yet.</p>
      )}
    </div>
  );
};

export default CalendarComponent;
