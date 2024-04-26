unit unit_confirmaciones;

{$mode ObjFPC}{$H+}

interface

uses
  Classes, SysUtils, Forms, Controls, Graphics, Dialogs, ValEdit, Grids,
  StdCtrls,LOVectoresUsuarios,tipoRegistros,unit_archivos;

type

  { Tform_confirmaciones }

  Tform_confirmaciones = class(TForm)
    btn_confirmar: TButton;
    Label1: TLabel;
    SG_confirmaciones: TStringGrid;
    procedure btn_confirmarClick(Sender: TObject);
    procedure FormClose(Sender: TObject; var CloseAction: TCloseAction);
    procedure FormShow(Sender: TObject);
    procedure SG_confirmacionesShowHint(Sender: TObject; HintInfo: PHintInfo);
  private

  public
  procedure guardarUsuario();
  procedure cargarStringGrid();
  end;

var
  form_confirmaciones: Tform_confirmaciones;

implementation

uses
  unit_formPrincipal;

{$R *.lfm}

{ Tform_confirmaciones }

procedure Tform_confirmaciones.SG_confirmacionesShowHint(Sender: TObject; HintInfo: PHintInfo);
begin

end;

procedure Tform_confirmaciones.FormShow(Sender: TObject);
begin
    cargarStringGrid();
end;


procedure Tform_confirmaciones.cargarStringGrid();
var
  fila,i: integer;
  vectorUsuarios:tipoVectorUsuario;
  ultimo: LOVectoresUsuarios.tipoPosicion;
begin
   SG_confirmaciones.Clear;
   fila := 1;
    LOVectoresUsuarios.CrearEstVacia(vectorUsuarios,ultimo);
    devolverUsuarios(vectorUsuarios,ultimo);

    for i:= 1 to ultimo do
    begin

      // Encuentra la primera fila vacía
        while (fila < SG_confirmaciones.RowCount) and (SG_confirmaciones.Cells[1, fila] <> '') do

          fila += 1;
        with vectorUsuarios[i] do
        begin
        if fila < SG_confirmaciones.RowCount then
        begin
          // Agrega el nuevo registro en la primera fila vacía encontrada
          SG_confirmaciones.Cells[1, fila] := usuario;
          SG_confirmaciones.Cells[2, fila] := estado;
        end
        else
        begin
          // Si no se encontró una fila vacía, agrega una nueva fila
          fila := SG_confirmaciones.RowCount;
          SG_confirmaciones.RowCount := fila + 1; // Agrega una nueva fila
          SG_confirmaciones.Cells[1, fila] := usuario;
          SG_confirmaciones.Cells[2, fila] := estado;
        end;
      end;

    end;// for

end;


procedure Tform_confirmaciones.FormClose(Sender: TObject;
  var CloseAction: TCloseAction);
begin
  form_confirmaciones.Hide;
  MenuPrincipal.Show;
end;

procedure Tform_confirmaciones.btn_confirmarClick(Sender: TObject);
var
  filaSeleccionada:integer;
  usuario:TUsuario;
begin
   filaSeleccionada := SG_confirmaciones.Selection.Top;
   with usuario do
    begin
         usuario:= SG_confirmaciones.Cells[1, filaSeleccionada];
         estado:= SG_confirmaciones.Cells[2, filaSeleccionada];
         contrasenia:= '';
    end;
   if usuario.estado = 'confirmado' then
      ShowMessage('El usuario '+usuario.usuario+' ya esta confirmado')
   else
     guardarUsuario();
     SG_confirmaciones.Clear;
     cargarStringGrid();
end;


procedure Tform_confirmaciones.guardarUsuario();
var
  vectorUsuarios:tipoVectorUsuario;
  ultimo:LOVectoresUsuarios.tipoPosicion;
  usuario:TUsuario;
  filaSeleccionada:integer;
begin
   LOVectoresUsuarios.CrearEstVacia(vectorUsuarios,ultimo);
    filaSeleccionada := SG_confirmaciones.Selection.Top;
    with usuario do
    begin
         usuario:= SG_confirmaciones.Cells[1, filaSeleccionada];
         estado:= SG_confirmaciones.Cells[2, filaSeleccionada];
         contrasenia:= '';
    end;
    guardarConfirmacionUsuarios(usuario);
end;

end.

