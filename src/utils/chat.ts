import { Room, SortType } from '@/@types/chat';

export const sortRooms = (rooms: Room[], sortType: SortType): Room[] => {
  return [...rooms].sort((a, b) => {
    if (sortType === '최근순') {
      return (
        new Date(b.lastMessageTime).getTime() -
        new Date(a.lastMessageTime).getTime()
      );
    }
    if (sortType === '안읽은순') {
      if (a.messageCount === 0 && b.messageCount > 0) return 1;
      if (a.messageCount > 0 && b.messageCount === 0) return -1;

      return (
        new Date(b.lastMessageTime).getTime() -
        new Date(a.lastMessageTime).getTime()
      );
    }
    return 0;
  });
};

export const formatDateToKorean = (dateString: string) => {
  const dateParts = dateString.match(/\d+/g);
  if (!dateParts) return '';

  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  return `${year}년 ${month}월 ${day}일`;
};

export const formatTimeToKorean = (dateString: string) => {
  const timeMatch = dateString.match(/(오전|오후)\s(\d+):(\d+)/);
  if (!timeMatch) return '';

  const period = timeMatch[1];
  const hour = parseInt(timeMatch[2], 10);
  const minutes = timeMatch[3];

  return `${period} ${hour}:${minutes}`;
};
