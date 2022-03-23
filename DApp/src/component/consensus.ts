// w	    → source (similar to our Directory)	[R]
// t(w)	→ reliability of source (similar to our ranking of Directory) [W]
// f	    → fact (our data/value)	[R]
// s(f)	→ reliability of the fact  (calculated on ranking of Directory) [W]
// W(f)	→ set of source that return “f” (sub set of Directory selected by the HUB) 
// F(w)	→ list of fact reported by source w (we have just one if we will not use ‘where’ clause) [R]


export function consensus<Type>(values : Array<Type>,): Type {
    return null;
}