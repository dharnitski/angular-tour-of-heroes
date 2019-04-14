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

  let heroService: HeroService;
  let messageService: MessageService;
  let httpTestingController: HttpTestingController;
  let mockHeroes: Hero[];
  let mockHero: Hero;
  let mockId;
  const heroesUrl = 'api/heroes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [HeroService, MessageService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    heroService = TestBed.get(HeroService);
    messageService = TestBed.get(MessageService);

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
      const logSpy = spyOn(messageService, 'add');

      heroService.getHeroes().subscribe(
        (heroes: Hero[]) => expect(heroes.length).toEqual(mockHeroes.length),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(heroesUrl);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock heroes
      req.flush(mockHeroes);

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith('HeroService: fetched heroes');
    });

    it('should fail gracefully on error', () => {
      const logSpy = spyOn(messageService, 'add');

      heroService.getHero(mockHero.id).subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${heroesUrl}/${mockHero.id}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock heroes
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(`HeroService: getHero id=${mockHero.id} failed: Http failure response for ${heroesUrl}/${mockHero.id}: 404 Bad Request`);
    });
  });

  describe('getHero', () => {

    it('should return a single mock hero', () => {
      const logSpy = spyOn(messageService, 'add');

      heroService.getHero(mockHero.id).subscribe(
        response => expect(response).toEqual(mockHero),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${heroesUrl}/${mockHero.id}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock heroes
      req.flush(mockHero);

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(`HeroService: fetched hero id=${mockHero.id}`);
    });

    it('should fail gracefully on error', () => {
      const logSpy = spyOn(messageService, 'add');

      heroService.getHero(mockHero.id).subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${heroesUrl}/${mockHero.id}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock heroes
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(`HeroService: getHero id=${mockHero.id} failed: Http failure response for ${heroesUrl}/${mockHero.id}: 404 Bad Request`);
    });
  });
});

