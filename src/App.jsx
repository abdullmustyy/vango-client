import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
// Server import
import "./server";

export default function App() {
  return <RouterProvider router={router} />;
}
