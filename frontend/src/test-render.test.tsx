import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';

describe('App Render String Test', () => {
  it('renders App to string successfully', () => {
    try {
      const html = renderToString(<App />);
      console.log('RENDER SUCCESSFUL! HTML length:', html.length);
      console.log('HTML snippet:', html.substring(0, 300));
    } catch (e) {
      console.error('RENDER CRASHED WITH ERROR:', e);
      throw e;
    }
  });
});
