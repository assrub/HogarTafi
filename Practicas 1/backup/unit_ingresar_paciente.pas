unit unit_ingresar_paciente;

{$mode objfpc}{$H+}

interface

uses
  Classes, SysUtils, Forms, Controls, Graphics, Dialogs, StdCtrls, ExtCtrls,
  ColorBox, ComCtrls, CheckLst, Grids, DateTimePicker,unit_archivos,tipoRegistros;//PyScripter in 'python4delphi-master\Packages\Delphi\Delphi 10.3-';

type

  { Tform_ingresar_paciente }

  Tform_ingresar_paciente = class(TForm)
    btn_cargar_imagen_dni: TButton;
    btn_guardar: TButton;
    btn_volver: TButton;
    btn_cargar_imagen_carnet: TButton;
    img_carnet: TImage;
    lbl_imagen1: TLabel;
    img_dni: TImage;
    Label3: TLabel;
    lbl_dni: TLabel;
    lbl_dni1: TLabel;
    lbl_imagen: TLabel;
    OD_imagen: TOpenDialog;
    txt_obra_social: TEdit;
    txt_nombre: TEdit;
    txt_apellido: TEdit;
    txt_dni: TEdit;
    Label1: TLabel;
    Label2: TLabel;
    {procedure btn_buscarClick(Sender: TObject);  }
    procedure btn_cargar_imagen_carnetClick(Sender: TObject);
    procedure btn_cargar_imagen_dniClick(Sender: TObject);
    {procedure btn_eliminar_medicacionClick(Sender: TObject);}
    procedure btn_guardarClick(Sender: TObject);
    {procedure btn_agregar_medicacionClick(Sender: TObject);}
    procedure btn_volverClick(Sender: TObject);
    procedure FormClose(Sender: TObject; var CloseAction: TCloseAction);
    procedure FormCreate(Sender: TObject);
  private

  public

  end;

var
  form_ingresar_paciente: Tform_ingresar_paciente;
  ExitCode: LongInt; // para python
  img_ruta_carnet,img_ruta_dni:string[200];//ruta de la imagen


implementation

uses unit_formPrincipal;
{$R *.lfm}

{ Tform_ingresar_paciente }

procedure Tform_ingresar_paciente.btn_cargar_imagen_dniClick(Sender: TObject);
begin

  if OD_imagen.Execute then
  begin
     img_dni.Picture.LoadFromFile(OD_imagen.FileName);
     img_ruta_dni := OD_imagen.FileName;
  end;

end;

{procedure Tform_ingresar_paciente.btn_buscarClick(Sender: TObject);
var dniPaciente:string;
    paciente:TPaciente;
begin
     dniPaciente := txt_buscar.Text;
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
     end;
end;    }

procedure Tform_ingresar_paciente.btn_cargar_imagen_carnetClick(Sender: TObject);
begin
   if OD_imagen.Execute then
  begin
     img_carnet.Picture.LoadFromFile(OD_imagen.FileName);
     img_ruta_carnet := OD_imagen.FileName;
  end;
end;

{procedure Tform_ingresar_paciente.btn_eliminar_medicacionClick(Sender: TObject);
begin
  if SG_lista_medicamentos.Selection.Top <> -1 then
  begin
    SG_lista_medicamentos.DeleteRow(SG_lista_medicamentos.Selection.Top);
  end
  else
  begin
    ShowMessage('selecciona una fila para eliminar.');
  end;
end; }

procedure Tform_ingresar_paciente.btn_guardarClick(Sender: TObject);
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
      if buscarDni(dni) = true then
         ShowMessage('El DNI ya esta registrado')
      else
       begin
          {SG_lista_medicamentos.Cells[1,0] := SG_lista_medicamentos.Cells[1,0] + DateToStr(Date); }
          ForceDirectories('Pacientes/'+nombre + ' '+apellido);
          {guardarTabla(SG_lista_medicamentos,nombre,apellido,'Medicamentos_de_');}
          //generar_perfil_PDF(nombre,apellido,dni,obra_social,img_ruta);
           archivoListaPacientes(paciente);
           guardar_imagenes_DNI_y_carnet(img_ruta_dni,img_ruta_carnet,paciente);
           crearCarpetaRecetas(paciente);
           crearArchivoVacio('Pacientes\' + nombre + ' ' + apellido + '\'+'Medicamentos_necesarios_de_'+ nombre + '_' + apellido + '.csv');
           crearArchivoVacio('Pacientes\' + nombre + ' ' + apellido + '\'+'\Medicamentos_de_'+nombre+'_'+apellido+'.csv');
           txt_nombre.Text := '';
           txt_apellido.Text := '';
           txt_dni.Text := '';
           txt_obra_social.Text:='';
           img_carnet.Picture.Clear;
           img_dni.Picture.Clear;
           img_ruta_carnet:= '';
           img_ruta_dni:='';
       end;
      end;
       end;
    end;

{procedure Tform_ingresar_paciente.btn_agregar_medicacionClick(Sender: TObject);
var
  medicamento, seis, des, alm,mer, cena, diezYMedia, observaciones: string;
  fila: integer;
begin
  medicamento := AnsiString(txt_medicamento.Text);
  seis := txt_6.Text;
  des := txt_des.Text;
  alm := txt_alm.Text;
  mer := txt_mer.Text;
  cena := txt_cena.Text;
  diezYMedia := txt_2230.Text;
  observaciones := txt_observaciones.Text;

  if (medicamento = AnsiString('')) then
    ShowMessage('Rellena el campo "Medicamento"')
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
end;     }

procedure Tform_ingresar_paciente.btn_volverClick(Sender: TObject);
begin
   MenuPrincipal.Show;
  form_ingresar_paciente.hide;
end;

//Cerrar el programa entero.
procedure Tform_ingresar_paciente.FormClose(Sender: TObject;
  var CloseAction: TCloseAction);
begin
  MenuPrincipal.Show;
  form_ingresar_paciente.hide;

end;

//Evento para cuando se crea el formulario
procedure Tform_ingresar_paciente.FormCreate(Sender: TObject);
begin
  {SG_lista_medicamentos.Cells[1,0] := SG_lista_medicamentos.Cells[1,0] + DateToStr(Date); }

end;

end.

