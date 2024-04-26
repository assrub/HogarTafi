unit unit_editar_paciente;

{$mode ObjFPC}{$H+}

interface

uses
  Classes, SysUtils, Forms, Controls, Graphics, Dialogs, StdCtrls, Grids,
  ExtCtrls, unit_archivos, tipoRegistros, LOVectoresMedicamentos,
  LOVectoresStock, LOVectoresPacientes;






type

  { TForm_editar_paciente }

  TForm_editar_paciente = class(TForm)
    btn_agregar_medicacion1: TButton;
    btn_buscar: TButton;
    btn_eliminar_medicacion1: TButton;
    btn_guardar: TButton;
    btn_volver: TButton;
    btn_recetas: TButton;
    btn_stock: TButton;
    btn_restar_medicacion: TButton;
    CB_medicamentos: TComboBox;
    CB_buscar: TComboBox;
    img_carnet: TImage;
    img_dni: TImage;
    Label2: TLabel;
    Label3: TLabel;
    Label4: TLabel;
    lbl_dni: TLabel;
    lbl_dni1: TLabel;
    lbl_dni2: TLabel;
    lbl_dni3: TLabel;
    lbl_dni4: TLabel;
    lbl_dni5: TLabel;
    lbl_dni6: TLabel;
    lbl_dni7: TLabel;
    lbl_dni8: TLabel;
    lbl_dni9: TLabel;
    SG_lista_medicamentos: TStringGrid;
    txt_2230: TEdit;
    txt_6: TEdit;
    txt_alm: TEdit;
    txt_apellido: TEdit;
    txt_buscar: TEdit;
    txt_cena: TEdit;
    txt_des: TEdit;
    txt_dni: TEdit;
    txt_mer: TEdit;
    txt_nombre: TEdit;
    txt_obra_social: TEdit;
    txt_observaciones: TEdit;
    procedure btn_agregar_medicacionClick(Sender: TObject);
    procedure btn_buscarClick(Sender: TObject);
    procedure btn_eliminar_medicacion1Click(Sender: TObject);
    procedure btn_guardarClick(Sender: TObject);
    procedure btn_restar_medicacionClick(Sender: TObject);
    procedure btn_stockClick(Sender: TObject);
    procedure btn_volverClick(Sender: TObject);
    procedure btn_recetasClick(Sender: TObject);
    procedure CB_buscarChange(Sender: TObject);
    procedure CB_buscarSelect(Sender: TObject);
    procedure FormClose(Sender: TObject; var CloseAction: TCloseAction);
    procedure FormCreate(Sender: TObject);
    procedure cargarListaMedicamentos(medicamentoRegistro:TCalendarioMedicamento);
    procedure FormShow(Sender: TObject);
    procedure txt_buscarChange(Sender: TObject);
    procedure txt_buscarEditingDone(Sender: TObject);
  private

  public
  procedure limpiarStringGrid();
  function valorValido(texto:string):boolean;
  procedure bloquearCampos();
  end;

var
  Form_editar_paciente: TForm_editar_paciente;
  paciente_global:Tpaciente;
  vectorMedicamentos_global:tipoVectorMedicamentos;
  ultimo_medicamentos_global:LOVectoresMedicamentos.tipoPosicion;
  vectorStock_global:tipoVectorStock;
  ultimoStock_global:LOVectoresStock.tipoPosicion;
  vectorPacientes:tipoVector;
  ultimoPacientes: LOVectoresPacientes.tipoPosicion;

implementation
 uses
   unit_formPrincipal,
   unit_recetas,
   unit_stock_paciente;

{$R *.lfm}

{ TForm_editar_paciente }

procedure TForm_editar_paciente.btn_agregar_medicacionClick(Sender: TObject);
var
  medicamento, seis, des, alm,mer, cena, diezYMedia, observaciones: string;
  fila: integer;
