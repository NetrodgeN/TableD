import { Header } from "@/shared/ui/Header";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
// TODO: корректным наверно будет сделать компонент Header, разбить в нём меню и прочее, чтобы было органично
// Не забыть написать что-то вроде ui-kit как в figme
// выписать все цвета, шрифты, размеры, отступы и прочее
function RootComponent() {
  return (
    <div style={{ display: "flex" }}>
      <Header />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
