# Real Time

Most games are real-time, they represent continuous movements and interactions by running at high framerates.  

In multiplayer environments framerates like 60fps are feasible locally but they are impossible or expensive (in terms of processing power) to use remotely due to the inevitable network latency and bandwidth limitations.  

All clients have to agree on crucial game events. If you are playing a shooter, your client cannot simply resolve a successful hit and send it to the server because due to the lag another client may have slightly different information and may have determined a different outcome.  
That's one of the reasons why we want the server to be *authoritative*, that is to be able to resolve the core game logic centrally.

Another reason is cheating. Html and js games can be easily modified in the browser, and you don't want clients to be able to arbitrarily change game variables.

For this simple game, the logic of game would be:

* Have the server side store the game ‘state’, be able to modify the state, and also receive updates from the players
* Have the client side be able to receive and render the game state sent by the server, and also send out player actions to the server  

In this example we'll intentionally use a low update rate to highlight the problems with latency.  
The next example will implement a simple smoothing logic to the movements.

[How To Build A Multiplayer Browser Game - basic tutorial](https://hackernoon.com/how-to-build-a-multiplayer-browser-game-4a793818c29b)
[Client-Server Game Architecture - advanced tutorial](https://www.gabrielgambetta.com/client-server-game-architecture.html)


## The Game State (server)

In this example, on the server side, I create an object called "gameState" which contains an object called "players".
Players is like a dictionary in other languages, meaning that every player is stored as a property. The property name is the unique identifier assigned by socket.io which is a long string.
eg: `players.roTa9f1UhT4NOSjCAAAC` or `players[socket.id]`

Each player is an object that can have as many properties as you want (score, energy, avatar...).

This example shows how to add and remove players from the game state when clients (and sockets) connect and disconnect.

The server sends the entire state of the game continuously and the clients are only visualizing it without doing any calculation.
This is a simple way to make sure all the clients are exactly on the same page.

## Exercises

Individually:

*When a player clicks, the mouse pointer changes appearance (in all clients)

*When a player clicks on another mouse pointer the clicked pointer "dies" (it should be resolved on the server side)

*Every 5 seconds all the mouse pointers go back to life (also determined by the server)
