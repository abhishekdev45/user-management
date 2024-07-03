import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../features/userSlice";




const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const admin = useSelector((state) => state.auth.userInfo);


  useEffect(() => {
    if (!admin || !admin._id) {
      navigate("/login");
    } else {
      dispatch(fetchUsers());
    }
  }, [navigate, admin, dispatch]);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-teal-100 p-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-teal-900">Xcelore MERN Stack Fresher Assignment</h1>
        <p className= "mt-4 text-lg text-teal-700">This assignment is completed by Abhishek Rajbhar.</p>
        
      </div>
    </div>
  );
};



export default Dashboard;
