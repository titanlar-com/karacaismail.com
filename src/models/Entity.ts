/** Tüm modellerin tabanı: değişmez (readonly) veri + kimlik. */
export abstract class Entity<T extends { id?: string }> {
  protected constructor(protected readonly data: Readonly<T>) {}

  get id(): string {
    return String(this.data.id ?? '')
  }
}

/** `order` alanı olan modeller için sıralayıcı. */
export const byOrder = <T extends { order: number }>(a: T, b: T): number => a.order - b.order
