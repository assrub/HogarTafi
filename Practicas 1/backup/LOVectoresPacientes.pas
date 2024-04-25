unit LOVectoresPacientes;

interface
uses
Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, ExtCtrls,tipoRegistros;
Const
  Min=1;
  Max=5;
Type
   tipoIndice=Min..Max;
   tipoElem= TPaciente;
   tipoVector=array[tipoindice]of tipoelem;
   tipoPosicion=Min-1..Max;

Procedure CrearEstVacia(var V:tipoVector; var ultimo:tipoPosicion );
Function VectorLLeno(V:tipoVector; ultimo:tipoPosicion):boolean;
Procedure Insertar(var V:tipoVector;var ultimo:tipoPosicion; elem:tipoElem);
Procedure Eliminar(var V:tipoVector; var ultimo:tipoPosicion; pos:tipoPosicion);
Function VectorVacio(V:tipoVector; ultimo:tipoPosicion):boolean;
Function Buscar(V:tipoVector;ultimo:tipoPosicion;elem:tipoElem; var pos:tipoPosicion):boolean;
Procedure Burbuja (var V:TipoVector; ultimo:tipoPosicion);
Function PrimerElemento( V:TipoVector; ultimo:tipoPosicion):tipoPosicion;
Function UltimoElemento( V:TipoVector; ultimo:tipoPosicion):tipoPosicion;
Function CapturarInfo( V:TipoVector; ultimo:tipoPosicion;pos:tipoPosicion):tipoElem;


implementation

Procedure CrearEstVacia(var V:tipoVector; var ultimo:tipoPosicion );
begin
    ultimo:=Min-1;
end; // CrearEstVacia

Function VectorLLeno(V:tipoVector; ultimo:tipoPosicion):boolean;
begin

    VectorLleno:=ultimo=Max;
end;


Procedure Insertar(var V:tipoVector;var ultimo:tipoPosicion; elem:tipoElem);
begin
   if not VectorLLeno(V,ultimo) then
   begin
    ultimo:=ultimo+1;
    V[ultimo]:=elem;
   end
   else
      showmessage('No hay mas espacio en la estructura');
end;//insertar

Function VectorVacio(V:tipoVector; ultimo:tipoPosicion):boolean;
begin
     VectorVacio:=ultimo=Min-1;
end;


Procedure Eliminar(var V:tipoVector; var ultimo:tipoPosicion; pos:tipoPosicion);
begin
  if not VectorVacio(V,ultimo) then
  begin
    V[pos]:=V[ultimo];
    ultimo:=ultimo-1;
  end
  else
    showmessage('Estructura Vacia');

end;//Eliminar

Function Buscar(V:tipoVector;ultimo:tipoPosicion;elem:tipoElem; var pos:tipoPosicion):boolean;
var
 encontrado:boolean;
 i:tipoPosicion;
begin
   i:=Min;
   pos:=Min-1;
   encontrado:=false;
   while not encontrado and (i<=ultimo)do
   begin
       if V[i].dni=elem.dni
       then
          begin
             encontrado:=true;
             pos:=i;
          end
       else
         i:=i+1;
   end;
   Buscar:=encontrado;
end;//Buscar



Procedure Burbuja (var V:TipoVector; ultimo:tipoPosicion);
var
  pasada,j:tipoPosicion;
  aux:tipoElem;
begin

  for pasada:=Min to ultimo-1 do
   for j:= Min to ultimo-pasada do
      if V[j].nombre>V[j+1].nombre
      then
        begin
            aux:=V[j];
            V[j]:=V[j+1];
            V[j+1]:=aux
        end;

end;//Burbuja

Function PrimerElemento( V:TipoVector; ultimo:tipoPosicion):tipoPosicion;
begin
       PrimerElemento:=Min;
end;//PrimerElemento

Function UltimoElemento( V:TipoVector; ultimo:tipoPosicion):tipoPosicion;
begin
     UltimoElemento:=ultimo;
end;

Function CapturarInfo( V:TipoVector; ultimo:tipoPosicion;pos:tipoPosicion):tipoElem;
begin
     CapturarInfo:=V[pos];
end;


end.

