import {StrictMode} from 'react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import {routeTree} from "./routeTree.gen.ts";
import {ModalProvider} from "@/app/providers/modal-provider";
import {createRoot} from "react-dom/client";

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = createRoot(rootElement)
    root.render(
        <StrictMode>
            <ModalProvider>
                <RouterProvider router={router} />
            </ModalProvider>
        </StrictMode>,
    )
}
