import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schema for portfolio
const portfolioSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional(),
  eventType: z.enum(['WEDDING', 'CORPORATE', 'BIRTHDAY', 'ANNIVERSARY', 'CONFERENCE', 'CONCERT', 'FESTIVAL', 'PRIVATE_PARTY', 'CULTURAL', 'RELIGIOUS', 'OTHER']),
  location: z.string().optional(),
  eventDate: z.string().optional(),
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  tags: z.array(z.string()).optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = portfolioSchema.parse(body)

    const portfolio = await prisma.portfolio.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        eventType: validatedData.eventType,
        location: validatedData.location,
        eventDate: validatedData.eventDate ? new Date(validatedData.eventDate) : null,
        images: validatedData.images ? JSON.stringify(validatedData.images) : null,
        videos: validatedData.videos ? JSON.stringify(validatedData.videos) : null,
        featured: validatedData.featured || false,
        isPublic: validatedData.isPublic !== false,
        tags: validatedData.tags ? JSON.stringify(validatedData.tags) : null
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Portfolio item created successfully',
      data: {
        ...portfolio,
        images: portfolio.images ? JSON.parse(portfolio.images) : [],
        videos: portfolio.videos ? JSON.parse(portfolio.videos) : [],
        tags: portfolio.tags ? JSON.parse(portfolio.tags) : []
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating portfolio item:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const eventType = searchParams.get('eventType')
    const featured = searchParams.get('featured')
    const isPublic = searchParams.get('isPublic')
    
    const skip = (page - 1) * limit
    
    // Build where clause
    const where: any = {}
    if (eventType) where.eventType = eventType
    if (featured !== null) where.featured = featured === 'true'
    if (isPublic !== null) where.isPublic = isPublic !== 'false'
    
    // Get portfolio items with pagination
    const [portfolioItems, total] = await Promise.all([
      prisma.portfolio.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { featured: 'desc' },
          { eventDate: 'desc' },
          { createdAt: 'desc' }
        ]
      }),
      prisma.portfolio.count({ where })
    ])
    
    // Parse JSON fields
    const formattedItems = portfolioItems.map((item: any) => ({
      ...item,
      images: item.images ? JSON.parse(item.images) : [],
      videos: item.videos ? JSON.parse(item.videos) : [],
      tags: item.tags ? JSON.parse(item.tags) : []
    }))
    
    return NextResponse.json({
      success: true,
      data: formattedItems,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching portfolio items:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}