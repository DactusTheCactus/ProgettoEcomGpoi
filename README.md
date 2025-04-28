# GpoiEcomBackend

## Panoramica

GpoiEcomBackend è un'applicazione backend basata su Node.js e sviluppata con TypeScript. Utilizza Express.js per la gestione delle richieste HTTP e Firebase Admin SDK per l'autenticazione, il database e l'integrazione con Firestore. L'applicazione è progettata per fornire un backend robusto e scalabile per una piattaforma di e-commerce.

## Funzionalità

- **Express.js**: Framework web leggero e flessibile per la creazione di API.
- **Firebase Admin SDK**: Integrazione con Firebase per l'autenticazione, Firestore e Realtime Database.
- **TypeScript**: Linguaggio fortemente tipizzato per una migliore qualità e manutenibilità del codice.
- **Configurazione dell'Ambiente**: Utilizza il file .env per la gestione di credenziali sensibili e configurazioni.

## Prerequisiti

- **Node.js**: Assicurati di avere Node.js installato (versione 14 o successiva raccomandata).
- **npm**: Incluso con Node.js per la gestione delle dipendenze.
- **Progetto Firebase**: Un progetto Firebase con le credenziali necessarie.

## Installazione

1. Clona il repository:
   ```bash
   git clone <repository-url>
   cd GpoiEcomBackend
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Installa TypeScript e le definizioni dei tipi per lo sviluppo:
   ```bash
   npm install --save-dev typescript @types/node @types/express @types/cors
   ```

## Esecuzione dell'Applicazione

1. Compila ed esegui l'applicazione:
   ```bash
   npx ts-node src/index.ts
   ```

2. Il backend verrà avviato sulla porta specificata nel file .env (predefinito: `3001`).

## Struttura del Progetto

```
GpoiEcomBackend/
├── src/
│   └── index.ts        # Punto di ingresso principale dell'applicazione
├── .env                # Variabili d'ambiente
├── package.json        # Dipendenze e script del progetto
├── tsconfig.json       # Configurazione di TypeScript
```

## Endpoint API

### Middleware

- **`verifyFirebaseToken`**: Middleware per verificare i token di autenticazione Firebase.

### Esempi di Route

- **`GET /`**: Placeholder per l'endpoint principale.
- **`POST /example`**: Endpoint di esempio per la gestione delle richieste POST.

## Sviluppo

### Configurazione di TypeScript

Il file tsconfig.json è configurato con le seguenti opzioni:
- `esModuleInterop`: Abilita la compatibilità con i moduli CommonJS.
- `strict`: Applica regole di controllo dei tipi rigorose.

### Linting e Formattazione

Installa ESLint e Prettier per la qualità e la formattazione del codice:
```bash
npm install --save-dev eslint prettier
```

## Deploy

1. Compila l'applicazione:
   ```bash
   npm run build
   ```

2. Distribuisci i file JavaScript compilati sul tuo server o piattaforma cloud.

## Risoluzione dei Problemi

- **Definizioni dei Tipi Mancanti**: Installa le definizioni dei tipi mancanti usando `npm install --save-dev @types/<nome-modulo>`.
- **Errori di Firebase**: Assicurati che il file .env contenga credenziali Firebase valide.
