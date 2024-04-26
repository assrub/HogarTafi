unit unit_archivos;

{$mode ObjFPC}{$H+}

interface

uses
Classes, SysUtils, Process, Grids,Dialogs,tipoRegistros,
LOVectoresPacientes,LOVectoresMedicamentos,FileUtil,LOVectoresStock,
LOVectoresUsuarios, SyncObjs, LazCanvas,Graphics;

const
  USUARIO_ADMIN = 'admin';
  CONTRASENIA_ADMIN = 'admin';
  ESTADO_ADMIN = 'confirmado';

type
  arregloDirecciones = array[0..8] of string;

procedure generar_perfil_PDF(nombre, apellido, dni, obra_social, img_ruta: string);
procedure guardarTabla(tabla: TStringGrid; nombre, apellido,nombreArchivo: string);
procedure archivoListaPacientes(paciente:TPaciente);
function buscarDni(dni:ansiString):boolean;
function buscarPaciente(dni:ansiString):TPaciente;
procedure todosLosPacientes(var vector:LOVectoresPacientes.tipoVector; var ultimo:LOVectoresPacientes.tipoPosicion);
procedure eliminarPaciente(dni:string);
function devolverMedicamentosPaciente(nombre,apellido:string; var ultimo:LOVectoresMedicamentos.tipoPosicion):tipoVectorMedicamentos;
procedure guardar_imagenes_DNI_y_carnet(ruta_dni,ruta_carnet:string; paciente:TPaciente);
procedure crearCarpetaRecetas(paciente:TPaciente);
function buscarStockPaciente(paciente:Tpaciente; var ultimo:LOVectoresStock.tipoPosicion):tipoVectorStock;
procedure crearArchivoVacio(ruta:string);
procedure rellenarConCeros(var vectorMedicamentos:tipoVectorMedicamentos; ultimo:tipoPOsicion);
procedure sacarCeros(var vectorMedicamentos:tipoVectorMedicamentos; ultimo:tipoPOsicion);
procedure restarStockActual(paciente:Tpaciente; medicamentos:tipoVectorMedicamentos; ultimoMedicamentos:tipoPosicion);
procedure guardarStock(paciente: TPaciente; vectorStock:tipoVectorStock; ultimoStock:tipoPosicion);
procedure crearArchivoUsuarios();
function buscarUsuario(usuario_param:ansiString):TUsuario;
procedure agregarUsuarioPendiente(usuario:TUsuario);
procedure devolverUsuarios(var vector:tipoVectorUsuario; var ultimo:LOVectoresUsuarios.tipoPosicion);
procedure guardarConfirmacionUsuarios(usuario_param:TUsuario);
function devolverFotoDNI(paciente:Tpaciente):string;
function devolverFotoCarnet(paciente:Tpaciente):string;
procedure guardarRecetas(paciente:Tpaciente; arreglo_direcciones:array of string);
function devolverRecetas(paciente:Tpaciente):arregloDirecciones;
procedure ConvertirAjpg(rutaEntrada, rutaDestino: string);

implementation



//Genera el perfil del paciente en un PDF (NO ANDAAAAAAAAA)
procedure generar_perfil_PDF(nombre, apellido, dni, obra_social, img_ruta: string);
begin
  try
    ExecuteProcess('python', ['generar_pdf.py', nombre, apellido, dni, obra_social, img_ruta], []);
  except
    on E: Exception do
      writeln('Excepción: ' + E.Message);
  end;
end;

procedure guardarTabla(tabla: TStringGrid; nombre, apellido,nombreArchivo: string);
var
  archivo: TextFile;
  i, j: Integer;
