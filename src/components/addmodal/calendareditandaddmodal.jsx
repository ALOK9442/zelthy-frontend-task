import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function EditAndAddModal({
  isEditing,
  handleModalClose,
  handleDelete,
  handleSave,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  overlayVariants,
  modalVariants,
}) {
  return (
    <motion.div
      className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md"
        variants={modalVariants}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 id="modal-title" className="text-xl font-semibold">
              {isEditing ? "Edit Unavailability" : "New Unavailability"}
            </h3>
            <button
              onClick={handleModalClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            {isEditing && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-red-700 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors"
                aria-label="Delete event"
              >
                <FontAwesomeIcon icon={faTrash} />
                <span>Delete</span>
              </button>
            )}
            <button
              onClick={handleModalClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
            >
              {isEditing ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
