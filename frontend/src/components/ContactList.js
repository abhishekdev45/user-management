import React from "react";

const ContactList = ({ contacts, onEditContact, onDeleteContact, isAdmin }) => {
  console.log(contacts);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {contacts.map((contact) => (
        <div key={contact._id} className="bg-white rounded-lg shadow-md p-4 m-2">
          <p className="text-lg font-semibold">
            {contact.firstName} {contact.lastName}
          </p>

          <p>{contact.email}</p>
          <p className="text-2xl font-bold text-teal-900">{contact.role}</p>
          {isAdmin && (
            <div className="flex justify-end mt-4">
              <button
                onClick={() => onEditContact(contact)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Edit
              </button>

              <button
                onClick={() => onDeleteContact(contact._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContactList;
