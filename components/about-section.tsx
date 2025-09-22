import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Clock, Heart, Shield } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Passion for Excellence",
    description: "Every event is a canvas for our creativity and technical expertise.",
  },
  {
    icon: Shield,
    title: "Reliability & Trust",
    description: "Dependable service delivery with backup systems for peace of mind.",
  },
  {
    icon: Clock,
    title: "Timely Execution",
    description: "Punctual setup and seamless event flow management.",
  },
  {
    icon: Award,
    title: "Industry Recognition",
    description: "Award-winning team with certifications in audio-visual technology.",
  },
]

const achievements = [
  { number: "300+", label: "Events Completed" },
  { number: "8+", label: "Years Experience" },
  { number: "25+", label: "Team Members" },
  { number: "12+", label: "Cities Served" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <Badge variant="outline" className="border-primary text-primary mb-4">
                About AV Event Jaipur
              </Badge>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Creating <span className="text-primary">Unforgettable</span> Experiences
              </h2>
              <p className="text-lg text-muted-foreground text-pretty mb-6">
                Based in the Pink City of Jaipur, AV Event Jaipur has been transforming celebrations and corporate
                gatherings across Rajasthan since 2016. We specialize in providing comprehensive audio-visual solutions
                that blend modern technology with the rich cultural heritage of Rajasthan.
              </p>
              <p className="text-lg text-muted-foreground text-pretty">
                From grand Rajasthani weddings in heritage hotels to corporate conferences in modern venues, we bring
                technical excellence and creative vision to every event. Our motto "We Make Memories" reflects our
                commitment to creating experiences that last a lifetime.
              </p>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{achievement.number}</div>
                  <div className="text-sm text-muted-foreground">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Values */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground mb-8">Our Values</h3>
            {values.map((value, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">{value.title}</h4>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Image */}
        <div className="mt-16">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="/professional-indian-event-management-team-with-aud.jpg"
              alt="Audio Video Events Team"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Meet Our Expert Team</h3>
              <p className="text-muted-foreground">
                Certified professionals with decades of combined experience in event technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
