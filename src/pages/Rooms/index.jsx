import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@mui/material";
import { useState } from "react";
import RoomCard from "../../components/RoomCard";

const Rooms = () => {

  const data = [
    { name: 202, status: 'free' },
    { name: 204, status: 'occupied' },
    { name: 305, status: 'cleaning' },
    { name: 307, status: 'free' },
    { name: 202, status: 'free' },
    { name: 204, status: 'occupied' },
    { name: 305, status: 'cleaning' },
    { name: 307, status: 'free' },
    { name: 202, status: 'free' },
    { name: 204, status: 'occupied' },
    { name: 305, status: 'cleaning' },
    { name: 307, status: 'free' },
  ];

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {data.map(room => (
          <RoomCard
            room={room}
          />
        ))}
      </Box>
    </>
  );
};

export default Rooms;
