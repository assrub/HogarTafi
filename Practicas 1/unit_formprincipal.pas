unit unit_formPrincipal;

{$mode ObjFPC}{$H+}

interface

uses
  Classes, SysUtils, Forms, Controls, Graphics, Dialogs, StdCtrls, Grids, Menus,
  tipoRegistros, unit_archivos, LOVectoresPacientes, unit_ingresar_paciente,unit_editar_paciente,
  unit_pedidos,unit_confirmaciones,unit_inicio;

type
  { TMenuPrincipal }
  TMenuPrincipal = class(TForm)
    btn_registrar_paciente: TButton;
    btn_eliminar_paciente: TButton;
    btn_editar: TButton;
    btn_salir: TButton;
    btn_pedido: TButton;
    btn_confirmaciones: TButton;
    btn_cerrar_sesion: TButton;
    Label1: TLabel;
    MainMenu1: TMainMenu;
    MenuItem1: TMenuItem;
    menu_cerrar_sesion: TMenuItem;
    MenuItem3: TMenuItem;
    SG_pacientes: TStringGrid;
    procedure btn_buscarClick(Sender: TObject);
    procedure btn_cerrar_sesionClick(Sender: TObject);
    procedure btn_confirmacionesClick(Sender: TObject);
    procedure btn_editarClick(Sender: TObject);
    procedure btn_eliminar_pacienteClick(Sender: TObject);
    procedure btn_pedidoClick(Sender: TObject);
    procedure btn_registrar_pacienteClick(Sender: TObject);
    procedure btn_salirClick(Sender: TObject);
    procedure FormClose(Sender: TObject; var CloseAction: TCloseAction);
    procedure FormCreate(Sender: TObject);
    procedure FormShow(Sender: TObject);
    procedure MenuItem1Click(Sender: TObject);
    procedure MenuItem3Click(Sender: TObject);
    procedure menu_cerrar_sesionClick(Sender: TObject);
  private
  public
    procedure cargarStringGrid;
    procedure limpiarStringGrid;
    procedure recibirUsuario(usuario:TUsuario);
  end;

var
  MenuPrincipal: TMenuPrincipal;
  vector: LOVectoresPacientes.tipoVector;
  ultimo: LOVectoresPacientes.tipoPosicion;
  paciente:TPaciente;
  usuario_global:TUsuario;

implementation

{$R *.lfm}

{ TMenuPrincipal }

procedure TMenuPrincipal.recibirUsuario(usuario:TUsuario);
begin
  usuario_global := usuario;
end;

procedure TMenuPrincipal.btn_buscarClick(Sender: TObject);
begin
  end;

procedure TMenuPrincipal.btn_cerrar_sesionClick(Sender: TObject);
begin
  with usuario_global do
    begin
     usuario := '';
     contrasenia:= '';
     estado:= '';
     end;
  MenuPrincipal.hide;
  form_inicio.Show;
end;

procedure TMenuPrincipal.btn_confirmacionesClick(Sender: TObject);
begin
  MenuPrincipal.Hide;
  form_confirmaciones.Show;
end;

procedure TMenuPrincipal.btn_editarClick(Sender: TObject);
begin
  MenuPrincipal.Hide;
  Form_editar_paciente.show;
end;

procedure TMenuPrincipal.btn_eliminar_pacienteClick(Sender: TObject);
var paciente:TPaciente;
    filaSeleccionada:integer;
    respuesta:integer;
begin
  with paciente do
  begin
     if SG_pacientes.Row >= 1 then
     begin
      filaSeleccionada:= SG_pacientes.Row;
      dni := SG_pacientes.Cells[1, filaSeleccionada];
      apellido :=   SG_pacientes.Cells[2, filaSeleccionada];
      nombre := SG_pacientes.Cells[3, filaSeleccionada];
      respuesta := MessageDlg('¿Seguro que queres elimnar a '+nombre+' '+apellido+'?', mtConfirmation, mbOKCancel, 0);
      if respuesta = mrOK then
      begin
        eliminarPaciente(dni);
        limpiarStringGrid();
        cargarStringGrid();
      end;
    end
  else
      ShowMessage('Selecciona al paciente que quieras eliminar.');

end;

end;

procedure TMenuPrincipal.btn_pedidoClick(Sender: TObject);
begin
  MenuPrincipal.Hide;
  form_pedidos.Show;
end;

procedure TMenuPrincipal.btn_registrar_pacienteClick(Sender: TObject);
begin
  MenuPrincipal.Hide;
  form_ingresar_paciente.show;
