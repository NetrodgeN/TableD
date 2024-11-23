import { AboutPage } from "@/pages";
import { Modal } from "@/shared/ui/modal";
import { createLazyFileRoute } from "@tanstack/react-router";

function About() {
  return (
    <>
      <AboutPage />
      <Modal />
    </>
  );
}

export const Route = createLazyFileRoute("/about")({
  component: About,
});
