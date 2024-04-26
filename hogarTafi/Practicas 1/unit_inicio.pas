unit unit_inicio;

{$mode ObjFPC}{$H+}

interface

uses
  Classes, SysUtils, Forms, Controls, Graphics, Dialogs, StdCtrls,unit_archivos,
  tipoRegistros;

type

  { Tform_inicio }

  Tform_inicio = class(TForm)
    btn_inicio_sesion: TButton;
    btn_registro: TButton;
    Label1: TLabel;
    Label2: TLabel;
    Label3: TLabel;
    txt_usuario: TEdit;
    txt_contrasenia: TEdit;
    procedure btn_inicio_sesionClick(Sender: TObject);
    procedure btn_registroClick(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure FormMouseEnter(Sender: TObject);
    procedure FormShow(Sender: TObject);
  private

  public

  end;


var
  form_inicio: Tform_inicio;
   usuario_global:TUsuario;
implementation
  uses
    unit_formPrincipal;
{$R *.lfm}

{ Tform_inicio }

procedure Tform_inicio.btn_inicio_sesionClick(Sender: TObject);
var
   nombre:string;
   contra:string;
begin
  nombre:= txt_usuario.Text;
  contra := txt_contrasenia.Text;
  usuario_global := buscarUsuario(nombre);
  if (nombre = '') or (contra = '') then
     ShowMessage('Rellena todos los campos.')
  else
    begin
      if (nombre = usuario_global.usuario) and (contra = usuario_global.contrasenia) and (usuario_global.estado= 'confirmado') then
       begin
         form_inicio.hide;
         MenuPrincipal.recibirUsuario(usuario_global);
         MenuPrincipal.Show;
       end
     else
         ShowMessage('Usuario no registrado o pendiente de confirmacion.');
    end;
end;

procedure Tform_inicio.btn_registroClick(Sender: TObject);
var
   nombre:string;
   contra:string;
begin
  nombre:= txt_usuario.Text;
  contra := txt_contrasenia.Text;
  usuario_global := buscarUsuario(nombre);

  if (nombre = '') or (contra = '') then
     ShowMessage('Rellena todos lo campos')
  else
    begin
     if (nombre = usuario_global.usuario) and (contra = usuario_global.contrasenia) and (usuario_global.estado= 'pendiente') then
   begin
   ShowMessage('Tu usuario esta registrado pero esta pendiente de confirmacion');
   end
else
    begin
         if usuario_global.estado = 'confirmado' then
            showmessage('Tu usuario ya esta registrado y confirmado. Usa el boton de iniciar sesion.')
         else
           begin
              usuario_global.usuario := nombre;
              usuario_global.contrasenia := contra;
              usuario_global.estado := 'pendiente';
              agregarUsuarioPendiente(usuario_global);
              ShowMessage('Usuario registrado. Espera que el administrador lo confirme');
           end;
    end;
    end;
end;

procedure Tform_inicio.FormCreate(Sender: TObject);
begin
  if not FileExists('Usuarios.txt') then
     begin
       crearArchivoUsuarios();
     end;
end;

procedure Tform_inicio.FormMouseEnter(Sender: TObject);
begin

end;

procedure Tform_inicio.FormShow(Sender: TObject);
begin
 txt_contrasenia.Text := '';
 txt_usuario.Text := '';
 with usuario_global do
    begin
     usuario := '';
     contrasenia:= '';
     estado:= '';
    end;
 end;
end.

