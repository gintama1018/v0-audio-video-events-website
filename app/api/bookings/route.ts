import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { sendEmail } from '@/lib/email'

// Validation schema for booking
const bookingSchema = z.object({
  clientId: z.string().optional(),
  eventName: z.string().min(2, 'Event name must be at least 2 characters'),
  eventType: z.enum(['WEDDING', 'CORPORATE', 'BIRTHDAY', 'ANNIVERSARY', 'CONFERENCE', 'CONCERT', 'FESTIVAL', 'PRIVATE_PARTY', 'CULTURAL', 'RELIGIOUS', 'OTHER']),
  eventDate: z.string(),
  endDate: z.string().optional(),
  venue: z.string().min(2, 'Venue is required'),
  address: z.string().optional(),
  guestCount: z.number().min(1, 'Guest count must be at least 1'),
  budget: z.number().min(1000, 'Budget must be at least ₹1000'),
  notes: z.string().optional(),
  requirements: z.string().optional(),
  services: z.array(z.object({
    serviceId: z.string(),
    quantity: z.number().min(1),
    price: z.number().min(0)
  })),
  clientDetails: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10)
  }).optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = bookingSchema.parse(body)

    // If no clientId provided, create a guest user
    let clientId = validatedData.clientId
    if (!clientId && validatedData.clientDetails) {
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedData.clientDetails.email }
      })

      if (existingUser) {
        clientId = existingUser.id
      } else {
        // Create new user
        const newUser = await prisma.user.create({
          data: {
            name: validatedData.clientDetails.name,
            email: validatedData.clientDetails.email,
            phone: validatedData.clientDetails.phone,
            password: 'temp-password', // They can reset later
            role: 'CLIENT'
          }
        })
        clientId = newUser.id
      }
    }

    if (!clientId) {
      return NextResponse.json({
        success: false,
        message: 'Client information is required'
      }, { status: 400 })
    }

    // Calculate total amount from services
    const totalAmount = validatedData.services.reduce((sum, service) => {
      return sum + (service.price * service.quantity)
    }, 0)

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        clientId,
        eventName: validatedData.eventName,
        eventType: validatedData.eventType,
        eventDate: new Date(validatedData.eventDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        venue: validatedData.venue,
        address: validatedData.address,
        guestCount: validatedData.guestCount,
        budget: validatedData.budget,
        totalAmount,
        notes: validatedData.notes,
        requirements: validatedData.requirements,
        status: 'CONFIRMED'
      }
    })

    // Create booking services
    if (validatedData.services.length > 0) {
      await prisma.bookingService.createMany({
        data: validatedData.services.map(service => ({
          bookingId: booking.id,
          serviceId: service.serviceId,
          quantity: service.quantity,
          price: service.price
        }))
      })
    }

    // Create initial payment record
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amount: totalAmount * 0.3, // 30% advance
        paymentMethod: 'PENDING',
        status: 'PENDING',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        notes: 'Advance payment (30%)'
      }
    })

    // Get client details for email
    const client = await prisma.user.findUnique({
      where: { id: clientId }
    })

    // Send confirmation email
    if (client) {
      await sendEmail({
        to: client.email,
        template: 'booking-confirmation',
        data: {
          clientName: client.name,
          bookingId: booking.id,
          eventName: booking.eventName,
          eventDate: booking.eventDate.toLocaleDateString(),
          venue: booking.venue,
          totalAmount: totalAmount.toLocaleString()
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Booking created successfully',
      bookingId: booking.id,
      data: booking
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating booking:', error)
    
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
    const eventType = searchParams.get('eventType')
    const clientId = searchParams.get('clientId')
    
    const skip = (page - 1) * limit
    
    // Build where clause
    const where: any = {}
    if (status) where.status = status
    if (eventType) where.eventType = eventType
    if (clientId) where.clientId = clientId
    
    // Get bookings with pagination
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy: { eventDate: 'asc' },
        include: {
          client: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true
            }
          },
          services: {
            include: {
              service: true
            }
          },
          payments: {
            orderBy: { createdAt: 'desc' }
          }
        }
      }),
      prisma.booking.count({ where })
    ])
    
    return NextResponse.json({
      success: true,
      data: bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}