"use client"
import { Button, buttonVariants } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { createCourse } from "@/services/course.service"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"

export const CreateCourseDrawer = () => {
    const { register, handleSubmit } = useForm();
    return (
        <Drawer
            direction="right"
        >
            <DrawerTrigger className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}>
                <Plus /> Create Course
            </DrawerTrigger>



            <DrawerContent>

                <form>
                    <Input type="text" name="title" />
                    <textarea name="description" className="border w-full px-2 py-2 rounded-md" />
                    <Input type="number" name="author" />
                    <Button type="submit">Submit</Button>
                </form>







                <DrawerFooter>

                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}