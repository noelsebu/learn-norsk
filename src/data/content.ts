// ─── PHRASES ───
export interface Phrase {
  n: string; e: string; p: string; l: "A1" | "A2";
}

export const PHRASES: Phrase[] = [
{n:"Jeg heter ...",e:"My name is ...",p:"yay HEH-ter",l:"A1"},
{n:"Hvor er ...?",e:"Where is ...?",p:"voor air",l:"A1"},
{n:"Jeg forstår ikke",e:"I don't understand",p:"yay for-STOR IK-keh",l:"A1"},
{n:"Snakker du engelsk?",e:"Do you speak English?",p:"SNAH-ker doo ENG-elsk",l:"A1"},
{n:"Hva koster det?",e:"How much is it?",p:"vah KOS-ter deh",l:"A1"},
{n:"Kan du hjelpe meg?",e:"Can you help me?",p:"kahn doo YELL-peh may",l:"A1"},
{n:"Jeg vil gjerne ha ...",e:"I would like ...",p:"yay vil YAIR-neh ha",l:"A2"},
{n:"Hvor gammel er du?",e:"How old are you?",p:"voor GAH-mel air doo",l:"A1"},
{n:"Jeg kommer fra ...",e:"I come from ...",p:"yay KOM-mer frah",l:"A1"},
{n:"Hyggelig å møte deg",e:"Nice to meet you",p:"HIG-eh-lee o MUH-teh day",l:"A1"},
{n:"Regningen, takk",e:"The bill, please",p:"RAY-ning-en tahk",l:"A2"},
{n:"Kan du gjenta det?",e:"Can you repeat that?",p:"kahn doo YEN-tah deh",l:"A2"},
{n:"Hva betyr det?",e:"What does that mean?",p:"vah beh-TEER deh",l:"A2"},
{n:"Jeg snakker litt norsk",e:"I speak a little Norwegian",p:"yay SNAH-ker leet norshk",l:"A2"},
{n:"Hva tid er det?",e:"What time is it?",p:"vah tee air deh",l:"A2"},
{n:"Jeg må gå nå",e:"I have to go now",p:"yay mo go no",l:"A2"},
{n:"Vi ses i morgen",e:"See you tomorrow",p:"vee sehs ee MOR-en",l:"A2"},
{n:"Hva synes du?",e:"What do you think?",p:"vah SEE-nes doo",l:"A2"},
{n:"Jeg gleder meg",e:"I'm looking forward to it",p:"yay GLEH-der may",l:"A2"},
{n:"La oss ...",e:"Let's ...",p:"lah oss",l:"A2"},
{n:"Det kommer an på",e:"It depends",p:"deh KOM-mer ahn po",l:"A2"},
{n:"Hvor bor du?",e:"Where do you live?",p:"voor bohr doo",l:"A2"},
{n:"Hva gjør du?",e:"What do you do?",p:"vah yurr doo",l:"A2"},
{n:"Kan jeg få ...?",e:"Can I have ...?",p:"kahn yay fo",l:"A2"},
];

// ─── GRAMMAR ───
export interface GrammarTopic {
  t: string; em: string; l: "A1" | "A2"; d: string; ex: string[]; tip: string;
}

