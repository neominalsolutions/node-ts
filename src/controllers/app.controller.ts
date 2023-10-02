import { Controller, Get } from "@nestjs/common";
import { AppService } from "src/app.service";

@Controller() // localhost: ana route ayarı
export class AppController {
  // DI ile service bağlantı kurmuş
  constructor(private readonly appService: AppService) {}

  @Get() // HttpGET
  getHello(): string {
    return this.appService.getHello();
  }
}
