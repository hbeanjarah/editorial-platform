import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/common/Layout";
import ArticlesPage from "./pages/ArticlesPage";
import CategoriesPage from "./pages/CategoryPage";
import NotificationsPage from "./pages/NotificationsPage";
import ImportPage from "./pages/ImportPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/import" element={<ImportPage />} />
      </Routes>
    </BrowserRouter>
  );
}
