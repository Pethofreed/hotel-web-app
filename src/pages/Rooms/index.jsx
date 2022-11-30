import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import RoomCard from "../../components/RoomCard";
import { getRooms } from "../../store/reducers/rooms";
import { useDispatch, useSelector } from "react-redux";
import { getContracts } from "../../store/reducers/contract";
import { selectRooms } from "../../helpers/selectors";
import { useNavigate } from "react-router-dom";

const Rooms = () => {

  const token = localStorage.getItem('hotel-token');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/')
    dispatch(getRooms())
    dispatch(getContracts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { rooms = [] } = useSelector(selectRooms());

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
