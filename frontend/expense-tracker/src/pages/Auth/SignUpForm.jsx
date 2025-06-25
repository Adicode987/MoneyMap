import React, { useState } from 'react';
import AuthLayout from "../../components/Layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail, validatePassword } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector"

const SignUp = () => {
  const [profile, setProfile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }
    setError("");
  }


  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profile} setImage={setProfile} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label={
                <>
                  Full Name <span className="text-red-500">*</span>
                </>
              }
              placeholder="Rishabh Rawat"
              type="text"
            />

            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label={
                <>
                  Email Address <span className="text-red-500">*</span>
                </>
              }
              placeholder="rishabh@gmail.com"
              type="text"
            />

            <div className="col-span-2">


              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label={
                  <>
                    Password <span className="text-red-500">*</span>
                  </>
                }
                placeholder="Set a Strong Password"
                type="password"
              />

            </div>

          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <div className="mt-4 mb-4 text-[13px] text-slate-700" >
            <p className="text-red-500 font-medium mb-2">* All fields are required</p>
            <ul className="list-disc ml-5 text-[13px] space-y-1">
              <li>Password must be at least 8 characters long</li>
              <li>Contain at least one uppercase letter</li>
              <li>Contain at least one lowercase letter</li>
              <li>Contain at least one number</li>
              <li>Contain at least one special character (e.g. !@#$%)</li>
            </ul>
          </div>

          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Already have an account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;