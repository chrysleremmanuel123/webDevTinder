import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ user }) => {
  console.log("us 2", user);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photourl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl: photourl, about, gender, age },
        { withCredentials: true }
      );
      dispatch(addUser(res.data?.data));
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err.messsage);
    }
  };
  return (
    <>
      <div className="flex justify-center my-10 ">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-100 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span>First Name:</span>
                  </div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span>Last Name:</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span>Age:</span>
                  </div>
                  <input
                    type="number"
                    placeholder="Age"
                    className="input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span>Gender:</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Gender"
                    className="input"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span>About:</span>
                  </div>
                  <input
                    type="text"
                    placeholder="About"
                    className="input"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span>Photo URL:</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Photo URL"
                    className="input"
                    value={photourl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
              </div>

              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary"
                  onClick={() => saveProfile()}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        {user && (
          <UserCard
            user={{
              firstName,
              lastName,
              photoUrl: photourl,
              about,
              gender,
              age,
            }}
          />
        )}
      </div>
      {showSuccess && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>User Data Updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
