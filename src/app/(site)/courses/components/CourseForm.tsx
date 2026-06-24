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
    const { register, handleSubmit } = useForm({
        defaultValues
    });


    return (
        <form className="text-muted-foreground no-scrollbar overflow-y-auto px-4 " onSubmit={handleSubmit(onSubmit)}>
            <FieldSet className="grid w-full px-4 md:px-6 gap-4">
                <FieldGroup className="space-y-4">

                    {/* Course Title */}
                    <Field>
                        <FieldLabel className="text-sm font-medium" htmlFor="title">Course Title</FieldLabel>
                        <Input
                            type="text"
                            id="title"
                            {...register("title", { required: true })}
                            placeholder="e.g., Advanced React 19"
                        />
                    </Field>

                    {/* Course Slug (Optional/Auto-generated usually, but good for explicit edits) */}
                    <Field>
                        <FieldLabel className="text-sm font-medium" htmlFor="slug">URL Slug</FieldLabel>
                        <Input
                            type="text"
                            id="slug"
                            {...register("slug")}
                            placeholder="e.g., advanced-react-19"
                        />
                    </Field>

                    {/* Category Selection */}
                    <Field>
                        <FieldLabel className="text-sm font-medium" htmlFor="category">Category</FieldLabel>
                        <select
                            id="category"
                            {...register("category", { required: true })}
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                            <option value="">Select a category</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Design">Design</option>
                            <option value="Cyber Security">Cyber Security</option>
                        </select>
                    </Field>

                    {/* Thumbnail URL */}
                    <Field>
                        <FieldLabel className="text-sm font-medium" htmlFor="thumbnail">Thumbnail Image URL</FieldLabel>
                        <Input
                            type="url"
                            id="thumbnail"
                            {...register("thumbnail")}
                            placeholder="https://example.com/image.png"
                        />
                    </Field>

                    {/* Course Price */}
                    <Field>
                        <FieldLabel className="text-sm font-medium" htmlFor="price">Course Price ($)</FieldLabel>
                        <Input
                            id="price"
                            {...register("price", { valueAsNumber: true, required: true })}
                            autoComplete="off"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                        />
                    </Field>

                    {/* Description */}
                    <Field>
                        <FieldLabel className="text-sm font-medium" htmlFor="description">Description</FieldLabel>
                        <Textarea
                            id="description"
                            {...register("description", { required: true })}
                            autoComplete="off"
                            placeholder="Provide an in-depth summary of the course content..."
                        />
                    </Field>

                    {/* Publish Status Checkbox */}
                    <div className="flex">
                        <input
                            type="checkbox"
                            id="isPublished"
                            {...register("isPublished")}
                            className="rounded p-4 border-gray-300 text-primary focus:ring-primary mr-2 w-4 h-4"
                        />
                        <FieldLabel htmlFor="isPublished" className="text-sm font-medium cursor-pointer">
                            Publish immediately
                        </FieldLabel>
                    </div>

                    {/* Action Button */}
                    <Button type="submit" className="w-full mt-4 py-5 cursor-pointer">
                        <Plus className="mr-2 size-4" /> {submitText}
                    </Button>

                </FieldGroup>
            </FieldSet>
        </form>

    );
};

export default CourseForm;