export interface Note {
  file: string;
  title: string;
  description: string;
  icon: string;
  time: string;
  theme?: string;
}

export async function fetchManifest(): Promise<Note[]> {
  const response = await fetch('./notes/manifest.json');
  if (!response.ok) throw new Error('Could not load the note manifest');
  return response.json() as Promise<Note[]>;
}
