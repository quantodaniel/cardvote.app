import { useRoomData } from "@/hooks/useRoomData";
import { CardUserOnline } from "../atoms/CardUserOnline";

export const OnlinePlayers = () => {
  const { onlineUsers } = useRoomData();

  return (
    <>
      <h3 className="text-xl">Online players</h3>
      <div className="avatar-group -space-x-5">
        {onlineUsers.map((onlineUser) => (
          <CardUserOnline
            key={`card-online-${onlineUser.uid}`}
            {...onlineUser}
          />
        ))}
      </div>
    </>
  );
};
