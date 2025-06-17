## Capítulo 3: Caracterización de los Tiempos de Ejecución

El orden de crecimiento del tiempo de ejecución de un algoritmo, definido en el Capítulo 2, proporciona una forma sencilla de caracterizar su eficiencia y también permite compararlo con algoritmos alternativos. Una vez que el tamaño de la entrada $n$ es lo suficientemente grande, el ordenamiento por mezcla (Merge sort), con su tiempo de ejecución en el peor caso de $\Theta(n \lg n)$, supera al ordenamiento por inserción (Insertion sort), cuyo tiempo de ejecución en el peor caso es $\Theta(n^2)$. Aunque a veces podemos determinar el tiempo de ejecución exacto de un algoritmo, como hicimos para el ordenamiento por inserción en el Capítulo 2, la precisión adicional rara vez justifica el esfuerzo de calcularlo. Para entradas lo suficientemente grandes, las constantes multiplicativas y los términos de menor orden de un tiempo de ejecución exacto son dominados por los efectos del tamaño de la entrada en sí.

Cuando consideramos tamaños de entrada lo suficientemente grandes como para que solo importe el orden de crecimiento del tiempo de ejecución, estamos estudiando la eficiencia _asintótica_ de los algoritmos. Es decir, nos preocupamos por cómo aumenta el tiempo de ejecución de un algoritmo con el tamaño de la entrada _en el límite_, a medida que el tamaño de la entrada crece sin restricciones. Por lo general, un algoritmo que es asintóticamente más eficiente es la mejor opción para todas las entradas, excepto para las muy pequeñas.

Este capítulo presenta varios métodos estándar para simplificar el análisis asintótico de algoritmos. La siguiente sección introduce informalmente los tres tipos más comunes de "notación asintótica", de los cuales ya hemos visto un ejemplo con la notación $\Theta$. También muestra una forma de usar estas notaciones asintóticas para razonar sobre el tiempo de ejecución en el peor caso del ordenamiento por inserción. Luego, examinamos las notaciones asintóticas de manera más formal y presentamos varias convenciones notacionales utilizadas a lo largo del libro. La última sección revisa el comportamiento de funciones que comúnmente surgen al analizar algoritmos.

### 3.1 Notación O, notación Ω y notación Θ

Cuando analizamos el tiempo de ejecución en el peor caso del algoritmo de ordenación por inserción en el Capítulo 2, comenzamos con la expresión complicada:

$$
\left( \frac{c_5}{2} + \frac{c_6}{2} + \frac{c_7}{2} \right)n^2 + \left( c_1 + c_2 + c_4 + \frac{c_5}{2} - \frac{c_6}{2} - \frac{c_7}{2} + c_8 \right)n - (c_2 + c_4 + c_5 + c_8).
$$

Luego descartamos los términos de menor orden $\left(c_1 + c_2 + c_4 + \frac{c_5}{2} - \frac{c_6}{2} - \frac{c_7}{2} + c_8\right)n$ y $(c_2 + c_4 + c_5 + c_8)$, y también ignoramos el coeficiente $\frac{c_5}{2} + \frac{c_6}{2} + \frac{c_7}{2}$ de $n^2$. Esto nos dejó solo el factor $n^2$, que expresamos en notación Θ como $\Theta(n^2)$. Usamos este estilo para caracterizar los tiempos de ejecución de algoritmos: descartamos los términos de menor orden y el coeficiente del término principal, usando una notación que se enfoca en la tasa de crecimiento del tiempo de ejecución.
 
La notación Θ no es la única "notación asintótica". En esta sección, veremos otras formas de notación asintótica. Comenzaremos con una mirada intuitiva a estas notaciones, revisando el algoritmo de ordenación por inserción para ver cómo podemos aplicarlas. En la siguiente sección, veremos las definiciones formales de nuestras notaciones asintóticas, junto con las convenciones para su uso.

Antes de entrar en detalles, tenga en cuenta que las notaciones asintóticas que veremos están diseñadas para caracterizar funciones en general. Resulta que las funciones que más nos interesan denotan los tiempos de ejecución de los algoritmos. Pero la notación asintótica puede aplicarse a funciones que caracterizan otros aspectos de los algoritmos (como la cantidad de espacio que utilizan), o incluso a funciones que no tienen ninguna relación con los algoritmos.

