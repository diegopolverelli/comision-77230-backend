

export class HeroesRepository{
    constructor(DAO){
        this.heroesDAO=DAO
    }

    async getHeroes(){
        return this.heroesDAO.get()
    }
}