const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Set up Express to use EJS for rendering views
app.set("view engine", "ejs");
app.use(express.static("public"));

// Store emoji messages
let emojis = [];

/**
 * Log emoji posts for debugging
 * @param {string} user - Name of the user
 * @param {string} emoji - Emoji sent by the user
 */
function logEmojiPost(user, emoji) {
    console.log(`[Server Log] ${user} posted: ${emoji}`);
}

// Render main page
app.get("/", (req, res) => {
    res.render("index", { emojis });
});

// Handle WebSocket connections
io.on("connection", (socket) => {
    console.log("A user connected.");

    // Listen for new emoji messages
    socket.on("new-emoji", (data) => {
        emojis.push(data);

        // Keep only the last 50 messages
        if (emojis.length > 50) {
            emojis = emojis.slice(-50);
        }

        logEmojiPost(data.user, data.emoji);

        io.emit("update-wall", emojis);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected.");
    });
});

// Start the server
http.listen(3000, () => console.log("Server running at http://localhost:3000"));
