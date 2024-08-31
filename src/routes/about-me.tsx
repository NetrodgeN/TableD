import {createFileRoute, Link} from '@tanstack/react-router'

export const Route = createFileRoute('/about-me')({
  component: AboutMe
})

function AboutMe() {
    return (
        <div>
            Hello /about-me!
            <Link to={'/about'}>Go to main</Link>
        </div>
    )
}
