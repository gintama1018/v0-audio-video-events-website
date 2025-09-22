import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateInquirySchema = z.object({
  status: z.enum(['PENDING', 'CONTACTED', 'QUOTED', 'CONVERTED', 'LOST', 'SPAM']).optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  notes: z.string().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const inquiry = await prisma.inquiry.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        followUps: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!inquiry) {
      return NextResponse.json({
        success: false,
        message: 'Inquiry not found'
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: inquiry
    })

  } catch (error) {
    console.error('Error fetching inquiry:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validatedData = updateInquirySchema.parse(body)

    const inquiry = await prisma.inquiry.update({
      where: { id: params.id },
      data: validatedData
    })

    return NextResponse.json({
      success: true,
      message: 'Inquiry updated successfully',
      data: inquiry
    })

  } catch (error) {
    console.error('Error updating inquiry:', error)
    
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.inquiry.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Inquiry deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting inquiry:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 })
  }
}