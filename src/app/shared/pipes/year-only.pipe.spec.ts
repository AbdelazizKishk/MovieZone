import { YearOnlyPipe } from './year-only.pipe';

describe('YearOnlyPipe', () => {
  it('create an instance', () => {
    const pipe = new YearOnlyPipe();
    expect(pipe).toBeTruthy();
  });
});
