unit unit_stock_paciente;

{$mode ObjFPC}{$H+}

interface

uses
  Classes, SysUtils, Forms, Controls, Graphics, Dialogs, StdCtrls, Grids,
  tipoRegistros,unit_archivos,LOVectoresStock;

type

  { TForm_stock_paciente }

  TForm_stock_paciente = class(TForm)
    btn_agregar_medicacion1: TButton;
    btn_eliminar_medicacion1: TButton;
    btn_volver: TButton;
    btn_cargar: TButton;
    btn_actualizar_stock: TButton;
    Label1: TLabel;
    Label2: TLabel;
    lbl_aviso: TLabel;
    lbl_actualizar_stock: TLabel;
    txt_actualizar_stock: TEdit;
    txt_aviso: TEdit;
    txt_medicacion: TEdit;
    lbl_nombre: TLabel;
    SG_stock: TStringGrid;
    txt_cantidad: TEdit;
    procedure btn_actualizar_stockClick(Sender: TObject);
    procedure btn_agregar_medicacion1Click(Sender: TObject);
    procedure btn_cargarClick(Sender: TObject);
    procedure btn_volverClick(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure FormHide(Sender: TObject);
    procedure FormShow(Sender: TObject);
    procedure lbl_nombreClick(Sender: TObject);
    procedure SG_stockEditingDone(Sender: TObject; col,fila:integer);
    procedure btn_eliminar_medicacion1Click(Sender: TObject);



  private

  public
    procedure limpiarStringGrid();
    function valorValido(texto:string):boolean;
    procedure recibirPaciente(paciente:TPaciente);
    procedure cargarListaStock(StockRegistro:TStock);

  end;



var
  Form_stock_paciente: TForm_stock_paciente;
  paciente_global:Tpaciente;
implementation

 uses
  unit_editar_paciente;


{$R *.lfm}

{ TForm_stock_paciente }

procedure TForm_stock_paciente.FormCreate(Sender: TObject);
begin

end;

procedure TForm_stock_paciente.FormHide(Sender: TObject);
begin
  limpiarStringGrid();
end;

procedure TForm_stock_paciente.btn_agregar_medicacion1Click(Sender: TObject);
  var
  medicamento,cantidad,aviso: string;
  fila: integer;
begin
  medicamento := AnsiString(txt_medicacion.Text);
  cantidad:= txt_cantidad.Text;
  aviso := txt_aviso.Text;

  if (medicamento = AnsiString('')) or (cantidad = AnsiString('')) or (aviso = AnsiString('')) then
    ShowMessage('Rellena los campos medicacion,cantidad y aviso')
  else
  begin
    fila := 1;

    // Encuentra la primera fila vacía
    while (fila < SG_stock.RowCount) and (SG_stock.Cells[1, fila] <> '') do
      fila += 1;

    if fila < SG_stock.RowCount then
    begin
      // Agrega el nuevo registro en la primera fila vacía encontrada
      SG_stock.Cells[1, fila] := medicamento;
      SG_stock.Cells[2, fila] := cantidad;
      SG_stock.Cells[3, fila] := cantidad;
      SG_stock.Cells[4, fila] := aviso;

    end
    else
    begin
      // Si no se encontró una fila vacía, agrega una nueva fila
      fila := SG_stock.RowCount;
      SG_stock.RowCount := fila + 1; // Agrega una nueva fila
      SG_stock.Cells[1, fila] := medicamento;
      SG_stock.Cells[2, fila] := cantidad;
      SG_stock.Cells[3, fila] := cantidad;
      SG_stock.Cells[4, fila] := aviso;
    end;
  end;

  btn_cargarClick(btn_cargar);
end;

procedure TForm_stock_paciente.btn_actualizar_stockClick(Sender: TObject);
var
fila_selec:integer;
begin
  if SG_stock.Selection.Top <> -1 then
  begin
    fila_selec := SG_stock.Selection.Top;
    SG_stock.Cells[3,fila_selec] := txt_actualizar_stock.Text;
  end
  else
  ShowMessage('Selecciona una fila');

    btn_cargarClick(btn_cargar);
    txt_actualizar_stock.Text:= '';
end;

procedure TForm_stock_paciente.btn_cargarClick(Sender: TObject);
begin
    guardarTabla(SG_stock,paciente_global.nombre,paciente_global.apellido,'Medicamentos_necesarios_de_');
end;

procedure TForm_stock_paciente.limpiarStringGrid();
 var
  i: Integer;
begin
  for i := SG_stock.RowCount - 1 downto 1 do
  SG_stock.Rows[i].Clear;
  SG_stock.RowCount := 2;

  if SG_stock.RowCount > 2 then
  begin
    for i := SG_stock.RowCount - 1 downto 1 do
      SG_stock.Rows[i].Clear;
    SG_stock.RowCount := 2;
  end;
end;

 procedure TForm_stock_paciente.btn_volverClick(Sender: TObject);
begin
  Form_stock_paciente.hide;
  Form_editar_paciente.show;
  Form_editar_paciente.btn_buscarClick(Form_editar_paciente.btn_buscar);
end;

 procedure TForm_stock_paciente.cargarListaStock(StockRegistro:TStock);
var
  fila: integer;
begin
    fila := 1;

    // Encuentra la primera fila vacía
    while (fila < SG_stock.RowCount) and (SG_stock.Cells[1, fila] <> '') do
      fila += 1;
    with StockRegistro do
    begin
    if fila < SG_stock.RowCount then
    begin
      // Agrega el nuevo registro en la primera fila vacía encontrada
      SG_stock.Cells[1, fila] := medicamento;
      SG_stock.Cells[2, fila] := inttostr(cantidad);
      SG_stock.Cells[3, fila] := inttostr(actual);
      SG_stock.Cells[4, fila] := inttostr(aviso);

    end
    else
    begin
      // Si no se encontró una fila vacía, agrega una nueva fila
      fila := SG_stock.RowCount;
      SG_stock.RowCount := fila + 1; // Agrega una nueva fila
      SG_stock.Cells[1, fila] := medicamento;
      SG_stock.Cells[2, fila] := inttostr(cantidad);
      SG_stock.Cells[3, fila] := inttostr(actual);
      SG_stock.Cells[4, fila] := inttostr(aviso);
    end;
  end;
end;

procedure TForm_stock_paciente.FormShow(Sender: TObject);
var vectorStock:tipoVectorStock;
    ultimo:LOVectoresStock.tipoPosicion;
    i:integer;
begin

     Form_stock_paciente.Caption:='Stock de '+paciente_global.nombre+' '+paciente_global.apellido;
     lbl_nombre.Caption:='Stock de '+paciente_global.nombre+' '+paciente_global.apellido;;
     lbl_nombre.Visible:=True;

     vectorStock := buscarStockPaciente(paciente_global,ultimo);
                   for i:=1 to ultimo do
                   begin
                        cargarListaStock(vectorStock[i]);
                   end;//for

end;

procedure TForm_stock_paciente.lbl_nombreClick(Sender: TObject);
begin

end;

//Deberia hacer que en la columna cantidad solamente se puegan ingresar numeros. No anda
procedure TForm_stock_paciente.SG_stockEditingDone(Sender: TObject; col,fila:integer);
var
 valorCelda: string;
 valorEnNumero: Real;
 esNumero: Boolean;
begin
  valorCelda := SG_stock.Cells[col, fila];

  esNumero := TryStrToFloat(valorCelda, valorEnNumero);

  if not esNumero then
  begin

    ShowMessage('Ingresa un numero.');
    SG_stock.Cells[col, fila] := '0';
  end;
end;

procedure TForm_stock_paciente.btn_eliminar_medicacion1Click(Sender: TObject);
begin
  if SG_stock.Selection.Top <> -1 then
  begin
    SG_stock.DeleteRow(SG_stock.Selection.Top);
  end
  else
  begin
    ShowMessage('selecciona una fila para eliminar.');
  end;
    btn_cargarClick(btn_cargar);
end;



 function TForm_stock_paciente.valorValido(texto:string):boolean;
var
  valor:double;
begin
     valorValido := TryStrToFloat(texto,valor);
end;

procedure TForm_stock_paciente.recibirPaciente(paciente:TPaciente);
begin
     paciente_global := paciente;
end;


end.

