CREATE database facecream;
USE  facecream;

CREATE TABLE cream (
idCream int auto_increment primary key,
tipe varchar (45) not null,
ingredients varchar (250) not null,
descr text (1000)
);

CREATE TABLE users (
idUser int auto_increment primary key,
nameUser  varchar (45) not null,
tipeSkin varchar (45) not null  
);
INSERT INTO cream (tipe,ingredients,descr) values ('dry skin', 'Manteca de Karité' 'Aloe Vera' 'Aceites Esenciales' 'Colágeno','Noralmente las pieles secas son consecuencia de la falta de nutrientes e hidratación');
INSERT INTO cream (tipe,ingredients,descr) values ('oil skin','Niacinamida' 'Aceite de arbol de te',' exceso de sebo que suele mostrarse en forma de zonas brillantes sobre las áreas centrales del rostro, especialmente en la frente y la nariz');
INSERT INTO cream (tipe,ingredients,descr) values ('sensit skin','Calendula' 'Centella asiatica', 'La piel sensible o intolerante es la piel que reacciona de una forma distinta a una piel normal, es decir, es hiperreactiv')


