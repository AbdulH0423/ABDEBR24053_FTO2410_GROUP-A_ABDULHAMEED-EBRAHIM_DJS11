// import { useState } from "react";
import { Menu } from "@headlessui/react";
import { FaUser } from "react-icons/fa";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { NavLink  } from "react-router-dom"; // for navigation using React Router

function PodcastHeader({ onSearch }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gray-700 text-gray-100 px-6 py-4 shadow-lg">
      
      {/* Left: Logo + Search */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
      <Button variant="ghost">
          <img
            src="/microphone.svg"
            alt="Logo"
            className="w-auto h-10 filter brightness-0 invert"
          />
        </Button>

        <Input
          type="text"
          placeholder="Search podcasts..."
          className="sm:block w-full max-w-xs"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Center: Nav links */}
      <div>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
          <NavLink
                  to="/library"
                  className={({ isActive }) =>
                    `hover:underline text-sm ${isActive ? "text-blue-400 font-semibold" : "text-white"}`
                  }
                >
                  Library
          </NavLink>

          <NavLink
                  to="/liked"
                  className={({ isActive }) =>
                    `hover:underline text-sm ${isActive ? "text-blue-400 font-semibold" : "text-white"}`
                  }
                >
                  Liked
          </NavLink>
          </nav>
      </div>

     {/* Dropdown menu */}
     <Menu as="div" className="relative inline-block text-left">
          <Menu.Button as={Button} variant="ghost">
            <FaUser size={22} />
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 w-60 origin-top-right bg-white text-black divide-y divide-gray-200 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`block w-full px-4 py-2 text-sm text-left ${
                      active ? 'bg-gray-100' : ''
                    }`}
                  >
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`block w-full px-4 py-2 text-sm text-left ${
                      active ? 'bg-gray-100' : ''
                    }`}
                  >
                    Settings
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`block w-full px-4 py-2 text-sm text-left text-red-500 ${
                      active ? 'bg-red-100' : ''
                    }`}
                  >
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
    </header>

  );
}

export default PodcastHeader;

// This component is a header for a podcast application. 
// It includes a home button, a search bar,
//  and a user profile icon. The layout is responsive, 
// adjusting to different screen sizes using Tailwind CSS classes.