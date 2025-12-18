import { NextRequest, NextResponse } from 'next/server';

// Environment variables
const LMS_API_KEY = process.env.LMS_API_KEY;
const LMS_API_ENDPOINT = process.env.LMS_API_ENDPOINT || 'https://snap-lms-58591531d315.herokuapp.com/api/forms/form/';

/**
 * GET handler for fetching LMS form HTML
 * No server-side caching - each request fetches fresh from Heroku
 * This allows A/B testing to work properly (different users can get different forms)
 * Client-side localStorage caching (15 min) is handled in LmsForm.tsx
 */
export async function GET(request: NextRequest) {
  try {
    // Validate environment variables
    if (!LMS_API_KEY) {
      console.error('LMS_API_KEY is not configured');
      return NextResponse.json(
        { error: 'API configuration error', message: 'LMS API key is not configured' },
        { status: 500 }
      );
    }

    // Fetch fresh data from Heroku LMS API (no server-side caching for A/B testing)
    const response = await fetch(LMS_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ api_key: LMS_API_KEY }),
      cache: 'no-store', // Ensure no caching at fetch level
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`LMS API error: ${response.status} - ${errorText}`);
      return NextResponse.json(
        {
          error: 'LMS API error',
          message: `Failed to fetch form: ${response.status} ${response.statusText}`,
          details: errorText
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Validate response structure
    if (!data || typeof data.html_content !== 'string') {
      console.error('Invalid response structure from LMS API:', data);
      return NextResponse.json(
        { error: 'Invalid API response', message: 'Expected html_content field in response' },
        { status: 502 }
      );
    }

    return NextResponse.json({ html_content: data.html_content });

  } catch (error) {
    console.error('Error fetching LMS form:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}
