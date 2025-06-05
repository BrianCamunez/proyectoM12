import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PlayerProvider, usePlayer } from './PlayerContext';

describe('PlayerContext', () => {
  test('reproducirCancion sets cancionActual and reproduciendo correctly', () => {
    let ctx;
    function Consumer() {
      ctx = usePlayer();
      return null;
    }

    render(
      <PlayerProvider>
        <Consumer />
      </PlayerProvider>
    );

    const song = { id: 1, cancion: 'song.mp3' };
    act(() => {
      ctx.reproducirCancion(song, [song]);
    });

    expect(ctx.cancionActual).toEqual(song);
    expect(ctx.reproduciendo).toBe(true);
  });

  test('toggleModoRepetir cycles through "off", "playlist", and "cancion"', () => {
    let ctx;
    function Consumer() {
      ctx = usePlayer();
      return null;
    }

    render(
      <PlayerProvider>
        <Consumer />
      </PlayerProvider>
    );

    expect(ctx.modoRepetir).toBe('off');

    act(() => {
      ctx.toggleModoRepetir();
    });
    expect(ctx.modoRepetir).toBe('playlist');

    act(() => {
      ctx.toggleModoRepetir();
    });
    expect(ctx.modoRepetir).toBe('cancion');

    act(() => {
      ctx.toggleModoRepetir();
    });
    expect(ctx.modoRepetir).toBe('off');
  });
});
