def encrypt_caesar(plain_text, shift):
    encrypted_text = ""
    for char in plain_text:
        if char.isalpha():
            shift_amount = shift % 26
            if char.islower():
                encrypted_text += chr((ord(char) - ord('a') + shift_amount) % 26 + ord('a'))
            else:
                encrypted_text += chr((ord(char) - ord('A') + shift_amount) % 26 + ord('A'))
        else:
            encrypted_text += char
    return encrypted_text

def decrypt_caesar(cipher_text, shift):
    return encrypt_caesar(cipher_text, -shift)
