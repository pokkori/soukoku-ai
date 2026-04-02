import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// インメモリストアをリセットするためにモジュールを再import
describe('rateLimit', () => {
  beforeEach(() => {
    vi.resetModules()
    // Upstash env未設定状態でテスト
    delete process.env.UPSTASH_REDIS_REST_URL
    delete process.env.UPSTASH_REDIS_REST_TOKEN
  })

  it('制限内のリクエストはnullを返す', async () => {
    const { rateLimit } = await import('@/lib/rate-limit')
    const req = new NextRequest('http://localhost/api/generate', {
      method: 'POST',
      headers: { 'x-forwarded-for': '1.2.3.4' },
    })
    const result = await rateLimit(req, { requests: 5, window: 60 })
    expect(result).toBeNull()
  })

  it('制限を超えたリクエストは429を返す', async () => {
    const { rateLimit } = await import('@/lib/rate-limit')
    const makeReq = () =>
      new NextRequest('http://localhost/api/generate', {
        method: 'POST',
        headers: { 'x-forwarded-for': '9.9.9.9' },
      })
    // 上限+1回リクエスト
    for (let i = 0; i < 3; i++) {
      await rateLimit(makeReq(), { requests: 2, window: 60 })
    }
    const result = await rateLimit(makeReq(), { requests: 2, window: 60 })
    expect(result?.status).toBe(429)
    expect(result?.headers.get('Retry-After')).toBe('60')
  })

  it('異なるIPは別カウントで管理される', async () => {
    const { rateLimit } = await import('@/lib/rate-limit')
    const makeReq = (ip: string) =>
      new NextRequest('http://localhost/api/generate', {
        method: 'POST',
        headers: { 'x-forwarded-for': ip },
      })
    // IP-Aで上限まで消費
    for (let i = 0; i < 2; i++) {
      await rateLimit(makeReq('10.0.0.1'), { requests: 2, window: 60 })
    }
    // IP-Bは別カウントなのでnull
    const resultB = await rateLimit(makeReq('10.0.0.2'), { requests: 2, window: 60 })
    expect(resultB).toBeNull()
  })
})
