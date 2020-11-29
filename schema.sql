drop database if exists employee_db;

create database employee_db;

use employee_db;

create table department (
	id int auto_increment not null,
    name varchar(30) not null,
    primary key (id)
);

create table role (
	id int auto_increment not null,
    title varchar(30) not null,
    salary decimal(10,2) not null,
    department_id int not null,
    primary key (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

create table employee (
	id int auto_increment not null,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id int not null,
    primary key (id),
    -- FOREIGN KEY (role_id) REFERENCES role(id)
);

insert into employee (first_name, last_name) values ("Gavin", "O'Brien"); 

select * from department;
select * from role;
select * from employee;