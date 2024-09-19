import {createFileRoute, Link} from '@tanstack/react-router'

export const Route = createFileRoute('/todo/')({
  component: () => <div>
    Hello /todo/!
    <Link params={{todoid: '1'}} to='/todo/$todoid' >Item1</Link>
  </div>
})
