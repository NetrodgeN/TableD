import { Link } from "@tanstack/react-router";

import styles from "./header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header__container}>
      <Link
        activeOptions={{ exact: true }}
        activeProps={{
          className: "font-bold",
        }}
        to="/"
      >
        Home
      </Link>{" "}
      <Link
        activeProps={{
          className: "font-bold",
        }}
        to="/about"
      >
        About
      </Link>
      <Link
        activeProps={{
          className: "font-bold",
        }}
        to="/about-me"
      >
        About-me
      </Link>
      <Link
        activeProps={{
          className: "font-bold",
        }}
        to="/todo"
      >
        Todo
      </Link>
    </header>
  );
};

Header.displayName = "Header";
