if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js')
          .then(registration => {
              console.log('Service Worker registrato con successo:', registration);
          })
          .catch(error => {
              console.error('Registrazione del Service Worker fallita:', error);
          });
  });
}

const state = {
  // Profilo utente (definito sia in "authenticatedUser" che "userProfile")
  authenticatedUser: {
    name: "Ciro Esposito",
    email: "ciro.esposito@esempio.com",
    avatar: "",
    level: 8,
    totalPoints: 1240,
    stats: {
      itemsRecycled: 87,
      co2Saved: "34.5 kg",
      streakDays: 12,
      challenges: { completed: 8, total: 10 }
    },
    preferences: {
      notifiche: true,
      condivisionePosizione: true,
      reportSettimanale: true,
      condivisioneDati: false
    }
  },
  userProfile: {
    name: "Ciro Esposito",
    email: "ciro.esposito@esempio.com",
    avatar: "",
    level: 8,
    totalPoints: 1240,
    stats: {
      itemsRecycled: 87,
      co2Saved: "34.5 kg",
      streakDays: 12,
      challenges: { completed: 8, total: 10 }
    },
    preferences: {
      notifiche: true,
      condivisionePosizione: true,
      reportSettimanale: true,
      condivisioneDati: false
    }
  },
  users: [],
  activeTab: 'scanner',      // 'scanner', 'info', 'rewards', 'community', 'map'
  activePage: null,          // ad es. 'profile', 'points', 'settings', 'guideDetail'
  darkMode: false,
  isMenuOpen: false,
  showCamera: false,
  showResult: false,
  selectedImage: null,
  cameraStream: null,
  loading: false,
  currentCamera: 'environment', // 'environment' = posteriore, 'user' = anteriore
  roboflowResult: null,
  scanMaterialData: null,
  scanHistory: [],
  posts: [
    {
      id: 1,
      user: "Maria Rossi",
      time: "2 ore fa",
      content: "Ho appena scoperto un nuovo modo per riutilizzare le bottiglie in plastica! Ecco il risultato:",
      likes: 24,
      commentsList: [],
      liked: false
    },
    {
      id: 2,
      user: "Luca Bianchi",
      time: "5 ore fa",
      content: "Qualcuno sa dove posso trovare informazioni sui centri di raccolta RAEE?",
      likes: 8,
      commentsList: [],
      liked: true
    },
    {
      id: 3,
      user: "Giulia Verdi",
      time: "1 giorno fa",
      content: "Ho completato la sfida settimanale! Ecco il risultato della mia attività di riciclo.",
      likes: 42,
      commentsList: [],
      liked: false
    }
  ],
  rewards: [
    {
      id: 1,
      category: "discount",
      name: "Sconto 10% BioShop",
      points: 200,
      expiry: "31/04/2025",
      description: "10% di sconto su tutti i prodotti eco-sostenibili.",
      partner: "BioShop"
    },
    {
      id: 2,
      category: "experience",
      name: "Workshop Riciclo Creativo",
      points: 350,
      expiry: "15/04/2025",
      description: "Partecipa al workshop di riciclo creativo con esperti del settore.",
      partner: "EcoLab"
    },
    {
      id: 3,
      category: "product",
      name: "Borraccia Ecologica",
      points: 500,
      expiry: "Senza scadenza",
      description: "Borraccia in acciaio inox riutilizzabile.",
      partner: "GreenProducts"
    }
  ],
  challenges: [
    { id: 1, name: "Ricicla 10 bottiglie di plastica", progress: 4, total: 10, points: 50, deadline: "21/03/2025" },
    { id: 2, name: "Visita 3 centri di riciclo", progress: 1, total: 3, points: 75, deadline: "25/03/2025" },
    { id: 3, name: "Condividi 5 consigli eco", progress: 2, total: 5, points: 60, deadline: "30/03/2025" }
  ],
  guides: [
    {
      id: 1,
      title: "Guida per la Plastica",
      content: `<p>La plastica riciclabile si riferisce principalmente agli imballaggi in plastica, identificati spesso dai codici come PET, HDPE, PVC, LDPE, PP, PS, ecc. Questi codici indicano il tipo di polimero, ad esempio:</p>
  <p><strong>PET (Polietilene tereftalato):</strong> usato per bottiglie per bevande.</p>
  <p><strong>HDPE (Polietilene ad alta densità):</strong> presente in flaconi per detergenti e prodotti per la cura personale.</p>
  <p><strong>PVC (Cloruro di polivinile):</strong> impiegato in alcuni contenitori rigidi, anche se meno comune negli imballaggi alimentari.</p>
  <p><strong>LDPE (Polietilene a bassa densità):</strong> tipico per buste e pellicole.</p>
  <p><strong>PP (Polipropilene):</strong> utilizzato in vasetti per yogurt, tappi e contenitori per alimenti.</p>
  <p><strong>PS (Polistirene):</strong> usato in vaschette in polistirolo espanso e stoviglie monouso.</p>
  <h4><strong>Buone pratiche per la raccolta:</strong></h4>
  <ul>
    <li>Conferire solo imballaggi in plastica nel contenitore dedicato, evitando oggetti che non sono destinati a questo flusso.</li>
    <li>Svuotare bene bottiglie e confezioni dai residui; non è necessario lavarli a fondo, basta che siano vuoti.</li>
    <li>Schiacciare o comprimere le bottiglie per ridurre il volume e facilitare il trasporto.</li>
    <li>Utilizzare, se possibile, sacchetti trasparenti per consentire agli operatori di verificare il contenuto.</li>
  </ul>
  <h4><strong>Cosa si può riciclare:</strong></h4>
  <ul>
    <li>Bottiglie, flaconi e contenitori per bevande o detergenti.</li>
    <li>Vaschette, imballaggi e confezioni per alimenti.</li>
    <li>Buste e sacchetti di plastica puliti.</li>
    <li>Imballaggi misti (ad esempio, tappi rivestiti) se conferiti nel flusso corretto.</li>
  </ul>
  <h4><strong>Cosa non si può riciclare:</strong></h4>
  <ul>
    <li>Oggetti in plastica non destinati a imballaggi (giocattoli, articoli di cancelleria, utensili, elettrodomestici).</li>
    <li>Stoviglie compostabili (se specificate per il compostaggio) non vanno nel flusso della plastica.</li>
    <li>Imballaggi contaminati da cibi o oli in eccesso.</li>
    <li>Materiali plastici non riciclabili (es. gommapiuma non da imballaggio).</li>
  </ul>`
    },
    {
      id: 2,
      title: "Guida per la Carta",
      content: `<p>La carta comprende giornali, riviste, fogli, quaderni, scatole in cartoncino e altri materiali cellulosici. Spesso si parla di “carta e cartone” perché, pur essendo simili, richiedono attenzioni diverse.</p>
  <h4><strong>Sottocategorie:</strong></h4>
  <ul>
    <li><strong>Carta da ufficio e quaderni:</strong> fogli, fotocopie, quaderni (senza spirali metalliche).</li>
    <li><strong>Giornali e riviste:</strong> quotidiani, riviste, opuscoli (rimuovere eventuali imballi in plastica).</li>
    <li><strong>Cartoncino rigido:</strong> scatole per alimenti, imballaggi di cartone pressato.</li>
    <li><strong>Cartone ondulato:</strong> scatoloni da spedizione o trasloco.</li>
    <li><strong>Carta da pacchi e buste:</strong> carta non plastificata usata per imballaggi.</li>
  </ul>
  <h4><strong>Buone pratiche:</strong></h4>
  <ul>
    <li>Assicurarsi che la carta e il cartone siano puliti e asciutti; evitare quelli sporchi o troppo umidi.</li>
    <li>Appiattire scatole e scatoloni per ridurne il volume.</li>
    <li>Non utilizzare sacchetti di plastica: preferire contenitori o sacchetti di carta.</li>
    <li>Separare eventuali parti non cartacee (come spirali metalliche o copertine plastificate).</li>
  </ul>
  <h4><strong>Cosa si può riciclare:</strong></h4>
  <ul>
    <li>Giornali, riviste, libri e quaderni.</li>
    <li>Scatole di cartoncino per alimenti (se prive di residui di cibo).</li>
    <li>Cartone ondulato appiattito e pulito.</li>
    <li>Buste di carta e imballaggi trasparenti.</li>
  </ul>
  <h4><strong>Cosa non si può riciclare:</strong></h4>
  <ul>
    <li>Carta plastificata, metallizzata o oleata (es. carta forno, carta regalo).</li>
    <li>Carta sporca o contaminata da cibi e liquidi.</li>
    <li>Scontrini termici (trattati chimicamente).</li>
    <li>Piatti e bicchieri di carta con rivestimenti non compostabili.</li>
  </ul>`
    },
    {
      id: 3,
      title: "Guida per il Vetro",
      content: `<p>Il vetro è un materiale riciclabile al 100% e può essere riciclato infinite volte, purché raccolto in modo selettivo.</p>
  <h4><strong>Sottocategorie:</strong></h4>
  <ul>
    <li><strong>Bottiglie:</strong> contenitori per bevande in vari colori (trasparente, verde, marrone).</li>
    <li><strong>Vasetti e barattoli:</strong> per conserve, salse, omogeneizzati; si consiglia di rimuovere coperchi (che vanno separati).</li>
    <li><strong>Vetro piano:</strong> piccoli frammenti di vetro, ad esempio da bicchieri rotti.</li>
  </ul>
  <h4><strong>Buone pratiche:</strong></h4>
  <ul>
    <li>Conferire solo bottiglie e vasetti vuoti nel contenitore del vetro.</li>
    <li>Svuotare completamente gli imballaggi da residui di cibo.</li>
    <li>Rimuovere tappi e coperchi: quelli in plastica o metallo vanno separati e raccolti nel flusso corretto.</li>
    <li>Non utilizzare sacchetti di plastica per il vetro: conferire direttamente o con sacchetti di carta.</li>
  </ul>`
    },
    {
      id: 4,
      title: "Guida per l'Umido (Organico)",
      content: `<p>La frazione umida include tutti gli scarti alimentari e biodegradabili, che possono essere trasformati in compost. È fondamentale separare correttamente questi rifiuti per ottenere fertilizzante naturale e ridurre l'impatto ambientale.</p>
  <h4><strong>Sottocategorie:</strong></h4>
  <ul>
    <li><strong>Scarti alimentari:</strong> avanzi di cibo, bucce, resti di frutta e verdura, pane, pasta, ecc.</li>
    <li><strong>Scarti di origine animale:</strong> piccole ossa, lische, gusci d’uovo.</li>
    <li><strong>Scarti vegetali:</strong> fondi di caffè, filtri di tè, tovaglioli di carta usati, carta da cucina unta.</li>
    <li><strong>Bioplastiche compostabili:</strong> sacchetti, stoviglie e imballaggi certificati compostabili.</li>
  </ul>
  <h4><strong>Buone pratiche:</strong></h4>
  <ul>
    <li>Utilizzare sacchetti biodegradabili certificati per raccogliere l’umido.</li>
    <li>Sgocciolare gli scarti molto umidi per evitare perdite e cattivi odori.</li>
    <li>Non comprimere eccessivamente il rifiuto, per favorire la degradazione aerobica.</li>
    <li>Tenere il contenitore ben chiuso e in un luogo aerato.</li>
    <li>Conferire l’umido secondo il calendario comunale.</li>
  </ul>
  <h4><strong>Cosa si può conferire:</strong></h4>
  <ul>
    <li>Tutti i residui di cibo, sia crudi sia cotti.</li>
    <li>Scarti vegetali, foglie e potature.</li>
    <li>Materiali compostabili certificati (sacchetti, stoviglie).</li>
  </ul>
  <h4><strong>Cosa non si può conferire:</strong></h4>
  <ul>
    <li>Materiali non biodegradabili (plastica tradizionale, metalli, vetro).</li>
    <li>Oli e liquidi in eccesso.</li>
    <li>Rifiuti pericolosi o contaminati.</li>
    <li>Grandi quantità di un singolo tipo di scarto.</li>
  </ul>`
    },
    {
      id: 5,
      title: "Guida per il Cartone",
      content: `<p>Il cartone è un materiale cellulosico utilizzato soprattutto per imballaggi e scatole. Pur essendo riciclabile, va trattato con attenzione per mantenere alta la qualità del riciclo.</p>
  <h4><strong>Sottocategorie:</strong></h4>
  <ul>
    <li><strong>Cartone ondulato:</strong> scatole da imballaggio e trasloco.</li>
    <li><strong>Cartoncino rigido:</strong> astucci, copertine di quaderni e album.</li>
    <li><strong>Imballaggi alimentari in cartone:</strong> scatole per pizza, contenitori per torte, vassoi per alimenti.</li>
    <li><strong>Cartoni per bevande:</strong> contenitori tipo Tetrapak.</li>
  </ul>
  <h4><strong>Buone pratiche:</strong></h4>
  <ul>
    <li>Rimuovere adesivi, nastri e contaminanti.</li>
    <li>Appiattire scatole e scatoloni per ridurne il volume.</li>
    <li>Se la scatola è sporca, rimuovere le parti contaminate e conferire il resto pulito.</li>
    <li>Non lasciare il cartone bagnato.</li>
  </ul>
  <h4><strong>Cosa si può riciclare:</strong></h4>
  <ul>
    <li>Scatole, imballaggi e contenitori in cartone puliti e asciutti.</li>
    <li>Cartoni per bevande (se previsto dalla raccolta locale).</li>
  </ul>
  <h4><strong>Cosa non si può riciclare:</strong></h4>
  <ul>
    <li>Cartone pesantemente sporco o impregnato di liquidi.</li>
    <li>Cartone cerato o plastificato non compostabile.</li>
    <li>Materiali compositi non separabili.</li>
  </ul>`
    },
    {
      id: 6,
      title: "Guida per i Tessuti",
      content: `<p>I rifiuti tessili includono abiti, tessuti per la casa e scampoli di stoffa. Il loro recupero permette sia il riuso sia il riciclo in nuovi prodotti.</p>
  <h4><strong>Sottocategorie:</strong></h4>
  <ul>
    <li><strong>Abbigliamento:</strong> vestiti, scarpe, accessori.</li>
    <li><strong>Tessili per la casa:</strong> lenzuola, asciugamani, tende, coperte, tappezzeria.</li>
    <li><strong>Scampoli e ritagli:</strong> avanzi di stoffa da sartoria o produzione industriale.</li>
    <li><strong>Borse e accessori:</strong> zaini e borse, anche se danneggiati.</li>
  </ul>
  <h4><strong>Buone pratiche:</strong></h4>
  <ul>
    <li>Lavare e asciugare gli indumenti prima di donarli o conferirli.</li>
    <li>Separare i tessuti in buono stato da quelli deteriorati.</li>
    <li>Utilizzare contenitori specifici per la raccolta di abiti usati.</li>
    <li>Evitare di lasciare sacchi di vestiti all’aperto.</li>
  </ul>
  <h4><strong>Cosa si può recuperare:</strong></h4>
  <ul>
    <li>Vestiti usati in buono stato da donare o vendere come usato.</li>
    <li>Tessuti per la casa utili per il riuso.</li>
    <li>Scampoli per il riciclo in pannelli isolanti o imbottiture.</li>
  </ul>
  <h4><strong>Cosa non si può riciclare:</strong></h4>
  <ul>
    <li>Tessuti molto sporchi o bagnati.</li>
    <li>Tessuti contaminati da sostanze chimiche.</li>
    <li>Materiali sanitari tessili (pannolini, assorbenti).</li>
    <li>Pelli o cuoio non separabili dagli abiti.</li>
  </ul>`
    },
    {
      id: 7,
      title: "Guida per il Metallo",
      content: `<p>I metalli riciclabili comprendono principalmente gli imballaggi metallici e altri oggetti in alluminio o acciaio.</p>
  <h4><strong>Sottocategorie:</strong></h4>
  <ul>
    <li><strong>Alluminio:</strong> lattine, scatolette, fogli di alluminio.</li>
    <li><strong>Acciaio:</strong> barattoli e scatolette per alimenti, coperchi, tappi.</li>
    <li><strong>Altri metalli ferrosi:</strong> piccoli oggetti in ferro o acciaio.</li>
    <li><strong>Metalli non ferrosi:</strong> rame, ottone, ecc.</li>
  </ul>
  <h4><strong>Buone pratiche:</strong></h4>
  <ul>
    <li>Sciacquare rapidamente i contenitori per rimuovere residui.</li>
    <li>Schiacciare lattine per ridurre il volume.</li>
    <li>Separare eventuali parti di materiali diversi.</li>
    <li>Seguire le indicazioni locali per la raccolta dei metalli.</li>
  </ul>
  <h4><strong>Cosa si può riciclare:</strong></h4>
  <ul>
    <li>Lattine, scatolette e barattoli in alluminio e acciaio, se vuoti.</li>
    <li>Fogli di alluminio usati.</li>
    <li>Tappi e coperchi metallici.</li>
    <li>Bomboletta spray esaurita, se non contenente sostanze pericolose.</li>
  </ul>
  <h4><strong>Cosa non si può riciclare:</strong></h4>
  <ul>
    <li>Contenitori con residui pericolosi o pieni di prodotto.</li>
    <li>Oggetti di grandi dimensioni in metallo.</li>
    <li>Elettrodomestici (da smaltire tramite la filiera RAEE).</li>
    <li>Oggetti composti da metallo e altri materiali inseparabili.</li>
  </ul>`
    },
    {
      id: 8,
      title: "Guida per i Rifiuti Biodegradabili",
      content: `<p>I rifiuti biodegradabili comprendono i materiali che si decompongono naturalmente grazie ai microrganismi.</p>
  <h4><strong>Sottocategorie:</strong></h4>
  <ul>
    <li><strong>Rifiuti organici domestici:</strong> avanzi di cibo, bucce, resti di frutta e verdura.</li>
    <li><strong>Rifiuti verdi:</strong> foglie, erba tagliata, potature.</li>
    <li><strong>Legno non trattato:</strong> piccoli pezzi di legno naturale.</li>
    <li><strong>Materiali compostabili:</strong> bioplastiche e prodotti certificati compostabili.</li>
  </ul>
  <h4><strong>Buone pratiche:</strong></h4>
  <ul>
    <li>Separare i rifiuti biodegradabili dagli altri materiali.</li>
    <li>Utilizzare sacchetti compostabili certificati o contenitori riutilizzabili.</li>
    <li>Prediligere il mulching per i rifiuti verdi.</li>
    <li>Avviare un compostaggio domestico, se possibile.</li>
  </ul>
  <h4><strong>Cosa si può riciclare/compostare:</strong></h4>
  <ul>
    <li>Residui di cucina e alimentari, inclusi imballaggi biodegradabili.</li>
    <li>Rifiuti verdi e piccole potature.</li>
    <li>Legno non trattato in piccole quantità.</li>
    <li>Carta e cartone contaminati da cibo (se ammessi nei programmi di compostaggio locale).</li>
  </ul>
  <h4><strong>Cosa non si può conferire:</strong></h4>
  <ul>
    <li>Materiali plastici non compostabili.</li>
    <li>Metalli, vetro o altri materiali non biodegradabili.</li>
    <li>Legno trattato o verniciato.</li>
    <li>Sacchetti "bio" non certificati compostabili.</li>
  </ul>`
    }
  ],
  searchTerm: "",
  activeGuide: null,
  cameraStream: null,
  userLocation: null,
  mapLoaded: false,
  historyOpen: false,
  commentText: "",
  activeReplyTarget: null,  // { postId, commentId } oppure { isNewPost: true }
  showCommentModal: false,
  commentIdCounter: 4 // Iniziamo da 4 per evitare conflitti con gli ID dei post iniziali
};