export const GRAMMAR: GrammarTopic[] = [
{t:"Noun Gender & Articles",em:"🏷️",l:"A1",d:"Norwegian has 3 genders: masculine (en), feminine (ei), neuter (et). Gender determines article and definite suffix.",ex:["en gutt → gutten (a/the boy)","ei jente → jenta (a/the girl)","et hus → huset (a/the house)"],tip:"In Bokmål, you can use 'en' for feminine nouns too — this is fully accepted."},
{t:"Plural Nouns",em:"📚",l:"A1",d:"Most en-nouns add -er for plural. Et-nouns (one syllable) stay same. Definite plural adds -ene.",ex:["en bil → biler → bilene (cars/the cars)","et hus → hus → husene","ei bok → bøker → bøkene (vowel change!)"],tip:"Common irregulars: mann→menn, barn→barn, bok→bøker."},
{t:"V2 Word Order",em:"🔀",l:"A1",d:"The verb MUST be the 2nd element in main clauses. If an adverb starts, subject-verb invert.",ex:["Jeg spiser fisk.","I dag spiser jeg fisk. (V2 inversion)","Noen ganger leser hun bøker."],tip:"In subordinate clauses (fordi, når, som), 'ikke' comes BEFORE the verb."},
{t:"Present Tense",em:"⚡",l:"A1",d:"Add -r to the infinitive. Same form for ALL persons — no conjugation by person!",ex:["å snakke → snakker","å bo → bor","å se → ser"],tip:"Irregular: å være → er, å vite → vet, å gjøre → gjør."},
{t:"Past Tense (4 Groups)",em:"⏪",l:"A2",d:"G1: -et (snakket). G2: -te (spiste, kjøpte). G3: -de/-dde (bodde). G4 strong verbs: vowel change (drakk, skrev, gikk).",ex:["G1: å jobbe → jobbet","G2: å spise → spiste","G3: å bo → bodde","G4: å skrive → skrev, å gå → gikk"],tip:"G1 is the default — when unsure, try -et first."},
{t:"Present Perfect",em:"✅",l:"A2",d:"har + past participle. G1: -et, G2: -t, G3: -dd, G4: varies.",ex:["Jeg har snakket norsk.","Han har lest boken.","Vi har bodd her i tre år.","Hun har skrevet et brev."],tip:"Use for actions relevant to now, or with aldri/allerede/ennå."},
{t:"Future Expressions",em:"🔮",l:"A2",d:"Three ways: 'skal' (plans), 'vil' (wants), 'kommer til å' (going to). Also present + time word.",ex:["Jeg skal reise til Bergen.","Han vil lære norsk.","Det kommer til å regne.","Jeg reiser i morgen. (present as future)"],tip:"'Skal' = planned future. 'Vil' = want/desire. 'Kommer til å' = prediction."},
{t:"Adjective Agreement",em:"🎨",l:"A2",d:"Adjectives agree with gender, number, and definiteness. Neuter: +t, Plural: +e.",ex:["en stor bil / et stort hus / store biler","den store bilen (the big car — double definite)","det røde huset / de gamle mennene"],tip:"'Liten' is irregular: liten/lita/lite/små."},
{t:"Possessives",em:"🤝",l:"A2",d:"Can go before or after noun. After = more colloquial (noun takes definite suffix).",ex:["min bil = bilen min (my car)","ditt hus = huset ditt (your house)","hans/hennes (his/her — same position)"],tip:"Reflexive 'sin/si/sitt/sine' refers back to the subject of the same clause."},
{t:"Negation",em:"🚫",l:"A2",d:"'Ikke' goes AFTER verb in main clauses, BEFORE verb in subordinate clauses.",ex:["Jeg liker ikke kaffe. (main)","...fordi jeg ikke liker kaffe. (sub)","Liker du ikke kaffe? (question)"],tip:"No double negation: ingen, ingenting, aldri already imply negation."},
{t:"Modal Verbs",em:"🔑",l:"A2",d:"kan, vil, skal, må, bør — followed by infinitive WITHOUT 'å'.",ex:["Jeg kan svømme.","Vi skal reise.","Du må spise.","Du bør lese mer."],tip:"kan=can, vil=want, skal=will/plan, må=must, bør=should."},
{t:"Comparatives & Superlatives",em:"📏",l:"A2",d:"Regular: -ere (comp), -est (sup). Irregular for common adjectives. 'Mer/mest' for long words.",ex:["stor → større → størst","god → bedre → best","liten → mindre → minst","gammel → eldre → eldst"],tip:"Long adjectives: interessant → mer interessant → mest interessant."},
{t:"Question Words",em:"❓",l:"A1",d:"Hva (what), hvem (who), hvor (where), når (when), hvorfor (why), hvordan (how), hvilken (which).",ex:["Hva gjør du?","Hvem er det?","Hvor bor du?","Hvorfor lærer du norsk?"],tip:"Hvilken (en), hvilket (et), hvilke (plural)."},
{t:"Conjunctions",em:"🔗",l:"A2",d:"Coordinating: og, men, eller, for. Subordinating: fordi, at, når, hvis, som, selv om.",ex:["Jeg liker kaffe, men han liker te.","Jeg vet at hun kommer.","Hvis det regner, blir vi hjemme."],tip:"After subordinating conjunctions, 'ikke' moves before the verb."},
{t:"Reflexive Verbs",em:"🪞",l:"A2",d:"Some verbs need a reflexive pronoun (seg/meg/deg/oss). The pronoun matches the subject.",ex:["Jeg vasker meg.","Hun setter seg.","Vi gleder oss.","De giftet seg."],tip:"Common: å legge seg (go to bed), å føle seg (feel), å bestemme seg (decide)."},
{t:"Pronouns",em:"👤",l:"A1",d:"Subject: jeg, du, han, hun, vi, dere, de. Object: meg, deg, ham, henne, oss, dere, dem.",ex:["Jeg ser deg.","Kan du hjelpe meg?","Vi liker dem.","Hun ga ham boken."],tip:"'Man' is the impersonal pronoun (like 'one' or general 'you')."},
];

