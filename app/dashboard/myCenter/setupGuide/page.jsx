"use client";
import React from "react";
import { useUser } from "@/app/Auth/userContext";
import { 
  PlayIcon, 
  VideoCameraIcon, 
  AcademicCapIcon, 
  UserGroupIcon, 
  BanknotesIcon,
  InformationCircleIcon 
} from "@heroicons/react/24/solid";

const SetupGuide = () => {
  const { user } = useUser();
  const role = user?.role || "Super Admin";

  const videoCategories = [
    {
      title: "Getting Started",
      icon: <VideoCameraIcon className="w-5 h-5" />,
      roles: ["Guest", "Admin", "Super Admin"],
      videos: [
        { title: "Welcome to LearnDesk MIS", youtubeId: "VIDEO_ID_1" },
        { title: "How to Register Your First Center", youtubeId: "VIDEO_ID_2" },
      ],
    },
    {
      title: "Academic Setup",
      icon: <AcademicCapIcon className="w-5 h-5" />,
      roles: ["Admin", "Super Admin", "Head Teacher"],
      videos: [
        { title: "Setting Academic Year & Terms", youtubeId: "VIDEO_ID_3" },
        { title: "Creating Classes & Subjects", youtubeId: "VIDEO_ID_4" },
        { title: "Preparing Class Timetable", youtubeId: "VIDEO_ID_5" },
      ],
    },
    {
      title: "Teacher Guide",
      icon: <UserGroupIcon className="w-5 h-5" />,
      roles: ["Teacher", "Head Teacher"],
      videos: [
        { title: "Managing Student Attendance", youtubeId: "VIDEO_ID_6" },
        { title: "Entering Exam Marks & Grading", youtubeId: "VIDEO_ID_7" },
      ],
    },
    {
      title: "Administration & Finance",
      icon: <BanknotesIcon className="w-5 h-5" />,
      roles: ["Admin", "Super Admin"],
      videos: [
        { title: "User Roles & Permissions", youtubeId: "VIDEO_ID_10" },
        { title: "Fee Collection & Reports", youtubeId: "VIDEO_ID_11" },
      ],
    },
  ];

  const visibleCategories = videoCategories.filter((cat) =>
    cat.roles.includes(role)
  );

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* EXECUTIVE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-slate-300 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              Training & Setup Guide
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Select a module below to view step-by-step video instructions.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Account Role:</span>
            <span className="text-sm font-bold text-indigo-600">{role}</span>
          </div>
        </div>

        {/* CONTENT SECTION */}
        {visibleCategories.length > 0 ? (
          <div className="space-y-12">
            {visibleCategories.map((category, index) => (
              <div key={index} className="space-y-6">
                {/* Category Label */}
                <div className="flex items-center gap-3 border-l-4 border-indigo-600 pl-4">
                  <div className="text-indigo-600">
                    {category.icon}
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight uppercase">
                    {category.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.videos.map((video, idx) => (
                    <div
                      key={idx}
                      className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                    >
                      {/* Video Container */}
                      <div className="aspect-video bg-slate-900 relative">
                        <iframe
                          className="w-full h-full relative z-10"
                          src={`https://www.youtube.com/embed/${video.youtubeId}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      
                      {/* Video Title Card */}
                      <div className="p-4 flex items-start justify-between gap-3 bg-white">
                        <p className="text-sm font-bold text-slate-700 leading-snug">
                          {video.title}
                        </p>
                        <div className="bg-slate-100 p-2 rounded group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                          <PlayIcon className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-4 shadow-sm">
            <InformationCircleIcon className="w-12 h-12 text-slate-200 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Tutorials Pending</h3>
            <p className="text-slate-500 font-medium max-w-sm mx-auto text-sm">
              We are finalizing specific training materials for the <span className="font-bold text-indigo-600">{role}</span> module. Please check back shortly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetupGuide;