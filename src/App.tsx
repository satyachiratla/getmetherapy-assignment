import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

function App() {
  return (
    <main className="max-w-sm mx-auto">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
