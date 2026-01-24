'use client';
// @ts-nocheck
import { useState, useEffect, useCallback, useMemo } from "react";

/* ══════ DATA ══════ */
const V = {
"Hilsener":[
{n:"Hei",e:"Hello",p:"hay",g:"",l:"A1"},{n:"God morgen",e:"Good morning",p:"goo MOR-en",g:"",l:"A1"},
{n:"God kveld",e:"Good evening",p:"goo KVELL",g:"",l:"A1"},{n:"God natt",e:"Good night",p:"goo naht",g:"",l:"A1"},
{n:"Ha det bra",e:"Goodbye/Take care",p:"ha deh brah",g:"",l:"A1"},{n:"Takk",e:"Thanks",p:"tahk",g:"",l:"A1"},
{n:"Tusen takk",e:"Thanks a lot",p:"TOO-sen tahk",g:"",l:"A1"},{n:"Vær så snill",e:"Please",p:"vair so snill",g:"",l:"A1"},
{n:"Unnskyld",e:"Excuse me",p:"OON-shild",g:"",l:"A1"},{n:"Beklager",e:"Sorry (formal)",p:"beh-KLAH-ger",g:"",l:"A2"},
{n:"Velkommen",e:"Welcome",p:"vel-KOM-men",g:"",l:"A1"},{n:"Hvordan går det?",e:"How are you?",p:"VOOR-dan gor deh",g:"",l:"A1"},
{n:"Det går bra",e:"I'm fine",p:"deh gor brah",g:"",l:"A1"},{n:"Snakkes",e:"Talk later",p:"SNAH-kess",g:"",l:"A1"},
{n:"Ikke noe problem",e:"No problem",p:"IK-keh noo proh-BLEHM",g:"",l:"A2"},
],
"Tall":[
{n:"Null",e:"0",p:"nool",g:"",l:"A1"},{n:"En",e:"1",p:"ehn",g:"",l:"A1"},{n:"To",e:"2",p:"too",g:"",l:"A1"},
{n:"Tre",e:"3",p:"treh",g:"",l:"A1"},{n:"Fire",e:"4",p:"FEE-reh",g:"",l:"A1"},{n:"Fem",e:"5",p:"femm",g:"",l:"A1"},
{n:"Seks",e:"6",p:"sex",g:"",l:"A1"},{n:"Sju",e:"7",p:"shoo",g:"",l:"A1"},{n:"Åtte",e:"8",p:"OH-teh",g:"",l:"A1"},
{n:"Ni",e:"9",p:"nee",g:"",l:"A1"},{n:"Ti",e:"10",p:"tee",g:"",l:"A1"},{n:"Elleve",e:"11",p:"EL-veh",g:"",l:"A1"},
{n:"Tolv",e:"12",p:"toll",g:"",l:"A1"},{n:"Tjue",e:"20",p:"KHOO-eh",g:"",l:"A1"},{n:"Tretti",e:"30",p:"TRET-tee",g:"",l:"A2"},
{n:"Førti",e:"40",p:"FUR-tee",g:"",l:"A2"},{n:"Femti",e:"50",p:"FEM-tee",g:"",l:"A2"},
{n:"Hundre",e:"100",p:"HOON-dreh",g:"",l:"A2"},{n:"Tusen",e:"1000",p:"TOO-sen",g:"",l:"A2"},
{n:"Første",e:"First",p:"FUSH-teh",g:"",l:"A2"},{n:"Andre",e:"Second",p:"AHN-dreh",g:"",l:"A2"},
],
"Mat og Drikke":[
{n:"Brød",e:"Bread",p:"bruh",g:"et",l:"A1"},{n:"Vann",e:"Water",p:"vahn",g:"et",l:"A1"},
{n:"Kaffe",e:"Coffee",p:"KAH-feh",g:"en",l:"A1"},{n:"Te",e:"Tea",p:"teh",g:"en",l:"A1"},
{n:"Fisk",e:"Fish",p:"fisk",g:"en",l:"A1"},{n:"Ost",e:"Cheese",p:"oost",g:"en",l:"A1"},
{n:"Melk",e:"Milk",p:"melk",g:"en",l:"A1"},{n:"Øl",e:"Beer",p:"url",g:"et",l:"A2"},
{n:"Smør",e:"Butter",p:"smurr",g:"et",l:"A1"},{n:"Egg",e:"Egg",p:"ehg",g:"et",l:"A1"},
{n:"Kjøtt",e:"Meat",p:"shurt",g:"et",l:"A1"},{n:"Kylling",e:"Chicken",p:"SHIL-ling",g:"en",l:"A2"},
{n:"Ris",e:"Rice",p:"rees",g:"en",l:"A1"},{n:"Suppe",e:"Soup",p:"SOOP-eh",g:"en",l:"A2"},
{n:"Frukt",e:"Fruit",p:"frookt",g:"en",l:"A1"},{n:"Grønnsaker",e:"Vegetables",p:"GRUNN-sah-ker",g:"",l:"A2"},
{n:"Poteter",e:"Potatoes",p:"poh-TEH-ter",g:"",l:"A1"},{n:"Frokost",e:"Breakfast",p:"FROO-kost",g:"en",l:"A1"},
{n:"Lunsj",e:"Lunch",p:"loonsh",g:"en",l:"A1"},{n:"Middag",e:"Dinner",p:"MID-dahg",g:"en",l:"A1"},
],
"Hverdag":[
{n:"Hus",e:"House",p:"hoos",g:"et",l:"A1"},{n:"Leilighet",e:"Apartment",p:"LAY-lee-heht",g:"en",l:"A2"},
{n:"Bil",e:"Car",p:"beel",g:"en",l:"A1"},{n:"Buss",e:"Bus",p:"booss",g:"en",l:"A1"},
{n:"Tog",e:"Train",p:"tohg",g:"et",l:"A1"},{n:"Sykkel",e:"Bicycle",p:"SIK-kel",g:"en",l:"A2"},
{n:"Bok",e:"Book",p:"bohk",g:"en",l:"A1"},{n:"Skole",e:"School",p:"SKOO-leh",g:"en",l:"A1"},
{n:"Jobb",e:"Job",p:"yobb",g:"en",l:"A1"},{n:"Butikk",e:"Shop",p:"boo-TIKK",g:"en",l:"A1"},
{n:"Restaurant",e:"Restaurant",p:"res-too-RAHNG",g:"en",l:"A2"},{n:"Sykehus",e:"Hospital",p:"SEE-keh-hoos",g:"et",l:"A2"},
{n:"Bibliotek",e:"Library",p:"bib-lee-oh-TEHK",g:"et",l:"A2"},{n:"Penger",e:"Money",p:"PENG-er",g:"",l:"A1"},
{n:"Nøkkel",e:"Key",p:"NUK-kel",g:"en",l:"A2"},{n:"Telefon",e:"Phone",p:"teh-leh-FOHN",g:"en",l:"A1"},
{n:"Dør",e:"Door",p:"durr",g:"en",l:"A1"},{n:"Vindu",e:"Window",p:"VIN-doo",g:"et",l:"A1"},
{n:"Bord",e:"Table",p:"bohr",g:"et",l:"A1"},{n:"Stol",e:"Chair",p:"stohl",g:"en",l:"A1"},
{n:"Seng",e:"Bed",p:"seng",g:"en",l:"A1"},{n:"Klokke",e:"Clock",p:"KLOK-keh",g:"en",l:"A2"},
],
"Familie":[
{n:"Mor",e:"Mother",p:"mohr",g:"en",l:"A1"},{n:"Far",e:"Father",p:"fahr",g:"en",l:"A1"},
{n:"Søster",e:"Sister",p:"SUS-ter",g:"en",l:"A1"},{n:"Bror",e:"Brother",p:"broor",g:"en",l:"A1"},
{n:"Barn",e:"Child",p:"bahrn",g:"et",l:"A1"},{n:"Sønn",e:"Son",p:"sunn",g:"en",l:"A1"},
{n:"Datter",e:"Daughter",p:"DAHT-ter",g:"en",l:"A1"},{n:"Bestemor",e:"Grandmother",p:"BES-teh-mohr",g:"en",l:"A1"},
{n:"Bestefar",e:"Grandfather",p:"BES-teh-fahr",g:"en",l:"A1"},{n:"Onkel",e:"Uncle",p:"ONG-kel",g:"en",l:"A2"},
{n:"Tante",e:"Aunt",p:"TAHN-teh",g:"en",l:"A2"},{n:"Mann",e:"Husband/Man",p:"mahn",g:"en",l:"A1"},
{n:"Kone",e:"Wife",p:"KOH-neh",g:"en",l:"A1"},{n:"Kjæreste",e:"Partner",p:"SHAIR-es-teh",g:"en",l:"A2"},
{n:"Venn",e:"Friend",p:"ven",g:"en",l:"A1"},{n:"Nabo",e:"Neighbor",p:"NAH-boo",g:"en",l:"A2"},
],
"Kropp og Helse":[
{n:"Hode",e:"Head",p:"HOO-deh",g:"et",l:"A1"},{n:"Øye",e:"Eye",p:"UH-yeh",g:"et",l:"A1"},
{n:"Øre",e:"Ear",p:"UH-reh",g:"et",l:"A1"},{n:"Nese",e:"Nose",p:"NEH-seh",g:"en",l:"A1"},
{n:"Munn",e:"Mouth",p:"moon",g:"en",l:"A1"},{n:"Hånd",e:"Hand",p:"hohn",g:"en",l:"A1"},
{n:"Arm",e:"Arm",p:"ahrm",g:"en",l:"A1"},{n:"Bein",e:"Leg",p:"bayn",g:"et",l:"A1"},
{n:"Fot",e:"Foot",p:"foht",g:"en",l:"A1"},{n:"Rygg",e:"Back",p:"rigg",g:"en",l:"A2"},
{n:"Mage",e:"Stomach",p:"MAH-geh",g:"en",l:"A2"},{n:"Hjerte",e:"Heart",p:"YAIR-teh",g:"et",l:"A2"},
{n:"Lege",e:"Doctor",p:"LEH-geh",g:"en",l:"A1"},{n:"Medisin",e:"Medicine",p:"meh-dee-SEEN",g:"en",l:"A2"},
{n:"Hodepine",e:"Headache",p:"HOO-deh-pee-neh",g:"en",l:"A2"},{n:"Syk",e:"Sick",p:"seek",g:"adj",l:"A1"},
{n:"Frisk",e:"Healthy",p:"frisk",g:"adj",l:"A2"},
],
"Natur og Vær":[
{n:"Fjord",e:"Fjord",p:"fyord",g:"en",l:"A1"},{n:"Fjell",e:"Mountain",p:"fyell",g:"et",l:"A1"},
{n:"Hav",e:"Ocean",p:"hahv",g:"et",l:"A1"},{n:"Innsjø",e:"Lake",p:"IN-shuh",g:"en",l:"A2"},
{n:"Elv",e:"River",p:"elv",g:"en",l:"A2"},{n:"Skog",e:"Forest",p:"skohg",g:"en",l:"A1"},
{n:"Sol",e:"Sun",p:"sohl",g:"en",l:"A1"},{n:"Regn",e:"Rain",p:"rayn",g:"et",l:"A1"},
{n:"Snø",e:"Snow",p:"snuh",g:"en",l:"A1"},{n:"Vind",e:"Wind",p:"vind",g:"en",l:"A1"},
{n:"Sky",e:"Cloud",p:"shee",g:"en",l:"A2"},{n:"Blomst",e:"Flower",p:"blomst",g:"en",l:"A1"},
{n:"Tre",e:"Tree",p:"treh",g:"et",l:"A1"},{n:"Nordlys",e:"Northern lights",p:"NOOR-lees",g:"et",l:"A2"},
{n:"Kaldt",e:"Cold (weather)",p:"kahlt",g:"adj",l:"A1"},{n:"Varmt",e:"Warm",p:"vahrmt",g:"adj",l:"A1"},
],
"Tid":[
{n:"Mandag",e:"Monday",p:"MAHN-dahg",g:"",l:"A1"},{n:"Tirsdag",e:"Tuesday",p:"TEERSH-dahg",g:"",l:"A1"},
{n:"Onsdag",e:"Wednesday",p:"OONS-dahg",g:"",l:"A1"},{n:"Torsdag",e:"Thursday",p:"TORSH-dahg",g:"",l:"A1"},
{n:"Fredag",e:"Friday",p:"FREH-dahg",g:"",l:"A1"},{n:"Lørdag",e:"Saturday",p:"LUR-dahg",g:"",l:"A1"},
{n:"Søndag",e:"Sunday",p:"SUN-dahg",g:"",l:"A1"},{n:"I dag",e:"Today",p:"ee dahg",g:"",l:"A1"},
{n:"I går",e:"Yesterday",p:"ee gor",g:"",l:"A1"},{n:"I morgen",e:"Tomorrow",p:"ee MOR-en",g:"",l:"A1"},
{n:"Nå",e:"Now",p:"no",g:"",l:"A1"},{n:"Alltid",e:"Always",p:"AHL-tee",g:"",l:"A2"},
{n:"Aldri",e:"Never",p:"AHL-dree",g:"",l:"A2"},{n:"Ofte",e:"Often",p:"OF-teh",g:"",l:"A2"},
{n:"Noen ganger",e:"Sometimes",p:"NOO-en GAHNG-er",g:"",l:"A2"},{n:"Snart",e:"Soon",p:"snahrt",g:"",l:"A2"},
{n:"Allerede",e:"Already",p:"ahl-leh-REH-deh",g:"",l:"A2"},{n:"Morgen",e:"Morning",p:"MOR-en",g:"en",l:"A1"},
{n:"Kveld",e:"Evening",p:"kvell",g:"en",l:"A1"},{n:"Natt",e:"Night",p:"naht",g:"en",l:"A1"},
],
"Verb":[
{n:"Å være",e:"To be",p:"o VAI-reh",g:"irr",l:"A1"},{n:"Å ha",e:"To have",p:"o hah",g:"irr",l:"A1"},
{n:"Å gå",e:"To go",p:"o go",g:"str",l:"A1"},{n:"Å komme",e:"To come",p:"o KOM-meh",g:"str",l:"A1"},
{n:"Å spise",e:"To eat",p:"o SPEE-seh",g:"g2",l:"A1"},{n:"Å drikke",e:"To drink",p:"o DRIK-keh",g:"str",l:"A1"},
{n:"Å snakke",e:"To speak",p:"o SNAH-keh",g:"g1",l:"A1"},{n:"Å lese",e:"To read",p:"o LEH-seh",g:"g2",l:"A1"},
{n:"Å skrive",e:"To write",p:"o SKREE-veh",g:"str",l:"A1"},{n:"Å se",e:"To see",p:"o seh",g:"str",l:"A1"},
{n:"Å like",e:"To like",p:"o LEE-keh",g:"g2",l:"A1"},{n:"Å bo",e:"To live",p:"o boo",g:"g3",l:"A1"},
{n:"Å jobbe",e:"To work",p:"o YOB-beh",g:"g1",l:"A1"},{n:"Å sove",e:"To sleep",p:"o SOH-veh",g:"str",l:"A1"},
{n:"Å kjøpe",e:"To buy",p:"o SHUH-peh",g:"g2",l:"A2"},{n:"Å selge",e:"To sell",p:"o SEL-geh",g:"str",l:"A2"},
{n:"Å betale",e:"To pay",p:"o beh-TAH-leh",g:"g2",l:"A2"},{n:"Å forstå",e:"To understand",p:"o for-STO",g:"str",l:"A1"},
{n:"Å vite",e:"To know (fact)",p:"o VEE-teh",g:"irr",l:"A2"},{n:"Å hjelpe",e:"To help",p:"o YELL-peh",g:"str",l:"A1"},
{n:"Å vente",e:"To wait",p:"o VEN-teh",g:"g1",l:"A2"},{n:"Å reise",e:"To travel",p:"o RAY-seh",g:"g2",l:"A2"},
{n:"Å lære",e:"To learn",p:"o LAIR-eh",g:"g2",l:"A2"},{n:"Å begynne",e:"To begin",p:"o beh-GIN-neh",g:"g2",l:"A2"},
{n:"Å trenge",e:"To need",p:"o TRENG-eh",g:"g2",l:"A2"},
],
"Adjektiv":[
{n:"Stor",e:"Big",p:"stohr",g:"adj",l:"A1"},{n:"Liten",e:"Small",p:"LEE-ten",g:"adj",l:"A1"},
{n:"God",e:"Good",p:"goo",g:"adj",l:"A1"},{n:"Dårlig",e:"Bad",p:"DOR-lee",g:"adj",l:"A1"},
{n:"Ny",e:"New",p:"nee",g:"adj",l:"A1"},{n:"Gammel",e:"Old",p:"GAHM-mel",g:"adj",l:"A1"},
{n:"Lang",e:"Long",p:"lahng",g:"adj",l:"A1"},{n:"Kort",e:"Short",p:"kort",g:"adj",l:"A1"},
{n:"Varm",e:"Warm",p:"vahrm",g:"adj",l:"A1"},{n:"Kald",e:"Cold",p:"kahl",g:"adj",l:"A1"},
{n:"Lett",e:"Easy",p:"let",g:"adj",l:"A2"},{n:"Vanskelig",e:"Difficult",p:"VAHN-skeh-lee",g:"adj",l:"A2"},
{n:"Billig",e:"Cheap",p:"BIL-lee",g:"adj",l:"A2"},{n:"Dyr",e:"Expensive",p:"deer",g:"adj",l:"A2"},
{n:"Pen",e:"Pretty",p:"pehn",g:"adj",l:"A1"},{n:"Glad",e:"Happy",p:"glah",g:"adj",l:"A1"},
{n:"Trist",e:"Sad",p:"trist",g:"adj",l:"A1"},{n:"Sint",e:"Angry",p:"sint",g:"adj",l:"A2"},
{n:"Sliten",e:"Tired",p:"SLEE-ten",g:"adj",l:"A2"},{n:"Sulten",e:"Hungry",p:"SOOL-ten",g:"adj",l:"A1"},
{n:"Viktig",e:"Important",p:"VIK-tee",g:"adj",l:"A2"},{n:"Rask",e:"Fast",p:"rahsk",g:"adj",l:"A2"},
],
"Preposisjoner":[
{n:"I",e:"In",p:"ee",g:"",l:"A1"},{n:"På",e:"On/At",p:"po",g:"",l:"A1"},
{n:"Til",e:"To",p:"til",g:"",l:"A1"},{n:"Fra",e:"From",p:"frah",g:"",l:"A1"},
{n:"Med",e:"With",p:"meh",g:"",l:"A1"},{n:"Uten",e:"Without",p:"OO-ten",g:"",l:"A2"},
{n:"For",e:"For",p:"for",g:"",l:"A1"},{n:"Om",e:"About",p:"om",g:"",l:"A2"},
{n:"Mellom",e:"Between",p:"MEL-lom",g:"",l:"A2"},{n:"Under",e:"Under",p:"OON-der",g:"",l:"A2"},
{n:"Over",e:"Over",p:"OH-ver",g:"",l:"A2"},{n:"Foran",e:"In front of",p:"FOR-ahn",g:"",l:"A2"},
{n:"Bak",e:"Behind",p:"bahk",g:"",l:"A2"},{n:"Etter",e:"After",p:"ET-ter",g:"",l:"A2"},
{n:"Før",e:"Before",p:"furr",g:"",l:"A2"},
],
"Farger":[
{n:"Rød",e:"Red",p:"ruh",g:"adj",l:"A1"},{n:"Blå",e:"Blue",p:"blo",g:"adj",l:"A1"},
{n:"Grønn",e:"Green",p:"grunn",g:"adj",l:"A1"},{n:"Gul",e:"Yellow",p:"gool",g:"adj",l:"A1"},
{n:"Hvit",e:"White",p:"veet",g:"adj",l:"A1"},{n:"Svart",e:"Black",p:"svart",g:"adj",l:"A1"},
{n:"Oransje",e:"Orange",p:"oo-RAHN-sheh",g:"adj",l:"A1"},{n:"Lilla",e:"Purple",p:"LIL-lah",g:"adj",l:"A1"},
{n:"Rosa",e:"Pink",p:"ROH-sah",g:"adj",l:"A1"},{n:"Brun",e:"Brown",p:"broon",g:"adj",l:"A1"},
{n:"Grå",e:"Gray",p:"gro",g:"adj",l:"A1"},
],
};

