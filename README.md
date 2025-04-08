# Gra „ Bombowa Obrona ”

Maciej Czarnocki Sołtys, Wiktor Struczewski, Mikołaj Wójtowicz 4ta

## 1) Wprowadzenie

```
Celem gry „Bombowa Obrona” jest jak najdłuższe przetrwanie walcząc z
przeciwnikami i unikanie bezpośredniego kontaktu z nimi.
```
## 2) Słownik

```
 Życia – ilość razy, kiedy obiekt może otrzymać obrażenia
 Niezniszczalność – czas, w którym obiekt nie może otrzymać
obrażeń
 Hitbox – niewidzialny obszar w kształcie kwadratu, który
podczas kontaktu z innym takim obszarem liczy się jako
trafienie/otrzymanie obrażeń
 Mapa – dostępny obszar, po którym może poruszać się gracz
i z którego gracz nie może wyjść (taka próba zatrzyma postać
gracza na granicy mapy)
```
## 3) Ogólny opis systemu

```
System Gry
MODUŁ FUNKCJONALNOŚĆ, INFORMACJE
```
```
PORUSZANIE SIĘ
```
```
 poruszanie klawiszami WSAD
 rzut bumerangiem strzałkami
 określona mapa, z której nie można
wyjść
```
```
WALKA
```
```
 gracz posiada 3 życia, przeciwnicy 2,
system utraty żyć
 kolizja z przeciwnikami
 widoczna informacja o otrzymaniu
obrażeń
 system podążania za graczem
```
```
PUNKTACJA
```
```
 punkty dodawane są po pokonaniu
każdego przeciwnika (1 przeciwnik
= 1 punkt)
 zapisana najwyższa ilość zdobytych
punktów
```
```
STRONA
```
```
 wykonana w HTML, przy pomocy
CSS i JavaScript
 przyjazna dla oka grafika i paleta
kolorów
 start gry
```
```
1.drawio
```
![image](https://github.com/user-attachments/assets/44042d7a-fa5c-4e1c-b037-dee6aad1a926)

```
Gra działa na komputerach z przeglądarką Google Chrome, Microsoft
Edge. Wymagane są potrzebne pliki (dołączone w pliku zip).
```
```
Na stronie dostępny będzie przycisk START uruchamiający grę, grafiki
opisujące sposób poruszania się oraz informacja o zdobytych punktach, a
także informacja o najwyższym wyniku zdobytych dotychczas punktów
(Uwaga, po odświeżeniu strony, informacja o najwyższym wyniku
zdobytych dotychczas punktów resetuje się)
```
## 4) Wymagania funkcjonalne

```
 Poruszanie się klawiszami WSAD
o W – góra
o S – dół
o A – lewo
o D – prawo
 Rzucanie bumerangiem klawiszami strzałek
o Strzałka w górę – rzut bumerangiem w górę
o Strzałka w dół – rzut bumerangiem w dół
o Strzałka w lewo – rzut bumerangiem w lewo
o Strzałka w prawo – rzut bumerangiem w prawo
 Kolizja z przeciwnikami
o Po najechaniu hitboxu przeciwnika na hitbox gracza, gracz
otrzymuje obrażenia, traci jedno z żyć i otrzymuje
niezniszczalność i efekt migania na 1,5 sekundy
o Po najechaniu hitboxu bumerangu na hitbox przeciwnika,
przeciwnik otrzymuje obrażenia, traci jedno z żyć i
otrzymuje niezniszczalność na 1,5 sekundy
 System podążania za graczem
o Przeciwnicy po pojawieniu się będą powoli przemieszczać
się w stronę gracza, aby ich hitboxy się zetknęły
o Po wyrzuceniu bumerangu i osiągnięciu przez niego jego
maksymalnej odległości, bumerang zaczyna wracać do
gracza i po zetknięciu się jego hitboxu z hitboxem gracza,
gracz otrzymuje możliwość ponownego rzutu
 Wizualna informacja o trafieniu przeciwnika bumerangiem
o Przeciwnik po trafieniu staje się czerwony na czas swojej
niezniszczalności
 Punkty za przeciwników i przeciwnicy za punkty
o Za każdego pokonanego przeciwnika gracz otrzymuje 1
punkt
o Co 5 zdobytych przez gracza punktów zostaje dodany
kolejny przeciwnik w celu utrudnienia gry
```
## 5) Wymagania niefunkcjonalne

```
Gra została zrobiona przy pomocy HTML, JavaScript i CSS, więc nie jest
perfekcyjna. Posiada wady i ograniczenia wynikające z przeglądarki, jej
ustawień lub ustawień użytkownika.
Grafiki pojawiające się w grze:
 Kapitan Bomba (jako gracz) – obrazek wzięty z google grafika
 Goblin (jako przeciwnik) – obrazek wzięty z google grafika
 Bumerang (jako bumerang) – obrazek wzięty ze strony z licencjami
(stock image)
```
## 6) Krótki opis rozgrywki

```
Po kliknięciu przycisku START znika on i rozpoczyna się rozgrywka,
pojawiają się przeciwnicy mający po 2 życia oraz gracz, który posiada 3
życia. Gracz musi unikać kolizji z przeciwnikami poruszając się po
dostępnej mapie, aby nie otrzymać obrażeń, jego zadaniem także jest
rzucanie bumerangiem, który może uderzyć każdego przeciwnika raz na
rzut. Pokonując przeciwników gracz otrzymuje punkty, które zapisują się
w dwóch miejscach: najwyższym wyniku (highscore), który resetuje się
jedynie po odświeżeniu strony oraz w punktach (points), które wskazują
aktualną ilość punktów gracza podczas rozgrywki. Po otrzymaniu 3 razy
obrażeń od przeciwników, gracz zostaje pokonany i rozgrywka się kończy
pokazując napis GAME OVER oraz pojawia się z powrotem przycisk
START, który umożliwia rozpoczęcie następnej rozgrywki.
```

