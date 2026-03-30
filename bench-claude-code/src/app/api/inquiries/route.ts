import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, phone, email, comment, productId } = body

    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    const inquiry = await payload.create({
      collection: 'inquiries',
      data: {
        name,
        phone,
        email: email || undefined,
        comment: comment || undefined,
        product: productId || undefined,
        status: 'new',
      },
    })

    return NextResponse.json({ success: true, id: inquiry.id })
  } catch {
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 },
    )
  }
}
