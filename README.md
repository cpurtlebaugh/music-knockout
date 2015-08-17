##Music Knockout

###Description
#####Music Knockout is a game wherein players connected to the game compete against eachother by attempting to select the currently playing song first.  Clients will be presented with the main game splash page upon page load, and will have the option to either register or play the game anonymously. The game will consist of a simple autoplay music player that utilizes the Spotify API, and the music will be projected (emitted) to each connected client syncronously. Players will most likely have the choice between 4 different song choices, and, in attempt to increase difficulty level, we may choose to require the players to also select the correct artist. The first player to select the correct song title (and possibly artist name) will be granted a point. These points will accumulate in a leadboard of connected players on the left hand side, and will also be stored in their user profile if they are registered. We will also be implementing a "trophies" feature that allows users to rank up based on the amount of points they have. Other potential features include a chat box on the right hand side and more elaborate registered user functionality (to be determined.)

###Technologies used:
- HTML:
 - Used to create the structure of the game and layout of the website.
- CSS Frameworks:
  - Normalize CSS: Used to reset the default browser stylings to increase continuity in design.
  - Skeleton CSS: Used to create a responsive grid system and also for basic forms and buttons.
  - Materialize CSS: Used for the parallax feature and possibly other design elements.
  - Animate CSS: Used for the more advanced animations such as drop in, drop out, shake, etc. which will be used to make the game more lively, interactive, and engaging.
- Javascript: is used for page interactivity, calculation of game points, etc.
- jQuery: Used for AJAX request assistance and also for basic DOM manipulation (button click recognition, animation, etc.)
- MEN Stack:
 - MongoDB/Mongoose, ExpressJS, and Node.js
- Socket.io:

###Roles/Responsibilities (WIP):
- Adam:
 - OAuth (Stormpath and Facebook), Authentication, Login, page design and CSS.
- Cassie:
 - API/AJAX, Controllers/Routes,
- Tara:
 - MongoDB/Mongoose/Data Modeling,
- Taylor:
 - API/AJAX, Socket.io (live game impelementation, side chat implementation). Controllers/Routes, Modeling.

###Design Approach:

###Get Started:
To install this game and play it, simply download the files and open up the HTML page in the browser. "Set Up Game" button the bottom of the game board will initialize the game, and the game can be cleared and reset at any time by using the "Clear The Board" button.

If you'd like to download and alter the source code, all of the HTML is contained in `index.html`, all of the CSS is contained in `style.css`, and all of the Javascript and jQuery is contained in the `main.js` file.

###Unsolved Problems/Planned Features:
-


###User Stories
**As a ___, I want ___, so that I can ___.**


**MVP**:
- [x] As a user, I want to be able to move my pieces on the board so I can try and win the game.
- [x] As a user, I want to be notified as to whether or not my desired move is legal or not so I can make a different move if needed.
- [x] As a user, I want to be able to "capture" or "attack" other players so I can (eventually) win the game.
- [x] As a user, I want to be able to play against another human so that the game is at least playable.
- [x] As a user, I want to have a tracker that summarizes the state of the game, so I can gauge how I'm doing in my current game (by showing, for example, current selected piece and current score).
- [x] As a user, I want a 'reset game' button so that I can reset the game instead of frusturatingly play through a game I know is a lost cause.
- [x] As a user, I want an aesthetically pleasing and functional UI so that I can clearly see the status of the game.
- [ ] As a user, I want to be indicated of what piece I currently have selected.

**Icebox:**
- [ ] As a user, I want to be able to use chain attacks so that I can utilize traditional checkers strategies during the game.
- [ ] As a user, I want to be able to select pieces and be shown a visual list of options as to where I can move the selected pieces so I can easily make decisions about my next move.
- [ ] As a user, I want to be granted a king if I get to the opponents side of the board so that I can utilize the power of king pieces during my game.
- [x] As a user, I want assistance that notifies me of where I'm allowed to move a selected piece.
