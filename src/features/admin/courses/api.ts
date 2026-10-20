import { Course, CourseFormData } from "./types";

export const getCourses = async (): Promise<Course[]> => {
  const res = await fetch("/api/courses");
  if (!res.ok) throw new Error("Failed to fetch courses");
  const data = await res.json();
  return data.data;
};

export const createCourse = async (data: CourseFormData) => {
  const res = await fetch("/api/courses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create course");
  return res.json();
};

export const updateCourse = async (id: string, data: CourseFormData) => {
  const res = await fetch(`/api/courses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update course");
  return res.json();
};

export const deleteCourse = async (id: string) => {
  const res = await fetch(`/api/courses/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete course");
  return res.json();
};
