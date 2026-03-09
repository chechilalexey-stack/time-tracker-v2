import { useEffect, useState } from "react";
import { Office365UsersService } from "@/generated/services/Office365UsersService";
import type { GraphUser_V1 } from "@/generated/models/Office365UsersModel";
import { toast } from "react-toastify";
import withTimeout from "@/shared/utils/loadingTimeOut";
import {TIME_OUT_GET_DATA} from "@/constants/table";
export default function useUser() {
  const [userProfile, setUserProfile] = useState<GraphUser_V1>();
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchPhoto = async (id?: string, upn?: string) => {
      if (!id && !upn) return null;

      try {
        const res = await Office365UsersService.UserPhoto_V2(id || upn!);
        return res.data;
      } catch {
        if (upn && id) {
          const res = await Office365UsersService.UserPhoto_V2(upn);
          return res.data;
        }
      }

      return null;
    };

    const fetchUser = async () => {
      try {
        const user = await toast.promise(
          withTimeout(
            Office365UsersService.MyProfile_V2(
              "id,displayName,jobTitle,userPrincipalName,mail,claims",
            ),
            TIME_OUT_GET_DATA,
          ),
          {
            pending: "Загрузка профиля...",
            success: {
              render({ data }) {
                return `Добро пожаловать, ${data.data.displayName}`;
              },
            },
            error: "Не удалось загрузить профиль 👻",
          },
        );

        if (!isMounted) return;

        const profile = user.data;
        setUserProfile(profile);

        const photoData = await fetchPhoto(
          profile?.id,
          profile?.userPrincipalName,
        );

        if (photoData && isMounted) {
          setPhoto(`data:image/jpeg;base64,${photoData}`);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return { userProfile, photo, loading };
}
