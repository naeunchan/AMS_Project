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
	FID integer primary key auto_increment,
    name text not null,
    version text not null,
    password text not null,
    description text not null,
    PID integer not null,
    path integer not null,
    download_link text not null,
    count integer default 0,
    created_at datetime default NOW(),
    updated_at datetime default NOW(),
    foreign key (PID) references USER(PID));
    
create table COWORKER(
	PID integer,
    FID integer,
    primary key(PID, FID)
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

insert USER values(20214082, "a@bccard.com", "qwer1234", "나은찬", 1, "01012341234", "eden");
insert USER values(20214083, "b@bccard.com", "qwer1234", "강민주", 2, "01012331244", "");
insert USER values(20214084, "c@bccard.com", "qwer1234", "양홍찬", 1, "01012341235", "kyle");
insert USER values(20214085, "d@bccard.com", "qwer1234", "임채은", 1, "01012341232", "luca");
insert USER values(20214086, "e@bccard.com", "qwer1234", "이진욱", 3, "01012341211", "messi");
insert USER values(20214087, "f@bccard.com", "qwer1234", "김별", 2, "01012323234", "");
insert USER values(20214088, "g@bccard.com", "qwer1234", "강달", 4, "01012344234", "");
insert USER values(20214089, "h@bccard.com", "qwer1234", "윤다정", 5, "01012551234", "jennie");
insert USER values(20214012, "i@bccard.com", "qwer1234", "윤하", 5, "01012365234", "");
insert USER values(20214032, "j@bccard.com", "qwer1234", "이혜리", 6, "010123121234", "good");

select * from TEAM;
select TEAM.name, TEAM.TID, USER.PID, USER.name from TEAM, USER where TEAM.TID = USER.TID;
select * from USER;
select * from FILE;
select * from COWORKER;
delete from TEAM;
delete from coworker;
delete from file where version != "0";

select * from FILE as F where F.PID = 20214082;
select * from FILE as F, COWORKER as C where F.FID = C.FID and C.PID = 20214082;