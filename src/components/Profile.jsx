import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const cohort = "2305-FTB-ET-WEB-PT";
const BaseURL = `https://strangers-things.herokuapp.com/api/${cohort}`;
const Profile = () => {
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BaseURL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error accordingly, e.g., redirect to login page
        navigate("/Login");
      }
    };

    if (authToken) {
      fetchUserData();
    }
  }, [authToken, navigate]);

  return (
    <div>
      <h2>Profile</h2>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          {/* Display other user data here */}
        </div>
      )}
    </div>
  );
};

export default Profile;
