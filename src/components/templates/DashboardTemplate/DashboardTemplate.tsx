"use client";

import { useState } from "react";
import { Sidebar } from "@/components/organisms";
import { Header } from "@/components/organisms";

interface DashboardTemplateProps {
  children: React.ReactNode;
}

export const DashboardTemplate = ({ children }: DashboardTemplateProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <div
        className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? "w-[300px]" : "w-0"}`}
      >
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-auto p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
};
