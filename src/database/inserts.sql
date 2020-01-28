begin transaction;
INSERT INTO games(name, imageUrl) 
VALUES 
('snake','images/snake.png'),
('picturematch','images/picturematch.png'),
('tictactoe','images/tictactoe.png'),
('hangman','images/hangman.png'),
('battleship','images/battleship.png'),
('mathquiz', 'images/mathquiz.png'),
('connectfour', '');

INSERT INTO users(name, email, password) VALUES('chris', 'freq@gmail.com', 'password');
INSERT INTO users(name, email, password) VALUES('chris1', 'fre2q@gmail.com', 'password');
INSERT INTO users(name, email, password) VALUES('chris2', 'fre3q@gmail.com', 'password');
INSERT INTO users(name, email, password) VALUES('chris3', 'fre4q@gmail.com', 'password');
INSERT INTO users(name, email, password) VALUES('chris4', 'fr5eq@gmail.com', 'password');
INSERT INTO users(name, email, password) VALUES('chris5', 'f7req@gmail.com', 'password');
INSERT INTO users(name, email, password) VALUES('chris6', 'fr6eq@gmail.com', 'password');
INSERT INTO users(name, email, password) VALUES('chris7', 'fr2eq@gmail.com', 'password');
INSERT INTO users(name, email, password) VALUES('chris8', 'fr11eq@gmail.com', 'password');
INSERT INTO users(name, email, password) VALUES('chris9', 'fr23eq@gmail.com', 'password');
INSERT INTO users(name, email, password) VALUES('chris0', 'fr66eq@gmail.com', 'password');
INSERT INTO users(name, email, password) VALUES('chris11', 'fr557eq@gmail.com', 'password');
INSERT INTO users(name, email, password) VALUES('chris12', 'fr567eq@gmail.com', 'password');
INSERT INTO users(name, email, password) VALUES('chris122', 'fr223eq@gmail.com', 'password');
INSERT INTO users(name, email, password) VALUES('chris144', 'fre4234q@gmail.com', 'password');
INSERT INTO users(name, email, password) VALUES('chris15', 'fr64562eq@gmail.com', 'password');

INSERT INTO scores(userId,gameId,points) VALUES(1,1,1);
INSERT INTO scores(userId,gameId,points) VALUES(1,2,12);
INSERT INTO scores(userId,gameId,points) VALUES(4,3,14);
INSERT INTO scores(userId,gameId,points) VALUES(5,1,15);
INSERT INTO scores(userId,gameId,points) VALUES(2,5,11);
INSERT INTO scores(userId,gameId,points) VALUES(3,1,155);
INSERT INTO scores(userId,gameId,points) VALUES(2,1,8);
INSERT INTO scores(userId,gameId,points) VALUES(2,2,61);
INSERT INTO scores(userId,gameId,points) VALUES(2,1,41);
INSERT INTO scores(userId,gameId,points) VALUES(3,1,31);
INSERT INTO scores(userId,gameId,points) VALUES(1,2,12);
INSERT INTO scores(userId,gameId,points) VALUES(2,1,11);
INSERT INTO scores(userId,gameId,points) VALUES(5,2,71);
INSERT INTO scores(userId,gameId,points) VALUES(2,2,651);
INSERT INTO scores(userId,gameId,points) VALUES(1,1,51);
INSERT INTO scores(userId,gameId,points) VALUES(4,3,14);
INSERT INTO scores(userId,gameId,points) VALUES(6,1,154);
INSERT INTO scores(userId,gameId,points) VALUES(3,3,13);
INSERT INTO scores(userId,gameId,points) VALUES(1,1,521);
INSERT INTO scores(userId,gameId,points) VALUES(3,3,15);
INSERT INTO scores(userId,gameId,points) VALUES(4,1,551);
INSERT INTO scores(userId,gameId,points) VALUES(1,2,115);
commit;
