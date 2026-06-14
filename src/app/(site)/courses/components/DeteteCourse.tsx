"use client";

import { Button } from '@/components/ui/button'
import { deleteCourseById } from '@/services/course.service';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';
import { Trash } from 'lucide-react';

export default function DeleteCourse({ courseId, onlyIcon = false }: { courseId: string; onlyIcon?: boolean }) {
  const router = useRouter();


  const handleDelete = async () => {


    // Implementation for delete course functionality

    const res = await deleteCourseById(courseId);
    if (res.success) {
      toast.success("Course deleted successfully");
      // Optionally, you can refresh the course list or redirect the user
      router.refresh();
    } else {
      toast.error("Failed to delete course. Please try again.");
    }
  }

  return (

    <AlertDialog>
      <AlertDialogTrigger render={
        <Button variant={`destructive`}>
          {onlyIcon ? <Trash /> : "Delete Course"}
        </Button>}>


        Delete Account
      </AlertDialogTrigger>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the course and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="ghost" />}>
            Cancel
          </AlertDialogClose>
          <AlertDialogClose render={<Button onClick={handleDelete} variant="destructive" />}>
            Delete Account
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>

  )
}
