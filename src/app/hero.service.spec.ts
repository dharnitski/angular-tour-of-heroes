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

  describe('addHero', () => {

    it('should add a single Hero', () => {
      const logSpy = spyOn(messageService, 'add');

      heroService.addHero(mockHero).subscribe(
        response => expect(response).toEqual(mockHero),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${heroesUrl}`);
      expect(req.request.method).toEqual('POST');
      // Respond with the mock heroes
      req.flush(mockHero);

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(`HeroService: added hero w/ id=${mockHero.id}`);
    });

    it('should fail gracefully on error', () => {
      const logSpy = spyOn(messageService, 'add');

      heroService.addHero(mockHero).subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${heroesUrl}`);
      expect(req.request.method).toEqual('POST');
      // Respond with the mock heroes
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(`HeroService: addHero failed: Http failure response for api/heroes: 404 Bad Request`);
    });
  });

  describe('updateHero', () => {
    it('should update hero', () => {
      const logSpy = spyOn(messageService, 'add');

      heroService.updateHero(mockHero).subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );

      // Receive PUT request
      const req = httpTestingController.expectOne(heroesUrl);
      expect(req.request.method).toEqual('PUT');
      // Respond with the updated hero
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(`HeroService: updateHero failed: Http failure response for ${heroesUrl}: 404 Bad Request`);
    });

    it('should fail gracefully on error', () => {
      const logSpy = spyOn(messageService, 'add');

      heroService.updateHero(mockHero).subscribe(
        response => expect(response).toEqual(mockHero),
        fail
      );

      // Receive PUT request
      const req = httpTestingController.expectOne(heroesUrl);
      expect(req.request.method).toEqual('PUT');
      // Respond with the updated hero
      req.flush(mockHero);

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(`HeroService: updated hero id=${mockHero.id}`);
    });
  });

  describe('deleteHero', () => {

    it('should delete hero using id', () => {
      const logSpy = spyOn(messageService, 'add');

      heroService.deleteHero(mockId).subscribe(
        response => expect(response).toEqual(mockId),
        fail
      );
      // Receive DELETE request
      const req = httpTestingController.expectOne(`${heroesUrl}/${mockHero.id}`);
      expect(req.request.method).toEqual('DELETE');
      // Respond with the updated hero
      req.flush(mockId);

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(`HeroService: deleted hero id=${mockHero.id}`);
    });

    it('should delete hero using hero object', () => {
      const logSpy = spyOn(messageService, 'add');

      heroService.deleteHero(mockHero).subscribe(
        response => expect(response).toEqual(mockHero.id),
        fail
      );
      // Receive DELETE request
      const req = httpTestingController.expectOne(`${heroesUrl}/${mockHero.id}`);
      expect(req.request.method).toEqual('DELETE');
      // Respond with the updated hero
      req.flush(mockHero.id);

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(`HeroService: deleted hero id=${mockHero.id}`);
    });
  });

  describe('searchHero', () => {
    it('should find heroes matching the search criteria', () => {
      const searchTerm = 'r'
      const logSpy = spyOn(messageService, 'add');

      heroService.searchHeroes(searchTerm).subscribe(
        response => expect(response).toEqual([mockHeroes[1], mockHeroes[2]]),
        fail
      );

      // Receive PUT request
      const req = httpTestingController.expectOne(`${heroesUrl}/?name=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the updated hero
      req.flush([mockHeroes[1], mockHeroes[2]]);

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(`HeroService: found heroes matching "${searchTerm}"`);
    });

    it('should not find heroes matching the search criteria', () => {
      const searchTerm = 'r'
      const logSpy = spyOn(messageService, 'add');

      heroService.searchHeroes(searchTerm).subscribe(
        response => expect(response).toEqual([]),
        fail
      );

      // Receive PUT request
      const req = httpTestingController.expectOne(`${heroesUrl}/?name=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the updated hero
      req.flush([]);

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(`HeroService: found heroes matching "${searchTerm}"`);
    });


    it('should return an empty array when passing an empty search string', () => {
      const searchTerm = '';
      const logSpy = spyOn(messageService, 'add');

      heroService.searchHeroes(searchTerm).subscribe(
        response => expect(response).toEqual([]),
        fail
      );

      // Receive PUT request
      const req = httpTestingController.expectNone(`${heroesUrl}/?name=${searchTerm}`);

      expect(logSpy).not.toHaveBeenCalled();
    });

    it('should fail gracefully on error', () => {
      const searchTerm = 'r';
      const logSpy = spyOn(messageService, 'add');

      heroService.searchHeroes(searchTerm).subscribe(
        response => expect(response).toEqual([]),
        fail
      );

      // Receive PUT request
      const req = httpTestingController.expectOne(`${heroesUrl}/?name=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the updated hero
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledWith(`HeroService: searchHeroes failed: Http failure response for ${heroesUrl}/?name=${searchTerm}: 404 Bad Request`);
    });
  });
});

