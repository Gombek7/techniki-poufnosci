@echo off
SETLOCAL EnableDelayedExpansion

rem Wprowadź użytkowników i hasła poniżej
set users[0]=client1 student1
set users[1]=client2 student2
set users[2]=client3 student3

rem Pobieranie loginu i hasła z pliku podanego jako argument
set /A count=0
for /F "tokens=*" %%A in (%~1) do (
 if !count!==1 (
  set password=%%A
  set /A count=2
 )
 if !count!==0 (
  set username=%%A
  set /A count=1
 )
)

rem Sprawdzanie poprawności loginu i hasła
set matched=0
for /L %%i in (0, 1, 2) do (
  for /F "tokens=1,2" %%u in ("!users[%%i]!") do (
    if "!username!"=="%%u" if "!password!"=="%%v" (
      set matched=1
    )
  )
)

rem Wynik
if !matched!==1 (
  exit 0
) else (
  exit 1
)