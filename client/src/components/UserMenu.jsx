import { Avatar, Box, Menu, MenuItem, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

const UserMenu = () => {
  const {
    user: { displayName, photoURL, auth },
  } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  const handleClick = (e) => setAnchorEl(e.currentTarget);

  const handleLogout = () => auth.signOut();

  return (
    <>
      <Box sx={{ display: "flex", cursor: "pointer" }} onClick={handleClick}>
        <Typography>{displayName}</Typography>
        <Avatar
          src={photoURL}
          alt="avatar"
          sx={{ width: 24, height: 24, marginLeft: "5px" }}
        ></Avatar>
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