begin
  medicamento := AnsiString(CB_medicamentos.Text);
  seis := txt_6.Text;
  des := txt_des.Text;
  alm := txt_alm.Text;
  mer := txt_mer.Text;
  cena := txt_cena.Text;
  diezYMedia := txt_2230.Text;
  observaciones := txt_observaciones.Text;

  if (medicamento = AnsiString('')) then
    ShowMessage('Carga los medicamentos desde el menu "Stock"')
  else
  begin
    fila := 1;

    // Encuentra la primera fila vacía
    while (fila < SG_lista_medicamentos.RowCount) and (SG_lista_medicamentos.Cells[1, fila] <> '') do
      fila += 1;

    if fila < SG_lista_medicamentos.RowCount then
    begin
      // Agrega el nuevo registro en la primera fila vacía encontrada
      SG_lista_medicamentos.Cells[1, fila] := medicamento;
      SG_lista_medicamentos.Cells[2, fila] := seis;
      SG_lista_medicamentos.Cells[3, fila] := des;
      SG_lista_medicamentos.Cells[4, fila] := alm;
      SG_lista_medicamentos.Cells[5, fila] := mer;
      SG_lista_medicamentos.Cells[6, fila] := cena;
      SG_lista_medicamentos.Cells[7, fila] := diezYMedia;
      SG_lista_medicamentos.Cells[8, fila] := observaciones;
    end
    else
    begin
      // Si no se encontró una fila vacía, agrega una nueva fila
      fila := SG_lista_medicamentos.RowCount;
      SG_lista_medicamentos.RowCount := fila + 1; // Agrega una nueva fila
      SG_lista_medicamentos.Cells[1, fila] := medicamento;
      SG_lista_medicamentos.Cells[2, fila] := seis;
      SG_lista_medicamentos.Cells[3, fila] := des;
      SG_lista_medicamentos.Cells[4, fila] := alm;
      SG_lista_medicamentos.Cells[5, fila] := mer;
      SG_lista_medicamentos.Cells[6, fila] := cena;
      SG_lista_medicamentos.Cells[7, fila] := diezYMedia;
      SG_lista_medicamentos.Cells[8, fila] := observaciones;
    end;
  end;

  btn_guardarClick(btn_guardar);
end;


{ TForm_editar_paciente }

procedure TForm_editar_paciente.btn_buscarClick(Sender: TObject);
var dniPaciente:string;
    paciente:TPaciente;
    i:LOVectoresMedicamentos.tipoPosicion;
    fila:integer;
    vectorMedicamentos:tipoVectorMedicamentos;
    ultimo_medicamentos:LOVectoresMedicamentos.tipoPosicion;
    vectorStock:tipoVectorStock;
    ultimoStock:LOVectoresStock.tipoPosicion;

begin
     LOVectoresStock.CrearEstVacia(vectorStock,ultimoStock);
     LOVectoresMedicamentos.CrearEstVacia(vectorMedicamentos,ultimo_medicamentos);
     CB_medicamentos.Clear;
     dniPaciente := txt_buscar.Text;
     limpiarStringGrid();
     if dniPaciente = AnsiString('') then
        ShowMessage('Rellena el campo con el DNI del paciente')
     else
     begin
          paciente := buscarPaciente(dniPaciente);
          if paciente.dni = '' then
             ShowMessage('El DNI no esta registrado.')
          else
              with paciente do
                begin
                    txt_nombre.Text:= nombre;
                    txt_apellido.Text:=apellido;
                    txt_dni.Text := dni;
                    txt_obra_social.Text:=obra_social;
                end;
                    //Se vuelven a habilitar todos los campos y botones.
                    //Se puede editar todo menos el DNI,nombre y apellido.
                    img_carnet.Picture.Clear;
                    img_dni.Picture.Clear;
                    txt_obra_social.Enabled:=True;
                    txt_6.Enabled:=True;
                    txt_des.Enabled:=True;
                    txt_alm.Enabled:=True;
                    txt_mer.Enabled:=True;
                    txt_cena.Enabled:=True;
                    txt_2230.Enabled:=True;
                    txt_observaciones.Enabled:=True;
                    btn_agregar_medicacion1.Enabled:=True;
                    btn_eliminar_medicacion1.Enabled := True;
                    btn_guardar.Enabled:=True;
                    btn_recetas.Enabled:=True;
                    btn_stock.Enabled:=True;
                    btn_restar_medicacion.Enabled:=True;
                    CB_medicamentos.Enabled:=True;
                    CB_medicamentos.ReadOnly:=True;

                    //este try es porque los pacientes pueden o no tener fotos del DNI o carnet
                    try
                      img_carnet.Picture.LoadFromFile(devolverFotoDNI(paciente));
                      img_dni.Picture.LoadFromFile(devolverFotoCarnet(paciente));
                    except
                    end;

                   vectorMedicamentos := devolverMedicamentosPaciente(paciente.nombre,paciente.apellido,ultimo_medicamentos);
                   for i:=1 to ultimo_medicamentos do
                   begin
                        cargarListaMedicamentos(vectorMedicamentos[i]);
                   end;//for

                   vectorStock:= buscarStockPaciente(paciente,ultimoStock);
                   for i:=1 to ultimoStock do
                   begin
                        CB_medicamentos.Items.Add(vectorStock[i].medicamento);
                   end;

     end;

     paciente_global := paciente;
     vectorMedicamentos_global:= vectorMedicamentos;
     ultimo_medicamentos_global:=ultimo_medicamentos;
     vectorStock_global:= vectorStock;
     ultimoStock_global:=ultimoStock;
