My little location webshop 

Beskrivning: 

jag har byggt en webshop där en kund ska kunna registrera sig på hemsidan och sedan handla valfritt område.
För att få handla måste denna kund vara inloggad, bara välja kungsbacka en gång samt inte överstiga beloppet på 999 999kr.
I min uppgift så har jag uppfyllt kraven för G, dvs:

Produkter ska listas på sida,
Dessa produkter ska komma från stripe,
Kunden ska kunna lägga till i kundvagn,
Man ska vara inloggad för att kunna göra en order,
Det ska skapas både användare i min databas(json-filen) samt i stripe,
Det som lagts i kundvagn är det som ska betalas i stripe,
Den inloggade kunden används vid placering av order,
Alla godkända ordrar sparas till en json-fil,

För att bygga projektet krävs följande:

npm install
För att starta servern sen använder man : npm start ( om man har nodemon installerat globalt )

