const zIndexes = {
  low: 1000000,
  middle: 2000000,
  high: 3000000
}

export function claimZIndex(priority: 'low' | 'middle' | 'high' = 'low'): number {
  zIndexes[priority] += 100

  return zIndexes[priority]
}
