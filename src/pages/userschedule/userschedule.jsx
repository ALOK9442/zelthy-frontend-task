import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchUserByEmail } from "../../firebase/slots";
import CustomCalendar from "../../components/calendar/calendar";
import { handleAlert } from "../../utils/handlealert";
import BigLoader from "../../utils/loader";

const UserSchedulePage = ({ currentUserId }) => {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState()
  const [userPhoto, setUserPhoto] = useState()
  const [loading, setLoading] = useState(true);
  const [userid, setUserId] = useState(null);
  const { email } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await searchUserByEmail(params.email);
        const userSlotsUnavailable = userInfo.slotsUnavailable;
        const userName = userInfo.name;
        const userPhoto = userInfo.photoURL;
        const id = userInfo.id;
        if (!userInfo) {
          handleAlert("User not found", "error");
          return;
        }
        setUser(userSlotsUnavailable);
        setUserName(userName);
        setUserPhoto(userPhoto);
        setUserId(id);
      } catch (error) {
        handleAlert("Error fetching user", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [email]);

  if (loading) {
    return <BigLoader Height={100} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto p-4"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {userName}&#39;s Schedule
      </h1>
      <CustomCalendar
        userId={userid}
        currentUserId={currentUserId}
        readOnly={currentUserId !== userid}
      />
    </motion.div>
  );
};

export default UserSchedulePage;
