import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getPosts } from "@/services/post.service";
import { ArrowUpRightFromSquare } from "lucide-react";
import Link from "next/link";

async function PostsPage() {
    const posts = await getPosts();

    return (
        <>
            <div className="container mx-auto flex flex-wrap gap-4 justify-center py-12 md:py-16 ">
                {posts.slice(0, 6).map((post: any) => (
                    <Card key={post.id} className="w-[350px]">
                        <CardHeader>
                            <CardTitle>{post.title}</CardTitle>
                            <CardDescription>{post.body}</CardDescription>
                            <CardAction>{post.id}</CardAction>
                        </CardHeader>
                        <CardContent>
                            <Link href={`/posts/${post.id}`} className="text-primary hover:underline">
                                ReadMore...
                            </Link>
                        </CardContent>

                    </Card>
                ))}
            </div>

            <div className="flex justify-center">
                <Button
                    variant="outline"
                    size="lg"
                    className={`rounded-full px-8 cursor-pointer mt-4`}>
                    Load More <ArrowUpRightFromSquare className="ml-2" />
                </Button>
            </div>
        </>
    )
}

export default PostsPage