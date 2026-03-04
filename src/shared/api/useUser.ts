import { useEffect, useState } from "react";
import { Office365UsersService } from "@/generated/services/Office365UsersService";
import type { GraphUser_V1 } from "@/generated/models/Office365UsersModel";
import { toast } from "react-toastify";

export default function useUser() {
  const [userProfile, setUserProfile] = useState<GraphUser_V1>();
  const [loading, setLoading] = useState(true);
  const [photo, setPhoto] = useState<string | null>(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await Office365UsersService.MyProfile_V2(
          "id,displayName,jobTitle,userPrincipalName,mail,claims",
        );

        setUserProfile(user.data);
        if (user.data?.id || user.data?.userPrincipalName) {
          // Try both id and userPrincipalName for photo
          let photoData = null;
          try {
            photoData = (
              await Office365UsersService.UserPhoto_V2(
                user.data.id! || user.data.userPrincipalName!,
              )
            ).data;
          } catch {
            // fallback to userPrincipalName if id fails
            if (user.data.userPrincipalName) {
              photoData = (
                await Office365UsersService.UserPhoto_V2(
                  user.data.userPrincipalName,
                )
              ).data;
            }
          }
          if (photoData) setPhoto(`data:image/jpeg;base64,${photoData}`);
        }
      } catch (error) {
        toast.error(
          "Не удалось загрузить профиль пользователя. Пожалуйста, попробуйте позже.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);
  return { userProfile, loading, photo };
}
