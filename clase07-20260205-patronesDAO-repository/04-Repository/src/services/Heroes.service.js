

export class HeroesService{
    constructor(repository){
        this.heroesRepository=repository
    }

    async getHeroes(){
        return this.heroesRepository.getHeroes()
    }
}