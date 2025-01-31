# Sprawozdanie z testów wydajności aplikacji GnuPG

## Cel testów
Celem przeprowadzonych testów było ocenienie wydajności aplikacji GnuPG (GNU Privacy Guard) pod kątem algorytmów podpisu, szyfrowania i deszyfrowania, a także analizy czasów wykonania tych operacji dla różnych rozmiarów dokumentów. W ramach testów porównano czasy wykonania tych operacji w zależności od wielkości plików oraz oceniono wydajność aplikacji przy różnych obciążeniach. Wyniki zostały zaprezentowane w kontekście możliwości GnuPG oraz potencjalnych alternatyw, w celu oceny wydajności i efektywności tej aplikacji w codziennym użytkowaniu.

## Metodologia testów
Testy zostały przeprowadzone na pięciu różnych rozmiarach plików:
1. 1 KB
2. 10 KB
3. 100 KB
4. 1000 KB
5. 10000 KB

Dla każdego rozmiaru pliku zmierzono czas wykonania trzech operacji:
- Podpisywania pliku (operacja "signing")
- Szyfrowania pliku (operacja "encryption")
- Deszyfrowania pliku (operacja "decryption")

Pomiar czasu wykonywano w milisekundach. Testy były przeprowadzane na maszynie z systemem Windows, z zainstalowaną aplikacją GnuPG w wersji stabilnej.

## Wyniki testów

Tabela poniżej przedstawia wyniki pomiarów czasów dla operacji podpisywania, szyfrowania i deszyfrowania w zależności od rozmiaru pliku:

| Rozmiar pliku (KB) | Czas podpisywania (ms) | Czas szyfrowania (ms) | Czas deszyfrowania (ms) |
|--------------------|------------------------|-----------------------|-------------------------|
| 1                  | 68.99                  | 172.80                | 67.62                   |
| 10                 | 76.27                  | 863.25                | 112.54                  |
| 100                | 101.54                 | 171.05                | 70.45                   |
| 1000               | 80.63                  | 175.93                | 65.83                   |
| 10000              | 131.17                 | 517.83                | 92.56                   |

## Analiza wyników

### Czas podpisywania
- Czas podpisywania plików jest stosunkowo stabilny, z wyjątkiem pliku o rozmiarze 10000 KB, gdzie czas podpisywania wzrósł do 131 ms, co może być wynikiem większego obciążenia systemu przy operacjach na dużych plikach.
- Dla plików o małych rozmiarach (1 KB, 10 KB), czasy są zbliżone, co wskazuje na wysoką efektywność algorytmu podpisu.

### Czas szyfrowania
- Czas szyfrowania rośnie w sposób znaczący wraz z rozmiarem pliku. Dla pliku 1 KB czas szyfrowania wynosi 172.80 ms, ale dla pliku 10000 KB czas ten wzrasta do 517.83 ms. Wzrost czasu szyfrowania jest dość liniowy, ale zauważalny, szczególnie przy większych plikach.
- Dla pliku o rozmiarze 10 KB czas szyfrowania wynosi już 863.25 ms, co sugeruje, że GnuPG zaczyna wykazywać pewne opóźnienia w przypadku większych dokumentów.

### Czas deszyfrowania
- Czas deszyfrowania plików również jest stosunkowo stabilny. Dla większości rozmiarów plików czas deszyfrowania waha się od 65 ms do 112 ms. Warto zauważyć, że czas deszyfrowania dla pliku o rozmiarze 10000 KB wynosi 92.56 ms, co jest zaskakująco niskie w porównaniu do czasu szyfrowania.

## Podsumowanie

Z przeprowadzonych testów wynika, że aplikacja GnuPG jest wydajna, zwłaszcza przy operacjach na małych plikach. Czasy podpisywania i deszyfrowania są stosunkowo krótkie, a wzrost czasów w przypadku szyfrowania jest zauważalny przy większych plikach. Niemniej jednak, czas szyfrowania rośnie nieliniowo, co wskazuje na możliwą skalowalność problemu przy operacjach na bardzo dużych plikach.

Pod względem możliwości integracji, GnuPG jest aplikacją dobrze dostosowaną do różnorodnych systemów, oferującą szeroki zestaw opcji zarówno do podpisywania, jak i szyfrowania danych. Jako rozwiązanie open-source, GnuPG może być szeroko integrowane z innymi aplikacjami i systemami, co czyni go atrakcyjnym wyborem w kontekście zarządzania bezpieczeństwem danych.

## Porównanie z innymi aplikacjami
W porównaniu do innych aplikacji szyfrujących, takich jak OpenSSL czy PGP, GnuPG charakteryzuje się dobrą równowagą między wydajnością a funkcjonalnością. Wydajność szyfrowania i podpisywania w GnuPG jest konkurencyjna, choć aplikacje takie jak OpenSSL mogą oferować nieco lepszą wydajność w specyficznych przypadkach, zwłaszcza przy szyfrowaniu dużych plików.

Dalsze testy mogą być konieczne, aby dokładniej porównać GnuPG z innymi narzędziami szyfrującymi, zwłaszcza w kontekście szyfrowania bardzo dużych plików lub integracji w specyficznych środowiskach produkcyjnych.

## Wnioski
1. GnuPG jest odpowiednim narzędziem do codziennego podpisywania i szyfrowania plików o małych i średnich rozmiarach.
2. Dla bardzo dużych plików czas szyfrowania może stać się zauważalny, co może wpłynąć na jego wydajność w systemach wymagających szybkiego przetwarzania danych.
3. GnuPG dobrze integruje się z innymi systemami, a jego możliwości są wystarczające dla wielu zastosowań związanych z bezpieczeństwem danych.


