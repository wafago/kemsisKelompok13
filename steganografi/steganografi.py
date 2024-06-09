from PIL import Image
import os

def encode_message(image_path, message, output_path):
    try:
        image = Image.open(image_path)
        encoded = image.copy()
        width, height = image.size
        message += chr(0)  # Penanda akhir pesan
        message_bits = ''.join([bin(ord(char)).lstrip('0b').rjust(8, '0') for char in message])

        data_index = 0
        for row in range(height):
            for col in range(width):
                if data_index < len(message_bits):
                    pixel = list(image.getpixel((col, row)))
                    for n in range(3):  # Untuk setiap komponen RGB
                        if data_index < len(message_bits):
                            pixel[n] = pixel[n] & ~1 | int(message_bits[data_index])
                            data_index += 1
                    encoded.putpixel((col, row), tuple(pixel))
                else:
                    break
        encoded.save(output_path)
        print(f"Image saved to {output_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

def decode_message(image_path):
    try:
        image = Image.open(image_path)
        width, height = image.size
        bits = ""
        for row in range(height):
            for col in range(width):
                pixel = list(image.getpixel((col, row)))
                for n in range(3):  # Untuk setiap komponen RGB
                    bits += str(pixel[n] & 1)

        chars = [bits[i:i+8] for i in range(0, len(bits), 8)]
        message = ""
        for char in chars:
            if chr(int(char, 2)) == chr(0):  # Penanda akhir pesan
                break
            message += chr(int(char, 2))
        return message
    except Exception as e:
        print(f"An error occurred: {e}")
        return ""

# Example usage
encode_message('input_image.png', 'Hidden Message', 'output_image.png')
print(decode_message('output_image.png'))
