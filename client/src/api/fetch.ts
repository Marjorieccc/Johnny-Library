// fetch data from backend, throw error if failed
import { BACKEND_URL } from "./route.ts";

export default async function fetchBackend(queryUrl: string): Promise<any> {
  try {
    const response = await fetch(`${BACKEND_URL}/${queryUrl}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.log("Error fetching resource:", error);
    throw error;
  }
}