/*Mostra un popup temporaneo con un messaggio. 
Il parametro "type" determina lo stile (es. successo, errore o blu). 
Dopo alcuni secondi il popup sbiadisce ed è rimosso dal DOM.*/
function showPopup(message, type) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerText = message;
  if (type === "blue") {
    popup.classList.add("bg-blue-500");
  } else if (type === "success") {
    popup.classList.add("greenbrain-bg");
  } else if (type === "error") {
    popup.classList.add("bg-red-500");
  }
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.style.animation = "fadeOut 0.5s forwards";
    setTimeout(() => { popup.remove(); }, 500);
  }, 3000);
}

/*Crea e visualizza una finestra di conferma con due bottoni ("Conferma" e "Annulla"). 
Ritorna una Promise che risolve a true se l'utente conferma e a false se annulla.*/
function showConfirmPopup(message, type) {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    container.className = "confirm-popup";
    container.innerHTML = `
      <span>${message}</span>
      <div>
        <button id="confirmBtn">Conferma</button>
        <button id="cancelBtn">Annulla</button>
      </div>
    `;
    document.body.appendChild(container);
    document.getElementById("confirmBtn").addEventListener("click", () => {
      container.remove();
      resolve(true);
    });
    document.getElementById("cancelBtn").addEventListener("click", () => {
      container.remove();
      resolve(false);
    });
  });
}

