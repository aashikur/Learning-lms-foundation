import { config } from "@/config";
import { CoursePayload } from "@/types/course.types";



// get all courses
export async function getCourses() {
    const res = await fetch(`${config.baseURL}/api/courses`, { cache: "no-store" });


    if (!res.ok) {
        throw new Error("Failed to fetch courses");
    }
    return res.json();
}

// get single course by id
export async function getCourseById(id: string) {
    const res = await fetch(`${config.baseURL}/api/courses/${id}`, { cache: "no-store" });
    if (!res.ok) {
        throw new Error("Failed");
    }
    return res.json();
}


// Update course by id 
export async function updateCourseById(id: string, payload: CoursePayload) {
    const res = await fetch(`${config.baseURL}/api/courses/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    return res.json();
}


// Create new course
export async function createCourse(payload: CoursePayload) {
    const res = await fetch(`${config.baseURL}/api/courses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    return res.json();
}


// Delete course by id 
export async function deleteCourseById(id: string) {
    const res = await fetch(`${config.baseURL}/api/courses/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return res.json();
}