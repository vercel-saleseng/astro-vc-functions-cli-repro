import { defineMiddleware } from "astro/middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {

    // check if url contains /cms-image/
    if (context.url.pathname.includes("/cms-image")) {

        // Define a list of headers that are safe to forward
        const safeHeaders = ['accept', 'accept-language', 'user-agent', 'accept-encoding'];

        // Filter the request headers to include only the safe ones
        const filteredHeaders = {};
        for (const [key, value] of context.request.headers) {
            if (safeHeaders.includes(key.toLowerCase())) {
                filteredHeaders[key] = value;
            }
        }

        // set the content type to image
        const targetUrl = 'https://autopitch.ai/posts/static/images/bell-curve.jpeg';
        const response = await fetch(targetUrl, {
            method: context.request.method,
            headers: filteredHeaders,
        });

        // Convert headers to a simple object to avoid circular references
        const headers = {};
        response.headers.forEach((value, key) => {
            headers[key] = value;
        });

        const body = await response.text();
        return new Response(body, {
            status: response.status,
            statusText: response.statusText,
            headers: headers, // Use the simplified headers object
        });
    }
    return next();
});