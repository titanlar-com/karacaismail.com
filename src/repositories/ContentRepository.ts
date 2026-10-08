import { getCollection, type CollectionKey } from 'astro:content'

/**
 * JSON koleksiyonlarına tek erişim noktası. Görünüm katmanı koleksiyonu doğrudan okumaz;
 * ViewModel bu repository'den ham veriyi alıp Model sınıflarına sarar.
 */
export abstract class ContentRepository {
  protected async rows<T>(name: CollectionKey): Promise<Array<T & { id: string }>> {
    const entries = await getCollection(name)
    return entries.map((e) => ({ id: e.id, ...(e.data as object) }) as T & { id: string })
  }

  protected async first<T>(name: CollectionKey): Promise<T & { id: string }> {
    const [row] = await this.rows<T>(name)
    if (!row) throw new Error(`İçerik koleksiyonu boş: ${name}`)
    return row
  }
}
