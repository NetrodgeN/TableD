import { MainPage } from "@/pages";
import { createLazyFileRoute } from "@tanstack/react-router";

function Index() {
  return (
    <div className="">
      <MainPage />
    </div>
  );
}

export const Route = createLazyFileRoute("/")({
  component: Index,
});