/*Riceve una stringa identificante un materiale e restituisce un oggetto contenente informazioni come traduzione, 
tempo di decomposizione, inquinamento, biodegradabilità e consigli ecologici. 
Se il materiale non viene riconosciuto, restituisce valori di default.*/
function getMaterialInfo(material) {
  const key = material.trim().toUpperCase();
  const materialInfo = {
    "PLASTIC": {
      translated: "Plastica",
      decomposition: "450 anni",
      pollution: "Alto",
      biodegradability: "15%",
      advice: [
        "Riutilizza la bottiglia più volte",
        "Considera alternative come borracce",
        "Schiaccia la bottiglia per ottimizzare spazio"
      ]
    },
    "BIODEGRADABLE": {
      translated: "Biodegradabile",
      decomposition: "30 giorni",
      pollution: "Basso",
      biodegradability: "100%",
      advice: [
        "Usa compost",
        "Controlla le etichette",
        "Separa correttamente"
      ]
    },
    "CARDBOARD": {
      translated: "Cartone",
      decomposition: "2-6 settimane",
      pollution: "Moderato",
      biodegradability: "Alto",
      advice: [
        "Appiattisci il cartone",
        "Rimuovi eventuali nastri adesivi",
        "Ricicla insieme alla carta"
      ]
    },
    "CLOTH": {
      translated: "Tessuto",
      decomposition: "5-7 mesi",
      pollution: "Basso",
      biodegradability: "Variabile",
      advice: [
        "Dona o ricicla",
        "Riutilizza come stracci",
        "Riduci gli sprechi"
      ]
    },
    "GLASS": {
      translated: "Vetro",
      decomposition: "Non si decompone",
      pollution: "Basso",
      biodegradability: "Non biodegradabile",
      advice: [
        "Porta il vetro in centri specializzati",
        "Non mescolarlo con altri rifiuti",
        "Riutilizza bottiglie se possibile"
      ]
    },
    "METAL": {
      translated: "Metallo",
      decomposition: "Non si decompone",
      pollution: "Variabile",
      biodegradability: "Non biodegradabile",
      advice: [
        "Raccogli e ricicla",
        "Verifica se è arrugginito",
        "Porta al centro di riciclo"
      ]
    },
    "PAPER": {
      translated: "Carta",
      decomposition: "2-6 settimane",
      pollution: "Basso",
      biodegradability: "Alto",
      advice: [
        "Raccogli carta pulita",
        "Evita carta sporca",
        "Ricicla insieme al cartone"
      ]
    }
  };
  return materialInfo[key] || { 
    translated: material, 
    decomposition: "N/A", 
    pollution: "N/A", 
    biodegradability: "N/A", 
    advice: ["Nessun consiglio disponibile"] 
  };
}