end;

procedure TForm_editar_paciente.btn_eliminar_medicacion1Click(Sender: TObject);
begin
  if SG_lista_medicamentos.Selection.Top <> -1 then
  begin
    SG_lista_medicamentos.DeleteRow(SG_lista_medicamentos.Selection.Top);
  end
  else
  begin
    ShowMessage('selecciona una fila para eliminar.');
  end;
    btn_guardarClick(btn_guardar);
end;

procedure TForm_editar_paciente.btn_guardarClick(Sender: TObject);
var paciente:TPaciente;
    archivo:textfile;
    nombre_archivo:string;
begin
    nombre_archivo := 'lista_de_pacientes.csv';
  with paciente do
    begin
     nombre := txt_nombre.Text;
     apellido := txt_apellido.Text;
     dni := txt_dni.Text;
     obra_social := txt_obra_social.Text;


   //Verifica que los campos que son obligatorios no esten vacios
   if (nombre = AnsiString('')) or (apellido = AnsiString('')) or (dni = AnsiString('')) or (obra_social = AnsiString('')) then
       ShowMessage('Rellena todos los campos')
   else
    begin

          ForceDirectories('Pacientes/'+nombre + ' '+apellido);
          guardarTabla(SG_lista_medicamentos,nombre,apellido,'Medicamentos_de_');
          //generar_perfil_PDF(nombre,apellido,dni,obra_social,img_ruta);
           //archivoListaPacientes(paciente);
    end;
    end;
  end;

procedure TForm_editar_paciente.btn_restar_medicacionClick(Sender: TObject);
begin
   restarStockActual(paciente_global,vectorMedicamentos_global,ultimo_medicamentos_global);
end;

procedure TForm_editar_paciente.btn_stockClick(Sender: TObject);
begin
  Form_editar_paciente.hide;
  Form_stock_paciente.recibirPaciente(paciente_global);
  Form_stock_paciente.show;
end;

procedure TForm_editar_paciente.cargarListaMedicamentos(medicamentoRegistro:TCalendarioMedicamento);
var
  fila: integer;
begin
    fila := 1;

    // Encuentra la primera fila vacía
    while (fila < SG_lista_medicamentos.RowCount) and (SG_lista_medicamentos.Cells[1, fila] <> '') do
      fila += 1;
    with medicamentoRegistro do
    begin
    if fila < SG_lista_medicamentos.RowCount then
    begin
      // Agrega el nuevo registro en la primera fila vacía encontrada
      SG_lista_medicamentos.Cells[1, fila] := medicamento;
      SG_lista_medicamentos.Cells[2, fila] := seis;
      SG_lista_medicamentos.Cells[3, fila] := des;
      SG_lista_medicamentos.Cells[4, fila] := alm;
      SG_lista_medicamentos.Cells[5, fila] := mer;
      SG_lista_medicamentos.Cells[6, fila] := cena;
      SG_lista_medicamentos.Cells[7, fila] := diezYMedia;
      SG_lista_medicamentos.Cells[8, fila] := observaciones;
    end
    else
    begin
      // Si no se encontró una fila vacía, agrega una nueva fila
      fila := SG_lista_medicamentos.RowCount;
      SG_lista_medicamentos.RowCount := fila + 1; // Agrega una nueva fila
      SG_lista_medicamentos.Cells[1, fila] := medicamento;
      SG_lista_medicamentos.Cells[2, fila] := seis;
      SG_lista_medicamentos.Cells[3, fila] := des;
      SG_lista_medicamentos.Cells[4, fila] := alm;
      SG_lista_medicamentos.Cells[5, fila] := mer;
      SG_lista_medicamentos.Cells[6, fila] := cena;
      SG_lista_medicamentos.Cells[7, fila] := diezYMedia;
      SG_lista_medicamentos.Cells[8, fila] := observaciones;
    end;
  end;
