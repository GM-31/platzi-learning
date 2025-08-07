# Programa para sumar 10 números y luego multiplicar el resultado

# Lista para almacenar los números
numeros = []

# Solicitar 10 números al usuario
print("Por favor, ingrese 10 números:")
for i in range(10):
    while True:
        try:
            numero = float(input(f"Ingrese el número {i+1}: "))
            numeros.append(numero)
            break
        except ValueError:
            print("Por favor, ingrese un número válido.")

# Calcular la suma
suma = sum(numeros)

# Calcular la multiplicación
multiplicacion = 1
for numero in numeros:
    multiplicacion *= numero

# Mostrar resultados
print("\nResultados:")
print(f"La suma de los números es: {suma}")
print(f"La multiplicación de los números es: {multiplicacion}") 