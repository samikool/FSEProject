CREATE TABLE "Users" (
	"User_ID" serial(255) NOT NULL UNIQUE,
	"First_Name" varchar(255) NOT NULL,
	"Last_Name" varchar(255) NOT NULL,
	"Email" varchar(255) NOT NULL,
	"Password" varchar(255) NOT NULL,
    "Location" jsonb,
	-- "Address_Line1" varchar(255) NOT NULL,
	-- "Address_Line2" varchar(255) NOT NULL,
	-- "Zipcode" varchar(255) NOT NULL,
	-- "Country" varchar(255) NOT NULL,
	-- "State" varchar(255) NOT NULL,
	CONSTRAINT "Users_pk" PRIMARY KEY ("User_ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Donors" (
	"User_ID" serial(255) NOT NULL UNIQUE,
	"Donor_ID" serial(255) NOT NULL,
	CONSTRAINT "Donors_pk" PRIMARY KEY ("Donor_ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Items" (
	"Item_ID" serial(255) NOT NULL,
	"Name" varchar(255) NOT NULL,
	"Type" varchar(255) NOT NULL,
	"Keywords" jsonb,
	CONSTRAINT "Items_pk" PRIMARY KEY ("Item_ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Disasters" (
	"Disaster_ID" serial NOT NULL,
	"Type" varchar(255) NOT NULL,
	"Name" varchar(255) NOT NULL,
	"Keywords" jsonb,
    "Location" jsonb,
	CONSTRAINT "Disasters_pk" PRIMARY KEY ("Disaster_ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Requesters" (
	"Requester_ID" integer NOT NULL,
	"User_ID" integer NOT NULL,
	CONSTRAINT "Requesters_pk" PRIMARY KEY ("Requester_ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Requests" (
	"Request_ID" serial(255) NOT NULL,
	"Requester_ID" integer NOT NULL,
	"Disaster_ID" integer(255) NOT NULL,
	"Item_ID" BINARY NOT NULL,
	"Num_Needed" integer NOT NULL,
	"Num_Provided" integer NOT NULL,
	CONSTRAINT "Requests_pk" PRIMARY KEY ("Request_ID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Donations" (
	"Donation_ID" serial NOT NULL,
	"Disaster_ID" integer NOT NULL,
	"Item_ID" integer NOT NULL,
	"Quantity" integer NOT NULL,
	"Donor_ID" integer NOT NULL,
	CONSTRAINT "Donations_pk" PRIMARY KEY ("Donation_ID")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Donors" ADD CONSTRAINT "Donors_fk0" FOREIGN KEY ("User_ID") REFERENCES "Users"("User_ID");



ALTER TABLE "Requesters" ADD CONSTRAINT "Requesters_fk0" FOREIGN KEY ("User_ID") REFERENCES "Users"("User_ID");

ALTER TABLE "Requests" ADD CONSTRAINT "Requests_fk0" FOREIGN KEY ("Requester_ID") REFERENCES "Requesters"("Requester_ID");
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_fk1" FOREIGN KEY ("Disaster_ID") REFERENCES "Disasters"("Disaster_ID");
ALTER TABLE "Requests" ADD CONSTRAINT "Requests_fk2" FOREIGN KEY ("Item_ID") REFERENCES "Items"("Item_ID");

ALTER TABLE "Donations" ADD CONSTRAINT "Donations_fk0" FOREIGN KEY ("Disaster_ID") REFERENCES "Disasters"("Disaster_ID");
ALTER TABLE "Donations" ADD CONSTRAINT "Donations_fk1" FOREIGN KEY ("Item_ID") REFERENCES "Items"("Item_ID");
ALTER TABLE "Donations" ADD CONSTRAINT "Donations_fk2" FOREIGN KEY ("Donor_ID") REFERENCES "Donors"("Donor_ID");
