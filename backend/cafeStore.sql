create database cafeStore;

create table information (
	phone varchar(15),
    email varchar(100),
    timeOpen time,
    timeClose time,
    banner varchar(100),
    address varchar(100),
    imageId int,
    id int primary key
);

create table image(
	id int auto_increment primary key,
    image blob
);

create table admin(
	username varchar(100) primary key,
    `password` varchar(100),
    email varchar(100),
    `name` varchar(100), 
    avt int references image(id)
);

create table drink(
	id int primary key auto_increment,
    `name` varchar(100),
    price int,
    `description` varchar(500),
    imageId int references image(id)
);

create table staff (
	username varchar(100) primary key,
    `password` varchar(100),
    email varchar(100),
    `name` varchar(100), 
    avt int references image(id),
    birthday date, 
    address varchar(100),
    phone varchar(15)
);

create table orderOff (
    id int auto_increment primary key,
    `time` datetime,
    phone varchar(15),
    staffUsername varchar(100) references staff(username),
    voucher varchar(100) references voucher(code)
);

create table `order` (
    id int auto_increment primary key,
    username varchar(100) references user(username),
    `statement` int,
    totalFee int,
    `time` datetime,
    timeStart datetime,
    transportFee int,
    timeComplete datetime,
    feedback varchar(255),
    `star` int,
    staffUsername varchar(100) references staff(username),
    voucher varchar(100) references voucher(code) 
);

create table drinkIds (
    orderId int references order(id),
    drinkId int references drink(id),
    CONSTRAINT drinkIdsPK primary key (orderId, drinkId)
);

create table voucher (
    `code` varchar(100) primary key,
    percent int,
    phoneNumberUsed varchar(15)
);

create table `user` (
    username varchar(100) primary key,
    `password` varchar (100) not null,
    email varchar(100),
    `name` varchar (100),
    avt blob,
    birthday date,
    phone varchar(15),
    `point` float default 0
);

create table address (
    username varchar(100) references user(username),
    `address` varchar(100),
    CONSTRAINT addressPK primary key (username, `address`)
);