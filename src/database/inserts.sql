begin transaction;
INSERT INTO games(name, imageUrl, description) 
VALUES 
('snake','images/snake.png',"test description lorem ipsum dolor sit amet n"),
('picturematch','images/picturematch.png',"test description lorem ipsum dolor sit amet n"),
('tictactoe','images/tictactoe.png',"test description lorem ipsum dolor sit amet n"),
('hangman','images/hangman.png',"test description lorem ipsum dolor sit amet n"),
('battleship','images/battleship.png',"test description lorem ipsum dolor sit amet n"),
('mathquiz', 'images/mathquiz.png', "Two plus two is four minus one that's three quick maths"),
('connectfour', 'images/connectfour.png',"test description lorem ipsum dolor sit amet n");
commit;
