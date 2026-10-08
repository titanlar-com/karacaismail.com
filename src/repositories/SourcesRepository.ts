import sources from '../content/sources.json'
import { SourceTool, type SourceToolData } from '../models/SourceTool'
import { ContentRepository } from './ContentRepository'

/** Kaynak sırası (JSON dizisi sırası); content store sırayı garanti etmez. */
const ORDER = new Map<string, number>(sources.map((s, i) => [s.id, i]))

/** Kaynaklar kataloğu (src/content/sources.json) için tek erişim noktası; kaynak sırası korunur. */
export class SourcesRepository extends ContentRepository {
  async tools(): Promise<SourceTool[]> {
    const rows = await this.rows<SourceToolData>('sources')
    rows.sort((a, b) => (ORDER.get(a.id) ?? 0) - (ORDER.get(b.id) ?? 0))
    return SourceTool.of(rows)
  }
}
