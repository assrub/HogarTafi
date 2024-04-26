unit LOVectoresStock;

interface
uses
Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, ExtCtrls,tipoRegistros;
Const
  Min=1;
  Max=20;
Type
   tipoIndice=Min..Max;
   tipoElem= TStock;
   tipoVectorStock=array[tipoindice]of tipoelem;
   tipoPosicion=Min-1..Max;

Procedure CrearEstVacia(var V:tipoVectorStock; var ultimo:tipoPosicion );
Function VectorLLeno(V:tipoVectorStock; ultimo:tipoPosicion):boolean;
Procedure Insertar(var V:tipoVectorStock;var ultimo:tipoPosicion; elem:tipoElem);
Procedure Eliminar(var V:tipoVectorStock; var ultimo:tipoPosicion; pos:tipoPosicion);
Function VectorVacio(V:tipoVectorStock; ultimo:tipoPosicion):boolean;
Function PrimerElemento( V:tipoVectorStock; ultimo:tipoPosicion):tipoPosicion;
Function UltimoElemento( V:tipoVectorStock; ultimo:tipoPosicion):tipoPosicion;
Function CapturarInfo( V:tipoVectorStock; ultimo:tipoPosicion;pos:tipoPosicion):tipoElem;


implementation

Procedure CrearEstVacia(var V:tipoVectorStock; var ultimo:tipoPosicion );
begin
    ultimo:=Min;
    //-1;
end; // CrearEstVacia

Function VectorLLeno(V:tipoVectorStock; ultimo:tipoPosicion):boolean;
begin

    VectorLleno:=ultimo=Max;
end;


Procedure Insertar(var V:tipoVectorStock;var ultimo:tipoPosicion; elem:tipoElem);
begin
   if not VectorLLeno(V,ultimo) then
   begin
    ultimo:=ultimo+1;
    V[ultimo]:=elem;
   end
   else
      showmessage('No hay mas espacio en la estructura');
end;//insertar

Function VectorVacio(V:tipoVectorStock; ultimo:tipoPosicion):boolean;
begin
     VectorVacio:=ultimo=Min-1;
end;


Procedure Eliminar(var V:tipoVectorStock; var ultimo:tipoPosicion; pos:tipoPosicion);
begin
  if not VectorVacio(V,ultimo) then
  begin
    V[pos]:=V[ultimo];
    ultimo:=ultimo-1;
  end
  else
    showmessage('Estructura Vacia');

end;//Eliminar



Function PrimerElemento( V:tipoVectorStock; ultimo:tipoPosicion):tipoPosicion;
begin
       PrimerElemento:=Min;
end;//PrimerElemento

Function UltimoElemento( V:tipoVectorStock; ultimo:tipoPosicion):tipoPosicion;
begin
     UltimoElemento:=ultimo;
end;

Function CapturarInfo( V:tipoVectorStock; ultimo:tipoPosicion;pos:tipoPosicion):tipoElem;
begin
     CapturarInfo:=V[pos];
end;


end.

