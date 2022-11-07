import RoomCard from "../../components/RoomCard";

const Rooms = () => {
  const data = [
    { name: 202, status: 'free' },
    { name: 204, status: 'occupied' },
    { name: 305, status: 'cleaning' },
    { name: 307, status: 'free' },
  ];
  return (
    data.map(room => (
      <RoomCard room={room} />
    ))
  );
};

export default Rooms;
