import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setIsJoined, uploadChatImages } from '@/api/chat/chatApi';
import { leaveChat } from '@/api/chat/chatRoomsApi';
import { QueryError } from '@/@types/query';

interface Props {
  chatId: string;
}

export const useSetIsJoined = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ chatId }: Props) => setIsJoined(chatId),
    onError: (error: QueryError) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chatRooms', 'RECENT'],
      });
      queryClient.invalidateQueries({
        queryKey: ['chatRooms', 'UNREAD'],
      });
    },
  });
};

interface UploadImagesProps {
  chatId: string;
  images: File[];
}

export const useUploadChatImages = () => {
  return useMutation({
    mutationFn: ({ chatId, images }: UploadImagesProps) =>
      uploadChatImages(chatId, images),
    onError: (error: QueryError) => {
      console.error(error);
    },
  });
};

interface LeaveChatProps {
  chatId: string;
}

export const useLeaveChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ chatId }: LeaveChatProps) => leaveChat(chatId),
    onError: (error: QueryError) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chatRooms', 'RECENT'],
      });
      queryClient.invalidateQueries({
        queryKey: ['chatRooms', 'UNREAD'],
      });
    },
  });
};
