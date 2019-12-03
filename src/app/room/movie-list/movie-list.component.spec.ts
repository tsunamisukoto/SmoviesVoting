import { MovieListComponent } from './movie-list.component';

describe('MovieListComponent', () => {
  let component: MovieListComponent;

  beforeEach(() => {
    component = new MovieListComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
