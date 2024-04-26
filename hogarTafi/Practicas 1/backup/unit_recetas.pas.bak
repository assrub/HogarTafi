unit unit_recetas;

{$mode ObjFPC}{$H+}

interface

uses
  Classes, SysUtils, Forms, Controls, Graphics, Dialogs, StdCtrls, ExtCtrls,
  tipoRegistros,unit_editar_paciente,unit_archivos,LazUtils;

const
  DIRECCION_PROYECTO = 'C:\Users\alebe\OneDrive\Escritorio\Practicas 1\';
type



  { Tform_recetas }

  Tform_recetas = class(TForm)
    btn_guardar: TButton;
    btn_volver: TButton;
    btn_cargar_imagen: TButton;
    img_receta_1: TImage;
    img_receta_2: TImage;
    img_receta_3: TImage;
    img_receta_4: TImage;
    img_receta_5: TImage;
    img_receta_6: TImage;
    img_receta_7: TImage;
    img_receta_8: TImage;
    img_receta_9: TImage;
    OD_imagen: TOpenDialog;
    procedure btn_cargar_imagenClick(Sender: TObject);
    procedure btn_guardarClick(Sender: TObject);
    procedure btn_volverClick(Sender: TObject);
    procedure FormClose(Sender: TObject; var CloseAction: TCloseAction);
    procedure FormCreate(Sender: TObject);
    procedure FormShow(Sender: TObject);
    procedure img_receta_1Click(Sender: TObject);
  private
         {procedure listarArchivos();  }
  public

        procedure recibirPaciente(paciente:TPaciente);
  end;

var
  form_recetas: Tform_recetas;
  paciente_global:TPaciente;
  arreglo_de_direcciones: array[0..8] of string;
implementation

{$R *.lfm}

procedure Tform_recetas.recibirPaciente(paciente:TPaciente);
begin
     paciente_global := paciente;
end;

procedure Tform_recetas.FormCreate(Sender: TObject);
begin

end;

procedure Tform_recetas.FormShow(Sender: TObject);
var
  ruta_carpeta_recetas:string;
  i:integer;
  paciente:Tpaciente;
  arreglo:array[0..8] of string;
  hayImagenes:boolean;
begin
      hayImagenes:=False;
     ruta_carpeta_recetas:= 'Pacientes/'+paciente_global.nombre+ ' '+paciente_global.apellido+'/Recetas';
      paciente:= paciente_global;
      arreglo := devolverRecetas(paciente);

      for i:=0 to Length(arreglo)-1 do
      begin
        if arreglo[i] <> '' then
           hayImagenes := True;
      end;

     if hayImagenes then
        begin
        try
             img_receta_1.Picture.LoadFromFile(arreglo[0]);
             img_receta_1.Hint:= arreglo[0];

             img_receta_2.Picture.LoadFromFile(arreglo[1]);
             img_receta_2.Hint:= arreglo[1];

             img_receta_3.Picture.LoadFromFile(arreglo[2]);
             img_receta_3.Hint:= arreglo[2];

             img_receta_4.Picture.LoadFromFile(arreglo[3]);
             img_receta_4.Hint:= arreglo[3];

             img_receta_5.Picture.LoadFromFile(arreglo[4]);
             img_receta_5.Hint:= arreglo[4];

             img_receta_6.Picture.LoadFromFile(arreglo[5]);
             img_receta_6.Hint:= arreglo[5];

             img_receta_7.Picture.LoadFromFile(arreglo[6]);
             img_receta_7.Hint:= arreglo[6];

             img_receta_8.Picture.LoadFromFile(arreglo[7]);
             img_receta_8.Hint:= arreglo[7];

             img_receta_9.Picture.LoadFromFile(arreglo[8]);
             img_receta_9.Hint:= arreglo[8];
             except

             end;

     end;
end;

