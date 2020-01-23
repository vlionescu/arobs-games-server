begin transaction;
CREATE TABLE users (
  id integer primary key autoincrement,
  name varchar(30) not null unique,
  email varchar(40) not null unique,
  password varchar(100) not null
);

CREATE TABLE games (
  id integer primary key autoincrement,
  name varchar(30) not null,
  imageUrl varchar(100) not null
);

CREATE TABLE scores (
  id integer primary key autoincrement,
  userId integer not null,
  gameId integer not null,
  points real,
  FOREIGN KEY(userId) REFERENCES user(id),
  FOREIGN KEY(gameId) REFERENCES game(id)
);
commit;
