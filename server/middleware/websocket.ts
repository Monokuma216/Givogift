export default defineEventHandler((event) => {
    if (event.node.req.url === "/ws") {
        // Базовая обработка WebSocket
        return {
            message: "WebSocket endpoint placeholder",
        };
    }
});
