import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/widgets/Header/Header";
import TimeSheetPage from "@/pages/TimeSheetPage/TimeSheetPage";
import { useEffect, useState } from "react";
import useUser from "@/shared/api/useUser";
import Footer from "@/widgets/Footer/Footer";
import TimeSheetEntries from "@/pages/TimeSheetEntries/TimeSheetEntries";
import AboutPage from "@/pages/AboutPage/AboutPage";
import WelcomePage from "@/pages/WelcomePage/WelcomePage"
export default function App() {
  const { userProfile, loading, photo } = useUser();
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [currentPage, setCurrentPage] = useState("log");
  useEffect(() => {
    if (userProfile) {
      toast.success(`Добро пожаловать, ${userProfile.displayName}`, {
        toastId: "welcome-toast",
      });
    }
  }, [userProfile]);

  const renderPage = () => {
    switch (currentPage) {
      case "main":
        return <WelcomePage/>;
      case "log":
        return (
          <TimeSheetPage
            userProfile={userProfile}
            formattedDate={formattedDate}
          />
        );
      case "report":
        return <TimeSheetEntries />;
      case "about":
        return <AboutPage />;
      
      default:
        return null;
    }
  };

  return (
    <div className=" min-h-screen bg-gray-50">
      <Header
        userProfile={userProfile}
        loading={loading}
        photoUrl={photo}
        setCurrentPage={setCurrentPage}
      />

      <main className="p-6 max-w-8xl mx-auto">{renderPage()}</main>
      <Footer setCurrentPage={setCurrentPage} />
      <ToastContainer />
    </div>
  );
}
