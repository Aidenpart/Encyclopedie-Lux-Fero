const convertArabicToRoman = (num) => {
	const rules = {
		"M": 1000, "CM": 900,
		"D": 500, "CD": 400,
		"C": 100, "XC": 90,
		"L": 50, "XL": 40,
		"XXX": 30, "XX": 20, "X": 10,
		"IX": 9, "V": 5, "IV": 4, "I": 1
	}
	
	let res = "";
	const romans = Object.keys(rules);

	for (let i = 0; i < romans.length; ++i) {
		const val = rules[romans[i]];
		
		while (num >= val) {
			num -= val;
			res += romans[i];
		}
	}
	return res;
};


export const RomanNumber = (props) => {
    let num = props.i + 1;
    return (
        <span>{convertArabicToRoman(num)}</span>
    )
}


export const getNomRoman = (romans, id) => {
    const roman = romans.find(roman => roman._id === id);
    return roman ? roman.nom : '';
};