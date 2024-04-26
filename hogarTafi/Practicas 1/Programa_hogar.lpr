program Programa_hogar;

{$mode objfpc}{$H+}

uses
  {$IFDEF UNIX}
  cthreads,
  {$ENDIF}
  {$IFDEF HASAMIGA}
  athreads,
  {$ENDIF}
  Interfaces, // this includes the LCL widgetset
  Forms, datetimectrls, unit_ingresar_paciente, unit_archivos, tipoRegistros,
  unit_formPrincipal, unit_editar_paciente, unit_recetas, unit_stock_paciente,
  LOVectoresStock, unit_pedidos, unit_inicio, unit_confirmaciones, LOVectoresUsuarios
  { you can add units after this };

{$R *.res}

begin
  RequireDerivedFormResource:=True;
  Application.Scaled:=True;
  Application.Initialize;
  Application.CreateForm(Tform_inicio, form_inicio);
  Application.CreateForm(TMenuPrincipal, MenuPrincipal);
  Application.CreateForm(Tform_ingresar_paciente, form_ingresar_paciente);
  Application.CreateForm(TForm_editar_paciente, Form_editar_paciente);
  Application.CreateForm(Tform_recetas, form_recetas);
  Application.CreateForm(TForm_stock_paciente, Form_stock_paciente);
  Application.CreateForm(Tform_pedidos, form_pedidos);
  Application.CreateForm(Tform_confirmaciones, form_confirmaciones);
  Application.Run;
end.

