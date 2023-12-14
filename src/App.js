import { useEffect, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// interface Post {
//   id: number;
//   title:string;
// }

function App() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState();
  const [page, setPage] = useState(0);

  // const abortControllerRef = useRef <AbortController | null> (null);

  useEffect(() => {
    const fetchPost = async () => {
      // abortControllerRef.current?.abort();
      // abortControllerRef.current = new AbortController();

      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/posts?page=${page}`, {
          // signal: abortControllerRef.current?.signal,
        });
        const posts = await response.json();
        console.log(posts);
        setPosts(posts);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
          return;
        }
        setError(error);
      } finally {
        setIsLoading(true);
      }
    };
    fetchPost();
  }, [page]);

  if (error) {
    return <div>Something went wrong please try again..</div>;
  }
  return (
    <div className="tutorial">
      <h1 className="mb-4 text-2xl"> Data Fething in react</h1>
      <button onClick={() => setPage(page + 1)}>Increase page ({page})</button>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <ul>
          {posts?.map((post) => {
            return <li key={post.id}>{post.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
