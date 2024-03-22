const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjvngrdv';
const requestHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Max-Age": "86400",
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    if (request.method === "OPTIONS") {
        return new Response(null, {
            headers: {

                
                ...requestHeaders,
                "Content-Type": "text/plain",
            }
        })
    } else {
        const body = await request.json()
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return new Response('Please fill in all fields.', {
                status: 200,
            })
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);

        const response = await fetch(FORMSPREE_ENDPOINT, {
            body: formData,
            method: "POST",
            headers: {
                "Accept": "application/json"
            },
        })

        const results = await response.json();
        const responseMessage = results.ok ? 'Sent successfully' : 'An error occurred while sending the message'
        return new Response(responseMessage, {status: 200, headers: requestHeaders})
    }
}