import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { getCourses } from "@/services/course.service";
import { Edit, Star } from "lucide-react";
import Link from "next/link";
import { CreateCourseDrawer } from "./components/CreateCourseDrawer";
import DeleteCourse from "./components/DeteteCourse";
import { Course } from "@/types/course.types";
import EditCourse from "@/app/(site)/courses/components/EditCourse";
import { Button } from "@/components/ui/button";
import EnrollNowButton from "@/app/(site)/courses/EnrollNowButton";

export default async function CoursesPage() {
    const { data: courses } = await getCourses();

    return (
        <>
            <section className="container mx-auto py-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Courses</h1>
                    <CreateCourseDrawer />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {courses?.map((course: Course) => (
                        <Card key={course._id} className="border flex flex-col justify-between h-full overflow-hidden shadow-sm hover:shadow-md transition-shadow">

                            {/* Header Section: Image & Badge Actions */}
                            <CardHeader className="p-0 relative">
                                <div className="w-full h-48 bg-gray-100 relative">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Top Actions overlaying the image */}
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        <EditCourse course={course} />
                                        <DeleteCourse courseId={course._id} />
                                    </div>
                                </div>
                            </CardHeader>

                            {/* Content Section: Titles & Info */}
                            <CardContent className="p-4 flex-grow">
                                {/* Category Badge */}
                                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 block mb-1">
                                    {course.category}
                                </span>

                                {/* Course Title */}
                                <CardTitle className="mb-2">
                                    <Link href={`/courses/${course._id}`} className="text-lg font-bold hover:underline line-clamp-1 block">
                                        {course.title}
                                    </Link>
                                </CardTitle>

                                {/* Description */}
                                <CardDescription className="line-clamp-2 text-sm text-gray-500 mb-4">
                                    {course.description}
                                </CardDescription>

                                {/* Meta Info & Pricing */}
                                <div className="space-y-1 text-sm border-t pt-3 border-gray-100">
                                    <p className="text-gray-600 font-medium">Price: <span className="text-emerald-600 font-bold">${course.price}</span></p>
                                    <p className="text-xs text-gray-400">Published: {new Date(course.createdAt).toLocaleDateString()}</p>
                                </div>
                            </CardContent>

                            {/* Footer Section: Primary Purchase Actions */}
                            <CardFooter className="p-4 pt-0 gap-2 flex w-full">
                                <Button variant="outline" size="sm" className="w-1/2 justify-center">
                                    Add to Cart
                                </Button>
                                <EnrollNowButton course={course} className="w-1/2 justify-center" />
                            </CardFooter>

                        </Card>
                    ))}
                </div>
            </section>
        </>
    )
}
