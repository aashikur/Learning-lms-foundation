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
import DeteteCourse from "./components/DeteteCourse";
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
                        <Card key={course._id} className="border">
                            <CardHeader >
                                <div className="w-full h-48 bg-gray-200 mb-4 rounded-md text-center relative">
                                    Image Placeholder

                                    <div className="absolute top-2 right-2">
                                        <EditCourse course={course} />

                                    </div>
                                </div>

                                <DeteteCourse courseId={course._id} />

                                <CardTitle>
                                    <Link href={`/courses/${course._id}`} className="text-lg font-semibold hover:underline line-clamp-2">
                                        {course.title}
                                    </Link>
                                </CardTitle>
                                <CardDescription className="line-clampp-2">{course.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Created By: Author</p>
                                <p>Price: ${course.price}</p>
                                <Button variant="outline" size="sm" className="mt-2 mr-2">
                                    Add to Cart
                                </Button>
                              <EnrollNowButton course={course} />
                            </CardContent>
                            <CardFooter className="justify-between">
                                <p>Created: {new Date(course.createdAt).toLocaleDateString()}</p>
                                <p><Star size={16} /></p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
        </>
    )
}
