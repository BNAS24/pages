import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MenuDots } from "@/app/_components/custom/buttons/MenuDots";
import Link from "next/link";
import { theme } from "@/app/_styles/muiTheme";
import { useState } from "react";

interface Option {
  title: string;
  link: string;
}

const options: Option[] = [
  {
    title: "Sign In",
    link: "/api/auth/login",
  },
  {
    title: "Join Now",
    link: "/api/auth/login",
  },
];

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderMenuItem = (option: Option, index: number) => (
    <MenuItem
      key={index}
      component={Link}
      href={option.link}
      onClick={handleClose}
      sx={{
        color: theme.palette.primary.main,
      }}
    >
      {option.title}
    </MenuItem>
  );

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuDots />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: theme.palette.secondary.main, // Background color for the whole Menu
          },
        }}
      >
        {options.map(renderMenuItem)}
      </Menu>
    </div>
  );
}
