import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { url } = body

    if (!url) {
      return NextResponse.json(
        { error: 'URL Instagram diperlukan' },
        { status: 400 }
      )
    }

    const options = {
      method: 'GET',
      url: 'https://instagram-downloader-scraper-reels-igtv-posts-stories.p.rapidapi.com/v1/instagram',
      params: { url },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'instagram-downloader-scraper-reels-igtv-posts-stories.p.rapidapi.com'
      }
    };

    const response = await axios.request(options)
    console.log('RapidAPI response:', response.data);

    return NextResponse.json({
      success: true,
      data: response.data.data.map((item: any) => ({
        url: item.media,
        type: item.isVideo ? 'video' : 'image',
        thumbnail: item.thumbnail
      }))
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Gagal mengunduh dari Instagram' },
      { status: 500 }
    )
  }
} 