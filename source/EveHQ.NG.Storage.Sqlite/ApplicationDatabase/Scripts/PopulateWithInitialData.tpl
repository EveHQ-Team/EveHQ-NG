insert into DatabaseMetaData(Key, Value) 
	values ('DatabaseVersion', '{DatabaseVersion}');

insert into Users(Id) 
	values ('{DefaultUserId}');

insert into MetaGameProfiles(Id, Name, UserId) 
	values ('{DefaultMetaGameProfileId}', '{DefaultProfileName}', '{DefaultUserId}');
