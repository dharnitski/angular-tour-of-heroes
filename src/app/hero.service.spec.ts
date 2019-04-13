import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from './hero';

const mockData = [
  { id: 1, name: 'Hulk' },
  { id: 2, name: 'Thor' },
  { id: 3, name: 'Iron Man' }
] as Hero[];

describe('HeroService', () => {

  let heroService;
  let httpTestingController: HttpTestingController;
  let mockHeroes;
  let mockHero;
  let mockId;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [HeroService, MessageService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    heroService = TestBed.get(HeroService);

    mockHeroes = [...mockData];
    mockHero = mockHeroes[0];
    mockId = mockHero.id;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should exist', () => {
    expect(heroService).toBeTruthy();
  });

  describe('getHeroes', () => {

    it('should return mock heroes', () => {
      heroService.getHeroes().subscribe(
        heroes => expect(heroes.length).toEqual(mockHeroes.length),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(heroService.heroesUrl);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock heroes
      req.flush(mockHeroes);
    });
  });
});

