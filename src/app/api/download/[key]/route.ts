import { type NextRequest, NextResponse } from 'next/server'

import { generateSignedUrl } from '@/lib/b2'
import getContentType from '@/lib/content-type'

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) => {
  const key = (await params).key
  const signedUrl = await generateSignedUrl(key, true)

  const noRedirect = req.nextUrl.searchParams.get('noRedirect') === 'true'

  if (noRedirect) {
    const data = await fetch(signedUrl)
    return new Response(data.body, {
      headers: {
        ...Object.fromEntries(data.headers.entries()),
        'Content-Type': getContentType(key),
        'Content-Disposition': `attachment; filename="${encodeURIComponent(key.split('/').pop() || '')}"`,
        'X-Download-Options': 'noopen'
      }
    })
  }

  return NextResponse.redirect(signedUrl)
}

export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
}