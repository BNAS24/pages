import { useMenu } from "@/app/_hooks/useBodyStyle";
import { Box } from "@mui/material";

const HamburgerMenu = () => {
  const { handleMenuOpen } = useMenu();

  return (    
    <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      visibility: {
        xs: "visible", // 0px
        sm: "visible", // 600px
        md: "hidden", // 900px
        lg: "hidden", // 1200px
        xl: "hidden", // 1536px
      }
    }}
    >
    <svg
      onClick={handleMenuOpen}
      className="hamburger-menu"
      width={40}
      height={40}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.3334 11.6667H6.66669"
        stroke="#FFA600"
        strokeWidth={3.2}
        strokeLinecap="round"
      />
      <path
        d="M33.3334 20H6.66669"
        stroke="#FFA600"
        strokeWidth={3.2}
        strokeLinecap="round"
      />
      <path
        d="M33.3334 28.3334H6.66669"
        stroke="#FFA600"
        strokeWidth={3.2}
        strokeLinecap="round"
      />
    </svg>
    </Box>
  );
};

export default HamburgerMenu;
