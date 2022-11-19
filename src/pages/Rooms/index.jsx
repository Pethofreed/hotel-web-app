import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import RoomCard from "../../components/RoomCard";
import { getRooms } from "../../store/RoomReducer";
import { getContracts } from "../../store/ContractReducer";
import { useDispatch, useSelector } from "react-redux";

const Rooms = () => {

  const dispatch = useDispatch()

  const {
    rooms
  } = useSelector(({ RoomReducer }) => ({
    rooms: RoomReducer.rooms
  }));

  useEffect(() => {
    dispatch(getRooms())
    dispatch(getContracts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasData = !!rooms && rooms.length > 0;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {hasData && rooms.map(room => (
          room.available && (
            <RoomCard
              key={room.name}
              room={room}
            />
          )
        ))}
      </Box>
      {!hasData && (
        <Box
          sx={{
            height: '400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography textAlign="center" variant="h4">
            No existen habitaciones
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Rooms;
