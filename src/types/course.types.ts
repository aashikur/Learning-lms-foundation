export interface CoursePayload {
    title?: string;
    description?: string;
    price?: number;
}

export interface Course {
    _id: string;
    title: string;
    description: string;
    price: number;
    createdAt: string;
    updatedAt: string;
}