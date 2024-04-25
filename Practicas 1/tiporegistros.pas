unit tipoRegistros;

{$mode ObjFPC}{$H+}

interface

uses
  Classes, SysUtils;

Type
  TPaciente = record
    nombre:string[20];
    apellido:string[20];
    dni:string[10];
    obra_social:string[30];
  end;

  TCalendarioMedicamento = record
    medicamento:string;
    seis:string;
    des:string;
    alm:string;
    mer:string;
    cena:string;
    diezYMedia:string;
    observaciones:string;
  end;


  TStock = record
    medicamento:string;
    cantidad:integer;
    actual:integer;
    aviso:integer;
  end;

  TUsuario = record
    usuario:string[20];
    contrasenia:string[20];
    estado:string[20];
  end;

implementation

end.

