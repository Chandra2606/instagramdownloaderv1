import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json(
        { error: 'URL diperlukan' },
        { status: 400 }
      )
    }

    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    const contentType = response.headers['content-type']
    
    return new NextResponse(response.data, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'attachment'
      }
    })

  } catch (error) {
    console.error('Proxy download error:', error)
    return NextResponse.json(
      { error: 'Gagal mengunduh media' },
      { status: 500 }
    )
  }
} 