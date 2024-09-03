import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../firebase/config";

export default function LogIn() {
  const { register, reset, handleSubmit } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form Submitted: ", data); // Debug log
    const { email, password } = data;

    setLoading(true);
    try {
      await logIn(email, password);
      navigate({ pathname: "/dashboard" });
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Log In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              size="lg"
              type="email"
              {...register("email", { required: true })}
            />
            <Input
              label="Password"
              size="lg"
              type="password"
              {...register("password", { required: true })}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              fullWidth
              type="submit"
              loading={loading}
              className="flex justify-center"
            >
              Log In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              have an account?
              <Link to="/sign-up" className="ml-1 font-bold">
                Sign Up
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
