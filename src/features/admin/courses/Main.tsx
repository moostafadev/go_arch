"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/button";
import { useDialog } from "@/components/dialog";
import { useToast } from "@/components/toaster";
import { Tag } from "@/components/tag";
import { CourseForm } from "./Form";
import { DeleteDialog } from "./DeleteDialog";
import { CoursesSkeleton } from "./Skeleton";
import { getCourses, deleteCourse } from "./api";
import { Course, CategoryOption } from "./types";

export const CoursesMain = () => {
  const { openDialog, closeDialog } = useDialog();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (error) {
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    let ignore = false;

    async function init() {
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          getCourses(),
          fetch("/api/categories").then((res) => res.json()),
        ]);

        if (!ignore) {
          setCourses(coursesRes);
          if (categoriesRes.success) {
            setCategories(categoriesRes.data);
          }
          setLoading(false);
        }
      } catch (error) {
        if (!ignore) {
          toast.error("Failed to load data");
          setLoading(false);
        }
      }
    }

    init();

    return () => {
      ignore = true;
    };
  }, [toast]);

  const handleDelete = (id: string) => {
    openDialog({
      title: "Delete Course",
      size: "md",
      children: (
        <DeleteDialog
          onCancel={closeDialog}
          onConfirm={async () => {
            try {
              await deleteCourse(id);
              toast.success("Course deleted successfully");
              closeDialog();
              loadData();
            } catch (error) {
              toast.error("Failed to delete course");
            }
          }}
        />
      ),
    });
  };

  const handleOpenForm = (course?: Course) => {
    openDialog({
      title: course ? "Edit Course" : "Create Course",
      size: "lg",
      children: (
        <CourseForm
          initialData={course}
          categories={categories}
          onSuccess={() => {
            closeDialog();
            loadData();
          }}
        />
      ),
    });
  };

  return (
    <div>
      <div className="mb-4 sm:mb-6 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          Manage Courses
        </h1>
        <Button
          onClick={() => handleOpenForm()}
          color="MAIN"
          size="sm"
          className="bg-accent text-white sm:px-6 sm:py-2"
        >
          <Plus className="size-3.5 sm:size-4 sm:mr-2" />
          <span className="hidden sm:inline">Add Course</span>
        </Button>
      </div>

      {loading ? (
        <CoursesSkeleton />
      ) : (
        <div className="border border-border bg-card overflow-x-auto w-full [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-none hover:[&::-webkit-scrollbar-thumb]:bg-foreground-second">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-border bg-background/50">
                <th className="p-2 sm:p-4 text-xs sm:text-sm font-bold text-foreground">
                  Course
                </th>
                <th className="p-2 sm:p-4 text-xs sm:text-sm font-bold text-foreground">
                  Category
                </th>
                <th className="p-2 sm:p-4 text-xs sm:text-sm font-bold text-foreground">
                  Price
                </th>
                <th className="p-2 sm:p-4 text-xs sm:text-sm font-bold text-foreground text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {courses.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-4 text-xs sm:text-sm text-center text-foreground-second"
                    >
                      No courses found.
                    </td>
                  </tr>
                ) : (
                  courses.map((course, index) => (
                    <m.tr
                      key={course.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b border-border/50 hover:bg-card-hover transition-colors"
                    >
                      <td className="p-2 sm:p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative size-10 sm:size-12 shrink-0 overflow-hidden border border-border bg-background">
                            {course.image && (
                              <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="max-w-[150px] sm:max-w-[250px] truncate">
                            <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                              {course.title}
                            </p>
                            <p className="text-[10px] sm:text-xs text-foreground-second truncate">
                              {course.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-2 sm:p-4">
                        <Tag
                          variant="soft"
                          color="NEUTRAL"
                          size="xs"
                          className="sm:px-2.5 sm:py-1 sm:text-xs"
                        >
                          {course.category.name}
                        </Tag>
                      </td>
                      <td className="p-2 sm:p-4">
                        <div className="flex flex-col">
                          {course.discountPrice ? (
                            <>
                              <span className="text-xs sm:text-sm font-bold text-accent">
                                {course.discountPrice}
                              </span>
                              <span className="text-[10px] sm:text-xs text-foreground-second line-through">
                                {course.price}
                              </span>
                            </>
                          ) : (
                            <span className="text-xs sm:text-sm font-medium text-foreground">
                              {course.price}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2 sm:p-4 flex items-center justify-end gap-1 sm:gap-2">
                        <Button
                          onClick={() => handleOpenForm(course)}
                          size="icon"
                          variant="ghost"
                          className="size-7 sm:size-8 text-foreground-second hover:text-accent"
                        >
                          <Edit className="size-3.5 sm:size-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(course.id)}
                          size="icon"
                          variant="ghost"
                          className="size-7 sm:size-8 text-foreground-second hover:text-danger"
                        >
                          <Trash2 className="size-3.5 sm:size-4" />
                        </Button>
                      </td>
                    </m.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
