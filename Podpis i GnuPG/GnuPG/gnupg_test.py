import subprocess
import time
import os
import json

# Ustawienia
KEY_NAME = "D5B2CCB3717EBC4EB62650239E975B10A986F54B"  # Nazwa klucza
FILE_SIZE = [1, 10, 100, 1000, 10000]  # Rozmiary plików w KB
FILE_PREFIX = "test_document"
RESULTS_FILE = "results.json"  # Plik, w którym zapisujemy wyniki

# Funkcja do generowania plików o różnych rozmiarach
def generate_file(size):
    with open(f"{FILE_PREFIX}_{size}.txt", "wb") as f:
        f.write(os.urandom(size * 1024))  # Rozmiar w KB

# Funkcja do wykonania polecenia i zmierzenia czasu
def measure_time(command):
    start_time = time.time()
    subprocess.run(command, shell=True)
    end_time = time.time()
    return (end_time - start_time) * 1000  # Czas w milisekundach

# Zbiornik na wyniki
results = []

# Mierzenie czasu dla różnych rozmiarów plików
for size in FILE_SIZE:
    print(f"Generating file of size {size}KB...")
    generate_file(size)

    file = f"{FILE_PREFIX}_{size}.txt"
    result = {"file_size_kb": size}

    # Test podpisywania
    print(f"Signing file of size {size}KB...")
    sign_time = measure_time(f"gpg --output {FILE_PREFIX}_{size}.sig --detach-sign --default-key {KEY_NAME} ./{file}")
    result["signing_time_ms"] = sign_time
    print(f"Signing time: {sign_time:.2f} ms")

    # Test szyfrowania
    print(f"Encrypting file of size {size}KB...")
    encrypt_time = measure_time(f"gpg --output {FILE_PREFIX}_{size}.gpg --encrypt --recipient {KEY_NAME} ./{file}")
    result["encryption_time_ms"] = encrypt_time
    print(f"Encryption time: {encrypt_time:.2f} ms")

    # Test deszyfrowania
    print(f"Decrypting file of size {size}KB...")
    decrypt_time = measure_time(f"gpg --output {FILE_PREFIX}_{size}.dec --decrypt {FILE_PREFIX}_{size}.gpg")
    result["decryption_time_ms"] = decrypt_time
    print(f"Decryption time: {decrypt_time:.2f} ms")

    # Dodanie wyników do listy
    results.append(result)

    # Usunięcie plików testowych
    os.remove(file)
    os.remove(f"{FILE_PREFIX}_{size}.sig")
    os.remove(f"{FILE_PREFIX}_{size}.gpg")
    os.remove(f"{FILE_PREFIX}_{size}.dec")

# Zapisanie wyników do pliku JSON
with open(RESULTS_FILE, "w") as f:
    json.dump(results, f, indent=4)

print(f"Results saved to {RESULTS_FILE}")
