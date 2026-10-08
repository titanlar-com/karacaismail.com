import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export interface SnippetRef { file: string; from: number; to: number; lang: 'ts' | 'tsx' | 'js' | 'json' | 'css' | 'html' }
export interface Snippet extends SnippetRef { code: string }

/**
 * "Kod" sahnesinde gösterilen satırları sitenin kendi kaynak dosyasından okur (derleme sırasında).
 * Gösterilen kod her zaman gerçek kodla aynıdır; elle kopyalanmış bir metin eskiyemez.
 */
export class SourceSnippetRepository {
  constructor(private readonly root: string = process.cwd()) {}

  read(ref: SnippetRef): Snippet {
    const lines = readFileSync(resolve(this.root, ref.file), 'utf8').split('\n')
    const code = lines.slice(ref.from - 1, ref.to).join('\n')
    return { ...ref, code }
  }
}
