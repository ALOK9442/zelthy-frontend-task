// pages/UserSchedule.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchUserByEmail } from "../../firebase/slots";
import CustomCalendar from "../../components/calendar/calendar";
import { handleAlert } from "../../utils/handlealert";
import BigLoader from "../../utils/loader";

const UserSchedulePage = ({ currentUserId }) => {
//   console.log("emailycurrentUserId:", currentUserId);
  const params = useParams();
//   console.log("emailyparams:", params);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { email } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const foundUser = await searchUserByEmail(params.email);
        console.log("emailyfoundUser:", foundUser);
        if (!foundUser) {
            console.log("emailyUser not found");
          handleAlert("User not found", "error");
          setTimeout(() => window.history.back(), 2000);
          return;
        }
        setUser(foundUser);
      } catch (error) {
        handleAlert("Error fetching user", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  if (loading) {
    return <BigLoader />;
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center p-8"
      >
        <h1 className="text-2xl font-semibold text-gray-800">User not found</h1>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto p-4"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {user.displayName}&apos;s Schedule
      </h1>
      <CustomCalendar
        userId={user.id}
        currentUserId={currentUserId}
        readOnly={currentUserId !== user.id}
      />
    </motion.div>
  );
};

export default UserSchedulePage;
