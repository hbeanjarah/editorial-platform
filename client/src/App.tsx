import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "@/components/common/Layout";
import ArticlesPage from "@/pages/ArticlesPage";
import CategoriesPage from "@/pages/CategoryPage";
import NotificationsPage from "@/pages/NotificationsPage";
import ImportPage from "@/pages/ImportPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/import" element={<ImportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
