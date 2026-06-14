import { config } from "@/config";
import { CodeforceUser, FetchLeaderboardParams, LeaderboardResponse } from "@/types/codeforce.type";


export async function getCodeforceLeaderboard(
  params?: FetchLeaderboardParams
): Promise<LeaderboardResponse> {

  // 1. Initialize URLSearchParams
  const searchParams = new URLSearchParams();

  // 2. Append parameters if they exist
  if (params?.page) searchParams.append("page", params.page.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());
  if (params?.search) searchParams.append("search", params.search);

  // 3. Construct the final URL (only appends '?' if there are parameters)
  const queryString = searchParams.toString();
  const url = `${config.baseURL}/api/codeforce${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    cache: 'no-store' // Optional: bypasses caching if you want real-time leaderboard data
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch leaderboard: ${res.statusText}`);
  }

  return res.json();
}

export async function addUser(handle: string) {
  const res = await fetch(`${config.baseURL}/api/codeforce`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ handle }),
  });

  return res.json();
}


export async function deleteUser(handle: string) {
  const res = await fetch(`${config.baseURL}/api/codeforce`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ handle }),
  });

  return res.json();
}