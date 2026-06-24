"use client"
import { Button } from "@/components/ui/button"
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


import { createCourse } from "@/services/course.service"
import { CoursePayload } from "@/types/course.types"
import { Plus } from "lucide-react"
import CourseForm from "@/app/(site)/courses/components/CourseForm"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export const CreateCourseDrawer = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleCreateCourse = async (data: CoursePayload) => {
        await createCourse(data);
        router.refresh();
        setOpen(false);
        toast.success("Course created successfully");
    }

    return (
        <Drawer open={open} onOpenChange={setOpen} direction="left" >
            <DrawerTrigger asChild>
                <Button className="px-4 py-4">
                    <Plus className="size-4" /> Create Course
                </Button>
            </DrawerTrigger>
            <DrawerContent className="mx-auto max-w-xl">

                <DrawerHeader>
                    <DrawerTitle>Create Course</DrawerTitle>
                    <DrawerDescription className="">
                        Fill in the details for the new course.
                    </DrawerDescription>
                </DrawerHeader>


                <CourseForm onSubmit={handleCreateCourse} submitText="Create Course" />

                <DrawerFooter>
                    <DrawerClose>
                        <Button className="w-full" variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}