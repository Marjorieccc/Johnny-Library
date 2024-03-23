// fetch data from backend, throw error if failed
export default async function fetchBackend(queryUrl:string):Promise<any> {
    try {
        const response = await fetch(
          `http://localhost:8080/${queryUrl}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return await response.json();
      } catch (error) {
        console.log('Error fetching resource:', error);
        throw error;
      }
}