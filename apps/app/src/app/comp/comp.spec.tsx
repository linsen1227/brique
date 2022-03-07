import { render } from '@testing-library/react';

import Comp from './comp';

describe('Comp', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Comp />);
    expect(baseElement).toBeTruthy();
  });
});
