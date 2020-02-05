begin transaction;
INSERT INTO games(name, imageUrl) 
VALUES 
('snake','images/snake.png'),
('picturematch','images/picturematch.png'),
('tictactoe','images/tictactoe.png'),
('hangman','images/hangman.png'),
('battleship','images/battleship.png'),
('mathquiz', 'images/mathquiz.png'),
('connectfour', 'images/connectfour.png');
commit;
