import { useEffect, useState } from "react";
import { Office365UsersService } from "@/generated/services/Office365UsersService";
import type { GraphUser_V1 } from "@/generated/models/Office365UsersModel";
import { toast } from "react-toastify";
import withTimeout from "@/shared/utils/loadingTimeOut";
import { TIME_OUT_GET_DATA } from "@/constants/table";

export default function useUser() {
  // состояние профиля пользователя
  const [userProfile, setUserProfile] = useState<GraphUser_V1>();

  // base64 строка фотографии пользователя
  const [photo, setPhoto] = useState<string | null>(null);

  // состояние загрузки данных
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // контроллер для отмены запросов если компонент размонтируется
    const controller = new AbortController();

    // получение фотографии пользователя
    const fetchPhoto = async (id?: string, upn?: string) => {
      // если нет идентификаторов — фото получить невозможно
      if (!id && !upn) return null;

      try {
        // основной запрос по id
        const res = await Office365UsersService.UserPhoto_V2(id || upn!);
        return res.data;
      } catch {
        // fallback: пробуем получить фото по userPrincipalName
        if (upn && id) {
          const res = await Office365UsersService.UserPhoto_V2(upn);
          return res.data;
        }
      }

      return null;
    };

    // загрузка профиля пользователя
    const fetchUser = async () => {
      try {
        // запрос профиля с уведомлениями через toast
        const user = await toast.promise(
          withTimeout(
            Office365UsersService.MyProfile_V2(
              "id,displayName,jobTitle,userPrincipalName,mail,claims"
            ),
            TIME_OUT_GET_DATA // таймаут загрузки
          ),
          {
            pending: "Загрузка профиля...",
            success: {
              render({ data }) {
                return `Добро пожаловать, ${data.data.displayName}`;
              },
            },
            error: "Не удалось загрузить профиль 👻",
          }
        );

        // если компонент уже размонтирован — прекращаем выполнение
        if (controller.signal.aborted) return;

        const profile = user.data;

        // сохраняем профиль в state
        setUserProfile(profile);

        // получаем фото пользователя
        const photoData = await fetchPhoto(
          profile?.id,
          profile?.userPrincipalName
        );

        // проверяем что компонент всё ещё активен
        if (!controller.signal.aborted && photoData) {
          // сохраняем фото как base64 изображение
          setPhoto(`data:image/jpeg;base64,${photoData}`);
        }
      } finally {
        // выключаем loader если компонент не размонтирован
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    // запуск загрузки данных
    fetchUser();

    // cleanup: отменяем запросы при размонтировании компонента
    return () => {
      controller.abort();
    };
  }, []);

  // хук возвращает профиль, фото и состояние загрузки
  return { userProfile, photo, loading };
}