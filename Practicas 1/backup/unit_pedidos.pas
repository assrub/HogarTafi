unit unit_pedidos;

{$mode ObjFPC}{$H+}

interface

uses
  Classes, SysUtils, Forms, Controls, Graphics, Dialogs, StdCtrls, ExtCtrls,
  unit_archivos, LOVectoresMedicamentos,LOVectoresPacientes,LOVectoresStock;

type

  { Tform_pedidos }

  Tform_pedidos = class(TForm)
    btn_volver: TButton;
    Label1: TLabel;
    LB_pedido: TListBox;
    procedure btn_volverClick(Sender: TObject);
    procedure Button1Click(Sender: TObject);
    procedure FormShow(Sender: TObject);
  private

  public
   procedure buscarStockFaltante();

  end;

var
  form_pedidos: Tform_pedidos;


implementation

uses
  unit_formPrincipal;

{$R *.lfm}

{ Tform_pedidos }

procedure Tform_pedidos.FormShow(Sender: TObject);
begin
     LB_pedido.clear;
     buscarStockFaltante();
end;

procedure Tform_pedidos.btn_volverClick(Sender: TObject);
begin
 form_pedidos.Hide;
 MenuPrincipal.Show;
end;

procedure Tform_pedidos.Button1Click(Sender: TObject);
begin

end;

procedure Tform_pedidos.buscarStockFaltante();
var
  i,j:integer;
  faltante : integer;
  vectorPacientes_global:LOVectoresPacientes.tipoVector;
  ultimoPaciente_global:LOVectoresPacientes.tipoPosicion;
  vectorStock_global:tipoVectorStock;
  ultimoStock_global:LOVectoresStock.tipoPosicion;
begin
     LOVectoresPacientes.CrearEstVacia(vectorPacientes_global,ultimoPaciente_global);
     LOVectoresStock.CrearEstVacia(vectorStock_global,ultimoStock_global);
     todosLosPacientes(vectorPacientes_global,ultimoPaciente_global);
     for i:=1 to ultimoPaciente_global do
     begin
       faltante := 0;
       vectorStock_global := buscarStockPaciente(vectorPacientes_global[i],ultimoStock_global);
       LB_pedido.Items.Add(vectorPacientes_global[i].nombre + ' ' + vectorPacientes_global[i].apellido);
       for j:=1 to ultimoStock_global do
       begin
         if vectorStock_global[j].actual < vectorStock_global[j].aviso then
         begin
            faltante:=  vectorStock_global[j].cantidad - vectorStock_global[j].actual;
            LB_pedido.Items.Add('   *Faltan '+ IntToStr(faltante)+ ' '+ vectorStock_global[j].medicamento)
         end;
       end;
     end;
end;

end.

