import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BigLoader from "../../utils/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSave } from "@fortawesome/free-solid-svg-icons";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { handleAlert } from "../../utils/handlealert";
import Button from "../../components/button/button";
import { FaEdit } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setNewName(user.displayName || "");
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleUpdateProfile = async () => {
    if (!newName.trim()) {
      setError("Name cannot be empty");
      return;
    }

    try {
      await updateProfile(auth.currentUser, { displayName: newName });
      setUser({ ...auth.currentUser });
      handleAlert("Profile updated successfully", "success");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      handleAlert("Error updating profile", "error");
      setSuccess("");
    }
  };

  if (loading) {
    return <BigLoader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4"
    >
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:text-blue-700 flex items-center gap-2 cursor-pointer"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Dashboard
      </button>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <img
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500"
            />
          </div>

          {isEditing ? (
            <div className="w-full">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-2 border rounded-lg mb-2"
                placeholder="Enter your name"
              />
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
              {success && (
                <p className="text-green-500 text-sm mb-2">{success}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleUpdateProfile}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faSave} />
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setError("");
                    setSuccess("");
                  }}
                  className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800">
                {user.displayName || "User"}
              </h2>
              <p className="text-gray-600">{user.email}</p>
              <Button
                buttonText="Edit Profile"
                onClick={() => setIsEditing(true)}
                icon={FaEdit}
                className="bg-blue-500 flex items-center text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              />
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
