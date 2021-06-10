# SO-exam-simulator
App per esercitarsi in vista degli esami di Sistemi Operativi, modulo 1 e modulo 2 - Sapienza, Informatica.

Semplice app **ora anche da web** che si occuperà di addestrare il cadetto all'esame di SO1 e SO2.

Stai cercando l'app "da terminale" per il modulo 2? Clicca qui: https://github.com/andrea-gasparini/SO2-exam-simulator ma ricordati che non è più mantenuta!

## Disclaimer
---
Ci solleviamo da ogni responsabilità di utilizzo improprio di questo strumento.
Utilizzalo a tuo rischio e pericolo, ma soprattutto non venirci a dire "eh ma questa domanda non c'era" o cose come "questa domanda è sbagliata" a compito di esame finito.

Invece, aggiungila tu e aiuta i tuoi colleghi!

---

## Istruzioni
**Versione Windows/Linux/Mac (SOLO MODULO 2, NON AGGIORNATA E NON MANTENUTA)**: https://github.com/andrea-gasparini/SO2-exam-simulator

**Versione web (cross-platform anche per mobile)**: [https://dag7dev.github.io/SO-exam-simulator/](https://dag7dev.github.io/SO-exam-simulator/)

Il punteggio è calcolato nel seguente modo: +2 punti per ogni risposta corretta, -1 punto per ogni risposta errata, 0 per ogni risposta saltata

## Requisiti
La versione web è stata scritta in **JavaScript** molto velocemente. Se vuoi migliorare il codice sei il benvenuto!

## Come contribuire
Per **aggiungere** o **modificare** le domande: `json/questions_2.json` o `json/questions_1.json`, seguire la struttura delle domande già esistenti.

Se la domanda contiene del codice sorgente, impostare `has_code` a "1" nel JSON e inserire il codice nel campo `code`. Esso verrà mostrato subito dopo il testo della domanda in un apposito riquadro.

Se le risposte contengono del codice sorgente, impostare `answers_have_code` a "1" nel JSON. Le domande verranno renderizzate come codice in un box.

**ATTENZIONE**: il codice deve essere propriamente escapizzato, e ogni nuova riga deve avere `\n` alla fine

Oppure dai un'occhiata alla [TODO List dei desideri](#todo-list-dei-desideri).

## TODO List dei desideri
- [X] **GUI cross-platform** (con JavaFX o con altro, ogni proposta è ben accetta, soprattutto JS, purché giri su Github Sites e funzioni).
**FATTO**
- [ ] Una pagina dove generare un JSON già pronto in caso si voglia contribuire e non si è tecnici
- [X] Un json che **include i quesiti di SO1**
- [ ] Linee guida per contribuire

Per qualsiasi cosa, **apri una PR** o una **issue**.

Se il progetto ti è stato utile, ricordati di lasciare una stella :D
