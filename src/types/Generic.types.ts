export type TMutable<T> = { -readonly [K in keyof T]?: T[K] };

export type TNullable<T> = { [K in keyof T]?: T[K] | null };
