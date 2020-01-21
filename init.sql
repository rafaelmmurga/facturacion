DROP TABLE usuarios;

CREATE TABLE usuarios (
    id serial,
    username text,
    password text
);

INSERT INTO usuarios (username, password)
VALUES  ('rafael', 'rafael2');

DROP TABLE facturas;

CREATE TABLE facturas (
    numerofactura text NOT NULL,
    cliente text,
    fechaemision date,
    fechaentrega date,
    fechapago date,
    monto numeric,
    formapago text,
    cheque text,
    recibo text,
    observaciones text
);

/*INSERT INTO facturas (numerofactura, cliente,fechaemision,fechaentrega,fechapago,monto,formapago,cheque,recibo,observaciones)
VALUES  ('1', 'rafael','2020-01-01','2020-01-01','2020-01-01',1000,'1','2','3','observaciones');*/