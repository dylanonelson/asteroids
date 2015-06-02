#Asteroids.js

[Play the game](http://www.dylanonelson.com/asteroids)

An HTML5 version of the classic arcade game. Implemented with vanilla JavaScript, the Keymaster library, and the Canvas API.

###Drawing with Canvas
When the game begins, it grabs a 2d rendering context from the canvas element and sizes it according to the window size. This context draws all the objects in the game, rotating and translating the canvas as necessary. The values for all the shapes are extracted from the objects being drawn, so that these dimensions can be changed without digging into the guts of the drawing functions.

###The ship
Every object in the game inherits from a MovingObject constructor, a structure which made adding the ship and bullets much easier. Asteroids don't add much to the MovingObject functions because they are such simple floating objects, but the ship adapts this logic considerably. To achieve more fluid motion, the ship stores many Thrust objects, each representing a boost applied by the user with the 'up' key. Each of these fire every time the ship moves, nicely abstracting the process of calculating complex deltas created when the ship is pushed in different directions.

###The asteroids
The asteroids are simple, floating MovingObjects. I used a sprite png file, a random multiple of their width and height, and Canvas's drawImage function to give them varied texture in the game.

###Gameplay
The game is executed from a simple script loaded directly onto the page. Depending on whether the user has already played a game, a "Play" or "Play again" modal fixed across the width of the window serves as orientation. I'm currently using the Keymaster, a super-simple JavaScript library for binding events for key presses; the ship will move based on the arrow keys or on j, i, k, and l. As in the arcade version, the ship will relocate if you press 'down'.

###Next steps
- [ ] Retro ship outline
- [ ] Multiple levels
- [ ] More fluid I/O with custom event handlers
- [ ] Leaderboard (server-side integration)