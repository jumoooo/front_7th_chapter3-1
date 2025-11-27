import React from "react";
import { ManagementPage } from "./pages/ManagementPage";
import { DefaultLayout } from "./components/layout/defaultLayout";
// components.css는 main.tsx에서 이미 로드되므로 중복 제거

export const App: React.FC = () => (
  <DefaultLayout>
    <ManagementPage />
  </DefaultLayout>
);
