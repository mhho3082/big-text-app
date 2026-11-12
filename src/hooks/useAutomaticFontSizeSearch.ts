import React from 'react';

const MIN_AUTOMATIC_OUTPUT_FONT_SIZE = 8;
const MAX_AUTOMATIC_OUTPUT_FONT_SIZE = 1032;
const INITIAL_AUTOMATIC_OUTPUT_FONT_SIZE = Math.floor(
  (MIN_AUTOMATIC_OUTPUT_FONT_SIZE + MAX_AUTOMATIC_OUTPUT_FONT_SIZE) / 2,
);

type AutomaticFontSizeSearchBounds = {
  best: number;
  high: number;
  low: number;
};

type AutomaticFontSizeSearchState = {
  generation: number;
  bounds: AutomaticFontSizeSearchBounds;
  outputFontSize: number;
  probeFontSize: number;
  complete: boolean;
};

type AutomaticFontSizeSearchAction =
  | { type: 'restart' }
  | { type: 'probeResult'; probeFontSize: number; fits: boolean };

function createInitialState(): AutomaticFontSizeSearchState {
  return {
    generation: 0,
    bounds: {
      best: MIN_AUTOMATIC_OUTPUT_FONT_SIZE,
      high: MAX_AUTOMATIC_OUTPUT_FONT_SIZE,
      low: MIN_AUTOMATIC_OUTPUT_FONT_SIZE,
    },
    outputFontSize: MIN_AUTOMATIC_OUTPUT_FONT_SIZE,
    probeFontSize: INITIAL_AUTOMATIC_OUTPUT_FONT_SIZE,
    complete: false,
  };
}

function reducer(
  state: AutomaticFontSizeSearchState,
  action: AutomaticFontSizeSearchAction,
): AutomaticFontSizeSearchState {
  switch (action.type) {
    case 'restart':
      return {
        ...createInitialState(),
        generation: state.generation + 1,
      };
    case 'probeResult': {
      if (state.complete || action.probeFontSize !== state.probeFontSize) {
        return state;
      }

      const bounds = { ...state.bounds };

      if (action.fits) {
        bounds.best = action.probeFontSize;
        bounds.low = action.probeFontSize + 1;
      } else {
        bounds.high = action.probeFontSize - 1;
      }

      if (bounds.low <= bounds.high) {
        return {
          ...state,
          bounds,
          probeFontSize: Math.floor((bounds.low + bounds.high) / 2),
        };
      }

      return {
        ...state,
        bounds,
        outputFontSize: bounds.best,
        complete: true,
      };
    }
  }
}

export function useAutomaticFontSizeSearch() {
  const [state, dispatch] = React.useReducer(
    reducer,
    undefined,
    createInitialState,
  );

  const restartAutomaticSearch = React.useCallback(() => {
    dispatch({ type: 'restart' });
  }, []);

  const submitAutomaticProbeResult = React.useCallback(
    (probeFontSize: number, fits: boolean) => {
      dispatch({ type: 'probeResult', probeFontSize, fits });
    },
    [],
  );

  return {
    automaticSearchGeneration: state.generation,
    automaticOutputFontSize: state.outputFontSize,
    automaticProbeFontSize: state.probeFontSize,
    automaticSearchComplete: state.complete,
    restartAutomaticSearch,
    submitAutomaticProbeResult,
  };
}