/*Imposta lo stato per aprire la modale di risposta ad un commento 
(o per un nuovo post, se commentId è null). 
Nasconde eventuali dropdown attivi e richiama il rendering dell'app.*/
function openReplyModal(postId, commentId) {
  state.activeReplyTarget = { postId, commentId };
  state.commentText = "";
  state.showCommentModal = true;
  // Nascondi il dropdown se aperto
  state.posts = state.posts.map(post => {
    if (post.id === postId) post.showDropdown = false;
    return post;
  });
  renderApp();
}

/*Configura lo stato per permettere la creazione di un nuovo post (senza riferimento a un commento esistente)
 e mostra la modale per inserire il commento.*/
function openNewPostModal() {
  state.activeReplyTarget = { isNewPost: true };
  state.commentText = "";
  state.showCommentModal = true;
  renderApp();
}

/*Gestisce l'invio sia di un nuovo post sia di una risposta a un commento esistente. Valida il testo, 
aggiorna lo stato (inserendo il nuovo commento nell'array del post) e mostra un popup di conferma.*/
function submitComment() {
  if (state.commentText.trim() === "") {
    showPopup("Il commento non può essere vuoto.", "error");
    return;
  }
  if (state.activeReplyTarget && state.activeReplyTarget.isNewPost) {
    const newPost = {
      id: state.commentIdCounter++,
      user: state.userProfile.name,
      time: new Date().toLocaleString('it-IT', { hour: '2-digit', minute: '2-digit' }),
      content: state.commentText,
      likes: 0,
      commentsList: [],
      liked: false
    };
    state.posts.unshift(newPost);
  } else {
    const { postId, commentId } = state.activeReplyTarget;
    let post = state.posts.find(p => p.id === postId);
    if (!post) return;
    const newComment = {
      id: state.commentIdCounter++,
      user: state.userProfile.name,
      text: state.commentText,
      time: new Date().toLocaleString('it-IT', { hour: '2-digit', minute: '2-digit' }),
      replies: []
    };
    if (commentId === null) {
      if (!post.commentsList) post.commentsList = [];
      post.commentsList.push(newComment);
    } else {
      let parentComment = findComment(post, commentId);
      if (parentComment) {
        if (!parentComment.replies) parentComment.replies = [];
        parentComment.replies.push(newComment);
      } else {
        post.commentsList.push(newComment);
      }
    }
  }
  state.showCommentModal = false;
  state.activeReplyTarget = null;
  state.commentText = "";
  showPopup("Commento aggiunto con successo", "success");
  renderApp();
}

/*Cerca ricorsivamente un commento all'interno di un post (nell'array commentsList) 
dato il suo ID e lo restituisce se trovato.*/
function findComment(post, commentId) {
  if (!post.commentsList) return null;
  for (let comment of post.commentsList) {
    if (comment.id === commentId) return comment;
    let found = findCommentInReplies(comment, commentId);
    if (found) return found;
  }
  return null;
}

/*Funzione ricorsiva ausiliaria che cerca all'interno dell'array replies di un commento 
(e nelle sue eventuali risposte) il commento con l'ID specificato.*/
function findCommentInReplies(comment, commentId) {
  if (!comment.replies) return null;
  for (let reply of comment.replies) {
    if (reply.id === commentId) return reply;
    let found = findCommentInReplies(reply, commentId);
    if (found) return found;
  }
  return null;
}

/*Permette di espandere o nascondere le risposte di un commento, 
modificando lo stato "expanded". Richiama il rendering per aggiornare l'interfaccia.*/
function toggleReplies(postId, commentId) {
  let post = state.posts.find(p => p.id === postId);
  if (!post) return;
  let comment = findComment(post, commentId);
  if (comment) {
    comment.expanded = !comment.expanded;
    renderApp();
  }
}

/*Resetta le variabili di stato collegate alla modale 
del commento e nasconde la modale, rinfrescando la UI.*/
function cancelComment() {
  state.showCommentModal = false;
  state.activeReplyTarget = null;
  state.commentText = "";
  renderApp();
}

/*Aggiorna il testo del commento nel relativo stato ogni volta
 che l'utente digita nella textarea della modale.*/
function updateCommentText(event) {
  state.commentText = event.target.value;
}

/*Restituisce una stringa HTML per la modale in cui l’utente può scrivere un commento o creare un nuovo post. 
Il titolo cambia in base al contesto (nuovo post o risposta).*/
function renderCommentModal() {
  let title = "Aggiungi commento";
  if (state.activeReplyTarget && state.activeReplyTarget.isNewPost) {
    title = "Nuovo post";
  } else if (state.activeReplyTarget && state.activeReplyTarget.commentId !== null) {
    title = "Rispondi al commento";
  }
  return `
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="${state.darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg w-11/12 max-w-md">
        <h3 class="text-xl font-bold mb-4">${title}</h3>
        <textarea class="w-full border p-2 rounded mb-4 text-gray-800 whitespace-normal break-words" rows="4" placeholder="Scrivi il tuo commento..." oninput="updateCommentText(event)">${state.commentText}</textarea>
        <div class="flex justify-end space-x-2">
          <button class="px-4 py-2 bg-gray-500 text-white rounded" onclick="cancelComment()">Annulla</button>
          <button class="px-4 py-2 greenbrain-bg text-white rounded" onclick="submitComment()">Invia</button>
        </div>
      </div>
    </div>
  `;
}

/*Procedura che genera in HTML l’elenco dei commenti 
(e, in caso, delle relative risposte) per un post.*/
function renderComments(post) {
  if (!post.commentsList || post.commentsList.length === 0) return "";
  return `<div class="ml-4 mt-2 border-l pl-2">
    ${post.commentsList.map(comment => renderComment(comment, post.id)).join('')}
  </div>`;
}

/*Genera il markup HTML per un singolo commento, includendo il pulsante per rispondere e 
(se presenti) il toggle per mostrare/nascondere le risposte.*/
function renderComment(comment, postId) {
  return `<div class="mb-2">
    <div class="flex justify-between items-start">
      <div>
        <p class="text-sm font-bold">${comment.user}</p>
        <p class="text-xs text-gray-500">${comment.time}</p>
        <p class="text-sm whitespace-normal break-words">${comment.text}</p>
      </div>
      <button class="text-sm text-blue-500 ml-2" onclick="openReplyModal(${postId}, ${comment.id})">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
    ${comment.replies && comment.replies.length > 0 ? `
      <button class="text-xs text-blue-500 flex items-center mt-1" onclick="toggleReplies(${postId}, ${comment.id})">
         <span>${comment.expanded ? 'Nascondi risposte' : 'Visualizza risposte (' + comment.replies.length + ')'}</span>
      </button>
      ${comment.expanded ? `<div class="ml-4 mt-1 border-l pl-2">
           ${comment.replies.map(reply => renderComment(reply, postId)).join('')}
         </div>` : ""}
    ` : ""}
  </div>`;
}

/*Costruisce l’intestazione dell’app, inclusi il logo, il titolo, il pulsante per attivare/disattivare 
la modalità dark e il menù a tendina per accedere alle pagine del profilo, punti e impostazioni.*/
function renderHeader() {
  return `
    <header class="py-4 px-6 flex justify-between items-center ${state.darkMode ? 'bg-gray-800' : 'greenbrain-bg'} text-white">
      <div class="flex items-center space-x-2">
        <img src="think-green.png" alt="GreenBrain Logo" class="w-8 h-8" />
        <div class="text-xl font-bold cursor-pointer" onclick="navigateTo('scanner'); state.activePage = null; renderApp();">
          GreenBrain
        </div>
        <div class="bg-white bg-opacity-20 rounded-full px-2 py-1 text-xs">Beta</div>
      </div>
      <div class="relative flex items-center">
        <button class="p-2 rounded hover:bg-white hover:bg-opacity-20" onclick="toggleDarkMode()">
  <img src="day-and-night.png" alt="Toggle Dark Mode" class="h-6 w-6" />
</button>
        <a href="product.html" class="p-2 rounded hover:bg-white hover:bg-opacity-20">
  <img src="shop.png" alt="Shop" class="w-6 h-6">
</a>
        <button class="p-2 rounded hover:bg-white hover:bg-opacity-20 ml-2" onclick="toggleMenu()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        ${state.isMenuOpen ? `
          <div class="absolute right-0 mt-60 w-48 rounded-md shadow-lg py-1 ${state.darkMode ? 'bg-gray-800' : 'bg-white'}">
            <a href="#profilo" class="block px-4 py-2 ${state.darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}" onclick="openPage('profile')">
              Profilo
            </a>
            <a href="#punti" class="block px-4 py-2 ${state.darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}" onclick="openPage('points')">
              I miei punti
            </a>
            <a href="#impostazioni" class="block px-4 py-2 ${state.darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-100'}" onclick="openPage('settings')">
              Impostazioni
            </a>
          </div>
        ` : ''}
      </div>
    </header>
  `;
}

