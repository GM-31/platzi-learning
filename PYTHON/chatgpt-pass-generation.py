import random
import string

# Lista de palabras comunes y secuencias que queremos evitar
common_words = ['password', '123456', 'qwerty', 'abc123', 'letmein', 'welcome', 'admin']
sequences = ['1234', 'abcd', 'qwerty', 'asdf', 'zxcv']

def generate_password():
    while True:
        # Crear una contraseña de al menos 12 caracteres
        password = ''.join(random.choices(
            string.ascii_uppercase + string.ascii_lowercase + string.digits + string.punctuation,
            k=12
        ))
        
        # Asegurarse de que la contraseña contenga al menos una mayúscula, una minúscula, un número y un carácter especial
        if (any(c.isupper() for c in password) and
            any(c.islower() for c in password) and
            any(c.isdigit() for c in password) and
            any(c in string.punctuation for c in password)):

            # Verificar si la contraseña no contiene palabras comunes o secuencias
            if not any(word in password.lower() for word in common_words) and not any(seq in password for seq in sequences):
                return password

# Ejemplo de uso
print(generate_password())