### Notación O (O-notation)

La notación O caracteriza una cota superior en el comportamiento asintótico de una función. En otras palabras, indica que una función crece como máximo a cierta velocidad, basándose en el término de mayor orden. Por ejemplo, consideremos la función $7n^3 + 100n^2 - 20n + 6$. Su término de mayor orden es $7n^3$, por lo que decimos que su tasa de crecimiento es $n^3$. Dado que esta función no crece más rápido que $n^3$, podemos escribir que es $O(n^3)$. Puede resultar sorprendente que también podamos escribir que la función $7n^3 + 100n^2 - 20n + 6$ es $O(n^4)$. ¿Por qué? Porque la función crece más lentamente que $n^4$, y es correcto afirmar que no crece más rápido. Como habrás adivinado, esta función también es $O(n^5)$, $O(n^6)$, y así sucesivamente. En general, es $O(n^c)$ para cualquier constante $c \geq 3$.

### Notación Ω (Ω-notation)

La notación Ω caracteriza una **cota inferior** en el comportamiento asintótico de una función. En otras palabras, indica que una función crece **al menos tan rápido** como cierta tasa, basándose —al igual que la notación O— en el término de mayor orden. Dado que el término de mayor orden en la función $7n^3 + 100n^2 - 20n + 6$ crece al menos tan rápido como $n^3$, esta función es $\Omega(n^3)$. También es $\Omega(n^2)$ y $\Omega(n)$. En general, es $\Omega(n^c)$ para cualquier constante $c \leq 3$.

---

### Notación Θ (Θ-notation)

La notación Θ caracteriza una **cota ajustada** en el comportamiento asintótico de una función. Indica que una función crece **precisamente** a cierta tasa, basándose nuevamente en el término de mayor orden. En otras palabras, la notación Θ describe la tasa de crecimiento de la función dentro de un factor constante por arriba y por abajo. Estos dos factores constantes no necesitan ser iguales.

Si puedes demostrar que una función es tanto $O(f(n))$ como $\Omega(f(n))$ para alguna función $f(n)$, entonces has probado que la función es $\Theta(f(n))$. (La siguiente sección enuncia esto como un teorema). Por ejemplo, dado que la función $7n^3 + 100n^2 - 20n + 6$ es tanto $O(n^3)$ como $\Omega(n^3)$, también es $\Theta(n^3)$.

---

**Ejemplo: Ordenamiento por inserción (Insertion Sort)**  

Retomemos el ordenamiento por inserción y veamos cómo usar notación asintótica para caracterizar su tiempo de ejecución en el peor caso de $\Theta(n^2)$, sin evaluar sumatorias como hicimos en el Capítulo 2. A continuación, se muestra nuevamente el procedimiento `Insertion-Sort`:

```python
INSERTION-SORT(A, n)
1   for i = 2 to n
2       key = A[i]
3       // Insertar A[i] en el subarreglo ordenado A[1:i-1]
4       j = i - 1
5       while j > 0 and A[j] > key
6           A[j + 1] = A[j]
7           j = j - 1
8       A[j + 1] = key
```
### Análisis del funcionamiento del pseudocódigo

Podemos observar que el procedimiento utiliza **bucles anidados**:
1. **Bucle exterior (`for`):**  
   - Se ejecuta exactamente `n - 1` veces (desde `i = 2` hasta `n`), *independientemente* de los valores que se estén ordenando.

2. **Bucle interior (`while`):**  
   - Es un bucle condicional donde el número de iteraciones *depende* de los valores específicos del arreglo.  
   - La variable del bucle `j` comienza en `i - 1` y se decrementa en cada iteración.

#### Explicación clave:  
- La eficiencia del algoritmo está dominada por el bucle interno, cuyo comportamiento varía según la entrada:  
  - **Mejor caso (arreglo ya ordenado):** El bucle `while` no itera (tiempo lineal $\Theta(n)$).  
  - **Peor caso (arreglo en orden inverso):** El bucle `while` itera el máximo posible (tiempo cuadrático $\Theta(n^2)$).  
  
![alt text](image-2.png)