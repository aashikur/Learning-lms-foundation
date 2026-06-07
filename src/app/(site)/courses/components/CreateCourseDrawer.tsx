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


import { Input } from "@/components/ui/input"
import { createCourse } from "@/services/course.service"
import { CoursePayload } from "@/types/course.types"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"

export const CreateCourseDrawer = () => {
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data: CoursePayload) => {
        console.log(data);
        await createCourse(data);
        reset();



    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="px-4 py-4">
                    <Plus className="size-4" /> Create Course
                </Button>
            </DrawerTrigger>
            <DrawerContent className=" mx-auto max-w-xl">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <DrawerHeader>
                        <DrawerTitle>Create Course</DrawerTitle>
                        <DrawerDescription className="">
                            Fill in the details for the new course.
                        </DrawerDescription>
                    </DrawerHeader>


                    <FieldSet className="grid w-full px-4 md:px-6">
                        <FieldGroup>
                            <Field>
                                <FieldLabel className="sr-only" htmlFor="title">Course Title</FieldLabel>
                                <Input type="text" id="title" {...register("title")} placeholder="Course Title" />
                            </Field>

                            <Field>
                                <FieldLabel className="sr-only" htmlFor="price">Course Price</FieldLabel>
                                <Input id="price" {...register("price")} autoComplete="off" type="number" placeholder="0.00" />
                                <FieldError>Choose another price.</FieldError>
                            </Field>

                            <Field>
                                <FieldLabel className="sr-only" htmlFor="description">Description</FieldLabel>
                                <Textarea id="description" {...register("description")} autoComplete="off" />
                                {/* <FieldError>.</FieldError> */}
                            </Field>



                        </FieldGroup>
                    </FieldSet>



                    <DrawerFooter>
                        <Button type="submit"><Plus className="mr-2 size-4" /> Create Course</Button>
                        <DrawerClose>
                            <Button className="w-full" variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    )
}