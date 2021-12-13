create table USER(
	PID integer primary key,
	email text not null,
	password varchar(20) not null,
    name text not null,
    TID integer not null,
    phone varchar(20),
    nickname text,
    foreign key (TID) references TEAM(TID));
    
create table FILE(
	FILE_ID integer primary key auto_increment,
    name text not null,
    version text not null,
    deadline text not null,
    description text not null,
    author_PID integer not null,
    path integer not null,
    download_link text not null,
    count integer default 0,
    created_at datetime default NOW(),
    updated_at datetime default NOW(),
    foreign key (author_PID) references USER(PID));
    
create table COWORKER(
	PID integer,
    FILE_ID integer,
    primary key(PID, FILE_ID)
);

create table TEAM(
	TID integer primary key,
    name text not null
);

insert TEAM values(1, "페이북개발팀");
insert TEAM values(2, "페이북회원팀");
insert TEAM values(3, "페이북결제팀");
insert TEAM values(4, "페이북채널팀");
insert TEAM values(5, "마이데이터개발팀");
insert TEAM values(6, "CB사업팀");

select * from TEAM;
select TEAM.name, TEAM.TID, USER.PID, USER.name from TEAM, USER where TEAM.TID = USER.TID;
select * from USER;
select * from FILE;
delete from TEAM;