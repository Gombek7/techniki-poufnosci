# Podpis i GnuPG

Członkowie zespołu:
- Jarosław Dakowicz
- Piotr Kozioł
- Anton Maisiuk

## 1. System podpisu elektronicznego
### 1.1 Przygotowywanie systemu

Za pomocą bibliotek `node-rsa` i `crc` został stworzyny system do podpisywania elektronicznego

Najpierw system generuje parę kluczy o długości 512 bit
```js
const key = new NodeRSA({ b: 512 });
const privateKey = key.exportKey('private');
const publicKey = key.exportKey('public');
```

Dalej system wczytuje plik podpisuje go za pomocą klucza prywatnego.
```js
// Dokument do podpisania
const document = readFileSync('./dokument_1.txt', 'utf8');
const hash = calculateCRC32(document);

// Podpisywanie (szyfrowanie skrótu prywatnym kluczem)
const privateKeyObj = new NodeRSA(privateKey);
const signature = privateKeyObj.encryptPrivate(hash, 'base64');
```

Za hashowanie pliku odpowiada funkcja skrótu `CRC`:
```js
function calculateCRC32(data) {
    return crc.crc32(data).toString(16);
}
```

Na koniec, odbywa się weryfikacja podpisu za pomocą klucza publicznego. Jeżeli skróty są takie same, system wypisuje `true`, inczej - `false`
```js
const publicKeyObj = new NodeRSA(publicKey);
const decryptedHash = publicKeyObj.decryptPublic(signature, 'utf8');

console.log("Podpis jest prawidłowy:", hash === decryptedHash);
```

### 1.2 Badanie bezpieczeństwa systemu

#### 1.2.1 Test kolizji
Do badania na wystąpienia kolizji została użyta funkcja
```js
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
Do badania wydajności została użyta funkcja która tworzy wypełniony bufor o podanym rozmiarze i mierzy czas podpisywania.
```js
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
