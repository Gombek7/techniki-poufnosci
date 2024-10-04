# Konfiguracja tunelu VPN
Najnowsza wersja sprawozdania jest dostępna pod adresem: [https://github.com/Gombek7/techniki-poufnosci/blob/main/Konfiguracja tunelu VPN/sprawozdanie.md](https://github.com/Gombek7/techniki-poufnosci/blob/main/Konfiguracja%20tunelu%20VPN/sprawozdanie.md)

Członkowie zespołu:
- Jarosław Dakowicz
- Piotr Kozioł

## Konfiguracja serwera

Rolę serwera będzie pełnił laptop z systemem Windows. OpenVPN zostało zainstalowane za pomocą dostarczonego instalatora msi.


| ![GUI](img/gui.png) | 
|:--:| 
| *GUI programu OpenVPN* |


### Generowanie certyfikatu CA

Do zarządzania certyfikatami został użyty zestaw skryptów `easy-rsa 3` zainstalowany wraz z OpenVPN. W systemie Windows należy najpierw uruchomić dostarczoną powłokę.

| ![shell](img/shell.png) | 
|:--:| 
| *Uruchomienie Powłoki EasyRSA 3* |

Następnie należało zainicjalizować PKI i zbudować CA.

| ![pki-init](img/shell.png) | 
|:--:| 
| *Inicjalizacja PKI* |

| ![pki-init](img/build-ca.png) | 
|:--:| 
| *Zbudowanie CA* |

Zastosowany passphrase to `student`.

### Generowanie certyfikatu i klucza dla serwera

| ![build-server](img/build-server.png) | 
|:--:| 
| *Zbudowanie certyfikatu i klucza dla serwera* |

Zastosowany passphrase to `student`.

### Generowanie certyfikatu i kluczy dla klienów

Proces generowania certyfikatów i kluczy dla klientów przebiegł podobnie jak dla serwera. Zastosowane passphrase'y to `student`.

| ![build-client1](img/build-client1.png) | 
|:--:| 
| *Zbudowanie certyfikatu i klucza dla pierwszego klienta* |


### Generowanie parametrów DH

| ![dh-gen](img/dh-gen.png) | 
|:--:| 
| *Wygenerowanie parametrów DH* |