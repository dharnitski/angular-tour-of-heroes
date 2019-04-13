import { HttpClient } from "@angular/common/http";

import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";

describe('HeroService', () => {
  let heroService;
  let messageService: MessageService;
  let httpClient: HttpClient;
  beforeEach(() => { heroService = new HeroService(httpClient, messageService); });


  it('should exist', () => {
    expect(heroService).toBeTruthy();
  });
});

