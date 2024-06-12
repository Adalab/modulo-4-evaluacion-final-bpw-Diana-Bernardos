CREATE database facecream;
USE facecream;

create table facecream (
idCream int auto_increment primary key,
tipe varchar (45) not null,
ingredient varchar (250) not null,
descr text (1000) not null
);

INSERT INTO facecream (tipe, ingredient, descr)
VALUES ('dry skin', 'manteca de karite, acido hialuronico, miel','La piel seca hace que la piel se vea y se sienta áspera, escamosa y con picazón');

INSERT INTO facecream (tipe, ingredient, descr)
VALUES ('oil skin', 'aceite de arbol de te , niacianmida', 'La piel grasa es causada por la sobreproducción de sebo por parte de las glándulas sebáceas de la piel. ¡Descubre como hacer una limpieza correcta!');

INSERT INTO facecream (tipe, ingredient, descr)
VALUES ('sensitive skin', 'calendula, centella asiatica','La piel sensible o intolerante es la piel que reacciona de una forma distinta a una piel normal, es decir, es hiperreactiva');
