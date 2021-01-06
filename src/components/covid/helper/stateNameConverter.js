import Converter from './destrictsMap';

const converter = {
    "Niedersachsen": Converter.Niedersachsen,
    "Schleswig-Holstein": Converter.SchleswigHolstein,
    "Mecklenburg-Vorpommern": Converter.MecklenburgVorpommern,
    "Hamburg": Converter.Hamburg,
    "Bremen": Converter.Bremem,
    "Sachsen-Anhalt": Converter.SachsenAnhalt,
    "Baden-Württemberg": Converter.BadenWuerttemberg,
    "Brandenburg": Converter.Brandenburg,
    "Saarland": Converter.Saarland,
    "Rheinland-Pfalz": Converter.RheinlandPfalz,
    "Nordrhein-Westfalen": Converter.NordrheinWestfalen,
    "Berlin": Converter.Berlin,
    "Hessen": Converter.Hessen,
    "Bayern": Converter.Bayern,
    "Thüringen": Converter.Thueringen,
    "Sachsen": Converter.Sachsen
}

const allStates = [
    [
        "Baden-Württemberg",
        "Bayern",
        "Berlin",
        "Brandenburg",
    ],
    [
        "Bremen",
        "Hamburg",
        "Hessen",
        "Mecklenburg-Vorpommern",
    ],
    [
        "Niedersachsen",
        "Nordrhein-Westfalen",
        "Saarland",
        "Sachsen",
    ],
    [
        "Sachsen-Anhalt",
        "Schleswig-Holstein",
        "Thüringen",
        "Rheinland-Pfalz",
    ]
]

export {allStates, converter};