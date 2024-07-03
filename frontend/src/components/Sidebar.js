import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ links, open, toggleSidebar }) => {
  return (
    <div className="relative">
      <div
        className={`fixed top-0 left-0 h-screen bg-gradient-to-r from-teal-900 to-teal-800 z-40 transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:w-48 w-52 px-2 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col">
          <Link to="/" className="text-white font-bold text-3xl text-center p-5">
            LOGO
          </Link>
          <ul className="pt-6">
            {links.map((link, index) => (
              <Link key={index} to={link.path}>
                <li
                  className="flex rounded-md p-2 cursor-pointer hover:bg-teal-400 text-white items-center gap-x-4 mt-2"
                  onClick={toggleSidebar}
                >
                  <span className="flex-1">{link.label}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
