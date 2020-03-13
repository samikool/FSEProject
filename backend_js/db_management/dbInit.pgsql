DROP TABLE users, requesters, items, Donors, donations, requests, disasters;

CREATE TABLE Users (
  User_ID SERIAL UNIQUE PRIMARY KEY NOT NULL,
  First_Name varchar(255) NOT NULL,
  Last_Name varchar(255) NOT NULL,
  Email varchar(255) UNIQUE NOT NULL,
  Password varchar(255) NOT NULL,
  Location jsonb,
  isAdmin bool,
  token jsonb
);

CREATE TABLE Donors (
  User_ID SERIAL UNIQUE NOT NULL,
  Donor_ID SERIAL PRIMARY KEY NOT NULL
);

CREATE TABLE Items (
  Item_ID SERIAL PRIMARY KEY NOT NULL,
  Name varchar(255) NOT NULL,
  Type varchar(255) NOT NULL,
  Keywords jsonb
);

CREATE TABLE Disasters (
  Disaster_ID SERIAL PRIMARY KEY NOT NULL,
  Type varchar(255) NOT NULL,
  Name varchar(255) NOT NULL,
  Keywords jsonb,
  Location jsonb
);

CREATE TABLE Requesters (
  Requester_ID SERIAL PRIMARY KEY NOT NULL,
  User_ID SERIAL NOT NULL
);

CREATE TABLE Requests (
  Request_ID SERIAL PRIMARY KEY NOT NULL,
  Requester_ID SERIAL NOT NULL,
  Disaster_ID SERIAL NOT NULL,
  Item_ID SERIAL NOT NULL,
  Num_Needed integer NOT NULL,
  Num_Provided integer NOT NULL
);

CREATE TABLE Donations (
  Donation_ID SERIAL PRIMARY KEY NOT NULL,
  Disaster_ID SERIAL NOT NULL,
  Item_ID SERIAL NOT NULL,
  Quantity integer NOT NULL,
  Donor_ID SERIAL NOT NULL
);

ALTER TABLE Donors ADD FOREIGN KEY (User_ID) REFERENCES Users (User_ID);

ALTER TABLE Requesters ADD FOREIGN KEY (User_ID) REFERENCES Users (User_ID);

ALTER TABLE Requests ADD FOREIGN KEY (Requester_ID) REFERENCES Requesters (Requester_ID);

ALTER TABLE Requests ADD FOREIGN KEY (Disaster_ID) REFERENCES Disasters (Disaster_ID);

ALTER TABLE Requests ADD FOREIGN KEY (Item_ID) REFERENCES Items (Item_ID);

ALTER TABLE Donations ADD FOREIGN KEY (Disaster_ID) REFERENCES Disasters (Disaster_ID);

ALTER TABLE Donations ADD FOREIGN KEY (Item_ID) REFERENCES Items (Item_ID);

ALTER TABLE Donations ADD FOREIGN KEY (Donor_ID) REFERENCES Donors (Donor_ID);
