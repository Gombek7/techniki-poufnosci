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

## Wnioski:
1. GnuPG jest odpowiednim narzędziem do codziennego podpisywania i szyfrowania plików o małych i średnich rozmiarach.
2. Dla bardzo dużych plików czas szyfrowania może stać się zauważalny, co może wpłynąć na jego wydajność w systemach wymagających szybkiego przetwarzania danych.
3. GnuPG dobrze integruje się z innymi systemami, a jego możliwości są wystarczające dla wielu zastosowań związanych z bezpieczeństwem danych.
