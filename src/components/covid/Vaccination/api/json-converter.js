class VaccinationTemplateState {
    constructor(args) {
        const { vaccinated, quote, vaccinatedPer1k, name } = args;
        this.vaccinated = vaccinated;
        this.quote = quote;
        this.vaccinatedPer1k = vaccinatedPer1k;
        this.name = name;
    }
}

class VaccinationTemplateGermany {
    constructor(args) {
        const { data, meta } = args;
        const { vaccinated, quote, vaccinatedPer1k, states } = data;
        const { lastUpdate } = meta;
        this.lastUpdate = VaccinationTemplateGermany.convertDate(lastUpdate);
        this.vaccinated = vaccinated;
        this.quote = quote;
        this.vaccinatedPer1k = vaccinatedPer1k;
        this.states = []
        this.setupStates(states);
    }

    static convertDate(f) {
        return f.replace(/T/, ' ').replace(/\..+/, '');
    }

    setupStates(states) {
        for (const [, state] of Object.entries(states)) {
            this.states.push(new VaccinationTemplateState(state));
        }
    }
}

export { VaccinationTemplateGermany };