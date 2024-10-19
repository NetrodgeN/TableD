import { createFileRoute, Link } from "@tanstack/react-router";

function AboutMe() {
  return (
    <div>
      Hello /about-me!
      <Link to="/about">Go to main</Link>
    </div>
  );
}

export const Route = createFileRoute("/about-me")({
  component: AboutMe,
});
