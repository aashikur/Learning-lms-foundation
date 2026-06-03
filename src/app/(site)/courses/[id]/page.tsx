import { getCourseById } from '@/services/course.service';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Star } from 'lucide-react';
import Link from 'next/link';

const CoursesDetails = async ({ params }: { params: { id: string } }) => {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const course = await getCourseById(id);


    return (
        <div className="py-10 text-center">
            <section className="container mx-auto">

                <div className="max-w-md mx-auto">
                    <Card key={course._id} className="border">
                        <CardHeader>
                            <div className="w-full h-48  mb-4 rounded-md">

                            </div>
                            <CardTitle>
                                <h2 className="text-lg font-semibold hover:underline">

                                    {course.title}
                                </h2>
                            </CardTitle>
                            <CardDescription>
                                {course.description}
                                {course.description}
                                {course.description}
                                {course.description}
                                {course.description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Created By: Author</p>
                        </CardContent>
                        <CardFooter className="justify-between">
                            <p>Created: {new Date(course.createdAt).toLocaleDateString()}</p>
                            <p><Star size={16} /></p>
                        </CardFooter>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default CoursesDetails;