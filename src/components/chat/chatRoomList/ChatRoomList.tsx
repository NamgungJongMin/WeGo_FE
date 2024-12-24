import ChatRoomItem from '@/components/chat/chatRoomList/ChatRoomItem';

interface Room {
  id: string;
  title: string;
  host: string;
  date: string;
  image: string;
  membersCount: number;
  messageCount: number;
  lastMessageTime: string;
}

interface Props {
  rooms: Room[];
  onExit: (id: string) => void;
}

const ChatRoomList = ({ rooms, onExit }: Props) => {
  return (
    <ul
      className="overflow-y-auto custom-scrollbar"
      style={{
        height: `calc(100vh - 140px)`,
      }}
    >
      {rooms.map((room) => (
        <ChatRoomItem
          key={room.id}
          id={room.id}
          title={room.title}
          host={room.host}
          date={room.date}
          image={room.image}
          membersCount={room.membersCount}
          messageCount={room.messageCount}
          onExit={onExit}
        />
      ))}
    </ul>
  );
};

export default ChatRoomList;
