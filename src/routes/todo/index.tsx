import {createFileRoute, Link} from '@tanstack/react-router'

export const Route = createFileRoute('/todo/')({
  component: () => <div>
    Hello /todo/!
    <Link to='/todo/$todoid' params={{todoid: '1'}} >Item1</Link>
  </div>
})
