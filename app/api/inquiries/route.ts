import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { sendEmail } from '@/lib/email'

// Validation schema
const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  serviceType: z.string().min(1, 'Service type is required'),
  eventDate: z.string().optional(),
  message: z.string().optional(),
  budget: z.number().optional(),
  guestCount: z.number().optional(),
  venue: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validatedData = inquirySchema.parse(body)
    
    // Create inquiry in database
    const inquiry = await prisma.inquiry.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        serviceType: validatedData.serviceType,
        eventDate: validatedData.eventDate ? new Date(validatedData.eventDate) : null,
        message: validatedData.message,
        budget: validatedData.budget,
        guestCount: validatedData.guestCount,
        venue: validatedData.venue,
        status: 'PENDING',
        priority: 'MEDIUM',
        source: 'Website Contact Form'
      }
    })

    // Send confirmation email to client
    await sendEmail({
      to: validatedData.email,
      subject: 'Thank you for your inquiry - Audio Video Events',
      template: 'inquiry-confirmation',
      data: {
        name: validatedData.name,
        serviceType: validatedData.serviceType,
        inquiryId: inquiry.id
      }
    })

    // Send notification email to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: `New Inquiry: ${validatedData.serviceType} - ${validatedData.name}`,
      template: 'admin-notification',
      data: {
        inquiry: {
          ...inquiry,
          eventDate: inquiry.eventDate?.toISOString()
        }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully',
      inquiryId: inquiry.id
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating inquiry:', error)
    
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
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    
    const skip = (page - 1) * limit
    
    // Build where clause
    const where: any = {}
    if (status) where.status = status
    if (priority) where.priority = priority
    
    // Get inquiries with pagination
    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: [
          { priority: 'desc' },
          { createdAt: 'desc' }
        ],
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          followUps: {
            orderBy: { createdAt: 'desc' },
            take: 3
          }
        }
      }),
      prisma.inquiry.count({ where })
    ])
    
    return NextResponse.json({
      success: true,
      data: inquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching inquiries:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}