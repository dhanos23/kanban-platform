import { ReactNode, useState, useEffect } from "react";
import { Sidebar } from "@/components/organisms/Sidebar";
import { Header } from "@/components/organisms/Header";
import { MainContent } from "@/components/organisms/MainContent";

interface DashboardTemplateProps {
  children: ReactNode;
}

export const DashboardTemplate = ({ children }: DashboardTemplateProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);

      if (isMobileView) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Comprobar al cargar
    checkIfMobile();

    // Configurar el listener
    window.addEventListener("resize", checkIfMobile);

    // Limpiar al desmontar
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Para evitar problemas de variable no usada
  console.log(isMobile);
  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex flex-col flex-1 overflow-hidden ${isSidebarOpen ? "" : "w-full"}`}
      >
        <Header toggleSidebar={toggleSidebar} />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};
