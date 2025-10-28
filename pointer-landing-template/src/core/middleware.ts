import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/'])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { isAuthenticated, redirectToSignIn } = await auth()

  // Если не авторизован и не публичный роут → редирект на SignIn
  if (!isAuthenticated && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url })
  }

  // Если авторизован и зашёл на "/", редирект на "/dashboard"
  if (isAuthenticated && req.nextUrl.pathname === '/') {
    const dashboardUrl = new URL('/dashboard', req.url)
    return NextResponse.redirect(dashboardUrl)
  }

  // Авторизован и не публичный роут → пропускаем
  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}