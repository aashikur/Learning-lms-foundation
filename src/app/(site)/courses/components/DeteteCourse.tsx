"use client";

import { Button } from '@/components/ui/button'
import { deleteCourseById } from '@/services/course.service';
import React from 'react'

export default function DeleteCourse({ courseId }: { courseId: string }) {


  const handleDelete = async () => {
    // Implementation for delete course functionality
      const res = await deleteCourseById(courseId);
      if (res.success) {
        alert("Course deleted successfully!");
        // Optionally, you can refresh the course list or redirect the user
      } else {
        alert("Failed to delete course. Please try again.");
      }
  }

  return (
    <Button onClick={handleDelete}  variant={`destructive`}>DeleteCourse</Button>
  )
}
