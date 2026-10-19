import { NextResponse } from 'next/server';

/**
 * POST /api/translate
 * Translates text between English and German using Google Cloud Translation API or DeepL API
 * Expects JSON: { text: string | string[], target: 'de' | 'en', source?: string }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, target = 'de', source = 'en' } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text parameter is required.' }, { status: 400 });
    }

    const googleKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    const deeplKey = process.env.DEEPL_API_KEY;

    // 1. Check DeepL API if configured
    if (deeplKey) {
      const isFree = deeplKey.endsWith(':fx');
      const deeplUrl = isFree
        ? 'https://api-free.deepl.com/v2/translate'
        : 'https://api.deepl.com/v2/translate';

      const textArray = Array.isArray(text) ? text : [text];
      const params = new URLSearchParams();
      textArray.forEach((t) => params.append('text', t));
      params.append('target_lang', target.toUpperCase());
      if (source) params.append('source_lang', source.toUpperCase());

      const res = await fetch(deeplUrl, {
        method: 'POST',
        headers: {
          Authorization: `DeepL-Auth-Key ${deeplKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (res.ok) {
        const data = await res.json();
        const translations = data.translations.map((t: any) => t.text);
        return NextResponse.json({
          provider: 'deepl',
          translations: Array.isArray(text) ? translations : translations[0],
        });
      }
    }

    // 2. Check Google Cloud Translation API if configured
    if (googleKey) {
      const textArray = Array.isArray(text) ? text : [text];
      const res = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${googleKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: textArray,
            target,
            source: source || 'en',
            format: 'text',
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const translations = data.data.translations.map((t: any) => t.translatedText);
        return NextResponse.json({
          provider: 'google',
          translations: Array.isArray(text) ? translations : translations[0],
        });
      }
    }

    // 3. Fallback: Return configuration notice
    return NextResponse.json({
      success: true,
      message:
        'Client-side translation active via Google Translate engine. To enable server-side DeepL/Google API, configure GOOGLE_TRANSLATE_API_KEY or DEEPL_API_KEY in environment.',
      target,
      text,
    });
  } catch (error: any) {
    console.error('[Translation API Error]:', error);
    return NextResponse.json(
      { error: 'Translation processing failed', details: error.message },
      { status: 500 }
    );
  }
}
