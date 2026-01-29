@Controller('api/cats')
export class CatsController {
  @Get("listado")
  findAll() {
    return 'This action returns all cats';
  }
}