import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { IoMdCheckmark } from "react-icons/io";

const Aside = ({ id }) => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const querySnapshot = await getDocs(collection(db, "leave-request"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setLeaveRequests((prev) => [...prev, doc.data()]);
      });
    };
    fetchPost();
  }, []);

  return (
    <div className="p-2 space-y-3 overflow-scroll">
      {leaveRequests.map((leave) => (
        <div
          key={leave.id}
          className={`border-2 border-black p-2 ${
            leave.status === "accepted" ? "bg-green-400" : "bg-pink-100"
          }`}
        >
          <p>{leave.status === "accepted" && <IoMdCheckmark />}</p>
          <p>{leave.username}</p>
          <p>{leave.leaveType}</p>
          <p>{leave.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Aside;