/*Genera la barra di navigazione in fondo all’app. 
Se è attiva una pagina (state.activePage) non viene mostrata.*/
function renderNav() {
  if (state.activePage) return "";
  return `
    <nav class="${state.darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}">
      <div class="max-w-md mx-auto px-2">
        <div class="flex justify-around">
          <button class="flex flex-col items-center py-3 px-2 ${state.activeTab === 'scanner' ? 'greenbrain-text' : state.darkMode ? 'text-gray-400' : 'text-gray-500'}" onclick="navigateTo('scanner')">
            Scanner
          </button>
          <button class="flex flex-col items-center py-3 px-2 ${state.activeTab === 'info' ? 'greenbrain-text' : state.darkMode ? 'text-gray-400' : 'text-gray-500'}" onclick="navigateTo('info')">
            Guide
          </button>
          <button class="flex flex-col items-center py-3 px-2 ${state.activeTab === 'rewards' ? 'greenbrain-text' : state.darkMode ? 'text-gray-400' : 'text-gray-500'}" onclick="navigateTo('rewards')">
            Premi
          </button>
          <button class="flex flex-col items-center py-3 px-2 ${state.activeTab === 'community' ? 'greenbrain-text' : state.darkMode ? 'text-gray-400' : 'text-gray-500'}" onclick="navigateTo('community')">
            Community
          </button>
          <button class="flex flex-col items-center py-3 px-2 ${state.activeTab === 'map' ? 'greenbrain-text' : state.darkMode ? 'text-gray-400' : 'text-gray-500'}" onclick="navigateTo('map'); showMapConfirm();">
            Mappa
          </button>
        </div>
      </div>
    </nav>
  `;
}

