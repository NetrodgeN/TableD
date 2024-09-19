import { Modal } from "@/shared/ui/Modal";
import { createLazyFileRoute } from "@tanstack/react-router";

import { SomeComponent } from "../SomeComponents.tsx";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="p-2">
      <SomeComponent />
      <Modal />
      Hello from About!
    </div>
  );
}
