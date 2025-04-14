// import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";

function PodcastHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex flex-wrap items-center justify-between bg-gray-900 text-white p-4 shadow-lg gap-4 md:gap-0">
        {/* Home Button */}
        <Button variant="ghost"><img src="public/microphone.svg" className="w-auto h-10"/></Button>
  
        {/* Search Bar */}
        <Input 
          type="text" 
          placeholder="Search..." 
          className="w-full sm:w-1/2 md:w-1/3"
        />
  
        {/* User Profile Icon */}
        <Button variant="ghost"><FaUser size={24} /></Button>
      </header>
    );
}

export default PodcastHeader;
// This component is a header for a podcast application. 
// It includes a home button, a search bar,
//  and a user profile icon. The layout is responsive, 
// adjusting to different screen sizes using Tailwind CSS classes.