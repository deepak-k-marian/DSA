const mermaidTheme = {
  primaryColor: '#c8e9d8',
  primaryTextColor: '#1c2525',
  primaryBorderColor: '#2d6c58',
  lineColor: '#e9785b',
  secondaryColor: '#fbfaf6',
  tertiaryColor: '#f4f1ea',
};

export async function renderMermaidDiagrams(container: HTMLElement): Promise<void> {
  if (!container.querySelector('.mermaid')) return;

  const { default: mermaid } = await import('mermaid');
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: mermaidTheme,
  });
  await mermaid.run({ nodes: container.querySelectorAll('.mermaid') });
}
