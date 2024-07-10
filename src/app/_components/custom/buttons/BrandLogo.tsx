import Link from "next/link";
import { useMenu } from "@/app/_hooks/useBodyStyle";

const BrandLogo = () => {
  const { menuOpen, handleMenuOpen } = useMenu();

  // Checks if the side menu was open through the hook and decides to close it if its open
  const menuWasOpen = () => {
    menuOpen ? handleMenuOpen() : null;
  };

  return (
    <Link href="/" onClick={menuWasOpen} aria-label="homepage">
      <svg
        width={40}
        height={40}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M34 0H6C2.68629 0 0 2.68629 0 6V34C0 37.3137 2.68629 40 6 40H34C37.3137 40 40 37.3137 40 34V6C40 2.68629 37.3137 0 34 0Z"
          fill="#FFA600"
        />
        <path
          d="M29.8073 12.7291H32.2239V30.401H7.776V12.7291H10.1302"
          stroke="#0F52BA"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29.2865 27.8125V9.58332C22.2187 9.81248 19.9688 12.7083 19.9688 12.7083C19.9688 12.7083 17.1354 9.46352 10.6562 9.58332V27.8125C13.9093 28.0143 17.0829 28.9017 19.9688 30.4166C19.9688 30.4166 25.1042 27.9844 29.2865 27.8125Z"
          stroke="#0F52BA"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.9688 12.7291V30.401"
          stroke="#0F52BA"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <clipPath>
            <rect width={40} height={40} fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Link>
  );
};

export default BrandLogo;
