import { Button } from "@/components/ui/button"

interface CourseFormProps {
    defaultValues?: CoursePayload;
    onSubmit: (data: CoursePayload) => Promise<void>;
    submitText?: string;
}

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CoursePayload } from "@/types/course.types";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";


const CourseForm = ({
    defaultValues,
    onSubmit,
    submitText = "Create Course"
}: CourseFormProps) => {
    const { register, handleSubmit} = useForm({
        defaultValues
    });


    return (
                <form className="text-muted-foreground" onSubmit={handleSubmit(onSubmit)}>
                    <FieldSet className="grid w-full px-4 md:px-6">
                        <FieldGroup>
                            <Field>
                                <FieldLabel className="sr-only" htmlFor="title">Course Title</FieldLabel>
                                <Input type="text" id="title" {...register("title", { required: true })} placeholder="Course Title" />
                            </Field>

                            <Field>
                                <FieldLabel className="sr-only" htmlFor="price">Course Price</FieldLabel>
                                <Input id="price" {...register("price", {valueAsNumber: true})} autoComplete="off" type="number" placeholder="0.00" />
                            </Field>

                            <Field>
                                <FieldLabel className="sr-only" htmlFor="description">Description</FieldLabel>
                                <Textarea id="description" {...register("description")} autoComplete="off" placeholder="Course Description" />
                                {/* <FieldError>.</FieldError> */}
                            </Field>







                            <Button type="submit">
                                <Plus className="mr-2 size-4" /> {submitText}
                            </Button>

                        </FieldGroup>
                    </FieldSet>
                </form>

    );
};

export default CourseForm;