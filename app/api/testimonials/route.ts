import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schema for testimonials
const testimonialSchema = z.object({
  clientId: z.string().optional(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
  eventType: z.enum(['WEDDING', 'CORPORATE', 'BIRTHDAY', 'ANNIVERSARY', 'CONFERENCE', 'CONCERT', 'FESTIVAL', 'PRIVATE_PARTY', 'CULTURAL', 'RELIGIOUS', 'OTHER']).optional(),
  email: z.string().email().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = testimonialSchema.parse(body)

    // If no clientId provided, try to find or create user by email
    let clientId = validatedData.clientId
    if (!clientId && validatedData.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.email }
      })

      if (existingUser) {
        clientId = existingUser.id
      } else {
        // Create new user for testimonial
        const newUser = await prisma.user.create({
          data: {
            name: validatedData.name,
            email: validatedData.email,
            password: 'temp-password', // They can set password later
            role: 'CLIENT'
          }
        })
        clientId = newUser.id
      }
    }

    if (!clientId) {
      return NextResponse.json({
        success: false,
        message: 'Client ID or email is required'
      }, { status: 400 })
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        clientId,
        name: validatedData.name,
        rating: validatedData.rating,
        comment: validatedData.comment,
        eventType: validatedData.eventType,
        isPublic: false, // Requires admin approval
        featured: false
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Testimonial submitted successfully. It will be published after admin approval.',
      data: testimonial
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating testimonial:', error)
    
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
    const limit = parseInt(searchParams.get('limit') || '6')
    const isPublic = searchParams.get('isPublic') !== 'false'
    const featured = searchParams.get('featured')
    const eventType = searchParams.get('eventType')
    
    const skip = (page - 1) * limit
    
    // Build where clause
    const where: any = { isPublic }
    if (featured !== null) where.featured = featured === 'true'
    if (eventType) where.eventType = eventType
    
    // Get testimonials with pagination
    const [testimonials, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { featured: 'desc' },
          { createdAt: 'desc' }
        ],
        include: {
          client: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }),
      prisma.testimonial.count({ where })
    ])
    
    return NextResponse.json({
      success: true,
      data: testimonials,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}