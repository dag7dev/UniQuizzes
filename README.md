# UniQuizzes
Repository che contiene tanti test, che trattano Sistemi Operativi (entrambi), Ingegneria del Software e molto altro.

Semplice app **ora anche da web** che si occuperà di addestrare il cadetto all'esame di SO1, SO2 e tante altre materie.

Stai cercando l'app "da terminale" per Sistemi Operativi Modulo 2? Clicca qui: https://github.com/andrea-gasparini/SO2-exam-simulator ma ricordati che non è più mantenuta!

## Disclaimer
> Ci solleviamo da ogni responsabilità di utilizzo improprio di questo strumento, e non garantiamo in alcun modo che le risposte siano corrette o errate.

Utilizzalo a tuo rischio e pericolo ma cosa più importante: dai una mano ai tuoi colleghi aggiungendo o modificando domande, **basta una PR o una issue!**

## Istruzioni
**Versione Windows/Linux/Mac solo domande SO modulo 2, (NON AGGIORNATA E NON MANTENUTA)**: https://github.com/andrea-gasparini/SO2-exam-simulator

**Versione web (cross-platform anche per mobile)**: [https://dag7dev.github.io/UniQuizzes/](https://dag7dev.github.io/UniQuizzes/)

Il punteggio è calcolato nel seguente modo: +2 punti per ogni risposta corretta, -1 punto per ogni risposta errata, 0 per ogni risposta saltata

## Requisiti
La versione web è stata scritta in un orribile **JavaScript** in fretta e furia. Se vuoi migliorare il codice sei il benvenuto!

## Info sul JSON
`code`: se contiene del testo, verrà mostrato in forma di codice sorgente subito dopo il testo della domanda

`answers_have_code`: se a "1", le domande verranno renderizzate come codice in un box.

**ATTENZIONE**: il codice deve essere propriamente escapizzato, e ogni nuova riga deve avere `\n` alla fine

## Come contribuire
- **inserendo nuovi quiz**:
   - vai nella cartella `json` e crea un file in `.json`. Usa come modello i JSON già esistenti
   - vai nel file `config.js` nella cartella `js` e aggiungi il tuo file nella lista dei file
- **revisionando i quiz esistenti**:
   - vai nella cartella `json` e modifica il file che vuoi correggere
   - in alternativa, apri una issue dove specifichi: `file, risposta attuale, risposta corretta, motivo` 
- **implementando nuove funzionalità su JSQuizee**: l'engine sul quale si basa UniQuizzes è [JSQuizee](https://github.com/dag7dev/JSQuizee/), un engine di quiz offline. Si può dire che JSQuizee è il motore, e UniQuizzes è il carburante; se verranno implementate modifiche su JSQuizee, UniQuizzes verrà aggiornato all'ultima versione di JSQuizee.

Se il progetto ti è stato utile, o se hai passato esami, non dimenticare di lasciare una stella :D

## Istruzioni per l'offline
0. Requisiti fondamentali: avere `Python` e `git` installati
1. Rendere lo script .sh avviabile: 
```
chmod 755 start.sh
```
2. Lanciare lo script con l'opzione desiderata:
- local, per creare la versione con i file locali del tuo computer, 
- online, per creare la versione con i file già presenti sulla repo di dag7 (questa)

File locali:
```
./start.sh --from-local
```

File sulla repo:
```
./start.sh --from-online
```

In caso di dubbi consultare l'help dello script.

3. UniQuizzes viene salvato in ``$HOME/UniQuizzesFinal``

Recarsi in quella directory con:
```
cd $HOME/UniQuizzesFinal
```
e digitare:
```
python -m http.server
```

Potrai eseguirlo in locale digitando `http://0.0.0.0:8000/` sul tuo browser.

### Troubleshooting sull'offline
Q: L'app non legge i JSON tramite file locali. Normale?
- Non l'hai avviata tramite server. È requisito fondamentale farlo, poiché normalmente i browser non possono accedere ai file locali.

Q: L'app non legge i JSON nonostante il server tramite file locali. Che ho sbagliato?
- Il JSON

Q: Quando implementerai la pagina di creazione semplice dei JSON?
- Non ho una deadline, e lavoro a questo progetto nel tempo libero.

## TODO List dei desideri
- [X] GUI cross-platform
- [ ] Editor json in-browser (aggiungere, modificare, rimuovere domande)
- [ ] Parser autoaggiornante che aggiorna i quesiti automaticamente da un file google documenti
- [X] Un json che **include quesiti SO1**
- [X] Linee guida per contribuire
