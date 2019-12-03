import { MovieListItemComponent } from './movie-list-item.component';

describe('MovieListItemComponent', () => {
  let component: MovieListItemComponent;

  beforeEach(() => {
    component = new MovieListItemComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
