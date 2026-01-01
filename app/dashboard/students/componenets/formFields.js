export const formCategories = [
  {
    category: "Student Personal Information",
    fields: [
      //   { label: "Form No", name: "formNo", type: "text" },
      { label: "Name (English)", name: "userNameEn", type: "text" },
      { label: "Name (Bengali)", name: "userNameBn", type: "text" },
      { label: "Date of Birth", name: "dobReg", type: "date" },
      { label: "Birth Registration Number ", name: "BNID", type: "text" },
      {
        label: "Place of Birth (Village/Ward/Union)",
        name: "birthPlace",
        type: "text",
      },
      {
        label: "Blood Group",
        name: "bloodGroup",
        type: "select",
        options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      },
    ],
  },

  {
    category: "Current Address",
    fields: [
      {
        label: "(Village/Ward/Union)",
        name: "currentAddress",
        type: "text",
      },
      {
        label: "Post Office (Current)",
        name: "currentPostOffice",
        type: "text",
      },
      { label: "Post Code (Current)", name: "currentPostCode", type: "text" },
      { label: "Police Station (Thana)", name: "currentThana", type: "text" },
      { label: "Sub-District (Upazila)", name: "currentUpazila", type: "text" },
      { label: "District (Current)", name: "currentDistrict", type: "text" },
      { label: "Division (Current)", name: "currentDivision", type: "text" },
    ],
  },

  {
    category: "Permanent Address",
    fields: [
      {
        label: "(Village/Ward/Union)",
        name: "permanentAddress",
        type: "text",
      },
      {
        label: "Post Office (Permanent)",
        name: "permanentPostOffice",
        type: "text",
      },
      {
        label: "Post Code (Permanent)",
        name: "permanentPostCode",
        type: "text",
      },
      {
        label: "Police Station (Permanent)",
        name: "permanentThana",
        type: "text",
      },
      {
        label: "Sub-District (Upazila Permanent)",
        name: "permanentUpazila",
        type: "text",
      },
      {
        label: "District (Permanent)",
        name: "permanentDistrict",
        type: "text",
      },
    ],
  },

  {
    category: "Student Contact & Profile",
    fields: [
      { label: "Mobile Number", name: "mobile", type: "text" },
      { label: "Educational Qualification", name: "education", type: "text" },
      {
        label: "Extra Curriculumn Activity",
        name: "extraCurriculumn",
        type: "text",
      },
    ],
  },

  {
    category: "Guardian Information",
    fields: [
      { label: "Father's Name", name: "fatherName", type: "text" },
      { label: "Father's Occupation", name: "fatherOccupation", type: "text" },
      { label: "Father's Mobile", name: "fatherMobile", type: "text" },

      { label: "Mother's Name", name: "motherName", type: "text" },
      { label: "Mother's Occupation", name: "motherOccupation", type: "text" },
      { label: "Mother's Mobile", name: "motherMobile", type: "text" },

      { label: "Guardian Name", name: "guardianName", type: "text" },
      { label: "Guardian Mobile", name: "guardianMobile", type: "text" },
      {
        label: "Guardian Relationship",
        name: "guardianRelation",
        type: "text",
      },
      { label: "Note About Guardian", name: "guardianNote", type: "textarea" },
    ],
  },

  {
    category: "Declarations",
    fields: [
      {
        label: "Student Undertaking / Pledge",
        name: "studentPledge",
        type: "textarea",
      },
      {
        label: "Guardian Undertaking / Pledge",
        name: "guardianPledge",
        type: "textarea",
      },
    ],
  },

  {
    category: "Required Documents (Upload)",
    fields: [
      {
        label: "Educational Certificate (Upload)",
        name: "docEducation",
        type: "file",
      },

      {
        label: "Birth Registration (Upload)",
        name: "docNIDBirth",
        type: "file",
      },

      {
        label: "Guardian National ID (Upload)",
        name: "docGuardianNID",
        type: "file",
      },
    ],
  },
];
