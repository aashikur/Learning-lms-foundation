export async function getPosts() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')

    return res.json();
}


export async function getPostById(id: string) {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return res.json();
    }
    catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}