// ─── CONJUGATION ───
export interface Conjugation {
  i: string; pr: string; pa: string; pf: string; e: string; g: string;
}

export const CONJUGATIONS: Conjugation[] = [
{i:"å snakke",pr:"snakker",pa:"snakket",pf:"har snakket",e:"to speak",g:"1"},
{i:"å jobbe",pr:"jobber",pa:"jobbet",pf:"har jobbet",e:"to work",g:"1"},
{i:"å spise",pr:"spiser",pa:"spiste",pf:"har spist",e:"to eat",g:"2"},
{i:"å lese",pr:"leser",pa:"leste",pf:"har lest",e:"to read",g:"2"},
{i:"å kjøpe",pr:"kjøper",pa:"kjøpte",pf:"har kjøpt",e:"to buy",g:"2"},
{i:"å like",pr:"liker",pa:"likte",pf:"har likt",e:"to like",g:"2"},
{i:"å bo",pr:"bor",pa:"bodde",pf:"har bodd",e:"to live",g:"3"},
{i:"å prøve",pr:"prøver",pa:"prøvde",pf:"har prøvd",e:"to try",g:"3"},
{i:"å drikke",pr:"drikker",pa:"drakk",pf:"har drukket",e:"to drink",g:"4"},
{i:"å skrive",pr:"skriver",pa:"skrev",pf:"har skrevet",e:"to write",g:"4"},
{i:"å se",pr:"ser",pa:"så",pf:"har sett",e:"to see",g:"4"},
{i:"å gå",pr:"går",pa:"gikk",pf:"har gått",e:"to go",g:"4"},
{i:"å komme",pr:"kommer",pa:"kom",pf:"har kommet",e:"to come",g:"4"},
{i:"å sove",pr:"sover",pa:"sov",pf:"har sovet",e:"to sleep",g:"4"},
{i:"å ta",pr:"tar",pa:"tok",pf:"har tatt",e:"to take",g:"4"},
{i:"å gi",pr:"gir",pa:"ga",pf:"har gitt",e:"to give",g:"4"},
];

// ─── SENTENCE BUILDER ───
export interface Sentence { w: string[]; e: string; l: "A1" | "A2"; }

export const SENTENCES: Sentence[] = [
{w:["Jeg","liker","kaffe"],e:"I like coffee",l:"A1"},
{w:["Han","spiser","fisk"],e:"He eats fish",l:"A1"},
{w:["Vi","bor","i","Norge"],e:"We live in Norway",l:"A1"},
{w:["Hun","leser","en","bok"],e:"She reads a book",l:"A1"},
{w:["Jeg","snakker","ikke","norsk"],e:"I don't speak Norwegian",l:"A1"},
{w:["I","dag","spiser","jeg","fisk"],e:"Today I eat fish (V2!)",l:"A2"},
{w:["Kan","du","hjelpe","meg"],e:"Can you help me?",l:"A1"},
{w:["Bilen","min","er","rød"],e:"My car is red",l:"A2"},
{w:["De","drikker","kaffe","hver","dag"],e:"They drink coffee every day",l:"A2"},
{w:["Vi","skal","reise","til","Bergen"],e:"We will travel to Bergen",l:"A2"},
{w:["Jeg","har","ikke","lest","boken"],e:"I have not read the book",l:"A2"},
{w:["Fordi","jeg","ikke","forstår","norsk"],e:"Because I don't understand Norwegian",l:"A2"},
{w:["Det","store","huset","er","hvitt"],e:"The big house is white",l:"A2"},
{w:["Hun","bodde","i","Oslo","før"],e:"She lived in Oslo before",l:"A2"},
{w:["Jeg","vil","gjerne","ha","vann"],e:"I would like water",l:"A2"},
];

// ─── FILL IN THE BLANK ───
export interface FillBlank { s: string; a: string; h: string; l: "A1" | "A2"; }