procedure Tform_recetas.img_receta_1Click(Sender: TObject);
begin
  //Ve si la imagen esta cargada
  if Assigned(TImage(Sender).Picture.Graphic) then
  begin
       //La direccion de las imagenes se guardan en el atributo Hint, en el evento Show del formulario.
    if not (TImage(Sender).Hint = '') then
      begin
       ExecuteProcess('explorer', [DIRECCION_PROYECTO+'Pacientes\'+paciente_global.nombre+' '+paciente_global.apellido+'\Recetas\'], []);
      end;
  end;
end;



procedure Tform_recetas.btn_volverClick(Sender: TObject);
begin
  form_recetas.hide;
  Form_editar_paciente.Show;
  img_receta_1.Picture.Clear;
  img_receta_2.Picture.Clear;
  img_receta_3.Picture.Clear;
  img_receta_4.Picture.Clear;
  img_receta_5.Picture.Clear;
  img_receta_6.Picture.Clear;
  img_receta_7.Picture.Clear;
  img_receta_8.Picture.Clear;
  img_receta_9.Picture.Clear;
end;

procedure Tform_recetas.FormClose(Sender: TObject; var CloseAction: TCloseAction
  );
begin
  form_recetas.hide;
  Form_editar_paciente.Show;
end;

procedure Tform_recetas.btn_cargar_imagenClick(Sender: TObject);
begin

  //si se usa el Open Dialog
  //se ve cual de los 9 lugares de imagenes esta libre y pone la imagen ahi
  //si ya hay 9 imagenes muestra un cartel
  if OD_imagen.Execute then
  begin
     if not Assigned(img_receta_1.Picture.Graphic) then
     begin
        img_receta_1.Picture.LoadFromFile(OD_imagen.FileName);
        img_receta_1.Hint:=OD_imagen.FileName;
        arreglo_de_direcciones[0] := OD_imagen.FileName;
     end
     else
     if not Assigned(img_receta_2.Picture.Graphic) then
     begin
        img_receta_2.Picture.LoadFromFile(OD_imagen.FileName);
        img_receta_2.Hint:=OD_imagen.FileName;
        arreglo_de_direcciones[1] := OD_imagen.FileName;
     end
     else
      if not Assigned(img_receta_3.Picture.Graphic) then
      begin
        img_receta_3.Picture.LoadFromFile(OD_imagen.FileName);
        img_receta_3.Hint:=OD_imagen.FileName;
        arreglo_de_direcciones[2] := OD_imagen.FileName;
      end
     else
     if not Assigned(img_receta_4.Picture.Graphic) then
     begin
        img_receta_4.Picture.LoadFromFile(OD_imagen.FileName);
        img_receta_4.Hint:=OD_imagen.FileName;
        arreglo_de_direcciones[3] := OD_imagen.FileName;
     end
     else
     if not Assigned(img_receta_5.Picture.Graphic) then
     begin
        img_receta_5.Picture.LoadFromFile(OD_imagen.FileName);
        img_receta_5.Hint:=OD_imagen.FileName;
        arreglo_de_direcciones[4] := OD_imagen.FileName;
     end
     else
     if not Assigned(img_receta_6.Picture.Graphic) then
     begin
        img_receta_6.Picture.LoadFromFile(OD_imagen.FileName);
        img_receta_6.Hint:=OD_imagen.FileName;
        arreglo_de_direcciones[5] := OD_imagen.FileName;
     end
     else
     if not Assigned(img_receta_7.Picture.Graphic) then
     begin
        img_receta_7.Picture.LoadFromFile(OD_imagen.FileName);
        img_receta_7.Hint:=OD_imagen.FileName;
        arreglo_de_direcciones[6] := OD_imagen.FileName;
     end
     else
     if not Assigned(img_receta_8.Picture.Graphic) then
     begin
        img_receta_8.Picture.LoadFromFile(OD_imagen.FileName);
        img_receta_8.Hint:=OD_imagen.FileName;
        arreglo_de_direcciones[7] := OD_imagen.FileName;
     end
     else
     if not Assigned(img_receta_9.Picture.Graphic) then
     begin
        img_receta_9.Picture.LoadFromFile(OD_imagen.FileName);
        img_receta_9.Hint:=OD_imagen.FileName;
        arreglo_de_direcciones[8] := OD_imagen.FileName;
     end
     else
         ShowMessage('Ya se llego al limite de recetas.');
  end;
end;

procedure Tform_recetas.btn_guardarClick(Sender: TObject);
begin
   guardarRecetas(paciente_global,arreglo_de_direcciones);
end;

{procedure Tform_recetas.listarArchivos();
var ruta_paciente:string;
    i:integer;
    archivo:TSearchRec;

begin
  ruta_paciente:= ('Pacientes/'+paciente_global.nombre+ ' '+paciente_global.apellido+'/Recetas');
  if not DirectoryExists(ruta_paciente) then
    ForceDirectories(ruta_paciente);

  try
    if FindFirst(ruta_paciente+'/'+ '*.*', faAnyFile, archivo) = 0 then
       while FindNext(archivo) <> 0 do
       begin
            LB_archivos.AddItem(archivo.Name,nil);
       end;
  except
    end;
  end;  }



end.

