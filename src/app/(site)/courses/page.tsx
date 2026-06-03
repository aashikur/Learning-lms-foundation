import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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

import { getCourses } from "@/services/course.service";
import { Plus, Star } from "lucide-react";
import Link from "next/link";






export default async function CoursesPage() {
    const courses = await getCourses();

    return (
        <>
            <section className="container mx-auto py-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">Courses</h1>
                    <CreateCourseDrawer />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                    {courses.map((course: any) => (
                        <Card key={course._id} className="border">
                            <CardHeader>
                                <div className="w-full h-48 bg-gray-200 mb-4 rounded-md">

                                </div>
                                <CardTitle>
                                    <Link href={`/courses/${course._id}`} className="text-lg font-semibold hover:underline">
                                        {course.title}
                                    </Link>
                                </CardTitle>
                                <CardDescription>{course.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Created By: Author</p>
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

export const CreateCourseDrawer = () => {
    return (
        <Drawer
            direction="right"
        >
            <DrawerTrigger>
                <Button variant="outline"><Plus /> Create Course</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-xl font-bold">Create Course</DrawerTitle>
                    <DrawerDescription>
                        Fill the form below to create a new course.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                    <input type="text" placeholder="Course Title" className="w-full mb-4 px-3 py-2 border rounded-md" />
                    <textarea placeholder="Course Description" className="w-full mb-4 px-3 py-2 border rounded-md" rows={4}></textarea>
                    <input type="text" placeholder="Course Image URL" className="w-full mb-4 px-3 py-2 border rounded-md" />
                    <input type="text" placeholder="Course Price" className="w-full mb-4 px-3 py-2 border rounded-md" />
                </div>

                <DrawerFooter>
                    <Button> <Plus /> Create course</Button>
                    <DrawerClose>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}