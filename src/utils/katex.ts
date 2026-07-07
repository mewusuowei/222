import katex from 'katex';

export function renderMath(tex: string, displayMode = false): string {
  return katex.renderToString(tex, {
    displayMode,
    throwOnError: false,
    trust: true,
  });
}
