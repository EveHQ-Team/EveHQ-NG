create table DatabaseMetaData(
	Key text primary key not null, 
	Value text not null, 
	ChangedOn default CURRENT_TIMESTAMP);

create table Configurations(
	Key primary key not null, 
	Content text not null, 
	ChangedOn default CURRENT_TIMESTAMP);

create table Users(
	Id text primary key not null, 
	Name text unique not null, 
	EmailAddress text, 
	ChangedOn default CURRENT_TIMESTAMP);

create table MetaGameProfiles(
	Id text primary key not null, 
	Name text unique not null, 
	UserId text not null, 
	ChangedOn default CURRENT_TIMESTAMP,
	foreign key(UserId) references Users(Id));
create index MetaGameProfilesUserId on MetaGameProfiles(UserId);

create table Characters(
	Id text primary key not null,
	Name text unique not null,
	UserId text not null,
	AccessToken text,
	RefreshToken text,
	Portrait64Uri text,
	Portrait128Uri text,
	Portrait256Uri text,
	Portrait512Uri text,
	ChangedOn default CURRENT_TIMESTAMP,
	foreign key(UserId) references Users(Id));
create index CharactersUserId on Characters(UserId);

create table MetaGameProfilesToCharacters(
	MetaGameProfileId text not null, 
	CharacterId text not null, 
	ChangedOn default CURRENT_TIMESTAMP,
	primary key(MetaGameProfileId, CharacterId),
	foreign key(MetaGameProfileId) references MetaGameProfiles(Id),
	foreign key(CharacterId) references Characters(Id));
