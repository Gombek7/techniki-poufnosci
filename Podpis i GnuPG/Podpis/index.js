const NodeRSA = require('node-rsa');
const crc = require('crc');
const {readFileSync} = require("node:fs");

function calculateCRC32(data) {
  return crc.crc32(data).toString(16);
}

function calculateCRC8(data) {
  return crc.crc8(data).toString(16);
}

function calculateCRC1(data) {
  return crc.crc1(data).toString(16);
}

function signatureSystem() {
  // Generowanie kluczy RSA
  const key = new NodeRSA({ b: 512 });
  const privateKey = key.exportKey('private');
  const publicKey = key.exportKey('public');

// Dokument do podpisania
  const document = readFileSync('./dokument_1.txt', 'utf8');
  const hash = calculateCRC32(document);

// Podpisywanie (szyfrowanie skrótu prywatnym kluczem)
  const privateKeyObj = new NodeRSA(privateKey);
  const signature = privateKeyObj.encryptPrivate(hash, 'base64');

// Weryfikacja podpisu
  const publicKeyObj = new NodeRSA(publicKey);
  const decryptedHash = publicKeyObj.decryptPublic(signature, 'utf8');

  console.log("Podpis jest prawidłowy:", hash === decryptedHash);
}

function testCollisions() {
  const msg1 = "123";
  const msg2 = "321";
  const msg3 = "132";
  const msg4 = "312";

  console.log(`CRC32: [${msg1}, ${msg2}, ${msg3}, ${msg4}]:`, [calculateCRC32(msg1), calculateCRC32(msg2), calculateCRC32(msg3), calculateCRC32(msg4)]);
  console.log(`CRC8: [${msg1}, ${msg2}, ${msg3}, ${msg4}]:`, [calculateCRC8(msg1), calculateCRC8(msg2), calculateCRC8(msg3), calculateCRC8(msg4)]);
  console.log(`CRC1: [${msg1}, ${msg2}, ${msg3}, ${msg4}]:`, [calculateCRC1(msg1), calculateCRC1(msg2), calculateCRC1(msg3), calculateCRC1(msg4)]);
}

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

// Odkomentuj jedną z funkcji i wpisz do konsoli "node ."
// signatureSystem();
// testCollisions();
// testPerfomance();





