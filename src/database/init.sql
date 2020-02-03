begin transaction;
CREATE TABLE users (
  id integer primary key autoincrement,
  name varchar(30) not null unique,
  email varchar(40) not null unique,
  password varchar(100) not null,
  lastScoreRecorded varchar(256)
);

CREATE TABLE games (
  id integer primary key autoincrement,
  name varchar(30) not null,
  imageUrl varchar(100) not null,
  description varchar(256)
);

CREATE TABLE scores (
  id integer primary key autoincrement,
  userId integer not null,
  gameId integer not null,
  points real,
  FOREIGN KEY(userId) REFERENCES user(id),
  FOREIGN KEY(gameId) REFERENCES game(id)
);

CREATE TABLE user_scores (
  id integer primary key autoincrement,
  snake_last_score integer,
  picturematch_last_score integer,
  tictactoe_last_score integer,
  hangman_last_score integer,
  battleship_last_score integer,
  mathquiz_last_score integer,
  connectfour_last_score integer
);
commit;