end;

procedure TForm_editar_paciente.FormShow(Sender: TObject);
var
  i:integer;
  ult:LOVectoresPacientes.tipoPosicion;
  vec:tipoVector;
begin
     CB_buscar.Clear;
     ultimoPacientes := LOVectoresPacientes.Min;
     LOVectoresPacientes.CrearEstVacia(vec,ult);
     todosLosPacientes(vec,ult);

     for i:=1 to ultimo do
     begin
          CB_buscar.Items.Add(vec[i].nombre +' '+ vec[i].apellido);
     end;

     vectorPacientes := vec;
     ultimoPacientes:=ult;
end;

procedure TForm_editar_paciente.txt_buscarChange(Sender: TObject);
begin
  if txt_buscar.text = '' then
  begin
        bloquearCampos();
        limpiarStringGrid();
  end;
end;

procedure TForm_editar_paciente.txt_buscarEditingDone(Sender: TObject);
begin

end;

procedure TForm_editar_paciente.bloquearCampos();
begin
  txt_nombre.Text:='';
  txt_apellido.Text := '';
  txt_dni.Text:='';
  txt_obra_social.Text:= '';

  txt_obra_social.Enabled:=False;
  txt_6.Enabled:=False;
  txt_des.Enabled:=False;
  txt_alm.Enabled:=False;
  txt_mer.Enabled:=False;
  txt_cena.Enabled:=False;
  txt_2230.Enabled:=False;
  txt_observaciones.Enabled:=False;



  btn_agregar_medicacion1.Enabled:=False;
  btn_eliminar_medicacion1.Enabled := False;
  btn_guardar.Enabled:=False;
  btn_recetas.Enabled:=False;
  btn_stock.Enabled:=False;
  btn_restar_medicacion.Enabled:=False;
  CB_medicamentos.Enabled:=False;
end;

procedure TForm_editar_paciente.btn_volverClick(Sender: TObject);
begin
  MenuPrincipal.Show;
  Form_editar_paciente.hide;
end;

procedure TForm_editar_paciente.btn_recetasClick(Sender: TObject);
begin
  Form_editar_paciente.hide;
  form_recetas.recibirPaciente(paciente_global);
  form_recetas.show;
end;

procedure TForm_editar_paciente.CB_buscarChange(Sender: TObject);
begin
end;

procedure TForm_editar_paciente.CB_buscarSelect(Sender: TObject);
var
  i:integer;
  nombre,textoCB:string;
    ult:LOVectoresPacientes.tipoPosicion;
  vec:tipoVector;
begin
  vec:= vectorPacientes;
      ult := ultimoPacientes;
      textoCB := CB_buscar.Text;
   for i:=1 to ultimoPacientes do
    begin
    nombre := (vectorPacientes[i].nombre + ' '+vectorPacientes[i].apellido);
       if CB_buscar.Text = nombre then
          txt_buscar.Text := vectorPacientes[i].dni;
    end;
end;

procedure TForm_editar_paciente.FormClose(Sender: TObject;
  var CloseAction: TCloseAction);
begin
  MenuPrincipal.Show;
  Form_editar_paciente.hide;
end;

procedure TForm_editar_paciente.FormCreate(Sender: TObject);
begin
end;

procedure TForm_editar_paciente.limpiarStringGrid();
var
  i: Integer;
begin
  for i := SG_lista_medicamentos.RowCount - 1 downto 1 do
  SG_lista_medicamentos.Rows[i].Clear;
  SG_lista_medicamentos.RowCount := 2;

  if SG_lista_medicamentos.RowCount > 2 then
  begin
    for i := SG_lista_medicamentos.RowCount - 1 downto 1 do
      SG_lista_medicamentos.Rows[i].Clear;
    SG_lista_medicamentos.RowCount := 2;
  end;
end;

function TForm_editar_paciente.valorValido(texto:string):boolean;
var
  valor:double; //Double es como Real
begin
     valorValido := TryStrToFloat(texto,valor); //devuelve verdadero si lo que hay en texto se puede transformar a un numero
end;

end.