## Kod
Funkcja do generowania plików o różnych rozmiarach
```
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
```

# Podpis i GnuPG

Członkowie zespołu:
- Jarosław Dakowicz
- Piotr Kozioł
- Anton Maisiuk

## 1. System podpisu elektronicznego
### 1.1 Przygotowywanie systemu

Za pomocą bibliotek `node-rsa` i `crc` został stworzyny system do podpisywania elektronicznego

Najpierw system generuje parę kluczy o długości 512 bit
```
const key = new NodeRSA({ b: 512 });
const privateKey = key.exportKey('private');
const publicKey = key.exportKey('public');
```

Dalej system wczytuje plik podpisuje go za pomocą klucza prywatnego.
```
// Dokument do podpisania
const document = readFileSync('./dokument_1.txt', 'utf8');
const hash = calculateCRC32(document);

// Podpisywanie (szyfrowanie skrótu prywatnym kluczem)
const privateKeyObj = new NodeRSA(privateKey);
const signature = privateKeyObj.encryptPrivate(hash, 'base64');
```

Za hashowanie pliku odpowiada funkcja skrótu `CRC`:
```
function calculateCRC32(data) {
    return crc.crc32(data).toString(16);
}
```

Na koniec, przechodzi weryfikacja podpisu za pomocą klucza publicznego. Jeżeli hashy się zgadzają się, system wypisuje `true`, inczej - `false`
```
const publicKeyObj = new NodeRSA(publicKey);
const decryptedHash = publicKeyObj.decryptPublic(signature, 'utf8');

console.log("Podpis jest prawidłowy:", hash === decryptedHash);
```

### 1.2 Badanie bezpieczeństwa systemu

#### 1.2.1 Test kolizji
Do badania na wystąpienia kolizji została użyta funkcja
```
function testCollisions() {
  const msg1 = "123";
  const msg2 = "321";
  const msg3 = "132";
  const msg4 = "312";
  
  console.log(`CRC32: [${msg1}, ${msg2}, ${msg3}, ${msg4}]:`, [calculateCRC32(msg1), calculateCRC32(msg2), calculateCRC32(msg3), calculateCRC32(msg4)]);
  console.log(`CRC8: [${msg1}, ${msg2}, ${msg3}, ${msg4}]:`, [calculateCRC8(msg1), calculateCRC8(msg2), calculateCRC8(msg3), calculateCRC8(msg4)]);
  console.log(`CRC1: [${msg1}, ${msg2}, ${msg3}, ${msg4}]:`, [calculateCRC1(msg1), calculateCRC1(msg2), calculateCRC1(msg3), calculateCRC1(msg4)]);
}
```
Zostałe podane 4 podobne, ale różne wiadomośći. Każda z tych wiadomości haszowana poprzez 3 różne warianty CRC (32, 8 i 1 bit)


**Wyniki:**
```
CRC32: [123, 321, 132, 312]: [ '884863d2', '65c2d690', 'e6546205', 'd7e6d4e9' ]
CRC8: [123, 321, 132, 312]: [ 'c0', '18', 'd2', '2e' ]
CRC1: [123, 321, 132, 312]: [ '96', '96', '96', '96' ]
```

**Wnioski**

1. Funkcje CRC o większej liczbie bitów (np. CRC32) zapewniają lepszą unikalność skrótów i mniejsze ryzyko kolizji, ale kosztem większej złożoności obliczeń.
2. CRC o małej liczbie bitów (np. CRC1, CRC8) są podatne na kolizje i nadają się tylko do prostych zadań, takich jak detekcja błędów w krótkich danych.
3. CRC nie powinno być stosowane w miejscach wymagających wysokiego poziomu bezpieczeństwa (np. w podpisach cyfrowych), ponieważ jego projekt nie zakłada odporności na ataki kryptograficzne.

#### 1.2.2 Test wydajności
Do badania na wystąpienia kolizji została użyta funkcja, która tworzy buffer o podanym rozmiarze i mierzy czas podpisywania.
```
function testPerfomance() {
  const key = new NodeRSA({ b: 512 });
  const privateKey = key.exportKey('private');
  const privateKeyObj = new NodeRSA(privateKey);

  const fileSizes = [100, 1024, 2048, 1e4, 2e4, 2e4, 1e6]; // KB
  fileSizes.forEach(size => {
    const document = Buffer.alloc(size * 1024, 'A'); // Plik wypełniony "A"
    console.time(`Podpisywanie ${size} KB`);
    const signature = privateKeyObj.encryptPrivate(calculateCRC32(document), 'base64');
    console.timeEnd(`Podpisywanie ${size} KB`);
  });
}
```
**Wyniki po trzech próbach:**

```
Podpisywanie 100 KB: 4.113ms, 4.012ms, 4.167ms
Podpisywanie 1024 KB: 3.773ms, 3.453ms, 3.769ms
Podpisywanie 2048 KB: 5.858ms, 5.376ms, 6.628ms
Podpisywanie 10000 KB: 28.091ms, 101.01ms, 26.157ms
Podpisywanie 20000 KB: 54.123ms, 54.222ms, 54.123ms
Podpisywanie 1000000 KB: 2.704s, 3.212s, 2.922s
```

**Wnioski**
1. Algorytm podpisywania jest zoptymalizowany dla mniejszych plików, co sugeruje, że może być to docelowe zastosowanie (np. podpisywanie dokumentów tekstowych lub małych paczek danych).
2. Algorytm działa stabilnie, choć jego wydajność może być uzależniona od warunków sprzętowych i obciążenia systemu.

