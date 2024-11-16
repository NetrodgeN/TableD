import { AboutPage } from "@/pages";
import { Modal } from "@/shared/ui/Modal";
import { createLazyFileRoute } from "@tanstack/react-router";

function About() {
  return (
    <div className="p-2">
      <AboutPage />
      <Modal />
    </div>
  );
}

export const Route = createLazyFileRoute("/about")({
  component: About,
});
