import { Link } from "@tanstack/react-router";

import styles from "./header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link
        activeOptions={{ exact: true }}
        activeProps={{
          className: "font-bold",
        }}
        to="/"
      >
        Home
      </Link>
      <Link
        activeProps={{
          className: "font-bold",
        }}
        to="/about"
      >
        About
      </Link>
    </header>
  );
};

Header.displayName = "Header";
