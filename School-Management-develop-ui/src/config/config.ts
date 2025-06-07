export const BASE_URL = "http://localhost:8080/api/";

export const PICTURE_URL = "http://localhost:8080/";

export const AUTH_APIS = {
  LOGIN_API: "sign-in",
};

export const TEACHER_APIS = {
  SAVE: "teacher/save",
  ALL: "teacher/all",
  GET: (id: string | any) => `teacher/${id}`,
  DELETE: (id: string | any) => `teacher/${id}`,
  UPDATE: (id: string | any) => `teacher/${id}`,
};

export const STUDENT_APIS = {
  SAVE: "student/save",
  ALL: "student/all",
  GET: (id: string | any) => `student/${id}`,
  DELETE: (id: string | any) => `student/${id}`,
  UPDATE: (id: string | any) => `student/${id}`,
};

export const PARENT_APIS = {
  SAVE: "parent/save",
  ALL: "parent/all",
  DELETE: (id: string | any) => `parent/${id}`,
  GET: (id: string | any) => `parent/${id}`,
  UPDATE: (id: string | any) => `parent/${id}`,
};

export const SUBJECT_APIS = {
  SAVE: "subject/save",
  ALL: "subject/all",
  GET: (id: string | any) => `subject/${id}`,
  UPDATE: (id: string | any) => `subject/${id}`,
  DELETE: (id: string | any) => `subject/${id}`,
};

export const CLASSES_APIS = {
  SAVE: "class/save",
  ALL: "class/all",
  GET: (id: string | any) => `class/${id}`,
  UPDATE: (id: string | any) => `class/${id}`,
  DELETE: (id: string | any) => `class/${id}`,
};