export const FILL_BLANKS: FillBlank[] = [
{s:"Jeg ___ norsk.",a:"snakker",h:"speak (present)",l:"A1"},
{s:"Hun ___ en bok.",a:"leser",h:"reads",l:"A1"},
{s:"Vi ___ i Oslo.",a:"bor",h:"live",l:"A1"},
{s:"Kan du ___ meg?",a:"hjelpe",h:"help (infinitive)",l:"A1"},
{s:"De ___ til Norge i går.",a:"kom",h:"came (past of komme)",l:"A2"},
{s:"Han har ___ boken.",a:"lest",h:"read (past participle)",l:"A2"},
{s:"Vi ___ spise middag.",a:"skal",h:"shall/will (modal)",l:"A2"},
{s:"___ heter du?",a:"Hva",h:"what (question word)",l:"A1"},
{s:"Bilen ___ er blå.",a:"min",h:"my (possessive, after noun)",l:"A2"},
{s:"Huset er ___ enn leiligheten.",a:"større",h:"bigger (comparative)",l:"A2"},
{s:"Vi gleder ___ til ferien.",a:"oss",h:"ourselves (reflexive)",l:"A2"},
{s:"Det er den ___ boken jeg har lest.",a:"beste",h:"best (superlative)",l:"A2"},
{s:"Jeg gikk hjem ___ det regnet.",a:"fordi",h:"because (conjunction)",l:"A2"},
{s:"___ du er sulten, kan du spise.",a:"Hvis",h:"if (conjunction)",l:"A2"},
{s:"Mannen ___ bor her er lege.",a:"som",h:"who/which (relative)",l:"A2"},
{s:"Jeg har ___ vært i Bergen.",a:"aldri",h:"never (adverb)",l:"A2"},
];

// ─── DIALOGUES ───
export interface DialogueLine { w: string; n: string; e: string; }
export interface Dialogue { t: string; l: "A1" | "A2"; li: DialogueLine[]; }

export const DIALOGUES: Dialogue[] = [
{t:"At the Café",l:"A1",li:[
{w:"A",n:"Hei! Hva vil du ha?",e:"Hi! What would you like?"},
{w:"B",n:"Jeg vil gjerne ha en kaffe, takk.",e:"I'd like a coffee, thanks."},
{w:"A",n:"Stor eller liten?",e:"Big or small?"},
{w:"B",n:"Stor, takk. Hva koster det?",e:"Big, thanks. How much?"},
{w:"A",n:"Femti kroner.",e:"Fifty kroner."},
{w:"B",n:"Vær så god. Tusen takk!",e:"Here you go. Thanks!"},
]},
{t:"Meeting Someone",l:"A1",li:[
{w:"A",n:"Hei! Jeg heter Anna. Hva heter du?",e:"Hi! I'm Anna. What's your name?"},
{w:"B",n:"Jeg heter Erik. Hyggelig å møte deg.",e:"I'm Erik. Nice to meet you."},
{w:"A",n:"Hvor kommer du fra?",e:"Where are you from?"},
{w:"B",n:"Jeg kommer fra India. Og du?",e:"I'm from India. And you?"},
{w:"A",n:"Jeg er fra Bergen. Snakker du norsk?",e:"I'm from Bergen. Do you speak Norwegian?"},
{w:"B",n:"Jeg snakker litt norsk. Jeg lærer!",e:"I speak a little Norwegian. I'm learning!"},
]},
{t:"At the Doctor",l:"A2",li:[
{w:"A",n:"God dag. Hva kan jeg hjelpe deg med?",e:"Hello. How can I help you?"},
{w:"B",n:"Jeg har vondt i hodet og er veldig sliten.",e:"I have a headache and I'm very tired."},
{w:"A",n:"Hvor lenge har du hatt hodepine?",e:"How long have you had a headache?"},
{w:"B",n:"I tre dager. Og jeg sover dårlig.",e:"For three days. And I sleep badly."},
{w:"A",n:"Jeg skal skrive ut en resept.",e:"I'll write a prescription."},
]},
{t:"Shopping",l:"A2",li:[
{w:"A",n:"Har dere denne genseren i medium?",e:"Do you have this sweater in medium?"},
{w:"B",n:"Ja, her er den. Vil du prøve den?",e:"Yes, here it is. Want to try it?"},
{w:"A",n:"Ja, takk. Den passer perfekt!",e:"Yes thanks. It fits perfectly!"},
{w:"B",n:"Den koster tre hundre og femti kroner.",e:"It costs 350 kroner."},
{w:"A",n:"Kan jeg betale med kort?",e:"Can I pay with card?"},
{w:"B",n:"Ja, selvfølgelig.",e:"Yes, of course."},
]},
{t:"Making Plans",l:"A2",li:[
{w:"A",n:"Hva skal du gjøre i helgen?",e:"What will you do this weekend?"},
{w:"B",n:"Jeg har ikke bestemt meg ennå.",e:"I haven't decided yet."},
{w:"A",n:"Vi kan gå på tur hvis det er fint vær.",e:"We can hike if weather's nice."},
{w:"B",n:"Det høres bra ut! Når møtes vi?",e:"Sounds good! When do we meet?"},
{w:"A",n:"Klokka ni på lørdag?",e:"Nine on Saturday?"},
{w:"B",n:"Perfekt. Jeg gleder meg!",e:"Perfect. Looking forward to it!"},
]},
{t:"Past Weekend",l:"A2",li:[
{w:"A",n:"Hva gjorde du i helgen?",e:"What did you do this weekend?"},
{w:"B",n:"Jeg reiste til Stavanger med familien.",e:"I went to Stavanger with family."},
{w:"A",n:"Hva så dere?",e:"What did you see?"},
{w:"B",n:"Vi gikk til Preikestolen. Fantastisk!",e:"We went to Pulpit Rock. Fantastic!"},
{w:"A",n:"Hadde dere fint vær?",e:"Did you have nice weather?"},
{w:"B",n:"Ja, sol og varmt. Vi hadde flaks!",e:"Yes, sunny and warm. We were lucky!"},
]},
];