/*Ritorna il markup HTML per la pagina del profilo dell’utente, 
visualizzando le informazioni personali, statistiche, e accessi rapidi ad altre sezioni.*/
function renderProfile() {
  return `
    <div class="max-w-md mx-auto p-4">
      <div class="rounded-lg p-4 mb-4 ${state.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md">
        <div class="flex items-center mb-6">
          <button class="p-2 rounded mr-2" onclick="openPage(null)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 class="text-xl font-bold">Il Mio Profilo</h2>
        </div>
        <div class="flex items-center mb-6">
          <div>
            <h3 class="font-bold text-lg">${state.userProfile.name}</h3>
            <p class="text-sm text-gray-500">${state.userProfile.email}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mb-6 p-4 rounded-lg ${state.darkMode ? 'bg-gray-700' : 'bg-gray-100'}">
          <div class="text-center">
            <p class="text-sm text-gray-500">Oggetti Riciclati</p>
            <p class="font-bold text-lg">${state.userProfile.stats.itemsRecycled}</p>
          </div>
          <div class="text-center">
            <p class="text-sm text-gray-500">CO₂ Risparmiata</p>
            <p class="font-bold text-lg">${state.userProfile.stats.co2Saved}</p>
          </div>
          <div class="text-center">
            <p class="text-sm text-gray-500">Giorni Consecutivi</p>
            <p class="font-bold text-lg">${state.userProfile.stats.streakDays}</p>
          </div>
          <div class="text-center">
            <p class="text-sm text-gray-500">Sfide Completate</p>
            <p class="font-bold text-lg">${state.userProfile.stats.challenges.completed}/${state.userProfile.stats.challenges.total}</p>
          </div>
        </div>
        <div>
          <h3 class="font-bold mb-3">Account</h3>
          <div class="p-3 rounded-lg mb-2 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-100'}">
            <div class="flex justify-between items-center py-2 cursor-pointer" onclick="openPage('points')">
              <span>I miei punti</span>
              <span>></span>
            </div>
            <div class="flex justify-between items-center py-2 cursor-pointer" onclick="openPage('settings')">
              <span>Impostazioni</span>
              <span>></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/*Crea la pagina che mostra il totale dei punti accumulati 
e la cronologia delle scansioni/guadagni dei punti.*/
function renderPoints() {
  return `
    <div class="max-w-md mx-auto p-4">
      <div class="rounded-lg p-4 mb-4 ${state.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md">
        <div class="flex items-center mb-6">
          <button class="p-2 rounded mr-2" onclick="openPage('profile')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 class="text-xl font-bold">I Miei Punti</h2>
        </div>
        <div class="p-4 rounded-lg mb-6 text-center ${state.darkMode ? 'greenbrain-bg-dark' : 'greenbrain-bg-light'}">
          <h3 class="text-sm ${state.darkMode ? 'greenbrain-text-light' : 'greenbrain-text-dark'}">Totale Punti Eco</h3>
          <p class="text-3xl font-bold">${state.userProfile.totalPoints}</p>
        </div>
        <div>
          <h3 class="font-bold mb-3">Cronologia Punti</h3>
          <div class="rounded-lg overflow-hidden ${state.darkMode ? 'bg-gray-700' : 'bg-gray-100'}">
            ${state.scanHistory.map(item => `
              <div class="p-3 border-b border-gray-200">
                <div class="flex justify-between items-center">
                  <span>${item.material}</span>
                  <span class="font-medium greenbrain-text">+${item.points}</span>
                </div>
                <p class="text-xs text-gray-500 mt-1">${item.date}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

/*Genera l’interfaccia per modificare le impostazioni dell’utente 
(preferenze come notifiche, condivisione posizione, ecc.), 
utilizzando le icone e le label per ciascuna impostazione.*/
function renderSettings() {
  const prefLabels = {
    notifiche: "Notifiche",
    condivisionePosizione: "Condivisione Posizione",
    reportSettimanale: "Report Settimanale",
    condivisioneDati: "Condivisione Dati"
  };
  const prefIcons = {
    notifiche: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1" />
                </svg>`,
    condivisionePosizione: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9l-4.95 4.95a1 1 0 01-1.414 0l-4.95-4.95a7 7 0 010-9.9zm7.07 2.12a3 3 0 11-4.24 4.24 3 3 0 014.24-4.24z" clip-rule="evenodd" />
                            </svg>`,
    reportSettimanale: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>`,
    condivisioneDati: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12l2-2m0 0l2 2m-2-2v6m10-6l2-2m0 0l2 2m-2-2v6" />
                       </svg>`
  };
  const preferences = ["notifiche", "condivisionePosizione", "reportSettimanale", "condivisioneDati"];

  return `
    <div class="max-w-md mx-auto p-4">
      <div class="rounded-lg p-4 mb-4 ${state.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md">
        <div class="flex items-center mb-6">
          <button class="p-2 rounded mr-2" onclick="openPage('profile')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 class="text-xl font-bold">Impostazioni</h2>
        </div>
        <div class="space-y-4">
          ${preferences.map(pref => `
            <div class="flex items-center justify-between">
              <span class="text-sm flex items-center">
                ${prefIcons[pref] || ""}
                ${prefLabels[pref]}
              </span>
              <button class="w-10 h-6 rounded-full flex items-center justify-center ${state.userProfile.preferences[pref] ? 'greenbrain-bg' : 'bg-red-500'} text-white" onclick="togglePreference('${pref}')">
                ${state.userProfile.preferences[pref] ? "On" : "Off"}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/*Mostra il dettaglio di una guida selezionata (titolo e contenuto HTML), 
con un pulsante per tornare indietro.*/
function renderGuideDetail() {
  return `
    <div class="max-w-md mx-auto p-4">
      <div class="rounded-lg p-4 mb-4 ${state.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md">
        <div class="flex items-center mb-6">
          <button class="p-2 rounded mr-2" onclick="openPage(null); state.activeGuide = null;">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 class="text-xl font-bold">${state.activeGuide.title}</h2>
        </div>
        <div class="prose prose-sm max-w-none">
          ${state.activeGuide.content}
        </div>
      </div>
    </div>
  `;
}

/*Gestisce la visualizzazione dell’area scanner. 
In base allo stato mostra: • La schermata iniziale (con pulsanti per fotocamera o caricamento file)
• La visualizzazione della fotocamera con video in diretta
• L’anteprima dell’immagine acquisita per la conferma
• Il risultato della scansione (con informazioni sull’oggetto rilevato, consigli ecologici e punti guadagnati)*/
function renderScanner() {
  return `
    <div class="max-w-md mx-auto p-4">
      ${(!state.showCamera && !state.selectedImage && !state.showResult) ? `
        <div class="rounded-lg p-6 mb-4 text-center ${state.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md">
          <h2 class="text-xl font-bold mb-4">Scansiona e Ricicla</h2>
          <p class="mb-6 text-sm">Scatta una foto o carica un file per scoprire come riciclarlo correttamente</p>
          <div class="grid grid-cols-2 gap-4">
            <button class="flex flex-col items-center justify-center p-4 rounded-lg greenbrain-bg text-white" onclick="startCamera()">
              Fotocamera
            </button>
            <label class="flex flex-col items-center justify-center p-4 rounded-lg bg-blue-500 text-white cursor-pointer">
              Carica
              <input type="file" class="hidden" accept="image/*" onchange="handleFileUpload(event)" />
            </label>
          </div>
        </div>
      ` : ""}
      ${state.showCamera ? `
        <div class="rounded-lg p-4 mb-4 ${state.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md">
          <div class="relative">
            <video id="video" class="w-full rounded-lg bg-black"></video>
            <button class="absolute top-2 right-2 p-1 rounded bg-gray-800 bg-opacity-50 text-white" onclick="closeCamera()">X</button>
            <button class="absolute top-2 right-10 p-1 rounded bg-gray-800 bg-opacity-50 text-white" onclick="switchCamera()">⟳</button>
          </div>
          <div class="mt-4 flex justify-center">
            <button class="rounded-full w-16 h-16 greenbrain-bg flex items-center justify-center text-white" onclick="takePhoto()">Scatta</button>
          </div>
        </div>
      ` : ""}
      ${state.selectedImage && !state.showResult ? `
        <div class="rounded-lg p-4 mb-4 ${state.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md">
          <div class="text-center">
            <h3 class="font-bold mb-2">Anteprima</h3>
            <p class="text-sm mb-4">Immagine catturata. Conferma per procedere con la scansione.</p>
            <div class="mx-auto w-full max-w-sm h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <img src="${state.selectedImage}" alt="preview" class="h-64 object-contain" />
            </div>
            ${state.loading ? `
              <p class="text-sm text-gray-400">Analisi in corso...</p>
            ` : `
              <div class="flex space-x-3 justify-center">
                <button class="px-4 py-2 bg-gray-500 text-white rounded-lg" onclick="resetScan()">Annulla</button>
                <button class="px-4 py-2 greenbrain-bg text-white rounded-lg" onclick="finalizeScan()">Invia</button>
              </div>
            `}
          </div>
        </div>
      ` : ""}
      ${state.showResult ? `
        <div class="rounded-lg p-4 mb-4 ${state.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md">
          <div class="flex mb-4">
            <div class="w-1/3 flex items-center justify-center">
              <span class="text-sm">[ Analisi ]</span>
            </div>
            <div class="w-2/3 pl-4">
              <h3 class="font-bold text-lg">
                ${state.scanMaterialData ? state.scanMaterialData.translated : "Nessun oggetto rilevato"}
              </h3>
              <div class="mt-2 inline-block px-3 py-1 rounded-full ${state.darkMode ? 'greenbrain-bg-dark greenbrain-text-light' : 'greenbrain-bg-light greenbrain-text-dark'}">
                ${state.roboflowResult && state.roboflowResult.predictions && state.roboflowResult.predictions.length > 0
                  ? "Confidenza: " + (state.roboflowResult.predictions[0].confidence * 100).toFixed(1) + "%"
                  : ""}
              </div>
              <div class="mt-3 text-sm">
                <div class="flex items-center">
                  <span class="mr-2">+15</span>
                </div>
                <p class="text-xs mt-1">Punti Eco guadagnati</p>
              </div>
            </div>
          </div>
          ${state.scanMaterialData ? `
            <div class="p-3 rounded-lg mb-4 ${state.darkMode ? 'bg-gray-700' : 'bg-gray-100'}">
              <h4 class="font-bold mb-2">Impatto Ambientale</h4>
              <div class="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p class="text-xs text-gray-500">Decomposizione</p>
                  <p>${state.scanMaterialData.decomposition}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Inquinamento</p>
                  <p>${state.scanMaterialData.pollution}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Biodegradabilità</p>
                  <p>${state.scanMaterialData.biodegradability}</p>
                </div>
              </div>
            </div>
            <div class="mb-4">
              <h4 class="font-bold mb-2">Consigli Ecologici</h4>
              <ul class="text-sm space-y-2">
                ${state.scanMaterialData.advice.map(item => `
                  <li class="flex"><span class="mr-2">•</span><span>${item}</span></li>
                `).join('')}
              </ul>
            </div>
          ` : ""}
          <div class="flex space-x-3">
            <button class="flex-1 px-4 py-2 greenbrain-bg text-white rounded-lg" onclick="resetScan()">Nuova Scansione</button>
            <button class="px-4 py-2 bg-blue-500 text-white rounded-lg">Condividi</button>
          </div>
        </div>
      ` : ""}
      <div class="mt-6">
        <button class="flex items-center space-x-1 text-sm greenbrain-text font-bold" onclick="toggleHistory()">
          ${state.historyOpen ? 'Nascondi Cronologia' : 'Mostra Cronologia'}
        </button>
        ${state.historyOpen ? `
          <div class="mt-3">
            ${state.scanHistory.map(item => `
              <div class="mb-2">
                <p class="text-sm font-medium">${item.material}</p>
                <p class="text-xs text-gray-500">${item.date} - +${item.points} punti</p>
              </div>
            `).join('')}
          </div>
        ` : ""}
      </div>
      <canvas id="photoCanvas" class="hidden"></canvas>
    </div>
  `;
}

/*Visualizza la lista delle guide al riciclo filtrata in base al termine di ricerca inserito.*/
function renderInfo() {
  const filtered = state.guides.filter(guide =>
    guide.title.toLowerCase().includes(state.searchTerm.toLowerCase())
  );
  return `
    <div class="max-w-md mx-auto p-4">
      <div class="rounded-lg p-6 mb-4 ${state.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md">
        <h2 class="text-xl font-bold mb-4">Guide al Riciclo</h2>
        <input type="text" value="${state.searchTerm}" oninput="updateSearchTerm(event)" placeholder="Cerca guida..." class="w-full border rounded p-2 mb-4" />
        ${filtered.map(guide => `
          <div class="p-3 border rounded-lg mb-3 cursor-pointer hover:bg-gray-100" onclick="openGuide(${guide.id})">
            <div class="flex items-center">
              <span class="font-medium">${guide.title}</span>
            </div>
          </div>
        `).join('')}
        ${filtered.length === 0 ? `<p class="text-sm text-gray-500">Nessuna guida trovata.</p>` : ''}
      </div>
    </div>
  `;
}

/*Mostra i premi e gli incentivi disponibili, consentendo di riscattarli se l’utente ha accumulato punti sufficienti. 
Include anche una sezione relativa alla "Sfida della Settimana".*/
function renderRewards() {
  return `
    <div class="max-w-md mx-auto p-4">
      <div class="rounded-lg p-6 mb-4 ${state.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md">
        <h2 class="text-xl font-bold mb-4">Premi e Incentivi</h2>
        <p class="mb-4 text-sm">Accumula Punti Eco e riscattali per premi esclusivi:</p>
        ${state.rewards.map(reward => `
          <div class="flex items-center p-3 border-b border-gray-200">
            <div class="flex-1">
              <p class="font-medium">${reward.name}</p>
              <p class="text-xs text-gray-500">${reward.description}</p>
              <p class="text-xs text-gray-500">Scade: ${reward.expiry}</p>
            </div>
            <button class="px-3 py-1 greenbrain-bg text-white rounded text-xs" onclick="confirmRedeemReward(${reward.id})">Riscatta</button>
          </div>
        `).join('')}
        <div class="mt-6 p-4 bg-green-100 rounded-lg">
          <h3 class="text-lg font-bold">Sfida della Settimana</h3>
          <p class="text-sm">Ricicla 10 bottiglie di plastica - Progresso: 4/10</p>
          <div class="mt-2 h-2 bg-gray-200 rounded-full">
            <div class="h-full greenbrain-bg rounded-full" style="width: 40%;"></div>
          </div>
          <p class="mt-2 text-sm font-bold text-yellow-500">+50 Punti</p>
        </div>
      </div>
    </div>
  `;
}

/*Crea la pagina per il forum/community, 
mostrando i post esistenti con commenti e inclusi i pulsanti per rispondere, 
segnalare o partecipare alla discussione.*/
function renderCommunity() {
  return `
    <div class="max-w-md mx-auto p-4">
      <div class="rounded-lg p-6 mb-4 ${state.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md">
        <h2 class="text-xl font-bold mb-4">Community & Forum</h2>
        <p class="mb-4 text-sm">Condividi la tua esperienza e partecipa alle discussioni sul riciclo.</p>
        ${state.posts.map(post => `
          <div class="p-4 border rounded-lg mb-4 hover:bg-gray-100">
            <div class="mb-2">
              <p class="text-sm font-bold">${post.user}</p>
              <p class="text-xs text-gray-500">${post.time}</p>
            </div>
            <p class="text-sm mb-2 whitespace-normal break-words">${post.content}</p>
            <div class="flex items-center space-x-1 text-sm relative">
              <button onclick="openReplyModal(${post.id}, null)" class="focus:outline-none">
                <span>Commenta</span>
                <span>(${post.commentsList ? post.commentsList.length : 0})</span>
              </button>
              <button onclick="togglePostDropdown(${post.id})" class="ml-1 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              ${post.showDropdown ? `
                <div class="absolute z-10 bg-white shadow-md rounded border mt-8 right-0 text-xs">
                  <a href="javascript:void(0)" onclick="openReplyModal(${post.id}, null); togglePostDropdown(${post.id})" class="block px-2 py-1 hover:bg-gray-100">Rispondi</a>
                  <a href="javascript:void(0)" onclick="showPopup('Commento segnalato', 'blue'); togglePostDropdown(${post.id})" class="block px-2 py-1 hover:bg-gray-100">Segnala</a>
                </div>
              ` : ""}
            </div>
            ${renderComments(post)}
          </div>
        `).join('')}
        <button class="mt-4 w-full px-4 py-2 greenbrain-bg text-white rounded-lg text-sm" onclick="openNewPostModal()">
          Partecipa alla discussione
        </button>
      </div>
    </div>
  `;
}
/*Visualizza la mappa dei centri di riciclo. Se la posizione utente è disponibile, 
viene mostrata e inkorporata la mappa (Leaflet) con il marker sulla posizione attuale.*/
function renderMap() {
  return `
    <div class="max-w-md mx-auto p-4">
      <div class="rounded-lg p-6 mb-4 ${state.darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md">
        <h2 class="text-xl font-bold mb-4">Mappa dei Centri di Riciclo</h2>
        <p class="mb-4 text-sm">Visualizza i punti di raccolta e i centri di riciclo nella tua zona.</p>
        ${state.userLocation ? `
          <div class="mb-4 text-sm">
            <p>La tua posizione: Lat ${state.userLocation.lat.toFixed(4)}, Lng ${state.userLocation.lng.toFixed(4)}</p>
          </div>
        ` : `<p class="text-sm text-gray-500">Recupero della posizione...</p>`}
        <div id="mapid" class="w-full h-64 bg-gray-200 rounded-lg"></div>
        <div class="mt-4">
          <button class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg text-sm" onclick="openGoogleMaps()">Apri Google Maps</button>
        </div>
      </div>
    </div>
  `;
}

/*Determina quale sezione principale visualizzare, 
basandosi sui valori di state.activePage e state.activeTab, 
e richiama la funzione di rendering corrispondente.*/
function renderMainContent() {
  if (state.activePage) {
    if (state.activePage === 'profile') return renderProfile();
    if (state.activePage === 'points') return renderPoints();
    if (state.activePage === 'settings') return renderSettings();
    if (state.activePage === 'guideDetail' && state.activeGuide) return renderGuideDetail();
  }
  if (state.activeTab === 'scanner') return renderScanner();
  if (state.activeTab === 'info') return renderInfo();
  if (state.activeTab === 'rewards') return renderRewards();
  if (state.activeTab === 'community') return renderCommunity();
  if (state.activeTab === 'map') return renderMap();
  return `<div class="p-4 text-center">Seleziona una sezione</div>`;
}

/*Procedura centrale che ricostruisce l’intera interfaccia dell’app in base allo stato corrente; 
aggiorna il DOM e scrive in console lo stato attuale.*/
function renderApp() {
  document.getElementById('app').innerHTML = `
    <div class="${state.darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen flex flex-col relative">
      ${renderHeader()}
      <main class="flex-1 overflow-auto">
        ${renderMainContent()}
      </main>
      ${renderNav()}
      ${state.showCommentModal ? renderCommentModal() : ""}
    </div>
  `;
  console.log("Stato corrente:", state);
}

/*Inverte il flag dello stato per la modalità scura e 
richiama il rendering per aggiornare lo stile dell’app.*/
function toggleDarkMode() {
  state.darkMode = !state.darkMode;
  renderApp();
}

/*Mostra o nasconde il menù a tendina dell’header 
modificando lo stato corrispondente.*/
function toggleMenu() {
  state.isMenuOpen = !state.isMenuOpen;
  renderApp();
}

/*Cambia la sezione attiva (scanner, guide, premi, community, mappa) 
e azzera eventuali pagine specifiche, aggiornando lo stato e la UI.*/
function navigateTo(tab) {
  state.activeTab = tab;
  state.activePage = null;
  state.isMenuOpen = false;
  renderApp();
}

/*Imposta la pagina attiva (es. profilo, punti, impostazioni, dettaglio guida) 
e aggiorna lo stato eliminando il menù a tendina aperto.*/
function openPage(page) {
  state.activePage = page;
  state.isMenuOpen = false;
  renderApp();
}

/*Aggiorna lo stato con il termine di ricerca inserito dall’utente nella pagina delle guide, 
permettendo il filtraggio dinamico.*/
function updateSearchTerm(event) {
  state.searchTerm = event.target.value;
  renderApp();
}

/*Seleziona una guida dall’elenco, aggiorna lo stato con il dettaglio 
della guida scelta e passa alla pagina di dettaglio.*/
function openGuide(id) {
  state.activeGuide = state.guides.find(g => g.id === id);
  state.activePage = 'guideDetail';
  renderApp();
}

/*Inverte il valore di una preferenza utente (es. notifiche, posizione) 
e mostra un popup di conferma con il messaggio appropriato.*/
function togglePreference(pref) {
  state.userProfile.preferences[pref] = !state.userProfile.preferences[pref];
  const prefLabels = {
    notifiche: "Notifiche",
    condivisionePosizione: "Condivisione Posizione",
    reportSettimanale: "Report Settimanale",
    condivisioneDati: "Condivisione Dati"
  };
  const message = state.userProfile.preferences[pref]
    ? `${prefLabels[pref]} attivate`
    : `${prefLabels[pref]} disattivate`;
  showPopup(message, state.userProfile.preferences[pref] ? "success" : "error");
  renderApp();
}

/*Gestisce il meccanismo di "like" su un post: 
inverte lo stato del like e aggiorna il conteggio dei "mi piace" nel post indicato.*/
function toggleLike(postId) {
  state.posts = state.posts.map(post => {
    if (post.id === postId) {
      post.liked = !post.liked;
      post.likes += post.liked ? 1 : -1;
    }
    return post;
  });
  renderApp();
}

/*Chiede conferma all’utente per riscattare un premio. Se confermato, 
deduce i punti necessari dal totale e mostra un popup di successo.*/
function confirmRedeemReward(rewardId) {
  const reward = state.rewards.find(r => r.id === rewardId);
  if (!reward) return;
  showConfirmPopup(`Confermi il riscatto del premio "${reward.name}"?`, "blue")
    .then(confirmed => {
      if (confirmed) {
        state.userProfile.totalPoints -= reward.points;
        showPopup(`Premio "${reward.name}" riscattato con successo!`, "blue");
        renderApp();
      }
    });
}

/*Richiede all’utente il permesso di condividere la propria posizione 
per visualizzare la mappa dei centri di raccolta; 
in caso positivo, attiva il caricamento della posizione.*/
function showMapConfirm() {
  showConfirmPopup("Condividi la tua posizione per visualizzare i centri di raccolta rifiuti?", "blue")
    .then(confirmed => {
      if (confirmed) {
        loadUserLocation();
      }
    });
}

/*Apre Google Maps in una nuova finestra, centrato sulla posizione attuale dell’utente, 
mostrando i centri di raccolta rifiuti.*/
function openGoogleMaps() {
  if (state.userLocation) {
    const { lat, lng } = state.userLocation;
    const url = `https://www.google.com/maps/search/servizio+di+raccolta+rifiuti/@${lat},${lng},15z`;
    window.open(url, "_blank");
  } else {
    showPopup("Posizione non rilevata. Condividi la tua posizione nella sezione Mappa.", "error");
  }
}

/*Richiede l’accesso alla fotocamera e, in caso di successo, 
imposta lo stream video nello stato per permettere all’utente di scattare una foto.*/
async function startCamera(facingMode = state.currentCamera) {
  try {
    // Ferma lo stream esistente, se presente
    if (state.cameraStream) {
      state.cameraStream.getTracks().forEach(track => track.stop());
    }
    // Configura i vincoli video con la modalità desiderata
    const constraints = {
      video: { facingMode: facingMode }
    };
    // Ottieni il nuovo stream
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    // Aggiorna lo stato
    state.cameraStream = stream;
    state.currentCamera = facingMode;
    state.showCamera = true;
    state.showResult = false;
    state.selectedImage = null;
    // Renderizza l'app per riflettere i cambiamenti
    renderApp();
    // Collega lo stream all'elemento video
    const video = document.getElementById('video');
    if (video) {
      video.srcObject = stream;
      video.play();
    }
  } catch (err) {
    console.error("Errore nell'accesso alla fotocamera:", err);
    showPopup("Impossibile accedere alla fotocamera. Verifica i permessi o utilizza HTTPS.", "error");
  }
}

function switchCamera() {
  const newFacingMode = state.currentCamera === 'environment' ? 'user' : 'environment';
  startCamera(newFacingMode);
}

/*Ferma lo stream della fotocamera e nasconde 
la visualizzazione video, aggiornando lo stato.*/
function closeCamera() {
  if (state.cameraStream) {
    state.cameraStream.getTracks().forEach(track => track.stop());
  }
  state.cameraStream = null;
  state.showCamera = false;
  renderApp();
}

/*Cattura un fotogramma dal video della fotocamera, 
lo converte in immagine (data URL) e salva il risultato nello stato per l’anteprima/scansione.*/
function takePhoto() {
  const video = document.getElementById('video');
  const canvas = document.getElementById('photoCanvas');
  if (video && canvas) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    state.selectedImage = canvas.toDataURL('image/png');
    closeCamera();
  }
  renderApp();
}


/*Converte l’immagine catturata in base64, 
la invia al servizio di riconoscimento (Roboflow) e, in base al risultato, 
aggiorna lo stato con le informazioni sul materiale rilevato, 
aggiunge punti e registra la scansione nella cronologia.*/
function finalizeScan() {
  state.loading = true;
  renderApp();
  
  let base64Data = state.selectedImage;
  if (base64Data.startsWith("data:image")) {
    base64Data = base64Data.split(',')[1];
  }
  axios({
    method: "POST",
    url: "https://detect.roboflow.com/garbage-classification-3/2",
    params: { api_key: "Mt8LZXYyuViQq304Bl9Z" },
    data: base64Data,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  })
  .then(response => {
    state.loading = false;
    const predictions = response.data.predictions;
    console.log("Predictions:", predictions);
    if (!predictions || predictions.length === 0) {
      showPopup("Nessun oggetto riconosciuto.", "error");
      renderApp();
      return;
    }
    const bestPrediction = predictions.reduce((best, p) => (p.confidence > best.confidence) ? p : best, predictions[0]);
    if (bestPrediction.confidence < 0.6) {
      showPopup("L'oggetto non è riconoscibile con sufficiente certezza.", "error");
      renderApp();
      return;
    }
    state.showResult = true;
    state.roboflowResult = response.data;
    const detectedClass = bestPrediction.class;
    const materialData = getMaterialInfo(detectedClass);
    state.scanMaterialData = materialData;
    const newScan = {
      id: state.scanHistory.length + 1,
      date: new Date().toLocaleDateString('it-IT'),
      material: materialData.translated,
      points: 15
    };
    state.scanHistory.unshift(newScan);
    state.userProfile.totalPoints += 15;
    renderApp();
  })
  .catch(error => {
    state.loading = false;
    showPopup("Errore nell'elaborazione dell'immagine: " + error.message, "error");
    renderApp();
  });
}

/*Ripristina lo stato della sezione scanner in modo da poter 
effettuare una nuova scansione (nascondendo il risultato e svuotando l’immagine selezionata).*/
function resetScan() {
  state.showResult = false;
  state.selectedImage = null;
  state.loading = false;
  state.scanMaterialData = null;
  renderApp();
}


/*Gestisce il caricamento di una foto da file. 
Legge il file come data URL e lo salva nello stato 
per l’anteprima e successiva scansione.*/
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      state.selectedImage = reader.result;
      renderApp();
    };
    reader.readAsDataURL(file);
  }
}

