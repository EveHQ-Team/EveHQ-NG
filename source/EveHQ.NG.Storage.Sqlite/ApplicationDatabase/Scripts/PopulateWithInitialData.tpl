insert into DatabaseMetaData(Key, Value) 
	values ('DatabaseVersion', '{DatabaseVersion}');

insert into Users(Id, Name) 
	values ('{DefaultUserId}', '<Change name>');

insert into MetaGameProfiles(Id, Name, UserId) 
	values ('{DefaultMetaGameProfileId}', '{DefaultProfileName}', '{DefaultUserId}');
