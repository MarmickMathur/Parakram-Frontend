import { Formik, Form } from "formik";
import MyTextInput from "../FormComps/input";
import { Button, Modal } from "flowbite-react";
import validationSchema from "./validation";
import { useState } from "react";
import OtpForm from "./otpform";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import APIRoute from "../../utils/routes";

const SignUp = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  // const [userID, setUserID] = useState(null);

  const onSubmitOtp = async (values) => {
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await axios.post(
        `${APIRoute}/api/verifyOtp`,
        { Otp: values.otp, userId: userId },
        { withCredentials: true }
      );
      // console.log(data);
      const { success, message } = data;
      console.log(data);
      if (success) {
        console.log("Success");
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (values) => {
    try {
      // const {email ,username , password} = values;
      const { data } = await axios.post(
        `${APIRoute}/api/register`,
        values,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      const { _id } = data.user;
      localStorage.setItem("userId", _id);
      // setUserID(_id);
      setOpenModal(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container max-w-lg  m-auto ">
      <h1 className="heading">Sign Up</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          username: "",
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(f) => {
          return (
            <>
              <Form autoComplete="off" className="form">
                <MyTextInput
                  label="email"
                  name="email"
                  type="email"
                  placeholder=""
                />
                <MyTextInput
                  label="username"
                  name="username"
                  type="text"
                  placeholder=""
                />

                <MyTextInput
                  label="password"
                  name="password"
                  type="password"
                  placeholder=""
                />

                <MyTextInput
                  label="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder=""
                />

                <button type="submit" className="login-button">
                  Submit
                </button>
              </Form>
            </>
          );
        }}
      </Formik>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>otp</Modal.Header>
        <Modal.Body>
          <div className="m-10">
            <OtpForm
              closeModal={() => setOpenModal(false)}
              onSubmit={onSubmitOtp}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SignUp;
