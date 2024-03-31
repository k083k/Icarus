import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('jwt')?.value;

    if (currentUser) {
        // If user is already authenticated
        const { pathname } = request.nextUrl;
        if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
            // Redirect to dashboard or home page if accessing login or register pages
            return Response.redirect(new URL('/', request.url));
        }
    }

    return;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
