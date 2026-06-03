
// get all courses
export async function getCourses() {
    const res = await fetch("http://localhost:3000/api/courses", { cache: "no-store" });

    return res.json();
}

// get single course by id
export async function getCourseById(id: string) {
    const res = await fetch(`http://localhost:3000/api/courses/${id}`, { cache: "no-store" });

    return res.json();
}