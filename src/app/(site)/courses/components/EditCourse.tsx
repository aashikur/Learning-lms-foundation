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

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"

import { Button } from '@/components/ui/button';
import { updateCourseById } from '@/services/course.service';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Course, CoursePayload } from '@/types/course.types';
import { useRouter } from 'next/navigation';


const EditCourse = ({ course }: { course: Course }) => {

    const router = useRouter();
    const [open, setOpen] = useState(false);

    console.log("============: ", course);

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: course.title,
            description: course.description,
            price: course.price
        }
    })

    const onSubmit = async (data: CoursePayload) => {
        console.log("Updated Course Data: ", data);

        // Here you can call the API to update the course details
        await updateCourseById(course._id, data);
    
        setOpen(false); // Close the drawer after updating
        router.refresh();
    }

    return (
        <div>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger>
                    <Edit size={16} className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                </DrawerTrigger>

                <DrawerContent>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <DrawerHeader>
                            <DrawerTitle>Edit Course</DrawerTitle>
                            <DrawerDescription>Edit the course details below.</DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 w-10/12  mx-auto">
                            {/* Form fields for editing course details will go here */}

                            <FieldSet className="grid w-full px-4 md:px-6 text-muted-foreground">
                                <FieldGroup>

                                    <Input {...register("title", {required: true})}  placeholder="Course Name" />
                                    <Input {...register("price", {valueAsNumber: true})} type="number"  placeholder="0.00" />
                                    <Textarea {...register("description")}  placeholder="Course Description" />

                                </FieldGroup>
                            </FieldSet>


                        </div>


                        <DrawerFooter>
                            <Button type="submit">update</Button>

                            <DrawerClose>
                                <Button className="w-full" variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default EditCourse;



