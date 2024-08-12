// export { auth as middleware } from "@/auth"

import { auth } from "@/auth"

export default auth((req) => {
    if (req.nextUrl.pathname.startsWith('/admin')) {
        console.log({ auth: req.auth })
        if (!req.auth && req.nextUrl.pathname !== "/login") {
            const newUrl = new URL("/login", req.nextUrl.origin)
            return Response.redirect(newUrl)
        }
    }
})