const PH = [
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

const GR = [
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

const CJ = [
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

const SB = [
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

const FB = [
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

const DI = [
{t:"At the Café",l:"A1",li:[{w:"A",n:"Hei! Hva vil du ha?",e:"Hi! What would you like?"},{w:"B",n:"Jeg vil gjerne ha en kaffe, takk.",e:"I'd like a coffee, thanks."},{w:"A",n:"Stor eller liten?",e:"Big or small?"},{w:"B",n:"Stor, takk. Hva koster det?",e:"Big, thanks. How much?"},{w:"A",n:"Femti kroner.",e:"Fifty kroner."},{w:"B",n:"Vær så god. Tusen takk!",e:"Here you go. Thanks!"},]},
{t:"Meeting Someone",l:"A1",li:[{w:"A",n:"Hei! Jeg heter Anna. Hva heter du?",e:"Hi! I'm Anna. What's your name?"},{w:"B",n:"Jeg heter Erik. Hyggelig å møte deg.",e:"I'm Erik. Nice to meet you."},{w:"A",n:"Hvor kommer du fra?",e:"Where are you from?"},{w:"B",n:"Jeg kommer fra India. Og du?",e:"I'm from India. And you?"},{w:"A",n:"Jeg er fra Bergen. Snakker du norsk?",e:"I'm from Bergen. Do you speak Norwegian?"},{w:"B",n:"Jeg snakker litt norsk. Jeg lærer!",e:"I speak a little Norwegian. I'm learning!"},]},
{t:"At the Doctor",l:"A2",li:[{w:"A",n:"God dag. Hva kan jeg hjelpe deg med?",e:"Hello. How can I help you?"},{w:"B",n:"Jeg har vondt i hodet og er veldig sliten.",e:"I have a headache and I'm very tired."},{w:"A",n:"Hvor lenge har du hatt hodepine?",e:"How long have you had a headache?"},{w:"B",n:"I tre dager. Og jeg sover dårlig.",e:"For three days. And I sleep badly."},{w:"A",n:"Jeg skal skrive ut en resept.",e:"I'll write a prescription."},]},
{t:"Shopping",l:"A2",li:[{w:"A",n:"Har dere denne genseren i medium?",e:"Do you have this sweater in medium?"},{w:"B",n:"Ja, her er den. Vil du prøve den?",e:"Yes, here it is. Want to try it?"},{w:"A",n:"Ja, takk. Den passer perfekt!",e:"Yes thanks. It fits perfectly!"},{w:"B",n:"Den koster tre hundre og femti kroner.",e:"It costs 350 kroner."},{w:"A",n:"Kan jeg betale med kort?",e:"Can I pay with card?"},{w:"B",n:"Ja, selvfølgelig.",e:"Yes, of course."},]},
{t:"Making Plans",l:"A2",li:[{w:"A",n:"Hva skal du gjøre i helgen?",e:"What will you do this weekend?"},{w:"B",n:"Jeg har ikke bestemt meg ennå.",e:"I haven't decided yet."},{w:"A",n:"Vi kan gå på tur hvis det er fint vær.",e:"We can hike if weather's nice."},{w:"B",n:"Det høres bra ut! Når møtes vi?",e:"Sounds good! When do we meet?"},{w:"A",n:"Klokka ni på lørdag?",e:"Nine on Saturday?"},{w:"B",n:"Perfekt. Jeg gleder meg!",e:"Perfect. Looking forward to it!"},]},
{t:"Past Weekend",l:"A2",li:[{w:"A",n:"Hva gjorde du i helgen?",e:"What did you do this weekend?"},{w:"B",n:"Jeg reiste til Stavanger med familien.",e:"I went to Stavanger with family."},{w:"A",n:"Hva så dere?",e:"What did you see?"},{w:"B",n:"Vi gikk til Preikestolen. Fantastisk!",e:"We went to Pulpit Rock. Fantastic!"},{w:"A",n:"Hadde dere fint vær?",e:"Did you have nice weather?"},{w:"B",n:"Ja, sol og varmt. Vi hadde flaks!",e:"Yes, sunny and warm. We were lucky!"},]},
];

const RD = [
{t:"Min Dag",l:"A1",tx:"Jeg heter Kari. Jeg bor i Oslo. Hver dag står jeg opp klokka sju. Jeg spiser frokost med familien min — kaffe og brød med ost. Så går jeg til jobb. Jeg jobber på et kontor. Etter jobb trener jeg. Om kvelden lager jeg middag og leser en bok. Jeg legger meg klokka elleve.",en:"My name is Kari. I live in Oslo. Every day I get up at seven. I eat breakfast with my family — coffee and bread with cheese. Then I go to work. I work in an office. After work I exercise. In the evening I make dinner and read a book. I go to bed at eleven.",qs:[{q:"Hvor bor Kari?",o:["Bergen","Oslo","Tromsø"],a:"Oslo"},{q:"Hva spiser hun til frokost?",o:["Egg","Brød med ost","Suppe"],a:"Brød med ost"},{q:"Når legger hun seg?",o:["Klokka ni","Klokka elleve","Klokka tolv"],a:"Klokka elleve"}]},
{t:"Helgeturen",l:"A2",tx:"Forrige helg reiste vi til Lofoten. Vi tok fly til Bodø og ferge videre. Været var fint. Vi bodde i en rorbu ved havet. Første dag gikk vi en lang tur i fjellet og så mange fugler. Andre dag fisket vi torsk fra en båt. Om kvelden lagde vi middag med fisken vi hadde fanget. Det var den beste middagen jeg har spist!",en:"Last weekend we traveled to Lofoten. We flew to Bodø and took a ferry onward. The weather was nice. We stayed in a fisherman's cabin by the sea. The first day we hiked in the mountains and saw many birds. The second day we fished cod from a boat. In the evening we made dinner with the fish we'd caught. It was the best dinner I've eaten!",qs:[{q:"Hvordan reiste de?",o:["Bil","Fly og ferge","Tog"],a:"Fly og ferge"},{q:"Hva gjorde de dag 1?",o:["Fisket","Gikk tur i fjellet","Svømte"],a:"Gikk tur i fjellet"},{q:"Hva spiste de?",o:["Pizza","Fisk de fanget","Pasta"],a:"Fisk de fanget"}]},
{t:"Ny i Norge",l:"A2",tx:"Jeg heter Priya og flyttet til Norge for seks måneder siden. I begynnelsen var det vanskelig fordi jeg ikke snakket norsk. Nå går jeg på norskkurs tre ganger i uken. Grammatikken er fortsatt vanskelig! Vinteren var kald — minus tjue grader i januar. Men nordlysene var utrolig vakre. Jeg har fått mange norske venner. Min favoritt norske mat er brunost!",en:"My name is Priya and I moved to Norway six months ago. In the beginning it was hard because I didn't speak Norwegian. Now I attend Norwegian class three times a week. Grammar is still difficult! Winter was cold — minus twenty in January. But the northern lights were incredibly beautiful. I've made many Norwegian friends. My favorite Norwegian food is brown cheese!",qs:[{q:"Når flyttet Priya?",o:["For et år siden","For seks måneder siden","I fjor"],a:"For seks måneder siden"},{q:"Hva er vanskelig?",o:["Maten","Grammatikken","Vennene"],a:"Grammatikken"},{q:"Hva liker hun å spise?",o:["Fisk","Brunost","Kjøttkaker"],a:"Brunost"}]},
];

const sh = (a) => [...a].sort(() => Math.random() - 0.5);
const pk = (a) => a[Math.floor(Math.random() * a.length)];
const allW = Object.values(V).flat();
const lc = (l) => l === "A1" ? "#34D399" : "#FBBF24";

/* ══════ MAIN COMPONENT ══════ */
export default function App() {
  const [tab, setTab] = useState("home");
  const [lvl, setLvl] = useState("all");
  const [cat, setCat] = useState(Object.keys(V)[0]);
  const [fl, setFl] = useState({});
  const [xp, setXp] = useState(0);
  const [hist, setHist] = useState([]);
  const ax = n => setXp(x => x + n);
  const lg = (t, c) => setHist(h => [...h, { t, c, ts: Date.now() }]);
  const [q, setQ] = useState(null);
  const [qSel, setQSel] = useState(null);
  const [qSc, setQSc] = useState({ c: 0, t: 0 });
  const [qStr, setQStr] = useState(0);
  const [qMd, setQMd] = useState("no2en");
  const genQ = useCallback(() => { const pool = lvl !== "all" ? allW.filter(w => w.l === lvl) : allW; if (pool.length < 4) return; const w = pk(pool); const wrongs = sh(pool.filter(x => x.e !== w.e)).slice(0, 3); const rev = qMd === "en2no"; const opts = sh([...wrongs.map(x => rev ? x.n : x.e), rev ? w.n : w.e]); setQ({ w, opts, done: false, mode: qMd }); setQSel(null); }, [lvl, qMd]);
  useEffect(() => { if (tab === "quiz" && !q) genQ(); }, [tab]);
  const ansQ = a => { if (q.done) return; const ok = q.mode === "en2no" ? a === q.w.n : a === q.w.e; setQSel(a); setQ({ ...q, done: true }); setQSc(s => ({ c: s.c + (ok ? 1 : 0), t: s.t + 1 })); setQStr(s => ok ? s + 1 : 0); if (ok) ax(10 + Math.min(qStr * 2, 20)); lg("quiz", ok); };
  const qAns = q ? (q.mode === "en2no" ? q.w.n : q.w.e) : "";
  const [si, setSi] = useState(0);
  const [so, setSo] = useState([]);
  const [sp, setSp] = useState([]);
  const [sd, setSd] = useState(false);
  const [sc, setSc] = useState(null);
  const sf = useMemo(() => lvl !== "all" ? SB.filter(x => x.l === lvl) : SB, [lvl]);
  const initS = useCallback(idx => { if (sf.length === 0) return; const s = sf[idx % sf.length]; setSo([]); setSp(sh(s.w.map((p, j) => ({ t: p, id: j })))); setSd(false); setSc(null); }, [sf]);
  useEffect(() => { if (tab === "build" && sf.length > 0) initS(si); }, [tab, si, initS]);
  const sAdd = w => { if (sd) return; const n = [...so, w]; setSo(n); setSp(sp.filter(x => x.id !== w.id)); if (sf.length > 0 && n.length === sf[si % sf.length].w.length) { const ok = n.map(x => x.t).join(" ") === sf[si % sf.length].w.join(" "); setSd(true); setSc(ok); if (ok) ax(15); lg("build", ok); } };
  const sRem = w => { if (sd) return; setSo(so.filter(x => x.id !== w.id)); setSp([...sp, w]); };
  const [fi, setFi] = useState(0);
  const [fv, setFv] = useState("");
  const [fc, setFc] = useState(null);
  const ff = useMemo(() => lvl !== "all" ? FB.filter(x => x.l === lvl) : FB, [lvl]);
  const chkF = () => { if (ff.length === 0) return; const ok = fv.trim().toLowerCase() === ff[fi % ff.length].a.toLowerCase(); setFc(ok); if (ok) ax(12); lg("fill", ok); };
  const [ci, setCi] = useState(0);
  const [cv, setCv] = useState({ p: "", pa: "", pe: "" });
  const [cc, setCc] = useState(null);
  const cV = CJ[ci % CJ.length];
  const chkC = () => { const r = { p: cv.p.trim().toLowerCase() === cV.pr.toLowerCase(), pa: cv.pa.trim().toLowerCase() === cV.pa.toLowerCase(), pe: cv.pe.trim().toLowerCase() === cV.pf.toLowerCase() }; setCc(r); const ok = r.p && r.pa && r.pe; if (ok) ax(20); lg("conj", ok); };
  const [di, setDi] = useState(0);
  const [dSh, setDSh] = useState(false);
  const [ri, setRi] = useState(0);
  const [rSh, setRSh] = useState(false);
  const [rAn, setRAn] = useState({});
  const [rCh, setRCh] = useState(false);
  const fV = useMemo(() => { const w = V[cat] || []; return lvl !== "all" ? w.filter(x => x.l === lvl) : w; }, [cat, lvl]);
  const fP = useMemo(() => lvl !== "all" ? PH.filter(p => p.l === lvl) : PH, [lvl]);
  const fG = useMemo(() => lvl !== "all" ? GR.filter(g => g.l === lvl) : GR, [lvl]);
  const fD = useMemo(() => lvl !== "all" ? DI.filter(d => d.l === lvl) : DI, [lvl]);
  const fR = useMemo(() => lvl !== "all" ? RD.filter(r => r.l === lvl) : RD, [lvl]);
  const tc = hist.filter(h => h.c).length;
  const ta = hist.length;
  const xlv = Math.floor(xp / 100) + 1;
  const xpr = xp % 100;
  const IS = { padding: "12px 14px", borderRadius: 10, border: "1.5px solid var(--bd)", background: "var(--sf)", color: "var(--tx)", fontFamily: "'Nunito Sans',sans-serif", fontSize: 16, fontWeight: 600, outline: "none", width: "100%", minHeight: 46 };

  return (<>
<style>{`
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700;800;900&family=Nunito+Sans:wght@400;500;600;700;800&display=swap');
:root{--bg:#050A14;--sf:#0C1525;--cd:#12203A;--bd:#1B2E52;--ac:#2563EB;--acd:#1E40AF;--acl:#60A5FA;--co:#F43F5E;--go:#FBBF24;--mi:#34D399;--tx:#E2E8F0;--tm:#64748B;--ok:#22C55E;--no:#EF4444}
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
html{-webkit-text-size-adjust:100%}
input,button{-webkit-appearance:none;appearance:none}
@keyframes fu{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes shm{0%{background-position:-200% center}100%{background-position:200% center}}
.R{font-family:'Nunito Sans',sans-serif;min-height:100vh;background:var(--bg);color:var(--tx);background-image:radial-gradient(at 15% 0%,rgba(37,99,235,.05) 0%,transparent 50%),radial-gradient(at 85% 100%,rgba(244,63,94,.03) 0%,transparent 50%)}
.TB{position:sticky;top:0;z-index:100;background:rgba(5,10,20,.92);backdrop-filter:blur(20px);border-bottom:1px solid var(--bd)}
.XR{display:flex;align-items:center;justify-content:center;gap:10px;padding:5px 12px;font-size:11px;color:var(--tm);border-bottom:1px solid rgba(27,46,82,.4)}
.XB{flex:1;max-width:200px;height:4px;background:var(--bd);border-radius:3px;overflow:hidden}.XF{height:100%;background:var(--ac);border-radius:3px;transition:width .5s}
.NR{display:flex;gap:2px;padding:5px 8px;flex-wrap:wrap;justify-content:center}
.NB{background:transparent;color:var(--tm);border:none;padding:7px 11px;border-radius:8px;cursor:pointer;font-family:'Nunito Sans',sans-serif;font-weight:600;font-size:12px;display:flex;align-items:center;gap:4px;transition:all .2s;white-space:nowrap}.NB.a{background:var(--ac);color:#fff}.NB:hover:not(.a){color:var(--acl)}
.M{max-width:900px;margin:0 auto;padding:14px 12px 80px}
.LP{display:flex;gap:5px;margin-bottom:16px;animation:fu .3s both}
.LB{padding:7px 14px;border-radius:18px;border:1px solid var(--bd);background:transparent;color:var(--tm);font-family:'Nunito Sans',sans-serif;font-size:12px;font-weight:700;cursor:pointer;transition:all .2s;min-height:36px;display:inline-flex;align-items:center}.LB:hover{border-color:var(--ac)}.LB.a{background:var(--ac);border-color:var(--ac);color:#fff}
.ST{font-family:'Crimson Pro',serif;font-size:24px;font-weight:800;margin-bottom:14px;animation:fu .3s both}
.BD{display:inline-block;font-size:9px;font-weight:700;padding:2px 7px;border-radius:5px;text-transform:uppercase;letter-spacing:1.5px}
.CP{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:16px;animation:fu .3s 50ms both}
.CB{padding:8px 15px;border-radius:20px;border:1px solid var(--bd);background:transparent;color:var(--tm);font-family:'Nunito Sans',sans-serif;font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;min-height:36px;display:inline-flex;align-items:center}.CB:hover{border-color:var(--acl);color:var(--acl)}.CB.a{background:var(--ac);border-color:var(--ac);color:#fff}
.G{display:grid;grid-template-columns:repeat(auto-fill,minmax(165px,1fr));gap:10px}
.FC{perspective:800;cursor:pointer;min-height:145px;animation:fu .3s both}
.FI{position:relative;width:100%;min-height:145px;transition:transform .5s cubic-bezier(.4,0,.2,1);transform-style:preserve-3d}
.FF,.FB{position:absolute;inset:0;backface-visibility:hidden;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;gap:4px}
.FF{background:var(--cd);border:1px solid var(--bd)}.FB{transform:rotateY(180deg);background:linear-gradient(135deg,var(--ac),var(--acd));color:#fff}
.PR{background:var(--cd);border:1px solid var(--bd);border-radius:11px;padding:13px 16px;margin-bottom:6px;transition:all .2s;animation:fu .3s both}.PR:hover{border-color:var(--ac);transform:translateX(3px)}
.GC{background:var(--cd);border:1px solid var(--bd);border-radius:13px;padding:22px;margin-bottom:11px;animation:fu .35s both}
.GC h3{font-family:'Crimson Pro',serif;font-size:17px;font-weight:700;color:var(--go);margin-bottom:6px;display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.GC>p{color:var(--tm);line-height:1.6;font-size:13px;margin-bottom:10px}
.EL{padding:6px 12px;background:rgba(37,99,235,.06);border-left:3px solid var(--ac);border-radius:0 7px 7px 0;margin-bottom:4px;font-size:13px;color:var(--acl)}
.TP{background:rgba(52,211,153,.07);border-left:3px solid var(--mi);padding:7px 12px;border-radius:0 7px 7px 0;font-size:12px;color:var(--mi);margin-top:8px}
.QC{background:var(--cd);border:1.5px solid var(--bd);border-radius:18px;padding:28px 22px 24px;text-align:center;max-width:520px;margin:0 auto;animation:fu .4s both}
.QW{font-family:'Crimson Pro',serif;font-size:34px;font-weight:900;color:var(--acl)}
.QO{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:18px}
.QP{padding:14px;border-radius:10px;border:1.5px solid var(--bd);background:var(--sf);color:var(--tx);font-family:'Nunito Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;min-height:48px;display:flex;align-items:center;justify-content:center}.QP:hover:not(.d){border-color:var(--ac);background:rgba(37,99,235,.06)}.QP.ok{border-color:var(--ok);background:rgba(34,197,94,.08);color:var(--ok)}.QP.no{border-color:var(--no);background:rgba(239,68,68,.08);color:var(--no)}
.BT{padding:12px 28px;border:none;border-radius:10px;background:var(--ac);color:#fff;font-family:'Nunito Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;min-height:46px;display:inline-flex;align-items:center;justify-content:center}.BT:hover{background:var(--acd)}
.BG{background:transparent;border:1px solid var(--bd);color:var(--tm)}.BG:hover{border-color:var(--ac);color:var(--acl);background:transparent}
.SZ{min-height:46px;background:var(--sf);border:2px dashed var(--bd);border-radius:11px;display:flex;flex-wrap:wrap;gap:6px;padding:11px;margin-bottom:11px;align-items:center}.SZ.ok{border-color:var(--ok);border-style:solid}.SZ.bad{border-color:var(--no);border-style:solid}
.SC{padding:9px 16px;border-radius:9px;border:1.5px solid var(--ac);background:rgba(37,99,235,.06);color:var(--acl);font-weight:600;font-size:14px;cursor:pointer;font-family:'Nunito Sans',sans-serif;transition:all .15s;min-height:40px;display:inline-flex;align-items:center}.SC:hover{background:rgba(37,99,235,.15)}.SC.p{border-color:var(--bd);color:var(--tx);background:var(--cd)}.SC.p:hover{border-color:var(--ac)}
.DL{background:var(--cd);border:1px solid var(--bd);border-radius:11px;padding:11px 14px;margin-bottom:5px;display:flex;gap:10px;animation:fu .3s both}
.DA{min-width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;flex-shrink:0}
.FG{display:grid;grid-template-columns:repeat(auto-fill,minmax(135px,1fr));gap:10px;margin-top:24px}
.FD{background:var(--cd);border:1px solid var(--bd);border-radius:14px;padding:20px 12px;cursor:pointer;transition:all .3s;text-align:center}.FD:hover{border-color:var(--ac);transform:translateY(-4px)}
.FD .ic{font-size:24px;margin-bottom:8px}.FD h3{font-family:'Crimson Pro',serif;font-size:13px;font-weight:700;margin-bottom:3px}.FD p{font-size:10px;color:var(--tm);line-height:1.3}
.SG{display:grid;grid-template-columns:repeat(auto-fill,minmax(115px,1fr));gap:8px;margin:14px 0}
.SD{background:var(--cd);border:1px solid var(--bd);border-radius:11px;padding:14px;text-align:center}.SD .sn{font-family:'Crimson Pro',serif;font-size:24px;font-weight:800}.SD .sl{font-size:9px;color:var(--tm);text-transform:uppercase;letter-spacing:2px;margin-top:2px}
.SR{display:flex;align-items:center;justify-content:center;gap:18px;margin-bottom:14px;animation:fu .3s both}.SI{text-align:center}.SI .sn{font-family:'Crimson Pro',serif;font-size:22px;font-weight:800}.SI .sl{font-size:8px;color:var(--tm);text-transform:uppercase;letter-spacing:2px}
.CT{width:100%;border-collapse:collapse;margin-top:12px}.CT th{text-align:left;padding:7px 10px;color:var(--tm);font-size:11px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid var(--bd)}.CT td{padding:7px 10px;border-bottom:1px solid rgba(27,46,82,.3)}.CT input{width:100%}
.RB{background:var(--cd);border:1px solid var(--bd);border-radius:13px;padding:22px;animation:fu .4s both}
.RT{font-size:14px;line-height:1.8;color:var(--tx)}
@media(max-width:640px){.nl{display:none}.NB{padding:8px 10px}.NR{gap:1px;padding:4px;overflow-x:auto;flex-wrap:nowrap;justify-content:flex-start;-webkit-overflow-scrolling:touch;scrollbar-width:none}.NR::-webkit-scrollbar{display:none}.M{padding:10px 10px 90px}.ST{font-size:20px}.CP{gap:4px;overflow-x:auto;flex-wrap:nowrap;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding-bottom:4px}.CP::-webkit-scrollbar{display:none}.CB{flex-shrink:0}.G{grid-template-columns:repeat(2,1fr);gap:8px}.FC{min-height:130px}.FI{min-height:130px}.FF,.FB{padding:12px}.GC{padding:16px}.GC h3{font-size:15px}.QC{padding:20px 16px}.QW{font-size:28px}.QO{grid-template-columns:1fr}.QP{padding:12px;font-size:13px;min-height:44px}.BT{padding:12px 22px;min-height:44px;width:100%}.BG{width:auto}.SC{padding:8px 14px;font-size:13px;min-height:40px}.FG{grid-template-columns:repeat(2,1fr);gap:8px}.FD{padding:16px 10px}.SG{grid-template-columns:repeat(2,1fr)}.SR{gap:12px;flex-wrap:wrap}.CT input{font-size:14px!important;padding:10px!important}.RB{padding:16px}}
@media(max-width:380px){.G{grid-template-columns:1fr}.QW{font-size:24px}}
`}</style>
<div className="R">
<div className="TB">
<div className="XR"><span style={{fontWeight:700,color:"var(--go)"}}>Lvl {xlv}</span><div className="XB"><div className="XF" style={{width:`${xpr}%`}}/></div><span>{xp} XP</span><span style={{color:"var(--mi)",fontWeight:700}}>{tc}/{ta}</span></div>
<div className="NR">{[["home","🏠","Home"],["vocab","📖","Words"],["phrases","💬","Phrases"],["grammar","📝","Grammar"],["dialog","🗣️","Dialogues"],["read","📰","Read"],["quiz","🎯","Quiz"],["build","🧩","Build"],["fill","✍️","Fill"],["conj","🔄","Conj"],["stats","📊","Stats"]].map(([id,ic,lb])=>(<button key={id} className={`NB ${tab===id?"a":""}`} onClick={()=>{setTab(id);if(id==="quiz")setQ(null);}}><span style={{fontSize:14}}>{ic}</span><span className="nl">{lb}</span></button>))}</div>
</div>
<div className="M">
{!["home","stats"].includes(tab) && (<div className="LP">{[["all","All"],["A1","A1"],["A2","A2"]].map(([v,t])=>(<button key={v} className={`LB ${lvl===v?"a":""}`} onClick={()=>setLvl(v)}>{t}</button>))}</div>)}

{tab==="home"&&<div>
<div style={{textAlign:"center",padding:"40px 14px 24px",animation:"fu .5s both"}}><h1 style={{fontFamily:"'Crimson Pro',serif",fontSize:"clamp(30px,6vw,48px)",fontWeight:900,background:"linear-gradient(135deg,#60A5FA,#F43F5E,#FBBF24)",backgroundSize:"200% auto",animation:"shm 5s linear infinite",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.1}}>Lær Norsk — A1→A2</h1><p style={{color:"var(--tm)",marginTop:10,fontSize:14,maxWidth:480,marginInline:"auto",lineHeight:1.6}}>Complete CEFR-aligned Norwegian course. {allW.length}+ words, {GR.length} grammar topics, {DI.length} dialogues, {RD.length} readings, and 4 exercise types.</p></div>
<div className="SG" style={{animation:"fu .4s .1s both"}}><div className="SD"><div className="sn" style={{color:"var(--go)"}}>{xlv}</div><div className="sl">Level</div></div><div className="SD"><div className="sn" style={{color:"var(--acl)"}}>{xp}</div><div className="sl">XP</div></div><div className="SD"><div className="sn" style={{color:"var(--mi)"}}>{tc}</div><div className="sl">Correct</div></div><div className="SD"><div className="sn">{allW.length}+</div><div className="sl">Words</div></div></div>
<div className="FG">{[{ic:"📖",t:"Vocabulary",d:`${allW.length}+ words`,to:"vocab"},{ic:"💬",t:"Phrases",d:`${PH.length} phrases`,to:"phrases"},{ic:"📝",t:"Grammar",d:`${GR.length} topics`,to:"grammar"},{ic:"🗣️",t:"Dialogues",d:`${DI.length} dialogues`,to:"dialog"},{ic:"📰",t:"Reading",d:`${RD.length} passages`,to:"read"},{ic:"🎯",t:"Quiz",d:"2 quiz modes",to:"quiz"},{ic:"🧩",t:"Build",d:`${SB.length} sentences`,to:"build"},{ic:"✍️",t:"Fill",d:`${FB.length} exercises`,to:"fill"},{ic:"🔄",t:"Conjugate",d:`${CJ.length} verbs`,to:"conj"},{ic:"📊",t:"Stats",d:"Track progress",to:"stats"}].map((f,i)=>(<div className="FD" key={f.t} style={{animation:`fu .4s ${i*40}ms both`}} onClick={()=>{setTab(f.to);if(f.to==="quiz")setQ(null);}}><div className="ic">{f.ic}</div><h3>{f.t}</h3><p>{f.d}</p></div>))}</div>
</div>}

{tab==="vocab"&&<div><h2 className="ST">Vocabulary</h2><div className="CP">{Object.keys(V).map(c=>(<button key={c} className={`CB ${cat===c?"a":""}`} onClick={()=>{setCat(c);setFl({});}}>{c}</button>))}</div>{fV.length===0?<p style={{color:"var(--tm)",textAlign:"center",padding:30}}>No words at this level.</p>:<div className="G">{fV.map((w,i)=>(<div key={cat+i} className="FC" style={{animationDelay:`${i*25}ms`}} onClick={()=>setFl(f=>({...f,[cat+i]:!f[cat+i]}))}><div className="FI" style={{transform:fl[cat+i]?"rotateY(180deg)":"rotateY(0)"}}><div className="FF"><span className="BD" style={{background:`${lc(w.l)}15`,color:lc(w.l)}}>{w.l}</span><span style={{fontSize:19,fontWeight:800,color:"var(--acl)",fontFamily:"'Crimson Pro',serif",marginTop:2}}>{w.n}</span><span style={{fontSize:10,color:"var(--tm)",fontStyle:"italic"}}>/{w.p}/</span>{w.g?<span style={{fontSize:9,color:"var(--bd)",fontWeight:700}}>({w.g})</span>:null}<span style={{fontSize:8,color:"var(--tm)",marginTop:5,opacity:.35,textTransform:"uppercase",letterSpacing:2}}>tap to flip</span></div><div className="FB"><span style={{fontSize:17,fontWeight:700,fontFamily:"'Crimson Pro',serif"}}>{w.e}</span><span style={{fontSize:11,opacity:.7}}>{w.n}</span></div></div></div>))}</div>}</div>}

{tab==="phrases"&&<div><h2 className="ST">Phrases ({fP.length})</h2>{fP.map((p,i)=>(<div className="PR" key={i} style={{animationDelay:`${i*20}ms`}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:6,flexWrap:"wrap"}}><span style={{fontSize:15,fontWeight:700,color:"var(--acl)",fontFamily:"'Crimson Pro',serif"}}>{p.n}</span><span className="BD" style={{background:`${lc(p.l)}15`,color:lc(p.l)}}>{p.l}</span></div><div style={{fontSize:12,color:"var(--tx)",marginTop:3,opacity:.85}}>{p.e}</div><div style={{fontSize:10,color:"var(--tm)",marginTop:2,fontStyle:"italic"}}>/{p.p}/</div></div>))}</div>}

{tab==="grammar"&&<div><h2 className="ST">Grammar ({fG.length})</h2>{fG.map((g,i)=>(<div className="GC" key={i} style={{animationDelay:`${i*40}ms`}}><h3><span>{g.em}</span> {g.t} <span className="BD" style={{background:`${lc(g.l)}15`,color:lc(g.l)}}>{g.l}</span></h3><p>{g.d}</p>{g.ex.map((e,j)=><div className="EL" key={j}>{e}</div>)}{g.tip&&<div className="TP">💡 {g.tip}</div>}</div>))}</div>}

{tab==="dialog"&&<div><h2 className="ST">Dialogues</h2><div className="CP">{fD.map((d,i)=>(<button key={i} className={`CB ${di===i?"a":""}`} onClick={()=>{setDi(i);setDSh(false);}}>{d.t}</button>))}</div>{fD.length===0?<p style={{color:"var(--tm)"}}>No dialogues at this level.</p>:(()=>{const d=fD[di%fD.length]; return <div><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12,flexWrap:"wrap"}}><h3 style={{fontFamily:"'Crimson Pro',serif",fontSize:19,fontWeight:700}}>{d.t}</h3><span className="BD" style={{background:`${lc(d.l)}15`,color:lc(d.l)}}>{d.l}</span><button className="BT BG" style={{padding:"4px 12px",fontSize:11,marginLeft:"auto"}} onClick={()=>setDSh(!dSh)}>{dSh?"Hide":"Show"} EN</button></div>{d.li.map((ln,i)=>(<div className="DL" key={i} style={{animationDelay:`${i*50}ms`}}><div className="DA" style={{background:ln.w==="A"?"var(--ac)":"var(--co)",color:"#fff"}}>{ln.w}</div><div><div style={{fontWeight:700,fontSize:13,color:"var(--acl)"}}>{ln.n}</div>{dSh&&<div style={{fontSize:11,color:"var(--tm)",marginTop:2}}>{ln.e}</div>}</div></div>))}</div>;})()}</div>}

{tab==="read"&&<div><h2 className="ST">Reading</h2><div className="CP">{fR.map((r,i)=>(<button key={i} className={`CB ${ri===i?"a":""}`} onClick={()=>{setRi(i);setRSh(false);setRAn({});setRCh(false);}}>{r.t}</button>))}</div>{fR.length===0?<p style={{color:"var(--tm)"}}>No readings at this level.</p>:(()=>{const r=fR[ri%fR.length]; return <div><div className="RB" style={{marginBottom:12}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap"}}><h3 style={{fontFamily:"'Crimson Pro',serif",fontSize:19,fontWeight:700}}>{r.t}</h3><span className="BD" style={{background:`${lc(r.l)}15`,color:lc(r.l)}}>{r.l}</span><button className="BT BG" style={{padding:"4px 12px",fontSize:11,marginLeft:"auto"}} onClick={()=>setRSh(!rSh)}>{rSh?"Hide":"Show"} EN</button></div><div className="RT">{r.tx}</div>{rSh&&<div style={{marginTop:10,padding:10,background:"rgba(37,99,235,.05)",borderRadius:9,fontSize:12,color:"var(--tm)",lineHeight:1.7}}>{r.en}</div>}</div><div className="GC"><h3><span>❓</span> Questions</h3>{r.qs.map((qu,qi)=>(<div key={qi} style={{marginBottom:12}}><p style={{fontWeight:700,fontSize:13,color:"var(--tx)",marginBottom:5}}>{qi+1}. {qu.q}</p><div style={{display:"flex",flexWrap:"wrap",gap:5}}>{qu.o.map(o=>{let s={padding:"6px 12px",borderRadius:8,border:"1.5px solid var(--bd)",background:"var(--sf)",color:"var(--tx)",fontFamily:"'Nunito Sans',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer",transition:"all .2s"};if(rCh){if(o===qu.a)s={...s,borderColor:"var(--ok)",background:"rgba(34,197,94,.08)",color:"var(--ok)"};else if(rAn[qi]===o&&o!==qu.a)s={...s,borderColor:"var(--no)",background:"rgba(239,68,68,.08)",color:"var(--no)"};}else if(rAn[qi]===o)s={...s,borderColor:"var(--ac)",background:"rgba(37,99,235,.08)"};return <button key={o} style={s} onClick={()=>{if(!rCh)setRAn(a=>({...a,[qi]:o}));}}>{o}</button>;})}</div></div>))}{!rCh?<button className="BT" onClick={()=>{setRCh(true);const ok=r.qs.every((qu,qi)=>rAn[qi]===qu.a);if(ok)ax(25);lg("read",ok);}}>Check</button>:<div>{r.qs.every((qu,qi)=>rAn[qi]===qu.a)?<p style={{color:"var(--ok)",fontWeight:700}}>✓ All correct! +25 XP</p>:<p style={{color:"var(--no)",fontWeight:700}}>Review answers above.</p>}<button className="BT" style={{marginTop:6}} onClick={()=>{setRi(i=>i+1);setRSh(false);setRAn({});setRCh(false);}}>Next →</button></div>}</div></div>;})()}</div>}

{tab==="quiz"&&<div><h2 className="ST" style={{textAlign:"center"}}>Quiz</h2><div style={{display:"flex",justifyContent:"center",gap:5,marginBottom:14}}>{[["no2en","NO → EN"],["en2no","EN → NO"]].map(([m,l])=>(<button key={m} className={`LB ${qMd===m?"a":""}`} onClick={()=>{setQMd(m);setQ(null);setTimeout(genQ,50);}}>{l}</button>))}</div><div className="SR"><div className="SI"><div className="sn" style={{color:"var(--ok)"}}>{qSc.c}</div><div className="sl">Correct</div></div><div className="SI"><div className="sn">{qSc.t}</div><div className="sl">Total</div></div><div className="SI"><div className="sn" style={{color:"var(--go)"}}>{qSc.t?Math.round(qSc.c/qSc.t*100):0}%</div><div className="sl">Acc</div></div><div className="SI"><div className="sn" style={{color:"var(--co)"}}>{qStr}🔥</div><div className="sl">Streak</div></div></div>{q&&<div className="QC"><div style={{fontSize:9,color:"var(--tm)",textTransform:"uppercase",letterSpacing:3,marginBottom:8}}>{q.mode==="en2no"?"Translate to Norwegian":"What does this mean?"}</div><div className="QW">{q.mode==="en2no"?q.w.e:q.w.n}</div><div style={{color:"var(--tm)",fontSize:12,margin:"4px 0 0",fontStyle:"italic"}}>/{q.w.p}/</div><div className="QO">{q.opts.map(o=>{let c="QP";if(q.done){c+=" d";if(o===qAns)c+=" ok";else if(o===qSel&&o!==qAns)c+=" no";}return <button key={o} className={c} onClick={()=>ansQ(o)}>{o}</button>;})}</div>{q.done&&<div style={{marginTop:14}}>{qSel===qAns?<p style={{color:"var(--ok)",fontWeight:700,marginBottom:8}}>✓ Correct!</p>:<p style={{color:"var(--no)",fontWeight:700,marginBottom:8}}>✗ Answer: {qAns}</p>}<button className="BT" onClick={genQ}>Next →</button></div>}</div>}</div>}

{tab==="build"&&<div><h2 className="ST">Sentence Builder</h2>{sf.length===0?<p style={{color:"var(--tm)"}}>No sentences at this level.</p>:<div className="QC" style={{textAlign:"left"}}><p style={{color:"var(--tm)",fontSize:11,marginBottom:4}}>Arrange to form the correct sentence:</p><p style={{color:"var(--acl)",fontWeight:700,fontSize:14,fontFamily:"'Crimson Pro',serif",marginBottom:12}}>"{sf[si%sf.length].e}" <span className="BD" style={{background:`${lc(sf[si%sf.length].l)}15`,color:lc(sf[si%sf.length].l)}}>{sf[si%sf.length].l}</span></p><div className={`SZ ${sd?(sc?"ok":"bad"):""}`}>{so.length===0&&<span style={{color:"var(--tm)",fontSize:11,opacity:.5}}>Tap words below...</span>}{so.map(w=><span key={w.id} className="SC" onClick={()=>sRem(w)}>{w.t}</span>)}</div><div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>{sp.map(w=><span key={w.id} className="SC p" onClick={()=>sAdd(w)}>{w.t}</span>)}</div>{sd&&<div>{sc?<p style={{color:"var(--ok)",fontWeight:700,marginBottom:8}}>✓ Perfect! +15 XP</p>:<p style={{color:"var(--no)",fontWeight:700,marginBottom:8}}>✗ Correct: {sf[si%sf.length].w.join(" ")}</p>}<button className="BT" onClick={()=>setSi(i=>i+1)}>Next →</button></div>}{!sd&&so.length>0&&<button className="BT BG" style={{padding:"5px 14px",fontSize:11}} onClick={()=>initS(si)}>Reset</button>}</div>}</div>}

{tab==="fill"&&<div><h2 className="ST">Fill in the Blank</h2>{ff.length===0?<p style={{color:"var(--tm)"}}>No exercises at this level.</p>:(()=>{const f=ff[fi%ff.length]; return <div className="QC" style={{textAlign:"left"}}><span className="BD" style={{background:`${lc(f.l)}15`,color:lc(f.l)}}>{f.l}</span><p style={{fontSize:19,fontWeight:700,fontFamily:"'Crimson Pro',serif",color:"var(--tx)",margin:"10px 0",lineHeight:1.4}}>{f.s.split("___").map((pt,i,a)=><span key={i}>{pt}{i<a.length-1&&<span style={{display:"inline-block",minWidth:70,borderBottom:"2.5px solid var(--ac)",textAlign:"center",color:fc!==null?(fc?"var(--ok)":"var(--no)"):"var(--acl)",fontWeight:700}}>{fc!==null?(fc?f.a:`${fv} → ${f.a}`):fv||" "}</span>}</span>)}</p><p style={{color:"var(--tm)",fontSize:11,marginBottom:10}}>Hint: {f.h}</p>{fc===null?<div style={{display:"flex",gap:7}}><input style={IS} value={fv} onChange={e=>setFv(e.target.value)} onKeyDown={e=>e.key==="Enter"&&fv.trim()&&chkF()} placeholder="Type answer..." autoFocus/><button className="BT" onClick={chkF} disabled={!fv.trim()}>Check</button></div>:<div>{fc?<p style={{color:"var(--ok)",fontWeight:700,marginBottom:8}}>✓ Correct! +12 XP</p>:<p style={{color:"var(--no)",fontWeight:700,marginBottom:8}}>✗ Answer: <strong>{f.a}</strong></p>}<button className="BT" onClick={()=>{setFi(i=>i+1);setFv("");setFc(null);}}>Next →</button></div>}</div>;})()}</div>}

{tab==="conj"&&<div><h2 className="ST">Verb Conjugation</h2><div className="QC" style={{textAlign:"left"}}><div style={{textAlign:"center",marginBottom:14}}><div style={{fontSize:9,color:"var(--tm)",textTransform:"uppercase",letterSpacing:3}}>Group {cV.g}</div><div style={{fontFamily:"'Crimson Pro',serif",fontSize:28,fontWeight:900,color:"var(--acl)",marginTop:3}}>{cV.i}</div><div style={{color:"var(--tm)",fontSize:12}}>({cV.e})</div></div><table className="CT"><thead><tr><th>Tense</th><th>Answer</th><th>{cc?"":""}</th></tr></thead><tbody>{[["p","Present",cV.pr],["pa","Past",cV.pa],["pe","Perfect",cV.pf]].map(([k,l,a])=>(<tr key={k}><td style={{fontWeight:600,fontSize:12,color:"var(--tm)"}}>{l}</td><td><input style={{...IS,borderColor:cc?(cc[k]?"var(--ok)":"var(--no)"):"var(--bd)"}} value={cv[k]} onChange={e=>setCv(p=>({...p,[k]:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&chkC()} placeholder={`${l}...`} disabled={cc!==null}/></td><td style={{fontSize:12,fontWeight:700,color:cc?.[k]?"var(--ok)":"var(--no)"}}>{cc&&(cc[k]?"✓":a)}</td></tr>))}</tbody></table><div style={{marginTop:14,textAlign:"center"}}>{cc===null?<button className="BT" onClick={chkC}>Check</button>:<div>{cc.p&&cc.pa&&cc.pe?<p style={{color:"var(--ok)",fontWeight:700,marginBottom:8}}>✓ All correct! +20 XP</p>:<p style={{color:"var(--no)",fontWeight:700,marginBottom:8}}>Review above</p>}<button className="BT" onClick={()=>{setCi(i=>i+1);setCv({p:"",pa:"",pe:""});setCc(null);}}>Next →</button></div>}</div></div></div>}

{tab==="stats"&&<div><h2 className="ST">Progress</h2><div className="SG" style={{animation:"fu .4s both"}}><div className="SD"><div className="sn" style={{color:"var(--go)"}}>{xlv}</div><div className="sl">Level</div></div><div className="SD"><div className="sn" style={{color:"var(--acl)"}}>{xp}</div><div className="sl">XP</div></div><div className="SD"><div className="sn" style={{color:"var(--mi)"}}>{tc}</div><div className="sl">Correct</div></div><div className="SD"><div className="sn">{ta}</div><div className="sl">Attempts</div></div><div className="SD"><div className="sn" style={{color:"var(--co)"}}>{ta?Math.round(tc/ta*100):0}%</div><div className="sl">Accuracy</div></div></div><div className="GC" style={{marginTop:10}}><h3><span>📈</span> Breakdown</h3>{[["quiz","Quiz"],["build","Build"],["fill","Fill"],["conj","Conjugation"],["read","Reading"]].map(([t,l])=>{const it=hist.filter(h=>h.t===t),ok=it.filter(h=>h.c).length;return it.length>0&&<div key={t} style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}><span style={{fontWeight:600,fontSize:11,width:90,color:"var(--tm)"}}>{l}</span><div style={{flex:1,height:6,background:"var(--bd)",borderRadius:3,overflow:"hidden"}}><div style={{height:"100%",width:`${ok/it.length*100}%`,background:"var(--ok)",borderRadius:3}}/></div><span style={{fontSize:11,fontWeight:700,color:"var(--tm)",minWidth:40,textAlign:"right"}}>{ok}/{it.length}</span></div>;})}{hist.length===0&&<p style={{color:"var(--tm)",fontSize:12}}>Complete exercises to see stats!</p>}</div><div className="GC"><h3><span>🎯</span> A2 Checklist</h3><p>At CEFR A2, you can:</p><div className="EL">Understand sentences about familiar topics (family, shopping, work)</div><div className="EL">Communicate in routine tasks with direct information exchange</div><div className="EL">Describe background, immediate environment, and needs</div><div className="EL">Use past tense, present perfect, and future constructions</div><div className="EL">Handle comparatives, possessives, and reflexive verbs</div><div className="EL">Read simple texts and understand main points</div><div className="TP">💡 Complete all A2 exercises with 80%+ accuracy to reach A2!</div></div></div>}

</div>
</div>
</>);
}
