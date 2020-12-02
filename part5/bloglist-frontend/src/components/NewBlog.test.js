import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import NewBlog from './NewBlog';

describe('form input', () => {
  let component;
  const createBlog = jest.fn();
  const titleData = 'Canonical string reduction';
  const authorData = 'Edsger W. Dijkstra';
  const urlData =
    'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html';
  beforeEach(() => {
    component = render(<NewBlog createBlog={createBlog} />);
  });
  test('form input is correct', () => {
    const titleInput = component.container.querySelector('#title-input');
    const authorInput = component.container.querySelector('#author-input');
    const urlInput = component.container.querySelector('#url-input');
    const form = component.container.querySelector('form');

    fireEvent.change(titleInput, {
      target: { value: titleData },
    });
    fireEvent.change(authorInput, {
      target: { value: authorData },
    });
    fireEvent.change(urlInput, {
      target: { value: urlData },
    });
    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe(titleData);
    expect(createBlog.mock.calls[0][0].author).toBe(authorData);
    expect(createBlog.mock.calls[0][0].url).toBe(urlData);
  });
});
