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
import { Price } from "@/components/price";

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
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <h1 className="text-xl font-bold text-foreground sm:text-2xl">
          Manage Courses
        </h1>
        <Button
          onClick={() => handleOpenForm()}
          color="MAIN"
          size="sm"
          className="bg-accent text-white sm:px-6 sm:py-2"
        >
          <Plus className="size-3.5 sm:mr-2 sm:size-4" />
          <span className="hidden sm:inline">Add Course</span>
        </Button>
      </div>

      {loading ? (
        <CoursesSkeleton />
      ) : (
        <div className="border border-border bg-card overflow-x-auto w-full [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-none hover:[&::-webkit-scrollbar-thumb]:bg-foreground-second">
          <table className="w-full text-left border-collapse min-w-150">
            <thead>
              <tr className="border-b border-border bg-background/50">
                <th className="p-3 text-xs font-bold text-foreground sm:p-4 sm:text-sm">
                  Course
                </th>
                <th className="p-3 text-xs font-bold text-foreground sm:p-4 sm:text-sm">
                  Category
                </th>
                <th className="p-3 text-xs font-bold text-foreground sm:p-4 sm:text-sm">
                  Price
                </th>
                <th className="p-3 text-right text-xs font-bold text-foreground sm:p-4 sm:text-sm">
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
                      className="p-8 text-center text-xs text-foreground-second sm:p-12 sm:text-sm"
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
                      <td className="p-3 sm:p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative size-10 shrink-0 overflow-hidden border border-border bg-background sm:size-12">
                            {course.image && (
                              <Image
                                src={course.image}
                                alt={course.title}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="max-w-40 truncate sm:max-w-62.5">
                            <p className="text-xs font-medium text-foreground truncate sm:text-sm">
                              {course.title}
                            </p>
                            <p className="text-[10px] text-foreground-second truncate sm:text-xs">
                              {course.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 sm:p-4">
                        <Tag
                          variant="soft"
                          color="NEUTRAL"
                          size="xs"
                          className="sm:px-2.5 sm:py-1 sm:text-xs"
                        >
                          {course.category.name}
                        </Tag>
                      </td>
                      <td className="p-3 sm:p-4">
                        <Price
                          price={course.price}
                          discountPrice={course.discountPrice}
                          size="sm"
                          className="flex-col items-start"
                        />
                      </td>
                      <td className="p-3 sm:p-4">
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          <Button
                            onClick={() => handleOpenForm(course)}
                            size="icon"
                            variant="ghost"
                            className="size-7 text-foreground-second hover:text-accent sm:size-8"
                          >
                            <Edit className="size-3.5 sm:size-4" />
                          </Button>
                          <Button
                            onClick={() => handleDelete(course.id)}
                            size="icon"
                            variant="ghost"
                            className="size-7 text-foreground-second hover:text-danger sm:size-8"
                          >
                            <Trash2 className="size-3.5 sm:size-4" />
                          </Button>
                        </div>
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
