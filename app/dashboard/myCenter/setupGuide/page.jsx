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
import theme from "@/theme";

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
    <div 
      className="min-h-screen py-12 px-6 font-sans"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* EXECUTIVE HEADER */}
        <div 
          className="flex flex-col md:flex-row justify-between items-end gap-6 border-b pb-8"
          style={{ borderColor: theme.colors.border }}
        >
          <div>
            <h1 
              className="text-3xl font-extrabold tracking-tight"
              style={{ color: theme.colors.textMain }}
            >
              Training <span style={{ color: theme.colors.primary }}>&</span> Setup Guide
            </h1>
            <p 
              className="font-medium mt-1"
              style={{ color: theme.colors.textMuted }}
            >
              Select a module below to view step-by-step video instructions.
            </p>
          </div>
          <div 
            className="flex items-center gap-3 border px-4 py-2 rounded-lg"
            style={{ backgroundColor: theme.colors.divider, borderColor: theme.colors.border }}
          >
            <span 
              className="text-[11px] font-bold uppercase tracking-widest"
              style={{ color: theme.colors.textDisabled }}
            >
              Role
            </span>
            <span 
              className="text-sm font-bold"
              style={{ color: theme.colors.textMain }}
            >
              {role}
            </span>
          </div>
        </div>

        {/* CONTENT SECTION */}
        {visibleCategories.length > 0 ? (
          <div className="space-y-14">
            {visibleCategories.map((category, index) => (
              <div key={index} className="space-y-6">
                {/* Category Label */}
                <div className="flex items-center gap-3">
                  <div 
                    className="text-white p-2 rounded-lg shadow-sm"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    {category.icon}
                  </div>
                  <h2 
                    className="text-lg font-bold tracking-tight"
                    style={{ color: theme.colors.textMain }}
                  >
                    {category.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.videos.map((video, idx) => (
                    <div
                      key={idx}
                      className="group border rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
                      style={{ 
                        backgroundColor: theme.colors.surface, 
                        borderColor: theme.colors.border 
                      }}
                    >
                      {/* Video Player Area */}
                      <div 
                        className="aspect-video relative"
                        style={{ backgroundColor: theme.colors.divider }}
                      >
                        <iframe
                          className="w-full h-full relative z-10 border-none"
                          src={`https://www.youtube.com/embed/${video.youtubeId}`}
                          title={video.title}
                          allowFullScreen
                        />
                      </div>
                      
                      {/* Video Title Card */}
                      <div className="p-4 flex items-center justify-between gap-3">
                        <p 
                          className="text-sm font-semibold"
                          style={{ color: theme.colors.textMain }}
                        >
                          {video.title}
                        </p>
                        <div 
                          className="p-2 rounded-md transition-colors duration-300 group-hover:text-white"
                          style={{ 
                            backgroundColor: theme.colors.background, 
                            color: theme.colors.textDisabled 
                          }}
                          // Note: In a real app, use a CSS class or styled-component for the hover primary color
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.colors.primary}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.colors.background}
                        >
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
          <div 
            className="p-16 rounded-2xl border text-center space-y-4"
            style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
          >
            <InformationCircleIcon 
              className="w-12 h-12 mx-auto" 
              style={{ color: theme.colors.divider }}
            />
            <h3 
              className="text-xl font-bold"
              style={{ color: theme.colors.textMain }}
            >
              No Content Found
            </h3>
            <p 
              className="max-w-sm mx-auto text-sm"
              style={{ color: theme.colors.textMuted }}
            >
              We are finalizing training materials for the <span className="font-semibold" style={{ color: theme.colors.primary }}>{role}</span> profile.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetupGuide;