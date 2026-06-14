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
import { getPostById } from "@/services/post.service";

type Props = {
    params: Promise<{ id: string }>
}

async function PostDetails({ params }: Props) {
    const { id } = await params;

    const { title, body }  = await getPostById(id);

    return (
        <div className="container mx-auto py-12 md:py-16 max-w-7xl">
            <h1 className="text-3xl py-2 mb-4">Post Details:</h1>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{body}</CardDescription>
                    <CardAction>Card Action</CardAction>
                </CardHeader>
                <CardContent>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo magni, nesciunt porro similique iste magnam blanditiis doloremque dolorum voluptas hic, natus culpa. Adipisci tempore, quisquam placeat quasi laborum optio.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quo magni, nesciunt porro similique iste magnam blanditiis doloremque dolorum voluptas hic, natus culpa. Adipisci tempore, quisquam placeat quasi laborum optio.</p>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Button variant="outline" className="rounded w-full">
                        Add your Post
                    </Button>
                    <Button className=" rounded w-full mb-2">
                        suggest simmilar Post
                    </Button>

                </CardFooter>
            </Card>

        </div>
    )
}

export default PostDetails


// fetch(url, {
//   next: {
//     revalidate: 60,
//   },
// });