begin
  try
    AssignFile(archivo, 'Pacientes\' + nombre + ' ' + apellido + '\'+nombreArchivo + nombre + '_' + apellido + '.csv');
    Rewrite(archivo);

    for i := 0 to tabla.RowCount - 1 do
    begin
      for j := 1 to tabla.ColCount - 1 do
      begin
        Write(archivo, tabla.Cells[j, i]);
        if j < tabla.ColCount - 1 then
          Write(archivo, ',');
      end;
      Writeln(archivo);
    end;

    CloseFile(archivo);
  except
  end;
end;

procedure guardar_imagenes_DNI_y_carnet(ruta_dni,ruta_carnet:string; paciente:TPaciente);
var ruta_paciente:string;
begin
  ruta_paciente:= ('Pacientes/'+paciente.nombre+ ' '+paciente.apellido+'/DNI y Carnet');
  if not DirectoryExists(ruta_paciente) then
    ForceDirectories(ruta_paciente)
    else
    begin

      //CopyFile(ruta_dni, ruta_paciente+'/DNI.jfif');
      //CopyFile(ruta_carnet, ruta_paciente+'/Carnet.jfif');
      ConvertirAjpg(ruta_dni,ruta_paciente+'/DNI.jpg');
      ConvertirAjpg(ruta_carnet,ruta_paciente+'/Carnet.jpg');

    end;
end;

function devolverFotoDNI(paciente:Tpaciente):string;
var
  ruta_paciente:string;
  begin
    ruta_paciente:= ('Pacientes/'+paciente.nombre+ ' '+paciente.apellido+'/DNI y Carnet');
    try
      devolverFotoDNI := ruta_paciente + '/DNI.jpg';
    except
    end;
    end;

function devolverFotoCarnet(paciente:Tpaciente):string;
var
  ruta_paciente:string;
  begin
    ruta_paciente:= ('Pacientes/'+paciente.nombre+ ' '+paciente.apellido+'/DNI y Carnet');
    try
      devolverFotoCarnet := ruta_paciente + '/Carnet.jpg';
      except
        end;
    end;

procedure crearCarpetaRecetas(paciente:TPaciente);
var ruta_paciente:string;
begin
  ruta_paciente:= ('Pacientes/'+paciente.nombre+ ' '+paciente.apellido+'/Recetas');
  if not DirectoryExists(ruta_paciente) then
    ForceDirectories(ruta_paciente);
end;

//Registra al paciente en un archivo
procedure archivoListaPacientes(paciente: TPaciente);
var
  nombre_archivo: string;
  archivo: TextFile;
begin
  nombre_archivo := 'lista_de_pacientes.csv';
  AssignFile(archivo, nombre_archivo);
  try
    if FileExists(nombre_archivo) then
      Append(archivo)
    else
      Rewrite(archivo);
     except
  end;

    with paciente do
    begin
      // Guarda los datos mas basicos del paciente separados por coma (,)
      // Asi es mas facil buscar
      writeln(archivo, dni, ',', apellido, ',', nombre, ',', obra_social);
    end;

  Close(archivo);
end;

//Devuelve verdadero si el DNI esta registrado.
function buscarDni(dni:ansiString):boolean;
var archivo:textfile;
    linea:string[100];
    dni_aux:string[10];
    i:integer;
    resultado:boolean;
begin
    assign(archivo,'lista_de_pacientes.csv');
    reset(archivo);
    //Es como el return en otros lenguajes.
    resultado := False;
    while not eof(archivo) do
    begin
         //guarda una linea del archivo en la variable
         readln(archivo,linea);
         //busca hasta la primera coma, que es el simbolo que se usa para separa a los datos
         if Pos(',', linea) > 0 then
         begin
         // extrae el cacho antes de la primera coma
            dni_aux := Copy(linea, 1, Pos(',', linea) - 1);
         end;

         //si encuentra el DNI
         if dni = dni_aux then
            begin
            buscarDni:= True;
            Exit;
            end;
    end;

      buscarDNI := False;
      close(archivo);
end;

//Busca un paciente por su DNI y lo devuelve.
function buscarPaciente(dni:ansiString):TPaciente;
var archivo:textfile;
    linea:string[100];
    dni_aux:string[10];
    i:integer;
    paciente:TPaciente;
    nombre_archivo,nombre_copia:string;
begin
   nombre_archivo := 'lista_de_pacientes.csv';
  nombre_copia :=  'aux_lista_de_pacientes.csv';
  FileUtil.CopyFile(nombre_archivo, nombre_copia);
    with paciente do
          begin
            dni := '';
            linea := '';
            apellido := '';
            linea := '';
            nombre:='';
            linea := '';
            obra_social := '';
          end;

    assign(archivo,nombre_copia);
    reset(archivo);
    //Es como el return en otros lenguajes.
    while not eof(archivo) do
    begin
         //guarda una linea del archivo en la variable
         readln(archivo,linea);
         //busca hasta la primera coma, que es el simbolo que se usa para separa a los datos
         if Pos(',', linea) > 0 then
         begin
         // saca el cacho antes de la primera coma
            dni_aux := Copy(linea, 1, Pos(',', linea) - 1);
         end;

         //si encuentra el DNI
         if dni = dni_aux then
            begin
            with paciente do
            begin
              dni := Copy(linea, 1, Pos(',', linea) - 1);
              linea := Copy(linea, Pos(',', linea)+1, Length(linea));
              apellido := Copy(linea, 1, Pos(',', linea) - 1);
              linea := Copy(linea, Pos(',', linea)+1, Length(linea));
              nombre:=Copy(linea, 1, Pos(',', linea) - 1);
              linea := Copy(linea, Pos(',', linea)+1, Length(linea));
              obra_social := linea;
            end;
            close(archivo);
            DeleteFile(nombre_copia);
            buscarPaciente := paciente;
            Exit;
            end;
    end;
    close(archivo);
    DeleteFile(nombre_copia);
end;

//Devuelve un arreglo de todos los pacientes
procedure todosLosPacientes(var vector:LOVectoresPacientes.tipoVector; var ultimo:LOVectoresPacientes.tipoPosicion);
var archivo:textfile;
    linea:string[100];
    dni_aux:string[10];
    paciente:TPaciente;
    nombre_archivo, nombre_copia:string;

begin
  try
      nombre_archivo := 'lista_de_pacientes.csv';
      nombre_copia :=  'aux_lista_de_pacientes.csv';
      FileUtil.CopyFile(nombre_archivo, nombre_copia);
      if not FileExists(nombre_copia) then
      begin
        AssignFile(archivo, nombre_copia);
        Rewrite(archivo);
        CloseFile(archivo);
        assign(archivo,nombre_copia);
        reset(archivo);
        end
      else
      begin
           assign(archivo,nombre_copia);
           reset(archivo);
      end;

      while not eof(archivo) do
      begin
           //guarda una linea del archivo en la variable
           readln(archivo,linea);
           //busca hasta la primera coma, que es el simbolo que se usa para separa a los datos
           if Pos(',', linea) > 0 then
           begin
           with paciente do
              begin
                dni := Copy(linea, 1, Pos(',', linea) - 1);
                linea := Copy(linea, Pos(',', linea)+1, Length(linea));
                apellido := Copy(linea, 1, Pos(',', linea) - 1);
                linea := Copy(linea, Pos(',', linea)+1, Length(linea));
                nombre:=Copy(linea, 1, Pos(',', linea) - 1);
                linea := Copy(linea, Pos(',', linea)+1, Length(linea));
                obra_social := linea;
              end;
               LOVectoresPacientes.Insertar(vector,ultimo,paciente);
           end;
      end;
    finally
      CloseFile(archivo);
      DeleteFile(nombre_copia);
    end;
end;

//Elimina a un paciente.
procedure eliminarPaciente(dni: string);
var
  archivo,archivoAux: TextFile;
  nombre_archivo,nombre_archivo_aux, linea, dni_aux: string;
  paciente: TPaciente;
  vector: LOVectoresPacientes.tipoVector;
  ultimo: LOVectoresPacientes.tipoPosicion;
  i: integer;
begin

  LOVectoresPacientes.CrearEstVacia(vector, ultimo);
  nombre_archivo := 'lista_de_pacientes.csv';
  nombre_archivo_aux := 'aux_lista_de_pacientes.csv';
  assign(archivo, nombre_archivo);
  assign(archivoAux,nombre_archivo_aux);
  reset(archivo);
  rewrite(archivoAux);

  // Guarda todos los pacientes, menos el que se quiere eliminar, en un vector.
  while not eof(archivo) do
  begin
    readln(archivo, linea);

    if Pos(',', linea) > 0 then
    begin
      dni_aux := Copy(linea, 1, Pos(',', linea) - 1);
    end;

    // Si encuentra el DNI, saltea la linea
    if dni = dni_aux then
    begin
      continue;
    end;

     //se escribe los datos en el archivo auxiliar
     writeln(archivoAux, linea);

    with paciente do
    begin
      dni := AnsiString(Copy(linea, 1, Pos(',', linea) - 1));
      linea := AnsiString(Copy(linea, Pos(',', linea) + 1, Length(linea)));
      apellido := AnsiString(Copy(linea, 1, Pos(',', linea) - 1));
      linea := AnsiString(Copy(linea, Pos(',', linea) + 1, Length(linea)));
      nombre := AnsiString(Copy(linea, 1, Pos(',', linea) - 1));
      linea := AnsiString(Copy(linea, Pos(',', linea) + 1, Length(linea)));
      obra_social := linea;
    end;
    LOVectoresPacientes.Insertar(vector, ultimo, paciente);
  end;

  // Cerrar y reescribir el archivo

  close(archivo);
  close(archivoAux);
  //Borra el archivo original.
  DeleteFile(nombre_archivo);
  //Renombra el archivo auxiliar, con el paciente ya eliminado, con el nombre del archivo original.
  RenameFile(nombre_archivo_aux, nombre_archivo);

  {
  for i := 1 to ultimo do
      begin
    archivoListaPacientes(vector[i]);
  end;  }

end;

//devuelve los medicamentos de un paciente. (Medicamentos y horarios en los que lo tiene que tomar)
function devolverMedicamentosPaciente(nombre,apellido:string; var ultimo:LOVectoresMedicamentos.tipoPosicion):tipoVectorMedicamentos;
var archivo:TextFile;
  linea:string;
  medicamento:TCalendarioMedicamento;
  vector:tipoVectorMedicamentos;
begin
  try
      AssignFile(archivo, 'Pacientes\' + nombre + ' ' + apellido + '\medicamentos_de_' + nombre + '_' + apellido + '.csv');
      reset(archivo);
      readln(archivo,linea); //para saltear la primera linea (donde estan los titulos de las columnas)
       while not eof(archivo) do
       begin
         readln(archivo,linea);
         with medicamento do
         begin
            medicamento:= AnsiString(Copy(linea, 1, Pos(',', linea) - 1));
            linea := Copy(linea, Pos(',', linea)+1, Length(linea));
            seis:= AnsiString(Copy(linea, 1, Pos(',', linea) - 1));
            linea := Copy(linea, Pos(',', linea)+1, Length(linea));
            des:= AnsiString(Copy(linea, 1, Pos(',', linea) - 1));
            linea := Copy(linea, Pos(',', linea)+1, Length(linea));
            alm := AnsiString(Copy(linea, 1, Pos(',', linea) - 1));
            linea := Copy(linea, Pos(',', linea)+1, Length(linea));
            mer := AnsiString(Copy(linea, 1, Pos(',', linea) - 1));
            linea := Copy(linea, Pos(',', linea)+1, Length(linea));
            cena := AnsiString(Copy(linea, 1, Pos(',', linea) - 1));
            linea := Copy(linea, Pos(',', linea)+1, Length(linea));
            diezYMedia:= AnsiString(Copy(linea, 1, Pos(',', linea) - 1));
            linea := Copy(linea, Pos(',', linea)+1, Length(linea));
            observaciones:= AnsiString(linea);
         end;
         LOVectoresMedicamentos.Insertar(vector,ultimo,medicamento);
       end;
      close(archivo);
      devolverMedicamentosPaciente := vector;
  except
  end;
  end;

//devuelve el stock del paciente. (Medicamento, cantidad que necesita por mes y cantidad actual)
function buscarStockPaciente(paciente:Tpaciente; var ultimo:LOVectoresStock.tipoPosicion):tipoVectorStock;
var archivo:textfile;
    linea:string[100];
    stock:TStock;
    nombre_archivo:string;
    vectorStock:tipoVectorStock;

begin
         LOVectoresStock.CrearEstVacia(vectorStock,ultimo);
         nombre_archivo:='Pacientes\' + paciente.nombre + ' ' + paciente.apellido + '\'+'Medicamentos_necesarios_de_'+ paciente.nombre + '_' + paciente.apellido + '.csv';
      if not FileExists(nombre_archivo) then
      begin
        assign(archivo,nombre_archivo);
        Rewrite(archivo);
        CloseFile(archivo);
        assign(archivo,nombre_archivo);
        reset(archivo);
      end
      else
      begin
      assign(archivo,nombre_archivo);
      reset(archivo);
      end;

      readln(archivo,linea);
      while not eof(archivo) do
      begin
           //guarda una linea del archivo en la variable
           readln(archivo,linea);
           //busca hasta la primera coma, que es el simbolo que se usa para separa a los datos
           if Pos(',', linea) > 0 then
           begin
                with stock do
                begin
                   medicamento := Copy(linea, 1, Pos(',', linea) - 1);
                   linea := Copy(linea, Pos(',', linea)+1, Length(linea));
                   cantidad := strtoint(Copy(linea, 1, Pos(',', linea) - 1));
                   linea := Copy(linea, Pos(',', linea)+1, Length(linea));
                   actual:= strtoint(Copy(linea, 1, Pos(',', linea) - 1));
                   linea := Copy(linea, Pos(',', linea)+1, Length(linea));
                   aviso:= strtoint(linea);
                end;
                LOVectoresStock.Insertar(vectorStock,ultimo,stock);
           end;

      end;
      close(archivo);
      buscarStockPaciente := vectorStock;
end;

procedure crearArchivoVacio(ruta:string);
var archivo:TextFile;
begin
  assign(archivo, ruta);
  rewrite(archivo);
  close(archivo);
end;

procedure restarStockActual(paciente:Tpaciente; medicamentos:tipoVectorMedicamentos; ultimoMedicamentos:tipoPosicion);
var
    archivo:TextFile;
    vectorStock:tipoVectorStock;
    ultimoStock:LOVectoresStock.tipoPosicion;
    i,j,suma:integer;
    begin
        suma:=0;
       vectorStock := buscarStockPaciente(paciente,ultimoStock);
       rellenarConCeros(medicamentos,ultimoMedicamentos);
       for i:=1 to ultimoMedicamentos do
           begin
             suma:=0;
             for j := 1 to ultimoStock do
                 begin
                      if medicamentos[i].medicamento = vectorStock[j].medicamento then
                         begin
                          suma := strtoint(medicamentos[i].seis) + strtoint(medicamentos[i].des) + strtoint(medicamentos[i].alm) + strtoint(medicamentos[i].mer) + strtoint(medicamentos[i].cena) + strtoint(medicamentos[i].diezYMedia);
                           vectorStock[j].actual:= vectorStock[j].actual - suma;
                           if vectorStock[j].actual < 0 then
                             vectorStock[j].actual := 0
                         end;
                      end;
               end;
       sacarCeros(medicamentos,ultimoMedicamentos);
       guardarStock(paciente,vectorStock,ultimoStock);
    end;

procedure rellenarConCeros(var vectorMedicamentos:tipoVectorMedicamentos; ultimo:tipoPOsicion);
var i:integer;
begin
  for i:=1 to ultimo do
      begin
        if vectorMedicamentos[i].seis = '' then
            vectorMedicamentos[i].seis := '0';
        if vectorMedicamentos[i].des = '' then
            vectorMedicamentos[i].des := '0';
        if vectorMedicamentos[i].alm = '' then
            vectorMedicamentos[i].alm := '0';
        if vectorMedicamentos[i].mer = '' then
            vectorMedicamentos[i].mer := '0';
        if vectorMedicamentos[i].cena = '' then
            vectorMedicamentos[i].cena:= '0';
        if vectorMedicamentos[i].diezYMedia = '' then
            vectorMedicamentos[i].diezYMedia := '0';
      end;
end;

procedure sacarCeros(var vectorMedicamentos:tipoVectorMedicamentos; ultimo:tipoPOsicion);
var i:integer;
begin
  for i:=1 to ultimo do
      begin
        if vectorMedicamentos[i].seis = '0' then
            vectorMedicamentos[i].seis := '';
        if vectorMedicamentos[i].des = '0' then
            vectorMedicamentos[i].des := '';
        if vectorMedicamentos[i].alm = '0' then
            vectorMedicamentos[i].alm := '';
        if vectorMedicamentos[i].mer = '0' then
            vectorMedicamentos[i].mer := '';
        if vectorMedicamentos[i].cena = '0' then
            vectorMedicamentos[i].cena:= '';
        if vectorMedicamentos[i].diezYMedia = '0' then
            vectorMedicamentos[i].diezYMedia := '';
      end;
end;

procedure guardarStock(paciente: TPaciente; vectorStock:tipoVectorStock; ultimoStock:tipoPosicion);
var
  nombre_archivo: string;
  archivo: TextFile;
  i:integer;
begin
  try
    nombre_archivo:='Pacientes\' + paciente.nombre + ' ' + paciente.apellido + '\'+'Medicamentos_necesarios_de_'+ paciente.nombre + '_' + paciente.apellido + '.csv';
    AssignFile(archivo, nombre_archivo);
    Rewrite(archivo);

    for i:=0 to ultimoStock do
        begin
          with vectorStock[i] do
            begin
              writeln(archivo, medicamento, ',', cantidad, ',', actual,',',aviso);
            end;
        end;

    Close(archivo);
  except
  end;
end;

//crea el archivo de usuarios y contraseñas. Se deberia usar una vez cuando se abre por primera vez el programa
procedure crearArchivoUsuarios();
var
  nombre_archivo:string;
  archivo:TextFile;
begin
  nombre_archivo := 'Usuarios.txt';
   if not FileExists(nombre_archivo) then
      begin
      crearArchivoVacio(nombre_archivo);
      AssignFile(archivo,nombre_archivo);
      append(archivo);
      writeln(archivo,USUARIO_ADMIN,',',CONTRASENIA_ADMIN,',',ESTADO_ADMIN);
      close(archivo)
      end;

end;

function buscarUsuario(usuario_param:ansiString):TUsuario;
var archivo:textfile;
    linea:string[100];
    usuario_aux:string[10];
    i:integer;
    Registro_usuario:TUsuario;
begin
    with Registro_usuario do
          begin
               usuario:='';
               contrasenia:='';
               estado:='';
          end;

    assign(archivo,'Usuarios.txt');
    reset(archivo);

    while not eof(archivo) do
    begin
      readln(archivo,linea);

         if Pos(',', linea) > 0 then
         begin

            usuario_aux := Copy(linea, 1, Pos(',', linea) - 1);
         end;


         if usuario_param = usuario_aux then
            begin
            with Registro_usuario do
            begin
              usuario := Copy(linea, 1, Pos(',', linea) - 1);
              linea := Copy(linea, Pos(',', linea)+1, Length(linea));
              contrasenia := Copy(linea, 1, Pos(',', linea) - 1);
              linea := Copy(linea, Pos(',', linea)+1, Length(linea));
              estado := linea;
            end;
            buscarUsuario := Registro_usuario;
            close(archivo);
            Exit;
            end;
    end;
    close(archivo);
     buscarUsuario := Registro_usuario;



end;

procedure agregarUsuarioPendiente(usuario:TUsuario);
var
archivo:TextFile;
begin
  AssignFile(archivo,'Usuarios.txt');
  append(archivo);
  writeln(archivo,usuario.usuario,',',usuario.contrasenia,',',usuario.estado);
  close(archivo)
end;

procedure devolverUsuarios(var vector:tipoVectorUsuario; var ultimo:LOVectoresUsuarios.tipoPosicion);
var archivo:textfile;
    linea:string[100];
    usuario:TUsuario;
    nombre_archivo:string;
begin

      nombre_archivo := 'Usuarios.txt';
      assign(archivo,nombre_archivo);
      reset(archivo);

      while not eof(archivo) do
      begin
           //guarda una linea del archivo en la variable
           readln(archivo,linea);
           //busca hasta la primera coma, que es el simbolo que se usa para separa a los datos
           if Pos(',', linea) > 0 then
           begin
           with usuario do
              begin
                usuario := Copy(linea, 1, Pos(',', linea) - 1);
                linea := Copy(linea, Pos(',', linea)+1, Length(linea));
                contrasenia := Copy(linea, 1, Pos(',', linea) - 1);
                linea := Copy(linea, Pos(',', linea)+1, Length(linea));
                estado := linea;
              end;
               LOVectoresUsuarios.Insertar(vector,ultimo,usuario);
           end;
      end;
      close(archivo);
end;

procedure guardarConfirmacionUsuarios(usuario_param:TUsuario);
var
    archivo:TextFile;
    i:integer;
    linea:string;
    registro_usuario:TUsuario;
    usuario_aux:string;
    vectorUsuarios:tipoVectorUsuario;
    ultimo:LOVectoresUsuarios.tipoPOsicion;
begin
  LOVectoresUsuarios.CrearEstVacia(vectorUsuarios,ultimo);
    with Registro_usuario do
          begin
               usuario:='';
               contrasenia:='';
               estado:='';
          end;

    assign(archivo,'Usuarios.txt');
    reset(archivo);

    while not eof(archivo) do
    begin
      readln(archivo,linea);
      if Pos(',', linea) > 0 then
         begin
            usuario_aux := Copy(linea, 1, Pos(',', linea) - 1);
         end;

      //Si es el usuario que hay que confirmar, cambia el estado a 'confirmado'.
      //sino se copia el estado como estaba registrado de antes. (pendiente)
      if usuario_param.usuario = usuario_aux then
       begin
            with Registro_usuario do
            begin
              usuario := Copy(linea, 1, Pos(',', linea) - 1);
              linea := Copy(linea, Pos(',', linea)+1, Length(linea));
              contrasenia := Copy(linea, 1, Pos(',', linea) - 1);
              linea := Copy(linea, Pos(',', linea)+1, Length(linea));
              estado := 'confirmado'
            end;
       end
      else
        begin
            with Registro_usuario do
            begin
              usuario := Copy(linea, 1, Pos(',', linea) - 1);
              linea := Copy(linea, Pos(',', linea)+1, Length(linea));
              contrasenia := Copy(linea, 1, Pos(',', linea) - 1);
              linea := Copy(linea, Pos(',', linea)+1, Length(linea));
              estado := linea;
            end;
        end;
        LOVectoresUsuarios.Insertar(vectorUsuarios,ultimo,registro_usuario);
    end;
    close(archivo);
    //hasta aca se copian todos los usuarios adentro de un array (Cuando se encuentra al que hay que confirmar lo modifica)

    rewrite(archivo);
    //Se escribe el usuario administrador
    //writeln(archivo, USUARIO_ADMIN,',',CONTRASENIA_ADMIN,',',ESTADO_ADMIN);
    for i:=1 to ultimo do
        begin
          with vectorUsuarios[i] do
               begin
                 writeln(archivo, usuario,',',contrasenia,',',estado);
               end;
        end;

   close(archivo);

end;

procedure guardarRecetas(paciente:Tpaciente; arreglo_direcciones:array of string);
var
    ruta_paciente, ruta_destino:string;
    i:integer;
begin
 ruta_paciente:= ('Pacientes/'+paciente.nombre+ ' '+paciente.apellido+'/Recetas/');
 try
   for i:=0 to Length(arreglo_direcciones) -1 do
       begin
          if arreglo_direcciones[i] <> '' then
           begin
             ruta_destino:= ruta_paciente+'Receta'+IntToStr(i+1)+'.jpg';
             ConvertirAjpg(arreglo_direcciones[i],ruta_destino);
           end;
       end;
 finally
 end;
end;

function devolverRecetas(paciente:Tpaciente):arregloDirecciones;
var
    arreglo:arregloDirecciones;
    i:integer;
    ruta_paciente,ruta_img:string;
  begin
       try
         ruta_paciente:= ('Pacientes/'+paciente.nombre+ ' '+paciente.apellido+'/Recetas/');
         for i:=0 to Length(arreglo)-1 do
             begin
               ruta_img:= ruta_paciente+'Receta'+IntToStr(i+1)+'.jpg';
                  if FileExists(ruta_img) then
                     arreglo[i]:=ruta_img;
             end;
       finally;
         devolverRecetas := arreglo;
       end;
  end;

procedure ConvertirAjpg(rutaEntrada, rutaDestino: string);
var
  imagen: TPicture;

begin
  imagen := TPicture.Create;
  try
    // Cargar la imagen desde el archivo de entrada
    imagen.LoadFromFile(rutaEntrada);
    imagen.SaveToFile(rutaDestino);
  finally
    imagen.Free;
  end;
end;


end.



