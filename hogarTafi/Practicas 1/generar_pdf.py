#Para generar el archivo pdf
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Table, TableStyle, SimpleDocTemplate
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
#Para poder usar las imagenes
from PIL import Image
#Para poder poner la tabla de medicamentos en el PDF
import csv
import sys
import os

#Saca los lugares donde quedan cadenas vacias y caracteres de salto de linea
def sacar_sobras(data):
    for i in range(len(data)):
        for j in range(len(data[i])-1):
            if data[i][j].find("\r\n") != -1:
                data[i][j] = data[i][j].replace('\r\n','')
            elif data[i][j] == '':
                data[i].pop(j)
    return data

TAMAÑO_IMG = 200

if len(sys.argv) != 6:
    print("Uso: generar_pdf.py nombre apellido dni obra_social")
else:
    nombre = sys.argv[1]
    apellido = sys.argv[2]
    dni = sys.argv[3]
    obra_social = sys.argv[4]
    try:
        ruta_imagen = sys.argv[5]
    except Exception as e:
        print(e)

    #Esto es de prueba

 
nombre = 'asdasdsd'
apellido = 'asdasd'
dni = '22222222222222'
obra_social = 'osecac'
ruta_imagen = 'C:\\Users\\alebe\\OneDrive\\Escritorio\\personajpg.jfif'

data = []

#Ruta donde se va a guardar el PDF
pdf_ruta = f"Pacientes/{nombre} {apellido}/{nombre}_{apellido}_perfil.pdf"
carpeta_ruta = f'Pacientes\\{nombre} {apellido}'

#Elimina el el PDF anterior por si se quiere modificar
if os.path.exists(pdf_ruta):
    os.remove(pdf_ruta)

#La ubicacion en el pedf
ubicacion = 750

#Objeto canvas
c = canvas.Canvas(pdf_ruta, pagesize=letter)
c.setFont("Helvetica", 30)

#Escribe los datos en el pdf
c.drawString(100, ubicacion, "Informe del Paciente")
ubicacion -= 30
c.setFont("Helvetica", 15)
c.drawString(100, ubicacion, f"Nombre: {nombre} {apellido}")
ubicacion -= 30
c.drawString(100, ubicacion, f"DNI: {dni}")
ubicacion -= 30
c.drawString(100, ubicacion, f"Obra Social: {obra_social}")
ubicacion -=30
print(ubicacion)


try:
    csv_file_path = f'Pacientes/{nombre} {apellido}/medicamentos_de_{nombre}_{apellido}.csv'
    if os.path.exists(csv_file_path):
        with open(csv_file_path, 'r', newline='') as archivo:
            tabla = list(archivo.readlines())
            for i in tabla:
                if i.split(',') == '':
                    continue
                else:
                    data.append(i.split(','))
                
            archivo.close()
except Exception as e:
    print(f"No se pudo leer el archivo CSV: {e}")
    data = []

#data = sacar_sobras(data)

'''
tabla = Table(data)

style = TableStyle([
        
        ('GRID', (0, 0), (-1, -1), 1, (0, 0, 0))
    ])

tabla.setStyle(style)


elements = []
#elements.append(tabla)

ubicacion_tabla = ubicacion - 150

for element in elements:
    element.wrapOn(c, 0, 0)
    element.drawOn(c, 100, ubicacion_tabla)
    ubicacion_tabla -= (element._height + 10)

'''

ubicacion_tabla = ubicacion - 150
ubicacion = (ubicacion_tabla  )# + element._height -10
c.drawString(100, ubicacion, "Foto del paciente")
# si la imagen existe, la agrega al PDF
try:
    if os.path.exists(ruta_imagen):
        print("Imagen encontrada en la ruta:", ruta_imagen)
        imagen = Image.open(ruta_imagen)
        imagen_reader = ImageReader(imagen)
        ubicacion -= (TAMAÑO_IMG + 20)
        c.drawImage(imagen_reader, 100, ubicacion, width=TAMAÑO_IMG, height=200)
        #Guardar la imagen en una carptea del paciente
        if os.path.exists(carpeta_ruta+'\\imagenes'):
            os.makedirs(carpeta_ruta+'\\imagenes')
        else:
            imagen.save(carpeta_ruta+'\\imagenes')
        print("Imagen agregada al PDF.")
    else:
        print("La imagen no se encuentra en la ruta especificada.")
except Exception as e:
    print(f"No se pudo cargar la imagen: {e}")

c.save()  

print(f'PDF generado en: {pdf_ruta}')