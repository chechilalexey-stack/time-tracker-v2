import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/widgets/Header/Header";
import TimeSheetPage from "@/pages/TimeSheetPage/TimeSheetPage";
import { useEffect } from "react";
import useUser from "@/shared/api/useUser";
import Footer from "@/widgets/Footer/Footer"
export default function App() {
  const { userProfile, loading, photo } = useUser();
  const today = new Date();
const formattedDate = today.toISOString().split('T')[0];
  useEffect(() => {
    if (userProfile) {
      toast.success(`Добро пожаловать, ${userProfile.displayName}`, {
        toastId: "welcome-toast",
      });
    }
  }, [userProfile]);
  return (
    <div className=" min-h-screen bg-gray-50">
      <Header userProfile={userProfile} loading={loading} photoUrl={photo} />

      <main className="p-6 max-w-8xl mx-auto">
        <TimeSheetPage userProfile={userProfile} formattedDate = {formattedDate} />
      </main>
      <Footer/>
      <ToastContainer />
    </div>
  );
}
