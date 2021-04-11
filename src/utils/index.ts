
export type RecordClassName = string | Record<string, boolean>
/**
 * 多个 class name -> 支持条件 | 
 * class={classnames(['class1', { class2: boolean }])}
 */
export function classnames(cls: RecordClassName[]) {
  return cls
    .map((c) => {
      if (typeof c === 'object') {
        const [k, v] = Object.entries(c)[0] || [];
        return v && k;
      }
      return c;
    })
    .filter((_) => _)
    .join(' ');
}
