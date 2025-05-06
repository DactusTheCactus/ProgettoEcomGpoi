# Anzanation E-commerce

## Panoramica

Anzanation è un'applicazione e-commerce moderna sviluppata con Svelte e TypeScript. Il frontend offre un'esperienza utente elegante e reattiva, mentre il backend è costruito con Node.js e Firebase per gestire autenticazione, database e storage.

## Caratteristiche Frontend

- **Svelte**: Framework reattivo per un'interfaccia utente performante e fluida
- **TypeScript**: Tipizzazione statica per uno sviluppo più robusto
- **Vite**: Build tool moderno per uno sviluppo veloce
- **Firebase Integration**: Autenticazione utenti e gestione dati in tempo reale
- **Responsive Design**: Interfaccia adattiva con animazioni fluide
- **Cart System**: Gestione del carrello con stato persistente
- **Routing**: Navigazione SPA con svelte-spa-router

## Prerequisiti

- **Node.js**: Versione 14 o successiva
- **npm**: Package manager per Node.js
- **Progetto Firebase**: Credenziali Firebase per autenticazione e database

## Installazione

1. Clona il repository:
   ```bash
   git clone <repository-url>
   cd ProgettoEcomGpoi
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Configura Firebase:
   - Crea un progetto Firebase
   - Copia le credenziali nel file `src/lib/firebase.ts`

## Sviluppo

Avvia il server di sviluppo:
```bash
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173`

## Struttura del Progetto

```
ProgettoEcomGpoi/
├── src/
│   ├── lib/           # Componenti e utilities condivisi
│   │   ├── Auth.svelte    # Componente autenticazione
│   │   ├── Cart.svelte    # Componente carrello
│   │   ├── firebase.ts    # Configurazione Firebase
│   │   └── stores.ts      # Store Svelte
│   ├── routes/        # Componenti pagina
│   │   └── Home.svelte    # Homepage
│   ├── App.svelte     # Componente root
│   └── main.ts        # Entry point
├── public/            # Asset statici
├── index.html         # HTML template
└── vite.config.ts     # Configurazione Vite
```

## Scripts

- `npm run dev`: Avvia il server di sviluppo
- `npm run build`: Compila l'applicazione per la produzione
- `npm run preview`: Anteprima della build di produzione
- `npm run check`: Verifica i tipi TypeScript

## Backend Integration

Il frontend comunica con un backend Node.js/Express che:
- Gestisce le richieste API per i prodotti
- Integra Firebase Admin SDK
- Gestisce autenticazione e autorizzazione
- Fornisce endpoints RESTful

L'API backend è configurata per girare sulla porta 3001 ed espone endpoints per:
- Gestione prodotti
- Autenticazione utenti
- Gestione ordini

## Deploy

1. Compila l'applicazione:
   ```bash
   npm run build
   ```

2. I file compilati saranno nella cartella `dist/`

3. Distribuisci i file su un servizio di hosting statico (es. Firebase Hosting, Vercel, Netlify)

## Risoluzione Problemi

- **Errori TypeScript**: Verifica che tutte le definizioni dei tipi siano corrette
- **Problemi Firebase**: Controlla le credenziali e le regole di sicurezza
- **Errori di Build**: Assicurati che tutte le dipendenze siano installate correttamente

## Contributing

1. Fork il repository
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit i cambiamenti (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request
