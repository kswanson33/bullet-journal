// middleware.js
import { NextResponse } from 'next/server';

export function middleware() {
    // Check for maintenance mode
    if (process.env.MAINTENANCE_MODE === 'true') {
        return new NextResponse(
            '<html><body><h1>Site Under Maintenance</h1><p>We\'ll be back soon!</p></body></html>',
            {
                status: 503,
                headers: {
                    'Content-Type': 'text/html',
                },
            }
        );
    }

    // Otherwise, let the request through normally
    return NextResponse.next();
}
