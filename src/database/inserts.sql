begin transaction;
INSERT INTO games(name, imageUrl, description) 
VALUES 
('snake','images/snake.png',"test description lorem ipsum dolor sit amet n"),
('Picture Match','images/picturematch.png',"A game that will improve your memory and brain power. A board with several pairs of disordered images. You will have to find all the couples. No time limit and 14 levels to which more difficult."),
('tictactoe','images/tictactoe.png',"test description lorem ipsum dolor sit amet n"),
('hangman','images/hangman.png',"test description lorem ipsum dolor sit amet n"),
('battleship','images/battleship.png',"test description lorem ipsum dolor sit amet n"),
('mathquiz', 'images/mathquiz.png', "Two plus two is four minus one that's three quick maths"),
('connectfour', 'images/connectfour.png',"test description lorem ipsum dolor sit amet n");
commit;
