import { NextResponse } from 'next/server';

const allowedOrigins = process.env.NODE_ENV === 'production' ? ['https://example.com'] : ['http://localhost:3001', 'https://www.google.com'];

export function middleware(request: Request) {
    // const regex = new RegExp('/api/*');

    // // if (request.url.includes('/api'))
    // if (regex.test(request.url)) {

    // }

    const origin = request.headers.get('origin');

    if (origin && !allowedOrigins.includes(origin) || !origin) {
        return new NextResponse(null, {
            status: 400,
            statusText: "Bad Request",
            headers: {
                'Access-Control-Allow-Origin': origin || '*',
                'Content-Type': 'text/plain',
            }
        })
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*'
}