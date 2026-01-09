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
      icon: <VideoCameraIcon className="w-6 h-6" />,
      roles: ["Guest", "Admin", "Super Admin"],
      videos: [
        { title: "Welcome to LearnDesk MIS", youtubeId: "VIDEO_ID_1" },
        { title: "How to Register Your First Center", youtubeId: "VIDEO_ID_2" },
      ],
    },
    {
      title: "Academic Setup",
      icon: <AcademicCapIcon className="w-6 h-6" />,
      roles: ["Admin", "Super Admin", "Head Teacher"],
      videos: [
        { title: "Setting Academic Year & Terms", youtubeId: "VIDEO_ID_3" },
        { title: "Creating Classes & Subjects", youtubeId: "VIDEO_ID_4" },
        { title: "Preparing Class Timetable", youtubeId: "VIDEO_ID_5" },
      ],
    },
    {
      title: "Teacher Guide",
      icon: <UserGroupIcon className="w-6 h-6" />,
      roles: ["Teacher", "Head Teacher"],
      videos: [
        { title: "Managing Student Attendance", youtubeId: "VIDEO_ID_6" },
        { title: "Entering Exam Marks & Grading", youtubeId: "VIDEO_ID_7" },
      ],
    },
    {
      title: "Administration & Finance",
      icon: <BanknotesIcon className="w-6 h-6" />,
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
    <div className="min-h-screen bg-[#FDFDFD] py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* HEADER */}
        <div className="border-b-4 border-slate-900 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">
              Video Setup Guide
            </h1>
            <p className="text-xl text-slate-500 font-bold mt-2 italic">
              Master the LearnDesk platform with role-specific training.
            </p>
          </div>
          <div className="bg-slate-100 px-4 py-2 rounded-xl flex items-center gap-2 border border-slate-200">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Viewing as:</span>
            <span className="text-sm font-black text-slate-900">{role}</span>
          </div>
        </div>

        {/* CONTENT */}
        {visibleCategories.length > 0 ? (
          <div className="space-y-16">
            {visibleCategories.map((category, index) => (
              <div key={index} className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {category.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {category.videos.map((video, idx) => (
                    <div
                      key={idx}
                      className="group bg-white border-2 border-slate-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-emerald-500/30 transition-all overflow-hidden"
                    >
                      <div className="aspect-video bg-slate-200 relative">
                        <iframe
                          className="w-full h-full relative z-10"
                          src={`https://www.youtube.com/embed/${video.youtubeId}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        {/* Fake thumbnail overlay to maintain style before play */}
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-0">
                           <PlayIcon className="w-12 h-12 text-white/20" />
                        </div>
                      </div>
                      <div className="p-6 flex items-center justify-between gap-4">
                        <p className="text-lg font-black text-slate-800 leading-tight">
                          {video.title}
                        </p>
                        <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-colors text-slate-400">
                          <PlayIcon className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-16 rounded-[3rem] border-2 border-dashed border-slate-200 text-center space-y-4">
            <InformationCircleIcon className="w-16 h-16 text-slate-200 mx-auto" />
            <h3 className="text-2xl font-black text-slate-900">Custom Guide Pending</h3>
            <p className="text-slate-500 font-bold max-w-sm mx-auto">
              We are currently preparing specialized video tutorials for the <span className="text-slate-900">{role}</span> role.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetupGuide;