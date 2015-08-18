##Music Knockout

###Description
#####Music Knockout is a game wherein players connected to the game compete against eachother by attempting to select the currently playing song first.  Clients will be presented with the main game splash page upon page load, and will have the option to either register or play the game anonymously. The game will consist of a simple autoplay music player that utilizes the Spotify API, and the music will be projected (emitted) to each connected client syncronously. Players will most likely have the choice between 4 different song choices, and, in attempt to increase difficulty level, we may choose to require the players to also select the correct artist. The first player to select the correct song title (and possibly artist name) will be granted a point. These points will accumulate in a leadboard of connected players on the left hand side, and will also be stored in their user profile if they are registered. We will also be implementing a "trophies" feature that allows users to rank up based on the amount of points they have. Other potential features include a chat box on the right hand side and more elaborate registered user functionality (to be determined.)

###Technologies used:
- HTML:
 - Used to create the structure of the game and layout of the website.
- CSS Frameworks:
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
To install this game and play it, simply download the files, npm install, run mongod, nodemon to launch the server and open up localhost:3000 in the browser. Or you can play by going to the following address:    Once you're signed up and logged in press play.


###Unsolved Problems/Planned Features:
-


###User Stories
**As a ___, I want ___, so that I can ___.**


**MVP**:
- [ ] As a user, I want to be able to see the other players connected to the game so I know who I am competing against.
- [ ] As a user, I want to go to a splash/index page that makes it clear of what I need to do next so that I know how to play.
- [ ] As a user, I want to be able to see other connected users' scores so I know where I stand compared to other users.
- [ ] As a user, I want to know what my current status/score.
- [ ] As a user, I would like to be able to easily share this on social media so I can encourage my friends to play.
- [ ] As a user, I would like to be able to play without being a registered user so that I can quickly get playing against others.
- [ ] As a user, I'd like to be able to give input as the genre of the songs being quizzed so I can compete with songs that I like.
- [ ] As a user, I want an interactive UI that has clear and fun animations.
- [ ] As a user, I want to be able to select the song from a list of multiple choices.
- [ ] As a user, I want to be able to see others high scores in the current game in real time.
- [ ] As a user,  I would like to be able to sign in and view my profile page so I can manipulate my profile and settings.



**Icebox:**
- [ ] As a user, I would like be able to participate in live chat so I can communicate (and possibly taunt) other players connected to the game.
- [ ] As a user, I would like to be able to provide input for the next round of songs (perhaps song genre, music type, etc.) so that the playing field is leveled out and I have a chance to reveal my music knowledge.
