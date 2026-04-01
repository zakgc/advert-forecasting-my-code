export type SegmentReport = {
  id: string
  requestDateTime: string
  result: {
    grouped: Array<{
      values: {
        booked: {
          impressions: number
        }
        available: {
          impressions: number
        }
      }
      key: {
        $site: number
      }
    }>
  }
}
