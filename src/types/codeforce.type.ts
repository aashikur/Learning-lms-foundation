export interface CodeforceUser {
    handle: string;
    rank: string;
    rating: number;
    maxRating: number;
}

// Define an interface for the incoming query arguments
export interface FetchLeaderboardParams {
  page?: number;
  limit?: number;
  search?: string;
}

// Define the response shape matching your backend output structure
export interface LeaderboardResponse {
  success: boolean;
  data: CodeforceUser[];
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}