import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment-timezone";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  getUnavailableSlots,
  addUnavailableSlot,
  updateUnavailableSlot,
  deleteUnavailableSlot,
} from "../../firebase/slots";
import { handleAlert } from "../../utils/handlealert";
import EditAndAddModal from "../addmodal/calendareditandaddmodal";

const localizer = momentLocalizer(moment);

const CustomCalendar = ({ userId, currentUserId, readOnly }) => {
  const [view, setView] = useState("week");
  const [events, setEvents] = useState([]);
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  useEffect(() => {
    const fetchSlots = async () => {
      const slots = await getUnavailableSlots(userId);
      const formattedSlots = slots.map((slot) => {
        const start = moment
          .unix(slot.startTime.seconds)
          .utc()
          .tz(timezone)
          .toDate();
        const end = moment
          .unix(slot.endTime.seconds)
          .utc()
          .tz(timezone)
          .toDate();
        return {
          id: slot.id,
          title: "Unavailable",
          start,
          end,
          allDay: false,
          color: "#FF5733",
        };
      });
      setEvents(formattedSlots);
    };
    fetchSlots();
  }, [userId, timezone]);

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: "#FECACA",
      borderRadius: "8px",
      border: "none",
      color: "#7F1D1D",
      padding: "2px 8px",
      fontSize: "0.875rem",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
  });

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    const start = moment(event.start).tz(timezone);
    const end = moment(event.end).tz(timezone);
    setStartTime(start.format("HH:mm"));
    setEndTime(end.format("HH:mm"));
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
    setStartTime("09:00");
    setEndTime("10:00");
    setIsEditing(false);
    setSelectedEvent(null);
  };

  const handleSave = async () => {
    let startMoment, endMoment;

    if (isEditing) {
      const baseDate = moment(selectedEvent.start)
        .tz(timezone)
        .format("YYYY-MM-DD");
      startMoment = moment.tz(`${baseDate} ${startTime}`, timezone);
      endMoment = moment.tz(`${baseDate} ${endTime}`, timezone);
    } else {
      const baseDate = moment(selectedDate).tz(timezone).format("YYYY-MM-DD");
      startMoment = moment.tz(`${baseDate} ${startTime}`, timezone);
      endMoment = moment.tz(`${baseDate} ${endTime}`, timezone);
    }

    if (startMoment.isAfter(endMoment)) {
      handleAlert("Start time must be before end time.", "warning");
      return;
    }

    const utcStart = startMoment.utc().toDate();
    const utcEnd = endMoment.utc().toDate();

    try {
      if (isEditing) {
        await updateUnavailableSlot(userId, selectedEvent.id, utcStart, utcEnd);
        const updatedEvents = events.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                start: moment(utcStart).tz(timezone).toDate(),
                end: moment(utcEnd).tz(timezone).toDate(),
              }
            : event
        );
        setEvents(updatedEvents);
      } else {
        const isConflicting = events.some((event) => {
          return (
            (utcStart >= event.start && utcStart < event.end) ||
            (utcEnd > event.start && utcEnd <= event.end) ||
            (utcStart <= event.start && utcEnd >= event.end)
          );
        });
        if (isConflicting) {
          handleAlert("Selected time conflicts with existing slot.", "warning");
          return;
        }

        const newSlot = await addUnavailableSlot(userId, utcStart, utcEnd);
        setEvents([
          ...events,
          {
            id: newSlot.id,
            title: "Unavailable",
            start: moment(utcStart).tz(timezone).toDate(),
            end: moment(utcEnd).tz(timezone).toDate(),
            color: "#FF5733",
          },
        ]);
      }
      handleModalClose();
    } catch (error) {
      console.error("Error saving slot:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;
    await deleteUnavailableSlot(userId, selectedEvent.id);
    setEvents(events.filter((event) => event.id !== selectedEvent.id));
    handleModalClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-6 mx-auto bg-white shadow-lg rounded-xl max-w-7xl"
    >
      <div className="mb-6 space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">
          Schedule Management
        </h2>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timezone:
            </label>
            <select
              className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            >
              {Intl.supportedValuesOf("timeZone").map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-red-700 bg-red-100 px-3 py-1.5 rounded-lg">
            Click/Tap on time slots to mark/edit availability
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable={!readOnly}
          view={view}
          onView={setView}
          onSelectSlot={readOnly ? null : ({ start }) => handleDateClick(start)}
          onSelectEvent={readOnly ? null : handleEventClick}
          style={{ height: "70vh" }}
          views={["month", "week", "day"]}
          eventPropGetter={eventStyleGetter}
          className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
          toolbarClassName="p-2 bg-gray-50 border-b border-gray-200"
          headerClassName="mb-2"
          dayPropGetter={() => ({
            className: "hover:bg-gray-50 transition-colors",
          })}
          slotPropGetter={() => ({
            className: "border-r border-b border-gray-100",
          })}
          formats={{
            timeGutterFormat: "HH:mm",
            eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
              `${localizer.format(
                start,
                "HH:mm",
                culture
              )} - ${localizer.format(end, "HH:mm", culture)}`,
          }}
          step={30}
          timeslots={2}
        />
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <EditAndAddModal
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            isEditing={isEditing}
            handleSave={handleSave}
            handleDelete={handleDelete}
            handleModalClose={handleModalClose}
            overlayVariants={overlayVariants}
            modalVariants={modalVariants}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomCalendar;
