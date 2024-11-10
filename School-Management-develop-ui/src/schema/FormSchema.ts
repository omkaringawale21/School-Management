export type FormField = {
    name: string;
    label: string;
    type: string;
    isFileUpload?: boolean;
};

export type FormSchema = {
    [key: string]: FormField[];
};

export const formSchemas: FormSchema = {
    Parent: [
        { name: "name", label: "Parent Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "phone", label: "Phone", type: "tel" }
    ],
    Student: [
        { name: "name", label: "Student Name", type: "text" },
        { name: "age", label: "Age", type: "number" },
        { name: "class", label: "Class", type: "text" },
        { name: "profilePhoto", label: "Profile Photo", type: "file", isFileUpload: true }
    ],
    Teacher: [
        { name: "name", label: "Teacher Name", type: "text" },
        { name: "subject", label: "Subject", type: "text" },
        { name: "email", label: "Email", type: "email" },
        { name: "profilePhoto", label: "Profile Photo", type: "file", isFileUpload: true }
    ],
};
