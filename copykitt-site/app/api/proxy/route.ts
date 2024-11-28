import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Get `prompt` from query string
    const prompt = req.nextUrl.searchParams.get('prompt');
    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt parameter' }, { status: 400 });
    }

    // Call original endpoint
    const response = await fetch(`${process.env.API_ENDPOINT}?prompt=${encodeURIComponent(prompt)}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return NextResponse.json({ error: `API Error: ${response.statusText}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error in proxy:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
