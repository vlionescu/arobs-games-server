begin transaction;
INSERT INTO games(name, imageUrl, description)
VALUES
('snake','images/snake.png',"My pet snake is exactly 3.14 metres long. He’s a πthon."),
('pictureMatch','images/picturematch.png',"A game that will improve your memory and brain power. A board with several pairs of disordered images. You will have to find all the couples. No time limit and 14 levels to which more difficult."),
('ticTacToe','images/tictactoe.png',"Why can one artist never beat another artist at tic tac toe? They always end up drawing"),
('hangman','images/hangman.png',"Words don't hurt you, huh?"),
('battleship','images/battleship.png',"You missed! You hit me! You sunk me!"),
('mathquiz', 'images/mathquiz.png', "Two plus two is four minus one that's three quick maths"),
('connectFour', 'images/connectfour.png',"The winner is the first to line up four disks with a common factor.");
commit;
