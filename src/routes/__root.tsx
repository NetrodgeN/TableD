import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2 text-lg">
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
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
