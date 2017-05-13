# Tic Tac Toe

#### By _**Sam Kirsch, Nicole Sanders**_

## Description

Users can play tic tac toe against themselves or the computer. The computer uses machine learning to improve its game.

## Specifications

1. Generate a blank vector
* input:
* output: 000
          000
          000

2. Make a grid of buttons that are connected to each vector position and display an "1" when the button is clicked.
* input: click
* output: 100
          000
          000

3. If the position has already been clicked it will not be clickable again.
* input: click
* output: 100
          000
          000

4. Make a global state variable that toggles between 1's and 2's.
* input: click
* output: 100
          020
          000

5. If the top row contains the same variable the game is over and a user has won.
* input: click
* output: 111
          022
          000

6. If the left column contains the same variable the game is over and a user has won.
* input: click
* output: 100
          122
          100

7. If a diagonal contains the same variable the game is over and a user has won.
* input: click
* output: 100
          012
          001

8. Make for loops to check the remaining columns, rows, and diagonals.
* input: click
* output: 010
          012
          012

9. If there are no remaining zeros and the above conditions are not met then call a draw.
* input: click
* output: 121
          212
          212

10. Link button click functionality to the separate divs and clone the Xs and Os.
* input: click
* output: XOX
          OXO
          OXO

11. Ice box ideas:
* highlight winning row
* have the players select which images they want to use instead of X and O
* Add a replay button
* Make the computer play against one person
* Improve the look of the game board
* Add a sound effect or celebration effect when someone wins

### 1 or 2 player functionality.

12. Generate a computer player in array.

13. Computer moves randomly as player 2.

14. Computer stores finished games.

15. Computer picks finished games that are similar.

16. Computer picks similar games with lower loss percentage.

17. Computer picks less similar games if loss is assured.

18. Make the computer player 1, if desired by the human player.

19. Ice box ideas:
* generate 2 computer players

* make them learn form each other



## Setup/Installation Requirements

* Clone this repository

## Known Bugs

There are no known bugs. Please contact us if any are discovered.

## Support and contact details

Contact Nicole Sanders at nsanders9022@gmail.com for any questions, comments, or concerns.

## Technologies Used

* HTML
* CSS
* JavaScript/jQuery

### License

*This software is licensed under the MIT license*

Copyright (c) 2017 **_Sam Kirsch, Nicole Sanders_**
