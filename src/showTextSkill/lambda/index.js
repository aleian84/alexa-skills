// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const BACKGROUND_IMAGE_URL = 'https://images-na.ssl-images-amazon.com/images/I/51BnlsYyr2L._SL1024_.jpg',
  SUBTITLE = "",
  TITLE = 'JOKER';

const jokerArray = [
		"Avesti potuto lasciarmi morire, in passato. Non l'hai fatto. Vuoi picchiarmi fino a farmi parlare? Ha mai funzionato? Se non riesci a intrattenermi meglio di così... allora stai facendo perdere tempo a entrambi...(Batman: Cataclisma)",
		"Caro ragazzo, questa perla si chiama Gotham, un posto che deve la sua fama ai roditori volanti e ai maniaci omicidi sfigurati...(Marvel contro DC)",
		"Ferma... mi... se questa l'hai già sentita... Batman... io... io... sono innocente...(Batman: Hush)",
		"Questa città non è abbastanza grande per due maniaci omicidi. (Batman: Il lungo Halloween)",
		"Ragazzino... sono Joker. Non uccido la gente a caso. Uccido la gente quando è divertente. Cosa ci sarebbe di plausibilmente divertente nell'uccidere te? (Batman: Cos'è successo al Cavaliere Oscuro?)",
		"Sarò anche un pazzo criminale, ma sono un pazzo criminale americano! (Batman/Capitan America)",
		"Un consiglio... non scusarti mai con nessuno per il tuo aspetto. (Joker)",
		"Abbastanza? E come fai a misurare la follia? Certo non con il metro e il cronometro, vero? (Arkham Asylum: Una folle dimora in un folle mondo)",
		"Allora, un tipo va all'ospedale a trovare la moglie, che ha appena avuto un bambino. Incontra il medico e gli dice: 'Dottore, ero così preoccupato! Come stanno?'' E il medico: 'Stanno benone. Sua moglie ha partorito un bel bambino, e stanno bene tutti e due.' 'Lei è un uomo fortunato.' Così il tipo entra nella maternità con i suoi fiori. E non trova nessuno. Nel letto di sua moglie non c'è nessuno. 'Dottore?'' dice. Poi si volta, e vede il medico e tutte le infermiere che ridono come pazzi. Pesce d'aprile! Sua moglie è morta, e il bambino è spastico!! (Arkham Asylum: Una folle dimora in un folle mondo)",
		"È sale. Perché non me ne spargi un po' addosso, caro? Non sono così carino che mi mangeresti? (Arkham Asylum: Una folle dimora in un folle mondo)",
		"Oh. Vedo due angeli che scopano nella stratosfera, una costellazione di buchi neri, un processo biologico incomprensibile all'uomo, un ventriloquo ebreo chiuso nel bagagliaio di una Chevrolet rossa... E tu, Batman? Cosa vedi? (Arkham Asylum: Una folle dimora in un folle mondo)",
		"Batman... Batman... C'è qualcuno che sa dirmi in che razza di mondo stiamo vivendo? Dove un uomo si traveste da pipistrello? E si frega tutta la mia stampa? Questa città ha bisogno di un clistere! (Batman)",
		"Dimmi una cosa amico mio... danzi mai col diavolo nel pallido plenilunio? [...] Io lo chiedo sempre a tutte le mie vittime... Sarà perché me ne piace il suono! Ah! 'Infinite cose da fare e così poco tempo... (Batman)Mai rubare rabarbari in barba a un barbaro!'' Ahahaha! 'Là dove sei in veste di rabarbaro...' (Batman)",
		"Infinite cose da fare e così poco tempo... (Batman)",
		"Io ho dato un nome al mio dolore. E il nome è 'Batman'! Dobbiamo avere la forza di infliggere il dolore, Bob. Abbiamo un topo volante da uccidere... E col suo sangue mi lucido gli artigli!",
		"Io rido soltanto... esteriormente. Il mio sorriso... è solo a fior di pelle. Se tu potessi vedermi dentro, io sto piangendo... Puoi unirti a me per un singhiozzo? Ahahahahah!",
		"Lasciami dire che cosa sto pensando, dolce... Ero nel mio bagno un giorno, quando mi resi conto che io ero destinato alla grandezza... Sai come la gente si preoccupa delle apparenze? 'Questo è bello, quello no...'' Cosa completamente superata per me. Ora io faccio quello che per gli altri è solo un sogno: io faccio arte, finché qualcuno muore. Capito? Io sono il primo artista dell'omicidio a ciclo completo, cara!",
		"Ohh... Gotham City... Ha portato il sorriso sul mio volto. [Leggendo il titolo del 'Gotham Globe'] 'Mostro alato... [Cerca di pulire il giornale dal sangue] ...terrorizza'... Allora che scriveranno di me?",
		"[Durante un combattimento con Batman] Andando a teatro mi è successa una cosa buffa! Un tipo mi chiede venti dollari per una tazza di tè... Ma il tè costa solo dieci centesimi, gli dico io... Il resto è mancia, dice lui!",
		"È la più vecchia battuta della storia, la migliore. Il rosso e il nero. Come un pipistrello. In un sogno. In una finestra. La vita... e la morte. La barzelletta... e la battuta finale... [...] È per questo che non potevo farlo. Non sono mai risciuto a ucciderti... Come riuscirei a fare i miei numeri senza la mia spalla?",
		"Lo sai che cos'è una ghigliottina? Una cura definitiva per la forfora!",
		"Sai che sto scrivendo una canzone in onore di mia suocera? Qualcuno ha una rima con 'balena'? La sai quell'altra? Era la figlia di un tipografo ma non era il mio tipo! [...] Poi c'è la canzone del prigioniero... Porte chiuse! Se questa la conosci già non dirmelo... La madre era la moglie di un arbitro, il padre non si sa! Che ne dici di questa, Batman? Ho fatto una volata e ho le braccia stanchissime! La stanza d'albergo è così piccola che i topi sono gobbi! ...Volevo prendere una boccata d'aria fresca... così ho infilato la testa... nel frigorifero! Batman... non ridi?",
		"Sono contento che la morte vi abbia messo di buon umore! Ora sono felice anch'io!",
		"Tutti mi chiedono sempre 'Cos'è che fa ridere il Joker?' e io indicavo TE. Tutti ridevano alle tue spalle di te e dei tuoi stupidi bat-balocchi. Noi due cerchiamo un senso in un mondo che non ne ha! Perché essere un reietto sfigurato, quando si può essere un famigerato Dio del Delitto? Perché essere un orfanello quando si può essere un supereroe? Tu non puoi uccidermi senza diventare come me. Io non posso ucciderti senza perdere l'unico essere umano al mio livello. Non è IRONICO?!",
		"Benvenuto al manicomio, Batman! Ho preparato una trappola, e l'hai fatta scattare alla grande! E ora diamo inizio allo spettacolo!",
		"Devi misurarmi la febbre? Non vedo l'ora di abbassare le mutande...",
		"Di che cosa hai paura, Batman? Di non riuscire a salvare questo schifo di città? Di non salvare il commissario in tempo? ...Di vedermi in perizoma????",
		"Ma tu guarda quanta sicurezza... Come fa un povero Cristo ad uscire da qui?",
		"Salute, Gotham, qui è Joker. Arkham è nelle mie mani. Fra poco le strade di Gotham verranno invase dalla pazzie più sfrenata. Ma prima volgete lo sguardo verso i tetti delle case e assisterete in diretta la distruzione del vostro amato cavaliere oscuro!",
		"Beh, tu sei il tipo forte e silenzioso, io il matto che chiacchiera sempre. E che diavolo. Almeno abbiamo un lavoro.",
		"[Parlando di OJ Simpson] E quello sarebbe il processo del secolo? Due morti? Io due persone le ammazzo prima di colazione... e solo quando non sono in vena.",
		"E questa sarebbe una battuta? Io sono il Joker, percaritaddiddio. Stallone fa più ridere di me.",
		"Lo spettacolo è così. Quando dissi a mia madre che pensavo di diventare un personaggio dei fumetti, mi sbraitò contro. Che razza di lavoro è mai questo? Disse proprio così. Cominciò a menarla sull'immoralità della professione, sulla volubilità del gusto del pubblico, sulla stabilità... beh, le solite vaccate. Io le dissi... Mamma, questo è il mio sogno, non capisci? Se solo avesse capito . Se solo avesse immaginato che la cosa peggiore sarebbe stata...[...] Già. L'attesa.",
		"Oh, mascherina, mascherina nera... si sa che tra tutti i lavori del mondo, quello che preferisco è... uccidere Robin!",
		"Se vuoi uccidere qualcuno, smettila di giocare con i bat-balocchi! Fallo e basta! Vedi, nell'omicidio non conta tanto il talento o l'abilità, ma la volontà.",
		"Vorrei ringraziare tutti i miei fan. Grazie, ragazzi. Voi tenete vivo il sogno. E un abbraccio in particolare a Batman, mio fratello spirituale e socio d'affari. Non me la sono presa, fratello. Tu hai più buonsenso di me. Ho lasciato l'Arkham Hotel troppo presto. Io questo non l'avevo capito. La prossima volta, prima di scappare per la mia nuova tournée, sarò perfettamente riposato. E naturalmente chiedo scusa a tutti per lo scarso numero di vittime. Vi prometto che non succederà più.",
		"E ehi, devo dire che mi piace il mio nuovo nome... Joker. Buffo che non ci abbia pensato io stesso... Ah ah... Quindi, scommetto che vi starete tutti chiedendo cosa potrà fare il vecchio Joker che sia all'altezza dello show della notte scorsa? Che ne dite di un'altra partita mortale? Jay W. Wilde, la mano del destino punta verso di te! Morirai a mezzanotte! E per quanto riguarda il resto del programma, be', sarà una sorpresa, ma vi prometto che vi farà morire dal ridere. E ora vi lasciamo alla vostra solita e spaventosamente noiosa giornata.",
		"Scusate, a volte mi faccio morire... soprattutto quando penso al far morire voi.",
		"Uno ad uno, sentiranno la chiamata poi questa città malvagia mi seguirà nella caduta.",
		"Bene. Come dico sempre... la comicità sta nei tempi.",
		"No. O non sarebbe un vero scherzo, trovi? Il vero scherzo è nella tua testarda convinzione che in qualche modo tutto questo abbia un senso! Ecco cosa mi fa scompisciare ogni volta!",
		"Oh, Batman, Batman... andiamo... è così semplice... la vita... la morte... è tutto uno scherzo. La mano del morto. E io ho la carta vincente!",
		"Questi uomini ricchi e cattivi di cui hai attirato l'attenzione... mi dicono che ti sei cacciato in questo pasticcio perché volevi scoprire cosa si prova ad essere me. Ah ah. Pensi che sia solo una questione di simbolismo e strutture e indizi e suggerimenti? No, Batman, quella è wikipedia. Credevi davvero che bastasse assumere qualche sostanza chimica, trascorrere un paio di giorni in un isolamento indotto dalle droghe e un piccolo esaurimento nervoso per capirmi appieno? Come se ci fosse una tana del coniglio dove seguirmi per capire? Benvenuto al funerale della tua anima!",
		"Ti ricordi di me? Io e te avevamo un legame speciale. Una roba yin/yang. Holmes e Moriarty, Titti e Silvestro, culo e camicia, ma tu... tu mi hai sparato in faccia!",
		"Vuoi sapere davvero cosa si prova a essere il pagliaccio di mezzanotte? Quando c'è solo una barzelletta ed è sempre su di te? Be', eccoti servito! Ora capisci? [...] Ora hai capito?",
		"Killer [Croc], guarda il positivo... è meglio un falso Batman morto... di nessun Batman morto. Ah ah!",
		"L'apatia degli elettori! È sempre stata la rovina della democrazia!",
		"La follia è come un mostro con una mente tutta sua. Cento voci folli che invocano sangue. Musica per le me orecchie, cori angelici.",
		"La scelta è chiara-- o me o Petit. O voti o muori. Cancro o tubercolosi.",
		"La vita è una grande barzelletta. Tu sentirai la battuta finale... in anticipo...",
		"Sai cosa mi irrita veramente, Harley? Arrivo nel quartiere, e la gente scappa. Mi odiano! Batman prende il controllo di un quartiere, non prova altro che disprezzo per la gente, la tratta come bestie, e loro lo adorano per questo! Lui crede che la libertà 'degeneri' in anarchia. Cosa c'è di sbagliato nell'anarchia?",
		"Un pazzo entra in una macelleria e dice: 'mezzo chilo di carote, grazie.' 'Questa è una macelleria. Vattene!' Il giorno dopo. Stesso pazzo, stesso negozio 'mezzo chilo di carote, grazie.' 'Ti ho detto che questa è una macelleria. Ora vattene. La prossima volta che vieni ti inchiodo i piedi al pavimento.' Terzo giorno. Stesso pazzo, stesso negozio 'mezzo chilo di chiodi, grazie.' 'Questa è una macelleria. Non abbiamo chiodi!' 'Allora mi dia mezzo chilo di carote.'",
		"Ah! Vedo che hai ricevuto i biglietti omaggio che ti ho mandato. Sono contento. Desideravo tanto che venissi qui. Vedi, non è importante anche se mi catturi e mi rimandi nel manicomio... ho fatto impazzire Gordon. Ho dimostrato la mia tesi. Ho dimostrato che non c'è differenza tra me e chiunque altro! Basta una giornata storta per trasformare il migliore degli uomini in un folle. Ecco quanto dista il mondo da me. Una giornata storta. Anche tu hai avuto una giornata storta, dico bene? Ne sono certo. Lo capisco. Hai avuto una giornata storta e tutto è cambiato.",
		"Oh, lo so... Sei confuso. Sei spaventato. Chi non lo sarebbe? Ti trovi in una situazione infernale! Ma anche se la vita è un ginepraio e non c'è rosa senza spine, non dimenticare mai che... musica, Sam... Se al mondo trionfa la desolazione e i giornali mostrano disperazione, se c'è solo disperazione, se c'è solo violenza, dolore e guerra e tutto cospira per dividere... allora c'è una cosa che fa per me che se fai il bravo dirò a te e puoi stare certo che mi farà sorridere... Do di-mattoooo come due grosse, stonate campane... Do di-mattoooo, mangio il tappeto e faccio cose strane...",
		"Questa situazione. Mi ricorda una barzelletta... Ci sono questi due tizi in un manicomio ... e una notte, una notte decidono che sono stanchi di vivere in un manicomio. Decidono che cercheranno di fuggire! Così, salgono sul tetto e, dall'altra parte, vedono i palazzi della città distendersi alla luce della luna... verso la libertà. Il primo salta sul tetto vicino senza alcun problema. Ma il suo amico, il suo amico non osa compiere il balzo. Perché... perché ha paura di cadere. Allora il primo ha un'idea... e dice 'Ehi! Ho preso la torcia elettrica con me! Illuminerò lo spazio tra i due edifici. Così mi raggiungerai camminando sul raggio di luce!'. M-ma il secondo scuote la testa. E d-dice... Dice 'Co-cosa credi!? Che sia pazzo? Quando sarò a metà strada la spegnerai!'",
		"Ricordi? Ooh, io non lo farei! I ricordi sono pericolosi. Il passato è un posto talmente ansiogeno. Ma fortuna che è passato! Ah, ah ah! La memoria è una cosa ingannevole. In un attimo, da un luna park di delizie, pregno degli aromi della fanciullezza, del neon lampeggiante della pubertà, di tutto quello zucchero filato sentimentale... ci si ritrova in luoghi in cui non andresti mai... [...] ... luoghi freddi e oscuri, popolati dalle forme velate e ambigue di cose che speravi di aver dimenticato. I ricordi sanno essere infami, repellenti piccoli bruti. Come i bambini, suppongo. Ah, ah.",
		"Signore e signori! Lo avete letto sui giornali! E ora fremerete d'orrore osservando con i vostri stessi occhi il più raro e tragico degli scherzi di natura! ...L'uomo medio! [...] Fisicamente trascurabile, possiede peraltro un sistema distorto di valori. Notate l'abnorme rigonfiamento del senso di importanza dell'umanità. La coscienza sociale deforme e l'ottimismo atrofizzato. Non è certamente per i debole di stomaco, vero? Sommamente repellenti sono le sue fragili e inutili nozioni di ordine e sanità mentale. Sottoposte a una pressione eccessiva... esse cedono.",
		"Che si sappia in giro che il Joker mantiene sempre la sua parola.",
		"Al Joker piace sempre lasciare il segno, ovunque vada!",
		"È un grande onore essere qui stasera. Sono orgoglioso di parlare a nome della grande repubblica islamica dell'Iran. L'attuale capo di stato di quel paese e io abbiamo molto in comune. La pazzia e una grande passione per il pesce. Ma sfortunatamente, abbiamo anche un problema in comune. Nessuno ci rispetta. Tutti pensano all'Iran come alla casa del fanatico terrirista! Di me dicono cose ancora peggiori, ci credereste? Entrambi abbiamo sopportato abusi meschini e scarsa considerazione! Bene, non subiremo più!! Non vi sarà più concesso maltrattarci! In realtà, non sarete mai più in grado di maltrattare nessuno! Buonanotte a tutti!",
		"È una vera fortuna che non vado mai da nessuna parte senza portarmi dietro almeno un esplosivo.",
		"Non c'è niente come un po' di morte, distruzione e fumo per fare una grande uscita di scena!",
		"Peccato però che non ci sia il pubblico. Sarebbe stato delizioso avere una grande folla di spettatori. Adoro gli omicidi di massa.",
		"Quel Batman è vendicativo. Le cose potrebbero complicarsi. Forse sarebbe meglio non lasciare prova della mia presenza. Quello che Batman non sa, non può nuocermi!",
		"Si dà il caso che io sia pazzo. Non stupido.",
		"Sono solo un'altra vittima della Reaganomics. Per mia sfortuna vivo in un mondo che gira con i soldi. Se voglio restare in gioco, mi serve un mucchio di contante.",
		"Che cosa c'è di più bello in questo mondo gramo di... un bel sorriso a trentadue denti?",
		"Mio padre... era un uomo estremamente violento, che mi ha sempre picchiato. Ogni volta che sbagliavo qualcosa... PUM! A volte ero tranquillo, non facevo niente di male. PUM! Al paparino piaceva molto il vino, capisci? Non ci crederai, ma l'ho visto veramente felice una volta sola in tutta la sua vita. Mi portò al circo quando avevo 7 anni... oh, ricordo ancora quando uscirono i clown: correvano per la pista con quei loro calzoni enormi. Ahahahah. Il vecchio si sganasciava dalle risate, temetti che si sentisse male. Così la sera dopo gli corsi incontro con i suoi pantaloni della domenica che mi cadevano da tutte le parti: 'Hey, ciao papà, guardami' Pum. Feci un bel capitombolo e gli strappai tutti i suoi bei calzoni. Ahahahahaahahahah. Temo mi ruppe il setto nasale. [...] Che cosa ci vuoi fare, è questo il brutto della comicità, vieni comunque criticato e malmenato da chi non la capisce. Come il mio papà. O come Batman",
		"Se devi spiegare una burla, la burla non funziona! Ti è chiaro?",
		"Sei senza fantasia. Chiariamo subito una cosa, dolcezza. Voglio che l'eliminazione di Batman sia un vero e proprio capolavoro, il trionfo della mia fantasiosa verve comica sul suo ridicolo costume da pipistrello.",
		"Batman e Robin che lavorano per il Joker. Migliore. Numero. Di sempre!",
		"Così ho detto, se nessuno butterà giù la casa, ci penserò io! Posso farlo da solo.' he he he he. 'Non sono costretto a tornare alle vecchia gag. Da oggi, prenderò una direzione completamente diversa. Il Joker combatte il crimine! Quando non c'è alcun Batman... il clown scavatombe deve essere il buono. Ditemi', dico io... 'Cosa ci potrebbe essere di più ridicolo?'",
		"Il diavolo è nei dettagli, giusto? Questo è quello che mi fa scoprire sempre, dicono. Quell'ossessiva attenzione per i dettagli.",
		"Nelle mani di un gran maestro, una piadina può diventare l'elemento più pericoloso sul piatto.",
		"Non importa quanti ne ho uccisi, Batman, il mio Batman è... andato. È stato come se qualcosa fosse uscita dalla mia testa. Niente più 'principe pagliaccio', niente più 'Mefistofele dell ilarità', o 'l uomo dalle centomila maschere'...",
		"Non sono affatto pazzo. Sono solo diversamente sano.",
		"Ho sempre pensato che una qualche tragedia umana nella vita di un eroe serva a dare risonanza alla sua missione non sei d'accordo?",
		"Beh se non ti piace il film, ho delle diapositive. [dopo aver mostrato a Batman il filmato della trasformazione di Robin]",
		"Sapete ragazzi sono successe molte cose da quando il vecchio zio Joker se n'è andato: nuova città, nuove regole e ora c'è addirittura un nuovo Batman! Ma sono tornato! Sono in forma e sono pronto a fare a questa città un bello scherzetto come l'altra volta!",
		"Oh, che peccato, questo povero nuovo mondo è abitato da persone stupide come voi!",
		"Cos'è questo oltraggio? Ma insomma! È una violazione dei miei diritti civili! Un uomo deve poter massacrare il prossimo in santa pace!",
		"Era proprio questo il guaio. Non acclamavano me. Voglio dire, anch'io sono una star, no? E così, mi sono stancato del gioco e ho deciso di chiudere mentre ero ancora al top, magari mietendo qualche vittima di alto profilo.",
		"Il depistaggio, Batman. La più grande arma di un mago. Far guardare il pubblico dove si vuole. Fargli vedere quello che si vuole. Confondere completamente il bersaglio e poi giocare l'ultima mano. Ammettilo, vecchio mio. Fregato. Ti ho proprio fregato!",
		"Ma la magia, per sua stessa natura, non ti dice di aspettarti l'inaspettato? Nel momento in cui credi di aver capito tutto... ecco un colpo di scena! E ciò che pensavi fosse innocuo... ti colpisce all'improvviso!",
		"Non sei mai completamente vestito senza un sorriso.",
		"Bisogna avere un asso nella manica.",
		"È arrivato Batman...! Uh, vuole giocare con me!",
		"Io credo semplicemente che quello che non ti uccide, ti rende... più strano.",
		"Io ho avuto una visione di un mondo senza Batman. La mafia racimolava qualche spicciolo e la polizia cercava di bloccarla poco a poco. Ma era una visione... noiosa. Allora ho cambiato idea. Non voglio che il signor Reese rovini tutto, ma perché devo divertirmi soltanto io? Diamo la possibilità a qualcun altro. Se Coleman Reese non è morto entro sessanta minuti, faccio saltare in aria un ospedale.",
		"Io sono un tipo dai gusti semplici. Mi piacciono la dinamite, la polvere da sparo, e la benzina! E sai qual è la cosa che hanno in comune? Costano poco.",
		"La follia, come sai, è come la gravità: basta solo una piccola spinta.",
		"Lo sai cosa sono? Sono un cane che insegue le macchine. Non saprei che farmene se le prendessi! Ecco io... agisco e basta. La mafia ha dei piani. La polizia ha dei piani. Gordon ha dei piani. Loro sono degli opportunisti. Opportunisti che cercano di controllare i loro piccoli mondi. Io non sono un opportunista. Io cerco di dimostrare agli opportunisti quanto siano patetici i loro tentativi di controllare le cose. Quindi quando dico... vieni qui. Quando dico che con te e la tua ragazza non c'era niente di personale, capisci che ti dico la verità. [libera un braccio di Due Facce] Sono gli opportunisti... che ti hanno messo dove sei. Anche tu eri un opportunista. Avevi dei piani. E, guarda dove ti hanno portato. ",
		"Stasera parteciperete tutti ad un esperimento sociale. Attraverso la magia del carburante Diesel e del nitrato d'ammonio, sono pronto fin d'ora a farvi saltare tutti quanti in aria. Se uno solo tenta di scappare dalla nave, morirete tutti. Ogni nave ha un telecomando per far saltare l'altra. A mezzanotte vi farò saltare tutti in aria. Però, se uno di voi premerà il bottone, lascerò libera la sua nave. Quindi, chi rimarrà? La collezione di letame dei super ricercati di Harvey Dent o i dolci e innocenti cittadini? A voi la scelta. Ah, e vi consiglio di decidere in fretta perché i passeggeri dell'altra nave potrebbero anche non essere tanto altruisti...",
		"Tu-tu non riesci proprio a lasciarmi andare, vero?! Ecco cosa succede quando una forza irrefrenabile incontra un oggetto inamovibile. Tu sei davvero incorruttibile, non è così? Eh!? Tu non mi uccidi per un mal riposto senso di superiorità. E io non ti ucciderò... perché tu sei troppo divertente! Credo che io e te siamo destinati a lottare per sempre.",
		"Vuoi sapere come mi sono fatto queste cicatrici? Mio padre era... un alcolista. E un maniaco. E una notte da di matto ancora più del solito. Mamma prende un coltello da cucina per difendersi; ma a lui questo non piace. Neanche... un... pochetto. Allora, mentre io li guardo, la colpisce col coltello, ridendo mentre lo fa. Si gira verso di me, e dice... 'Perché sei così serio?' Viene verso di me con il coltello, 'Perché sei così serio?!' E mi ficca la lama in bocca, 'Mettiamo un bel sorriso su quel faccino!' E... perché sei così serio? [lo uccide]",
		"Vuoi sapere perché uso il coltello? Le pistole sono troppo rapide. Non puoi assaporare tutte le... piccole... emozioni. Vedi, nei loro... ultimi attimi, le persone mostrano chi sono veramente. Quindi in un certo senso posso dire che... ho conosciuto i tuoi amici meglio di te. Vuoi sapere chi di loro era un vigliacco?",
		"Conoscere il giorno e l'ora della propria morte dà una serenità che non ho mai conosciuto prima d'ora.",
		"Dovrei... dovrei... scusarmi, sig. Mangles? Dovrei dire che mi... dispiace? [...] Davvero? E se mi dispiacesse davvero? Farebbe qualche- differenza? Ti soddisferebbe? Se fossi davvero... davvero... davvero... davvero... davvero... dispiaciuto? Beh, non lo sono!",
		"Non è morto subito. Ci ha messo qualche ora per smettere di strillare. Quella notte quasi non riuscii a dormire, è stata l'ultima volta che ho usato vetri rotti...",
		"Sono stato un esempio di genialità nel campo dell'attività criminale. [...] Il rapimento del sindaco. La città in ginocchio in numerose occasioni. Oh, e il mio glorioso rapimento del commissario, e poi sua figlia... [...] Omicidio di massa. Menomazioni. Tortura e terrore! Li ha fatti tutti, signora! Davanti a lei c'è l'Einstein del crimine! [...] Mettere un po' di veleno sul retro di alcuni francobolli, signora? Roba da dilettanti. Tutti qui.",
		"Ed ecco la nostra star [Batman] che attraversa il tappeto rosso! Tutto vestito in nero – Sempre chic. Ma cosa vedo, ecco il disastro del fashion. Mi meraviglio che quelle mummie escano davvero di casa vestite a quel modo.",
		"In pochi minuti diverrete tutti pazzi grazie alla mente della mia piccola Asso... E la cosa migliore è che io ne sono immune perché sono DAVVERO pazzo!",
		"La suspense mi sta uccidendo! Ovviamente le esplosioni uccideranno loro!",
		"Riuscirà Lanterna Verde a rivelare i suoi veri sentimenti? L'Alata smetterà mai di sottomettere la sua passione alla sua mazza? Il vero amore riuscirà a trionfare? Non nel mio show!",
		"Attenta. Non promettere una cosa così con leggerezza. Il desiderio diventa resa, la resa diventa potere. Lo vuoi veramente?",
		"Cosa? No, non ti ucciderò. Voglio solo farti male. Molto... molto male.",
		"Io non sono qualcuno che può essere amato. Io sono un'idea, uno stato d'animo. Io realizzerò i miei desideri secondo il mio piano e tu dottoressa, non fai parte del mio piano.",
		"Se tu non fossi così pazza, penserei che sei folle."
	];
  
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Ciao, dici "Cita il Joker" per ascoltare e visualizzare una delle migliori citazioni del Joker!Ce ne sono centinaia che ti aspettano!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        var speakOutput = jokerArray[Math.floor(Math.random()*jokerArray.length)];
        /*if (handlerInput.requestEnvelope && handlerInput.requestEnvelope.request && handlerInput.requestEnvelope.request.intent && handlerInput.requestEnvelope.request.intent.slots && handlerInput.requestEnvelope.request.intent.slots.testo && handlerInput.requestEnvelope.request.intent.slots.testo.value){
            speakOutput = handlerInput.requestEnvelope.request.intent.slots.testo.value;
            
        }*/
        
        if (supportsDisplay(handlerInput)) {

          let backgroundImage = new Alexa.ImageHelper()
            .withDescription(TITLE)
            .addImageInstance(BACKGROUND_IMAGE_URL)
            .getImage();
            
          let primaryTextString = "<div align='center'><b><font size='4'>" + speakOutput + "</font></b></div>";
          
          //primaryTextString += "<div align='center'><b><font size='5'>" + speakOutput.split(' ').reverse().sort(function(){return 0.5-Math.random()}).join(' ').toUpperCase() + "</font></b></div>";
          
    
          let primaryText = new Alexa.RichTextContentHelper()
            .withPrimaryText(primaryTextString)
            .getTextContent();
    
          let myTemplate = {
            type: 'BodyTemplate1',
            token: 'Welcome',
            backButton: 'HIDDEN',
            backgroundImage: backgroundImage,
            title: TITLE,
            textContent: primaryText
          }
          //if (speakOutput !== "Ricorda, al testo che vuoi visualizzare parola mescola anteporre devi!") {
	        handlerInput.responseBuilder
	            .speak(speakOutput)
	            .addRenderTemplateDirective(myTemplate)
	            .withSimpleCard(TITLE, SUBTITLE);
          /*} else {
            handlerInput.responseBuilder
                .speak(speakOutput)
                .withSimpleCard(TITLE, SUBTITLE);
          }*/
    
        } else {
          handlerInput.responseBuilder
            .withSimpleCard(TITLE, SUBTITLE)
            .speak("Il tuo device non ha un display. Non sono riuscita a mostrarti la seguente citazione :" + speakOutput);
        }
    
        return handlerInput.responseBuilder
          .getResponse();

        
        //return handlerInput.responseBuilder
            //.speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            //.getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Ciao, dici "Cita il Joker" per ascoltare e visualizzare una delle migliori citazioni del Joker!Ce ne sono centinaia che ti aspettano!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Ciao ciao!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `Hai evocato ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Scusa non ho capito. Puoi ripetere?`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

function supportsDisplay(handlerInput) {
  const hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;
  return hasDisplay;
}

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();