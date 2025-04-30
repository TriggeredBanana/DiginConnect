<h1 align="center">
 <img src="/images/DiginConnectLogo.png" alt="DiginConnect Logo" width="500" height="200"/>
</h1>


# Oversikt
DiginConnect er en plattform for samhandling og innovasjon utviklet for Digin. Plattformen samler fagfolk, prosjekter, bedrifter og arrangementer i ett digitalt økosystem. Her kan du bygge nettverk, oppdage nye samarbeidsmuligheter, presentere bedriften din og holde oversikt over relevante arrangementer – alt i en brukervennlig webapplikasjon.

Her kan du teste en live demo: https://diginconnect.netlify.app
<br></br>
# Viktige funksjoner

### **Sosialt nettverk og aktivitetsfeed** 
Hold deg oppdatert med personlig tilpasset innhold, publiser oppdateringer, bilder og dokumenter, og engasjer deg med andres innlegg gjennom kommentarer, likerklikk og delinger.

### **Prosjekthåndtering** 
Utforsk både pågående og fullførte prosjekter. Hver prosjektside viser mål, tidslinjer og teaminformasjon, og du kan både delta i eksisterende prosjekter og foreslå nye.

### **Bedriftsportefølje** 
I bedriftskatalogen finner du medlemsbedrifter med detaljerte profiler, tjenestebeskrivelser og kontaktinformasjon. Se deres prosjektarkiv og send direkte henvendelser.

### **Meldinger** 
Bruk det innebygde private meldingssystemet for sikker, organisert kommunikasjon. Mappestruktur, søkefunksjon og samtaleoversikt hjelper deg med å finne frem raskt.

### **Arrangementer** 
Få full oversikt over kommende bransjebegivenheter i kalender- eller listevisning. Filtrer på type, sted og arrangør, og hold styr på deltakelse med RSVP-funksjonalitet.

### **Brukerprofiler** 
Skreddersy din profesjonelle profil med ferdigheter, erfaringer og sertifiseringer. Følg din egen aktivitetsstatistikk og se din prosjektdeltakelseshistorikk.
<br></br>
# Komme i gang

### Forutsetninger
* Moderne nettleser (Chrome, Firefox, Safari, Edge)
* Lokal webserver for testing (valgfritt)

### Installasjon
1. Klon repositoryet:

```
git clone https://github.com/TriggeredBanana/DiginConnect.git
```

2. Naviger til prosjektmappen:

```
cd DiginConnect
```

3. Åpne applikasjonen:
   * Åpne `login.html` direkte i nettleseren, eller
   * Start en lokal webserver og gå til `http://localhost:<port>/login.html`

### Utviklingsoppsett
Ingen byggeprosess er nødvendig da dette er en statisk HTML/CSS/JS-applikasjon. Gjør endringer direkte i kildefilene og oppdater nettleseren for å se resultatet.
<br></br>
# Brukerveiledning

### Opprette konto
Gå til `register.html`, fyll inn dine opplysninger, aksepter brukervilkårene og trykk på **Register**.

### Logge inn
Åpne `login.html`, skriv inn e-post og passord, og klikk på **Sign In**.

### Utforske prosjekter
Besøk `projects.html`. Bruk filtreringspanelet til å begrense visningen, eller søk etter prosjekter via søkefeltet. Klikk på et prosjektkort for å få detaljer.

### Se bedriftsprofiler
Gå til `companies.html`. Bla eller søk frem ønsket bedrift, og klikk **View Company** for mer informasjon.

### Meldinger
Åpne `messages.html`, naviger mellom mapper i sidepanelet, og start nye samtaler med meldingsknappen. Bruk søkefeltet for å finne gamle samtaler.

### Administrere profil
På `profile.html` legger du til ferdigheter, prosjekter og sertifiseringer. Bruk rediger-knappen for å oppdatere informasjon og følg dine engasjementsmålinger.
<br></br>
# Nåværende status
Dette er en frontend-prototype som viser brukergrensesnitt og interaksjoner. Backend-funksjonalitet er ikke implementert; prototypen benytter statiske data for demonstrasjon.
<br></br>
# Fremtidige utvidelser
* Integrasjon med backend og database
* Sanntidsvarslinger
* Avanserte søke- og filtreringsmuligheter
* Mobilapplikasjon
* Analysedashboard for selskaper og prosjektledere
* Integrasjon med tredjepartstjenester
