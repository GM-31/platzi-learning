import random
import string

def generate_password(length=12, include_uppercase=True, include_lowercase=True, include_digits=True, include_special=True, exclude_ambiguous=True):
    """
    Genera una contraseña segura que cumple con los requisitos especificados.
    
    Parámetros:
    length (int): Longitud de la contraseña (valor predeterminado: 12)
    include_uppercase (bool): Incluir letras mayúsculas (valor predeterminado: True)
    include_lowercase (bool): Incluir letras minúsculas (valor predeterminado: True)
    include_digits (bool): Incluir dígitos (valor predeterminado: True)
    include_special (bool): Incluir caracteres especiales (valor predeterminado: True)
    exclude_ambiguous (bool): Excluir caracteres ambiguos como 'l', 'I', '1', '0', '|' (valor predeterminado: True)
    
    Devuelve:
    str: Contraseña generada
    """
    
    # Define los conjuntos de caracteres a utilizar
    uppercase_chars = string.ascii_uppercase
    lowercase_chars = string.ascii_lowercase
    digit_chars = string.digits
    special_chars = string.punctuation
    
    # Excluye los caracteres ambiguos si está activada la opción
    if exclude_ambiguous:
        uppercase_chars = uppercase_chars.replace('I', '')
        lowercase_chars = lowercase_chars.replace('l', '')
        digit_chars = digit_chars.replace('1', '').replace('0', '')
        special_chars = special_chars.replace('|', '')
    
    # Crea un conjunto de caracteres válidos
    valid_chars = ''
    if include_uppercase:
        valid_chars += uppercase_chars
    if include_lowercase:
        valid_chars += lowercase_chars
    if include_digits:
        valid_chars += digit_chars
    if include_special:
        valid_chars += special_chars
    
    # Genera la contraseña
    password = ''.join(random.choice(valid_chars) for i in range(length))
    
    # Asegura que la contraseña contenga al menos un carácter de cada tipo requerido
    if include_uppercase:
        password = password.replace(random.choice(uppercase_chars), random.choice(uppercase_chars), 1)
    if include_lowercase:
        password = password.replace(random.choice(lowercase_chars), random.choice(lowercase_chars), 1)
    if include_digits:
        password = password.replace(random.choice(digit_chars), random.choice(digit_chars), 1)
    if include_special:
        password = password.replace(random.choice(special_chars), random.choice(special_chars), 1)
    
    return password

password = generate_password()
print(password)