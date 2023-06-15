const TOKEN = '6267905947:AAGKjl5MzSg2Q2ILgFalOhq1XypQaFC_IRE';
const CHAT_ID = '-913701490';
const requestHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Max-Age": "86400",
}
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    if (request.method == "OPTIONS") {
        return new Response(null, {
            headers: requestHeaders
        })
    } else {
        const body = await request.json()
        const {name, email, message} = body;

        if (!name || !email || !message) {
            return new Response('Please fill in all fields.', {
                status: 200,
            })
        }
        const response = await fetch(`https://api.telegram.org/bot${bot.TOKEN}/sendMessage?chat_id=${bot.chatID}&text=${message.value}`, {
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: `<b>New message recived.</b>\n\n<b>Name: </b> ${name}\n<b>Email: </b>${email}\n<b>Message: </b>${message}\n<b>IP: </b>${request.headers.get("cf-connecting-ip")}`,
                parse_mode: 'HTML'
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const results = await response.json();
        const responseMessage = results.ok ? 'Your message has been successfully sent.' : 'An error occurred while sending the message.'
        return new Response(responseMessage, {status: 200, headers: requestHeaders})
    }
}
