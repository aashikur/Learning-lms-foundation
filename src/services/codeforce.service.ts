import { config } from "@/config";

export async function getCodeforceLeaderboard() {
    const res = await fetch(`${config.baseURL}/api/codeforce`);
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