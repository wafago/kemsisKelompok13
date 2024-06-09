// Caesar Cipher
function encryptCaesar() {
    let plainText = document.getElementById("plainText").value;
    let shift = parseInt(document.getElementById("shift").value);
    let encryptedText = caesarCipher(plainText, shift);
    document.getElementById("resultCrypto").innerText = `Encrypted: ${encryptedText}`;
}

function decryptCaesar() {
    let plainText = document.getElementById("plainText").value;
    let shift = parseInt(document.getElementById("shift").value);
    let decryptedText = caesarCipher(plainText, -shift);
    document.getElementById("resultCrypto").innerText = `Decrypted: ${decryptedText}`;
}

function caesarCipher(text, shift) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-z]/i)) {
            let code = text.charCodeAt(i);
            if (char >= 'a' && char <= 'z') {
                char = String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
            } else if (char >= 'A' && char <= 'Z') {
                char = String.fromCharCode(((code - 65 + shift) % 26 + 26) % 26 + 65);
            }
        }
        result += char;
    }
    return result;
}

// Steganografi
function encodeStego() {
    let fileInput = document.getElementById('imageInput');
    let message = document.getElementById('stegoMessage').value;

    if (fileInput.files.length > 0) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let image = new Image();
            image.onload = function () {
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);
                
                let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                let data = imageData.data;
                
                // Encoding the message
                message += String.fromCharCode(0);  // End of message indicator
                let messageBits = '';
                for (let i = 0; i < message.length; i++) {
                    let charBits = message.charCodeAt(i).toString(2).padStart(8, '0');
                    messageBits += charBits;
                }
                
                for (let i = 0; i < messageBits.length; i++) {
                    data[i * 4] = data[i * 4] & ~1 | parseInt(messageBits[i]);
                }
                
                context.putImageData(imageData, 0, 0);
                let encodedImage = canvas.toDataURL('image/png');
                let link = document.createElement('a');
                link.href = encodedImage;
                link.download = 'encoded_image.png';
                link.click();
            };
            image.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        alert('Please select an image file.');
    }
}

function decodeStego() {
    let fileInput = document.getElementById('imageInput');
    
    if (fileInput.files.length > 0) {
        let reader = new FileReader();
        reader.onload = function (e) {
            let image = new Image();
            image.onload = function () {
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);
                
                let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                let data = imageData.data;
                
                // Decoding the message
                let bits = '';
                for (let i = 0; i < data.length; i += 4) {
                    bits += (data[i] & 1).toString();
                }
                
                let message = '';
                for (let i = 0; i < bits.length; i += 8) {
                    let char = String.fromCharCode(parseInt(bits.slice(i, i + 8), 2));
                    if (char === '\0') break;  // End of message indicator
                    message += char;
                }
                
                document.getElementById('resultStego').innerText = `Decoded Message: ${message}`;
            };
            image.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        alert('Please select an image file.');
    }
}
