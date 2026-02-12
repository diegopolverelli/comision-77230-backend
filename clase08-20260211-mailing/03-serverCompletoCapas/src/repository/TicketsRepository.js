export class TicketsRepository{
    #ticketsDAO
    constructor(dao){
        this.#ticketsDAO=dao
    }

    async createTicket(ticket={}){
        return await this.#ticketsDAO.save(ticket)
    }
}