// ─── READING ───
export interface ReadingQuestion { q: string; o: string[]; a: string; }
export interface Reading { t: string; l: "A1" | "A2"; tx: string; en: string; qs: ReadingQuestion[]; }

export const READINGS: Reading[] = [
{t:"Min Dag",l:"A1",
tx:"Jeg heter Kari. Jeg bor i Oslo. Hver dag står jeg opp klokka sju. Jeg spiser frokost med familien min — kaffe og brød med ost. Så går jeg til jobb. Jeg jobber på et kontor. Etter jobb trener jeg. Om kvelden lager jeg middag og leser en bok. Jeg legger meg klokka elleve.",
en:"My name is Kari. I live in Oslo. Every day I get up at seven. I eat breakfast with my family — coffee and bread with cheese. Then I go to work. I work in an office. After work I exercise. In the evening I make dinner and read a book. I go to bed at eleven.",
qs:[{q:"Hvor bor Kari?",o:["Bergen","Oslo","Tromsø"],a:"Oslo"},{q:"Hva spiser hun til frokost?",o:["Egg","Brød med ost","Suppe"],a:"Brød med ost"},{q:"Når legger hun seg?",o:["Klokka ni","Klokka elleve","Klokka tolv"],a:"Klokka elleve"}]},
{t:"Helgeturen",l:"A2",
tx:"Forrige helg reiste vi til Lofoten. Vi tok fly til Bodø og ferge videre. Været var fint. Vi bodde i en rorbu ved havet. Første dag gikk vi en lang tur i fjellet og så mange fugler. Andre dag fisket vi torsk fra en båt. Om kvelden lagde vi middag med fisken vi hadde fanget. Det var den beste middagen jeg har spist!",
en:"Last weekend we traveled to Lofoten. We flew to Bodø and took a ferry onward. The weather was nice. We stayed in a fisherman's cabin by the sea. The first day we hiked in the mountains and saw many birds. The second day we fished cod from a boat. In the evening we made dinner with the fish we'd caught. It was the best dinner I've eaten!",
qs:[{q:"Hvordan reiste de?",o:["Bil","Fly og ferge","Tog"],a:"Fly og ferge"},{q:"Hva gjorde de dag 1?",o:["Fisket","Gikk tur i fjellet","Svømte"],a:"Gikk tur i fjellet"},{q:"Hva spiste de?",o:["Pizza","Fisk de fanget","Pasta"],a:"Fisk de fanget"}]},
{t:"Ny i Norge",l:"A2",
tx:"Jeg heter Priya og flyttet til Norge for seks måneder siden. I begynnelsen var det vanskelig fordi jeg ikke snakket norsk. Nå går jeg på norskkurs tre ganger i uken. Grammatikken er fortsatt vanskelig! Vinteren var kald — minus tjue grader i januar. Men nordlysene var utrolig vakre. Jeg har fått mange norske venner. Min favoritt norske mat er brunost!",
en:"My name is Priya and I moved to Norway six months ago. In the beginning it was hard because I didn't speak Norwegian. Now I attend Norwegian class three times a week. Grammar is still difficult! Winter was cold — minus twenty in January. But the northern lights were incredibly beautiful. I've made many Norwegian friends. My favorite Norwegian food is brown cheese!",
qs:[{q:"Når flyttet Priya?",o:["For et år siden","For seks måneder siden","I fjor"],a:"For seks måneder siden"},{q:"Hva er vanskelig?",o:["Maten","Grammatikken","Vennene"],a:"Grammatikken"},{q:"Hva liker hun å spise?",o:["Fisk","Brunost","Kjøttkaker"],a:"Brunost"}]},
];
