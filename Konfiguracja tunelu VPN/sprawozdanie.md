# Konfiguracja tunelu VPN
Najnowsza wersja sprawozdania jest dostępna pod adresem: [https://github.com/Gombek7/techniki-poufnosci/blob/main/Konfiguracja tunelu VPN/sprawozdanie.md](https://github.com/Gombek7/techniki-poufnosci/blob/main/Konfiguracja%20tunelu%20VPN/sprawozdanie.md)

Członkowie zespołu:
- Jarosław Dakowicz
- Piotr Kozioł

## Generowanie certyfikatów

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

### Podsumowanie wygenerowanych plików

| Plik | Potrzebny przez | Przeznaczenie | Sekret |
| -- | -- | -- | -- |
| ca.crt | serwer + wszyscy klienci | Główny certyfikat CA | NIE |
| ca.key | tylko maszyna podpisująca klucze | Główny klucz CA | TAK |
| dh{n}.pem | tylko serwer | Parametry Diffie'go Hellman'a | NIE |
| server.crt | tylko serwer | Certyfikat Serwera | NIE |
| server.key | tylko serwer | Klucz Serwera | TAK |
| client1.crt | tylko client1 | Certyfikat client1 | NIE |
| client1.key | tylko client1 | Klucz Client1 | TAK |
| client2.crt | tylko client2 | Certyfikat Client2 | NIE |
| client2.key | tylko client2 | Klucz Client2 | TAK |
| client3.crt | tylko client3 | Certyfikat Client3 | NIE |
| client3.key | tylko client3 | Klucz Client3 | TAK |

## Konfiguracja serwera


```apacheconf
port 1194
proto udp
dev tun
ca ca.crt
cert server.crt
key server.key  # This file should be kept secret
dh dh.pem
topology subnet
server 10.8.0.0 255.255.255.0
ifconfig-pool-persist ipp.txt
keepalive 10 120
persist-key
persist-tun
status openvpn-status.log
verb 3
explicit-exit-notify 1
```