/*Utilizza la Geolocalizzazione del browser per rilevare la posizione attuale dell’utente. 
Se la rilevazione ha successo, 
aggiorna lo stato e inizializza la mappa tramite Leaflet.*/
function loadUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      state.userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
      renderApp();
      initLeafletMap();
    }, (error) => {
      showPopup("Impossibile rilevare la posizione.", "error");
    });
  } else {
    showPopup("Geolocalizzazione non supportata dal browser.", "error");
  }
}

/*Inizializza una mappa Leaflet centrata sulla posizione dell’utente, 
aggiungendo uno o più marker per evidenziare la posizione attuale.*/
function initLeafletMap() {
  if (state.userLocation) {
    setTimeout(() => {
      const map = L.map('mapid').setView([state.userLocation.lat, state.userLocation.lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
      L.marker([state.userLocation.lat, state.userLocation.lng]).addTo(map)
        .bindPopup('La tua posizione')
        .openPopup();
    }, 100);
  }
}

/*Permette di mostrare o nascondere la cronologia delle scansioni 
(lista dei materiali identificati e dei punti guadagnati) e aggiorna la UI.*/
function toggleHistory() {
  state.historyOpen = !state.historyOpen;
  renderApp();
}

//Inizializzazione dell'Applicazione
console.log("Stato iniziale:", state);
renderApp();
console.log("App inizializzata!");
