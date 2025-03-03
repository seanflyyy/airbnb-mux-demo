import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin') || '*';
    console.log('Request origin:', origin);

    const response = await fetch('https://api.mux.com/video/v1/uploads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`
        ).toString('base64')}`,
      },
      body: JSON.stringify({
        cors_origin: origin,
        new_asset_settings: {
          playback_policy: ['public'],
          test: false
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Mux API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(errorData.error?.message || 'Failed to create upload URL');
    }

    const data = await response.json();
    console.log('Mux API Response:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Upload endpoint error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create upload URL' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uploadId = searchParams.get('uploadId');
    const assetId = searchParams.get('assetId');

    if (!uploadId && !assetId) {
      return NextResponse.json(
        { error: 'Upload ID or Asset ID is required' },
        { status: 400 }
      );
    }

    let url = '';
    if (uploadId) {
      url = `https://api.mux.com/video/v1/uploads/${uploadId}`;
    } else if (assetId) {
      url = `https://api.mux.com/video/v1/assets/${assetId}`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.MUX_TOKEN_ID}:${process.env.MUX_TOKEN_SECRET}`
        ).toString('base64')}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Mux API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(errorData.error?.message || 'Failed to fetch data from Mux');
    }

    const data = await response.json();
    console.log('Mux API Response:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Get endpoint error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch data from Mux' },
      { status: 500 }
    );
  }
}