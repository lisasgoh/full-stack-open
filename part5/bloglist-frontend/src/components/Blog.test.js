import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('blog tests', () => {
  let component;
  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    user: {},
  };

  const user = {};

  const likeBlog = jest.fn();
  const deleteBlog = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        likeBlog={likeBlog}
        deleteBlog={deleteBlog}
        user={user}
      />,
    );
  });

  test('renders data', () => {
    expect(component.container).toHaveTextContent('Canonical string reduction');
  });

  test('at start the likes and url are not displayed', () => {
    const div = component.container.querySelector('.more-info');

    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button, url and lkes are displayed', () => {
    const button = component.getByText('show');
    fireEvent.click(button);

    const div = component.container.querySelector('.more-info');
    expect(div).not.toHaveStyle('display: none');
  });

  test('like blog twice, like is called twice', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(likeBlog.mock.calls).toHaveLength(2);
  });
});
