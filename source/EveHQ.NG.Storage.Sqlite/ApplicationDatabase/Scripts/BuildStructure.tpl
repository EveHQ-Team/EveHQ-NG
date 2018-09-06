create table DatabaseMetaData(
	Key primary key, 
	Value, 
	ChangedOn default CURRENT_TIMESTAMP);

create table Configurations(
	Key primary key, 
	Content, 
	ChangedOn default CURRENT_TIMESTAMP);

create table Users(
	Id primary key, 
	Name unique, 
	EmailAddress, 
	ChangedOn default CURRENT_TIMESTAMP);

create table MetaGameProfiles(
	Id primary key, 
	Name unique, 
	UserId, 
	ChangedOn default CURRENT_TIMESTAMP);

create table Characters(
	Id primary key,
	Name unique,
	UserId,
	AccessToken,
	RefreshToken,
	ChangedOn default CURRENT_TIMESTAMP);

create table MetaGameProfilesToCharacters(
	MetaGameProfileId, 
	CharacterId, 
	UserId, 
	ChangedOn default CURRENT_TIMESTAMP);
