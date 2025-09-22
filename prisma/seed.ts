import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@avevent.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@avevent.com',
      phone: '+91 98765 43210',
      password: hashedPassword,
      role: 'ADMIN',
      isVerified: true
    }
  })

  console.log('✅ Admin user created:', adminUser.email)

  // Create sample services
  const services = [
    {
      name: 'Professional Sound System',
      description: 'High-quality audio equipment for crystal clear sound',
      category: 'AUDIO',
      basePrice: 15000,
      unit: 'per day',
      features: JSON.stringify(['Wireless Microphones', 'Line Array Speakers', 'Mixing Console', 'Monitor System']),
      images: JSON.stringify(['/services/audio-system.jpg', '/services/sound-mixing.jpg'])
    },
    {
      name: 'LED Stage Lighting',
      description: 'Dynamic lighting solutions for spectacular visual effects',
      category: 'LIGHTING',
      basePrice: 25000,
      unit: 'per day',
      features: JSON.stringify(['LED Par Lights', 'Moving Head Lights', 'Laser Effects', 'DMX Control']),
      images: JSON.stringify(['/services/led-lighting.jpg', '/services/stage-lights.jpg'])
    },
    {
      name: '4K Video Production',
      description: 'Professional videography and live streaming services',
      category: 'VIDEO',
      basePrice: 30000,
      unit: 'per event',
      features: JSON.stringify(['4K Cameras', 'Drone Coverage', 'Live Streaming', 'Same Day Highlights']),
      images: JSON.stringify(['/services/video-production.jpg', '/services/drone-shot.jpg'])
    },
    {
      name: 'Event Photography',
      description: 'Capture every precious moment with professional photography',
      category: 'PHOTOGRAPHY',
      basePrice: 20000,
      unit: 'per event',
      features: JSON.stringify(['Professional Photographers', 'Candid Photography', 'Portrait Sessions', 'Digital Album']),
      images: JSON.stringify(['/services/photography.jpg', '/services/candid-shots.jpg'])
    },
    {
      name: 'Giant LED Display',
      description: 'High-resolution LED screens for presentations and entertainment',
      category: 'LED_DISPLAYS',
      basePrice: 40000,
      unit: 'per day',
      features: JSON.stringify(['P3.9 LED Panels', 'Video Processing', 'Content Management', 'Weather Resistant']),
      images: JSON.stringify(['/services/led-wall.jpg', '/services/outdoor-screen.jpg'])
    },
    {
      name: 'DJ & Entertainment',
      description: 'Professional DJs and entertainment for all occasions',
      category: 'ENTERTAINMENT',
      basePrice: 18000,
      unit: 'per event',
      features: JSON.stringify(['Professional DJ', 'Music Library', 'Karaoke Setup', 'Interactive Entertainment']),
      images: JSON.stringify(['/services/dj-setup.jpg', '/services/entertainment.jpg'])
    }
  ]

  for (const service of services) {
    await prisma.service.create({
      data: service
    })
  }

  console.log('✅ Services created')

  // Create sample portfolio items
  const portfolioItems = [
    {
      title: 'Rajesh & Priya\'s Royal Wedding',
      description: 'A magnificent 3-day wedding celebration at City Palace, Udaipur with 800+ guests',
      eventType: 'WEDDING',
      location: 'City Palace, Udaipur',
      eventDate: new Date('2024-02-15'),
      images: JSON.stringify([
        '/portfolio/royal-wedding-1.jpg',
        '/portfolio/royal-wedding-2.jpg',
        '/portfolio/royal-wedding-3.jpg',
        '/portfolio/royal-wedding-4.jpg'
      ]),
      videos: JSON.stringify(['/portfolio/royal-wedding-video.mp4']),
      featured: true,
      tags: JSON.stringify(['Royal Wedding', 'Heritage Venue', 'Traditional', 'Luxury'])
    },
    {
      title: 'TechCorp Annual Conference 2024',
      description: 'Corporate event with live streaming for 500+ attendees and global audience',
      eventType: 'CORPORATE',
      location: 'JW Marriott, Jaipur',
      eventDate: new Date('2024-03-20'),
      images: JSON.stringify([
        '/portfolio/corporate-event-1.jpg',
        '/portfolio/corporate-event-2.jpg',
        '/portfolio/corporate-event-3.jpg'
      ]),
      videos: JSON.stringify(['/portfolio/corporate-highlights.mp4']),
      featured: true,
      tags: JSON.stringify(['Corporate', 'Live Streaming', 'Professional', 'Technology'])
    },
    {
      title: 'Holi Festival Celebration',
      description: 'Vibrant cultural celebration with traditional music and dance performances',
      eventType: 'CULTURAL',
      location: 'Central Park, Jaipur',
      eventDate: new Date('2024-03-08'),
      images: JSON.stringify([
        '/portfolio/holi-festival-1.jpg',
        '/portfolio/holi-festival-2.jpg',
        '/portfolio/holi-festival-3.jpg'
      ]),
      tags: JSON.stringify(['Cultural', 'Festival', 'Traditional Music', 'Community Event'])
    },
    {
      title: 'Bollywood Night Concert',
      description: 'Musical extravaganza featuring top Bollywood playback singers',
      eventType: 'CONCERT',
      location: 'SMS Stadium, Jaipur',
      eventDate: new Date('2024-01-26'),
      images: JSON.stringify([
        '/portfolio/concert-1.jpg',
        '/portfolio/concert-2.jpg',
        '/portfolio/concert-3.jpg'
      ]),
      videos: JSON.stringify(['/portfolio/concert-highlights.mp4']),
      featured: true,
      tags: JSON.stringify(['Concert', 'Bollywood', 'Live Music', 'Entertainment'])
    },
    {
      title: 'Arjun\'s 25th Birthday Bash',
      description: 'Themed birthday party with DJ, dancing, and spectacular light show',
      eventType: 'BIRTHDAY',
      location: 'Rambagh Palace, Jaipur',
      eventDate: new Date('2024-04-12'),
      images: JSON.stringify([
        '/portfolio/birthday-party-1.jpg',
        '/portfolio/birthday-party-2.jpg'
      ]),
      tags: JSON.stringify(['Birthday', 'Themed Party', 'DJ Night', 'Young Crowd'])
    }
  ]

  for (const item of portfolioItems) {
    await prisma.portfolio.create({
      data: item
    })
  }

  console.log('✅ Portfolio items created')

  // Create sample inquiries
  const inquiries = [
    {
      name: 'Neha Sharma',
      email: 'neha.sharma@example.com',
      phone: '+91 98765 12345',
      serviceType: 'Wedding Events',
      eventDate: new Date('2024-12-15'),
      message: 'Looking for complete wedding package for 300 guests in Jaipur. Need audio, lighting, photography, and decoration services.',
      status: 'PENDING',
      priority: 'HIGH',
      budget: 200000,
      guestCount: 300,
      venue: 'Hotel Clarks Amer, Jaipur'
    },
    {
      name: 'Rohit Industries',
      email: 'events@rohitindustries.com',
      phone: '+91 98765 54321',
      serviceType: 'Corporate Events',
      eventDate: new Date('2024-11-30'),
      message: 'Annual company celebration for 150 employees. Need professional AV setup with live streaming capability.',
      status: 'CONTACTED',
      priority: 'MEDIUM',
      budget: 80000,
      guestCount: 150,
      venue: 'Hilton Jaipur'
    },
    {
      name: 'Amit Patel',
      email: 'amit.patel@example.com',
      phone: '+91 98765 67890',
      serviceType: 'Birthday Events',
      eventDate: new Date('2024-10-25'),
      message: 'Planning surprise 50th birthday party. Need DJ, lighting, and photography services.',
      status: 'QUOTED',
      priority: 'LOW',
      budget: 50000,
      guestCount: 75,
      venue: 'Private Farmhouse'
    }
  ]

  for (const inquiry of inquiries) {
    await prisma.inquiry.create({
      data: inquiry
    })
  }

  console.log('✅ Sample inquiries created')

  // Create sample team members
  const teamMembers = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      email: 'rajesh@avevent.com',
      phone: '+91 98765 43210',
      specialization: 'Event Strategy & Client Relations',
      experience: '12+ Years',
      bio: 'Visionary leader with over a decade of experience in event management and entertainment industry.',
      image: '/team/rajesh-kumar.jpg'
    },
    {
      name: 'Priya Sharma',
      role: 'Technical Director',
      email: 'priya@avevent.com',
      phone: '+91 98765 43211',
      specialization: 'Audio-Visual Systems & Innovation',
      experience: '10+ Years',
      bio: 'Expert in cutting-edge AV technology with a passion for creating immersive experiences.',
      image: '/team/priya-sharma.jpg'
    },
    {
      name: 'Amit Singh',
      role: 'Creative Head',
      email: 'amit@avevent.com',
      phone: '+91 98765 43212',
      specialization: 'Lighting Design & Visual Effects',
      experience: '8+ Years',
      bio: 'Creative genius who transforms venues into magical spaces through innovative lighting design.',
      image: '/team/amit-singh.jpg'
    },
    {
      name: 'Sunita Joshi',
      role: 'Operations Manager',
      email: 'sunita@avevent.com',
      phone: '+91 98765 43213',
      specialization: 'Event Coordination & Logistics',
      experience: '7+ Years',
      bio: 'Detail-oriented professional ensuring seamless execution of every event from planning to completion.',
      image: '/team/sunita-joshi.jpg'
    }
  ]

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { email: member.email },
      update: {},
      create: member
    })
  }

  console.log('✅ Team members created')

  // Create settings
  const settings = [
    { key: 'company_name', value: 'Audio Video Events', type: 'string' },
    { key: 'company_phone', value: '+91 98765 43210', type: 'string' },
    { key: 'company_email', value: 'info@avevent.com', type: 'string' },
    { key: 'company_address', value: '123 Pink City Plaza, Jaipur, Rajasthan 302001', type: 'string' },
    { key: 'booking_advance_percentage', value: '30', type: 'number' },
    { key: 'cancellation_policy', value: '48 hours advance notice required for cancellation', type: 'string' },
    { key: 'payment_terms', value: '30% advance, 70% on event completion', type: 'string' }
  ]

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting
    })
  }

  console.log('✅ Settings created')

  console.log('🎉 Database seeding completed successfully!')

  // Display summary
  const counts = {
    users: await prisma.user.count(),
    services: await prisma.service.count(),
    portfolio: await prisma.portfolio.count(),
    inquiries: await prisma.inquiry.count(),
    teamMembers: await prisma.teamMember.count(),
    settings: await prisma.setting.count()
  }

  console.log('\n📊 Database Summary:')
  console.log(`👥 Users: ${counts.users}`)
  console.log(`🛠️ Services: ${counts.services}`)
  console.log(`📸 Portfolio Items: ${counts.portfolio}`)
  console.log(`📧 Inquiries: ${counts.inquiries}`)
  console.log(`👨‍💼 Team Members: ${counts.teamMembers}`)
  console.log(`⚙️ Settings: ${counts.settings}`)

  console.log('\n🔐 Admin Login Credentials:')
  console.log('Email: admin@avevent.com')
  console.log('Password: admin123')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })