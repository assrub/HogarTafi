# Instrucciones para Acceder a la Terminal de MongoDB en un Contenedor Docker

## 1. Acceder a la Terminal del Contenedor
Desde la terminal, ejecuta el siguiente comando para acceder a la terminal del contenedor de MongoDB:

```bash
docker exec -it Cmongo bash
```

## 2. Ejecutar el Shell de MongoDB
Una vez dentro de la terminal del contenedor, inicia el shell de MongoDB con el siguiente comando:

```bash
mongo
```

## 3. Mostrar Todas las Bases de Datos
Para ver una lista de todas las bases de datos en MongoDB, ejecuta:

```bash
show dbs;
```

## 4. Cambiar a una Base de Datos Específica
Para cambiar a una base de datos específica, utiliza el siguiente comando, reemplazando `<database_name>` por el nombre de la base de datos a la que deseas acceder:

```bash
use <database_name>;
```

## 5. Mostrar Todas las Colecciones
Una vez dentro de la base de datos seleccionada, puedes ver todas las colecciones disponibles con el siguiente comando:

```bash
show collections;
```

## 6. Ver el Contenido de una Colección
Para ver el contenido de una colección específica de manera estructurada, ejecuta el siguiente comando, reemplazando `<collection_name>` por el nombre de la colección que deseas consultar:

```bash
db.<collection_name>.find().pretty();
```
```

### Cómo Usar este `.md`:

1. Crea un archivo llamado `instructivo.md` en el editor de tu preferencia.
2. Copia y pega el contenido del código anterior en el archivo `instructivo.md`.
3. Guarda el archivo.

Ahora tendrás un archivo Markdown (`.md`) que contiene el instructivo bien formateado, listo para ser compartido o visualizado en cualquier herramienta que soporte Markdown.