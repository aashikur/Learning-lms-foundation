"use client";
import { Edit } from 'lucide-react';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"


import { Button } from '@/components/ui/button';
import { updateCourseById } from '@/services/course.service';
import { useState } from 'react';
import { Course, CoursePayload } from '@/types/course.types';
import { useRouter } from 'next/navigation';
import CourseForm from '@/app/(site)/courses/components/CourseForm';
import { toast } from 'sonner';


const EditCourse = ({ course }: { course: Course }) => {

    const router = useRouter();
    const [open, setOpen] = useState(false);

    const onSubmit = async (data: CoursePayload) => {
        // Here you can call the API to update the course details
        await updateCourseById(course._id, data);
        setOpen(false); // Close the drawer after updating
        router.refresh();
        toast.success("Course updated successfully");
    }

    return (
        <div>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger>
                    <Edit size={16} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                </DrawerTrigger>

                <DrawerContent className="mx-auto max-w-xl">
                    <DrawerHeader>
                        <DrawerTitle>Edit Course</DrawerTitle>
                        <DrawerDescription>Edit the course details below.</DrawerDescription>
                    </DrawerHeader>

                    <CourseForm defaultValues={{
                        title: course.title,
                        description: course.description,
                        price: course.price
                    }} onSubmit={onSubmit} submitText="Update Course" />

                    <DrawerFooter>

                        <DrawerClose>
                            <Button className="w-full" variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default EditCourse;



