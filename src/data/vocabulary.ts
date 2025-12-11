export interface Word {
  n: string;  // Norwegian
  e: string;  // English
  p: string;  // Pronunciation
  g: string;  // Gender (en/ei/et/adj/etc)
  l: "A1" | "A2";
}

export const VOCAB: Record<string, Word[]> = {
"Hilsener":[
