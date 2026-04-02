import { describe, it, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '../mocks/server'

describe('POST /api/generate (MSWモック)', () => {
  it('正常レスポンスでcontentが返る', async () => {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 45, income: 500, savings: 200, expenses: 20 }),
    })
    expect(res.ok).toBe(true)
    const data = await res.json()
    expect(data).toHaveProperty('content')
  })

  it('レート制限超過時に429を返す', async () => {
    server.use(
      http.post('/api/generate', () =>
        new HttpResponse(
          JSON.stringify({ error: 'リクエスト数が制限を超えました' }),
          { status: 429, headers: { 'Retry-After': '60' } }
        )
      )
    )
    const res = await fetch('/api/generate', { method: 'POST' })
    expect(res.status).toBe(429)
    expect(res.headers.get('Retry-After')).toBe('60')
  })

  it('不正なJSONは400を返す', async () => {
    server.use(
      http.post('/api/generate', () =>
        HttpResponse.json({ error: 'リクエストの形式が正しくありません' }, { status: 400 })
      )
    )
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: 'invalid json',
    })
    expect(res.status).toBe(400)
  })

  it('無料利用上限超過時にLIMIT_REACHEDエラーを返す', async () => {
    server.use(
      http.post('/api/generate', () =>
        HttpResponse.json({ error: 'LIMIT_REACHED' }, { status: 429 })
      )
    )
    const res = await fetch('/api/generate', { method: 'POST' })
    const data = await res.json()
    expect(data.error).toBe('LIMIT_REACHED')
  })
})
