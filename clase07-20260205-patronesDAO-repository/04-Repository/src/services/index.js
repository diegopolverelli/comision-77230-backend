import { MemoryHeroesDAO } from "../dao/memoryHeroesDAO.js";
import { HeroesRepository } from "../repository/HeroesRepository.js";
import { HeroesService } from "./Heroes.service.js";

const heroesDAO=new MemoryHeroesDAO()
const heroesRepository=new HeroesRepository(heroesDAO)
export const heroesService=new HeroesService(heroesRepository)