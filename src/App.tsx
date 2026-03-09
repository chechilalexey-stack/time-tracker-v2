import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/widgets/Header/Header";
import TimeSheetPage from "@/pages/TimeSheetPage/TimeSheetPage";
import {  useState } from "react";
import useUser from "@/shared/api/useUser";
import Footer from "@/widgets/Footer/Footer";
import TimeSheetEntries from "@/pages/TimeSheetEntries/TimeSheetEntries";
import AboutPage from "@/pages/AboutPage/AboutPage";
import WelcomePage from "@/pages/WelcomePage/WelcomePage";
export default function App() {
  const { userProfile, loading, photo } = useUser();
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const [currentPage, setCurrentPage] = useState("log");

  const renderPage = () => {
    if (userProfile && !loading) {
      switch (currentPage) {
        case "main":
          return <WelcomePage />;
        case "log":
          return (
            <TimeSheetPage
              userProfile={userProfile}
              formattedDate={formattedDate}
            />
          );
        case "report":
          return <TimeSheetEntries userProfile={userProfile} />;
        case "about":
          return <AboutPage />;

        default:
          return null;
      }
    } else if (!loading) {
      return (
        <div className="flex flex-col items-center justify-center py-10 text-center gap-2">
          <div className="text-4xl">👻</div>

          <p className="text-gray-600 text-lg font-medium">
            Не удалось загрузить профиль пользователя
          </p>

          <p className="text-gray-500 text-sm">
            Пожалуйста запустите приложение в PowerApps
          </p>
          <code>
            npm run dev <br />
            npx power-apps run
          </code>
          <p>проверьте порт локальной сессии</p>
        </div>
      );
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