end;

procedure TMenuPrincipal.btn_salirClick(Sender: TObject);
begin
  Application.Terminate;
end;

procedure TMenuPrincipal.FormClose(Sender: TObject;
  var CloseAction: TCloseAction);
begin
      Application.Terminate;
end;

procedure TMenuPrincipal.cargarStringGrid();
var fila, i: integer;
begin

  try
  LOVectoresPacientes.CrearEstVacia(vector, ultimo);
  todosLosPacientes(vector, ultimo);

  fila := 0;
  i := 0;

  while (i <= ultimo) do
  begin
    with vector[i] do
    begin
      if fila < SG_pacientes.RowCount then
      begin
        SG_pacientes.Cells[1, fila] := dni;
        SG_pacientes.Cells[2, fila] := apellido;
        SG_pacientes.Cells[3, fila] := nombre;
        SG_pacientes.Cells[4, fila] := obra_social;
      end
      else
      begin
        // Si no se encontró una fila vacía, agrega una nueva fila
        fila := SG_pacientes.RowCount;
        SG_pacientes.RowCount := fila + 1;
        SG_pacientes.Cells[1, fila] := dni;
        SG_pacientes.Cells[2, fila] := apellido;
        SG_pacientes.Cells[3, fila] := nombre;
        SG_pacientes.Cells[4, fila] := obra_social;
      end;
    end;
    fila +=1;
    i+=1;
  end;
  if SG_pacientes.RowCount > ultimo + 1 then
    begin
      for i := SG_pacientes.RowCount - 1 downto ultimo + 1 do
        SG_pacientes.Rows[i].Clear;
      SG_pacientes.RowCount := ultimo + 1;
    end;
  except
    ShowMessage('Error al cargar la tabla');
  end;
end;

procedure TMenuPrincipal.limpiarStringGrid();
var
  i: Integer;
begin
  for i := SG_pacientes.RowCount - 1 downto 2 do
  SG_pacientes.Rows[i].Clear;
  SG_pacientes.RowCount := 2;

  if SG_pacientes.RowCount > 2 then
  begin
    for i := SG_pacientes.RowCount - 1 downto 2 do
      SG_pacientes.Rows[i].Clear;
    SG_pacientes.RowCount := 2;
  end;
end;

procedure TMenuPrincipal.FormCreate(Sender: TObject);
var
  vector: LOVectoresPacientes.tipoVector;
  ultimo: LOVectoresPacientes.tipoPosicion;
  fila, i: integer;
  archivo:TextFile;
  nombre_archivo:string;
begin
  nombre_archivo := 'lista_de_pacientes.csv';
  if not FileExists(nombre_archivo) then
  begin
    AssignFile(archivo, nombre_archivo);
    Rewrite(archivo);
    CloseFile(archivo);
  end;

  CrearEstVacia(vector, ultimo);
  todosLosPacientes(vector, ultimo);
  fila := 0;
  i := 0;
  while (i <= ultimo) do
  begin
    with vector[i] do
    begin
      if fila < SG_pacientes.RowCount then
      begin
        SG_pacientes.Cells[1, fila] := dni;
        SG_pacientes.Cells[2, fila] := apellido;
        SG_pacientes.Cells[3, fila] := nombre;
        SG_pacientes.Cells[4, fila] := obra_social;
      end
      else
      begin
        // Si no se encontró una fila vacía, agrega una nueva fila
        fila := SG_pacientes.RowCount;
        SG_pacientes.RowCount := fila + 1;
        SG_pacientes.Cells[1, fila] := dni;
        SG_pacientes.Cells[2, fila] := apellido;
        SG_pacientes.Cells[3, fila] := nombre;
        SG_pacientes.Cells[4, fila] := obra_social;
      end;
    end;
    fila +=1;
    i+=1;
  end;
end;

procedure TMenuPrincipal.FormShow(Sender: TObject);
begin
  if usuario_global.usuario <> unit_archivos.USUARIO_ADMIN then
     btn_confirmaciones.Enabled:= False;
  limpiarStringGrid();
  cargarStringGrid();
end;

procedure TMenuPrincipal.MenuItem1Click(Sender: TObject);
begin

end;

procedure TMenuPrincipal.MenuItem3Click(Sender: TObject);
begin
  btn_salirClick(btn_salir);
end;

procedure TMenuPrincipal.menu_cerrar_sesionClick(Sender: TObject);
begin
  btn_cerrar_sesionClick(btn_cerrar_sesion);
end;


end.

