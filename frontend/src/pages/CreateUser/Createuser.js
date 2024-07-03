import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../../features/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import ContactForm from "../../components/ContactForm";

const CreateUser = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { contact } = location.state || {};
  const admin = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (!admin || !admin.role === "Admin") {
      navigate("/login");
    }
  }, [navigate, admin, dispatch]);

  const handleAddOrUpdateContact = (contactData) => {
    if (contact) {
      dispatch(updateUser({ id: contact._id, userData: contactData }));
    } else {
      dispatch(createUser(contactData));
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-teal-100 p-10">
      <ContactForm onAddContact={handleAddOrUpdateContact} contact={contact} />
    </div>
  );
};

export default CreateUser;
