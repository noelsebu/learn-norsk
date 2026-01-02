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
