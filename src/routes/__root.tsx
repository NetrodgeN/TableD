import { Link, Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <>
            <div className="p-2 flex gap-2 text-lg">
                <Link
                    to="/"
                    activeProps={{
                        className: 'font-bold',
                    }}
                    activeOptions={{ exact: true }}
                >
                    Home
                </Link>{' '}
                <Link
                    to={'/about'}
                    activeProps={{
                        className: 'font-bold',
                    }}
                >
                    About
                </Link>
                <Link
                    to={'/about-me'}
                    activeProps={{
                        className: 'font-bold',
                    }}
                >
                    About-me
                </Link>
                <Link
                    to={'/todo'}
                    activeProps={{
                        className: 'font-bold',
                    }}
                >
                    Todo
                </Link>
            </div>
            <hr />
            <Outlet />
            <TanStackRouterDevtools position="bottom-right" />
        </>
    )
}