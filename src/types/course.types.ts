export interface CoursePayload {
  title?: string;
  slug?: string;
  thumbnail?: string;
  category?: string;
  instructor?: string; // Sent as an ID string from the frontend
  modules?: string[];  // Array of Module ID strings
  isPublished?: boolean;
  description?: string;
  price?: number;
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  thumbnail: string;
  category: string;
  instructor: string;  // If populated on the backend, change this to an inline User interface or type
  modules: string[];   // Array of references to Module IDs
  isPublished: boolean;
  description: string;
  price: number;
  createdAt: string;   // Generated automatically by { timestamps: true }
  updatedAt: string;   // Generated automatically by { timestamps: true }
}