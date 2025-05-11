export type FormField = {
  name: string;
  label: string;
  type?: string;
  iSMultiPleSelectDropdown?: boolean;
  isFileUpload?: boolean;
};

export type FormSchema = {
  [key: string]: FormField[];
};

export const formSchemas: FormSchema = {
  Parent: [
    { name: "parentname", label: "Parent Name", type: "text" },
    { name: "parentPassword", label: "Password", type: "password" },
    { name: "email", label: "Email", type: "email" },
    {
      name: "studentId",
      label: "Student Name",
      iSMultiPleSelectDropdown: true,
      multiple: false,
    },
    { name: "phoneNumber", label: "Phone", type: "tel" },
    { name: "address", label: "Address", type: "text" },
  ],
  Student: [
    { name: "studentName", label: "Student Name", type: "text" },
    { name: "studentEmail", label: "Student Email Id", type: "email" },
    { name: "studentPassword", label: "Password", type: "password" },
    {
      name: "subject",
      label: "Subject",
      iSMultiPleSelectDropdown: true,
    },
    {
      name: "classList",
      label: "Class List",
      iSMultiPleSelectDropdown: true,
    },
    { name: "phoneNumber", label: "Phone", type: "tel" },
    { name: "address", label: "Address", type: "text" },
    {
      name: "profileUrl",
      label: "Profile Photo",
      type: "file",
      isFileUpload: true,
    },
  ],
  Teacher: [
    { name: "teacherName", label: "Teacher Name", type: "text" },
    { name: "teacherEmail", label: "Teacher Email Id", type: "email" },
    { name: "teacherPassword", label: "Password", type: "password" },
    {
      name: "subject",
      label: "Subject",
      iSMultiPleSelectDropdown: true,
      multiple: false,
    },
    {
      name: "classList",
      label: "Class List",
      iSMultiPleSelectDropdown: true,
    },
    { name: "phoneNumber", label: "Phone", type: "tel" },
    { name: "address", label: "Address", type: "text" },
    {
      name: "profileUrl",
      label: "Profile Photo",
      type: "file",
      isFileUpload: true,
    },
  ],
  Subject: [
    { name: "name", label: "Subject Name", type: "text" },
    {
      name: "teacherList",
      label: "Tesacher List",
      iSMultiPleSelectDropdown: true,
      multiple: true,
    },
  ],
  Class: [
    { name: "name", label: "Class Name", type: "text" },
    { name: "capacity", label: "Capacity", type: "text" },
    { name: "grade", label: "Grade", type: "text" },
    { name: "supervisor", label: "Supervisor", type: "text" },
  ],
  Lesson: [
    { name: "name", label: "Subject Name", type: "text" },
    { name: "class", label: "Class", type: "text" },
    { name: "teacher", label: "Teacher", type: "text" },
  ],
  Exam: [
    { name: "name", label: "Subject Name", type: "text" },
    { name: "class", label: "Class", type: "text" },
    { name: "teacher", label: "Teacher", type: "text" },
    { name: "date", label: "Date", type: "date" },
  ],
  Assignment: [
    { name: "name", label: "Subject Name", type: "text" },
    { name: "class", label: "Class", type: "text" },
    { name: "teachers", label: "Teacher", type: "text" },
    { name: "dueDate", label: "Due Date", type: "date" },
  ],
  Result: [
    { name: "name", label: "Subject Name", type: "text" },
    { name: "class", label: "Class", type: "text" },
    { name: "teacher", label: "Teacher", type: "text" },
    { name: "student", label: "Student", type: "text" },
    { name: "date", label: "Date", type: "date" },
    { name: "type", label: "Type", type: "text" },
    { name: "score", label: "Score", type: "number" },
  ],
  Attendance: [
    { name: "name", label: "Subject Name", type: "text" },
    { name: "month", label: "Month", type: "text" },
    { name: "year", label: "Year", type: "number" },
    { name: "totalDays", label: "Total Days", type: "number" },
    { name: "activeDays", label: "Active Days", type: "number" },
    { name: "present", label: "Present", type: "number" },
    { name: "absent", label: "Absent", type: "number" },
    {
      name: "profilePhoto",
      label: "Profile Photo",
      type: "file",
      isFileUpload: true,
    },
  ],
  Event: [
    { name: "title", label: "Title", type: "text" },
    { name: "class", label: "Class", type: "text" },
    { name: "date", label: "Date", type: "date" },
    { name: "startTime", label: "Start Time", type: "number" },
    { name: "endTime", label: "End Time", type: "number" },
  ],
};
