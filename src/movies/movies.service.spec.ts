import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll()', () => {
    it('should return an array', () => {
      const result = service.getAll();

      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne()', () => {
    it('shiuld return a movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('404 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne()', () => {
    it('delete movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const affterDelete = service.getAll().length;

      expect(affterDelete).toBeLessThanOrEqual(beforeDelete);
    });

    it('404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create()', () => {
    it('create movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      });
      const affterCreate = service.getAll().length;

      expect(affterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update()', () => {
    it('update Movie', () => {
      service.create({
        title: 'Test Movie',
        year: 2000,
        genres: ['test'],
      });

      service.updateMovie(1, { title: 'updated' });

      const movie = service.getOne(1);

      expect(movie.title).toEqual('updated');
    });

    it('404', () => {
      try {
        service.updateMovie(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
