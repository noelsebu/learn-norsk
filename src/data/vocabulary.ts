export interface Word {
  n: string;  // Norwegian
  e: string;  // English
  p: string;  // Pronunciation
  g: string;  // Gender (en/ei/et/adj/etc)
  l: "A1" | "A2";
}

export const VOCAB: Record<string, Word[]> = {
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
