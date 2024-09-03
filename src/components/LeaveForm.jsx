import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { db } from "../firebase/config";
import { useState } from "react";

const LeaveForm = ({ id }) => {
  const { register, reset, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setDoc(doc(db, "leave-request", id), {
        ...data,
        status: "pending",
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="min-h-screen p-10">
      <Typography variant="h4" color="blue-gray">
        Request A Leave
      </Typography>

      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-black font-extrabold">Username</label>
          <Input
            type="text"
            {...register("username", { required: "Username is required" })}
          />
        </div>
        <div className="mt-5">
          <label className="text-black font-extrabold">Email</label>
          <Input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
        </div>
        <div className="mt-5">
          <label className="text-black font-extrabold">Position</label>
          <Input
            type="text"
            {...register("position", { required: "Position is required" })}
          />
        </div>
        <div className="mt-5">
          <label className="text-black font-extrabold">Type of Leave</label>
          <select
            {...register("leaveType", { required: "Leave type is required" })}
            className="w-full p-2 border border-gray-500 bg-transparent rounded mt-2"
          >
            <option value="sick">Sick Leave</option>
            <option value="vacation">Vacation Leave</option>
            <option value="personal">Personal Leave</option>
            <option value="maternity">Maternity Leave</option>
            <option value="paternity">Paternity Leave</option>
          </select>
        </div>
        <div className="mt-5">
          <label className="text-black font-extrabold">Start Date</label>
          <Input
            type="date"
            {...register("startDate", { required: "Start date is required" })}
          />
        </div>
        <div className="mt-5">
          <label className="text-black font-extrabold">End Date</label>
          <Input
            type="date"
            {...register("endDate", { required: "End date is required" })}
          />
        </div>
        <div className="mt-5">
          <label className="text-black font-extrabold">Reasons for Leave</label>
          <Textarea
            {...register("message", { required: "Message is required" })}
          />
        </div>
        <Button
          className="mt-5 flex justify-center"
          fullWidth
          color="blue"
          type="submit"
          loading={loading}
        >
          Submit Request
        </Button>
      </form>
    </div>
  );
};

export default LeaveForm;
