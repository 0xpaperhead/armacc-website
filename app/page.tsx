import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Globe, Users, Rocket, Github, Linkedin, X } from "lucide-react"
import Image from "next/image"
import { MultiChainDonation } from "@/components/donation/multi-chain-donation"

export default function ArmenianAcceleratorLanding() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image src="/armenian-flag.png" alt="Armenian Flag" width={32} height={24} className="rounded" />
            <span className="text-xl font-bold bg-gradient-to-r from-red-400 via-blue-400 to-orange-400 bg-clip-text text-transparent">
              arm/acc
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#manifesto" className="hover:text-blue-400 transition-colors">
              Manifesto
            </a>
            <a href="#goals" className="hover:text-blue-400 transition-colors">
              Goals
            </a>
            <a href="#community" className="hover:text-blue-400 transition-colors">
              Community
            </a>
            <Button
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white bg-transparent"
            >
              Join Movement
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-blue-900/20 to-orange-900/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.03%3E%3Ccircle cx=30 cy=30 r=1/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-blue-500 text-blue-400">
              🇦🇲/acc • Armenian Accelerationism
            </Badge>

            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-red-400 via-blue-400 to-orange-400 bg-clip-text text-transparent">
              Build Armenia's
              <br />
              Tech Future
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              A decentralized movement accelerating Armenia's transformation into a global technology hub. Radically
              optimistic. Delusionally ambitious. Relentlessly building.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 via-blue-500 to-orange-500 hover:from-red-600 hover:via-blue-600 hover:to-orange-600 text-white border-0"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Join the Movement
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                Read Manifesto
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">∞</div>
              <div className="text-gray-400">Potential</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-400 mb-2">🇦🇲</div>
              <div className="text-gray-400">One Armenia</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2">⚡</div>
              <div className="text-gray-400">Acceleration</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">🚀</div>
              <div className="text-gray-400">Building</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section id="manifesto" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Our Manifesto
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-8">
                  <Zap className="h-12 w-12 text-blue-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-white">Radical Optimism</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We are radically – even delusionally – optimistic about Armenia's future. We see Armenia emerging as
                    a major technological hub and believe in accelerating this transformation.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-8">
                  <Users className="h-12 w-12 text-red-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-white">Inclusive Community</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Being Armenian is a choice. What makes you Armenian isn't birth or ancestry – it's alignment with
                    our shared vision, values, and goals. It's what you think and do.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-8">
                  <Globe className="h-12 w-12 text-orange-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-white">Global Impact</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We aim to improve the lives of Armenians worldwide, wherever they are in our vast diaspora. Human
                    capital should be Armenia's most valuable internal asset.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                <CardContent className="p-8">
                  <Rocket className="h-12 w-12 text-green-400 mb-4" />
                  <h3 className="text-2xl font-bold mb-4 text-white">Meritocracy</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We strongly prefer meritocracy over bureaucracy. The startup scene holds the key to dramatically
                    improving the economy and generating substantial capital.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section id="goals" className="py-24 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
              Our Goals
            </h2>

            <div className="space-y-8">
              <div className="text-left p-8 rounded-lg bg-gradient-to-r from-red-900/20 to-transparent border border-red-800/30">
                <h3 className="text-2xl font-bold mb-4 text-red-400">🏗️ Technology Hub</h3>
                <p className="text-gray-300 text-lg">
                  Accelerate Armenia's transformation into a major technological hub, building on existing efforts and
                  creating new opportunities for innovation.
                </p>
              </div>

              <div className="text-left p-8 rounded-lg bg-gradient-to-r from-blue-900/20 to-transparent border border-blue-800/30">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">📚 Educational Excellence</h3>
                <p className="text-gray-300 text-lg">
                  Support and accelerate educational advancements, building on initiatives like the Generation AI
                  project by FAST Foundation.
                </p>
              </div>

              <div className="text-left p-8 rounded-lg bg-gradient-to-r from-orange-900/20 to-transparent border border-orange-800/30">
                <h3 className="text-2xl font-bold mb-4 text-orange-400">🚀 Startup Ecosystem</h3>
                <p className="text-gray-300 text-lg">
                  Foster the growing Armenian startup scene as the key to dramatically improving the economy and
                  retaining top talent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-24 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Support the Movement
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Help fund the Armenian Accelerationism movement. Your crypto donations directly support our mission to transform Armenia into a global tech hub.
            </p>
          </div>
          <div className="flex justify-center">
            <MultiChainDonation />
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
              Join the Movement
            </h2>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Show your affiliation by adding arm/acc or 🇦🇲/acc to your social media. Spread the word. Build the future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
              >
                <X className="mr-2 h-5 w-5" />
                Follow on X
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white bg-transparent"
              >
                <Linkedin className="mr-2 h-5 w-5" />
                Connect on LinkedIn
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
              >
                <Github className="mr-2 h-5 w-5" />
                Contribute
              </Button>
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-4">Add to your bio:</p>
              <div className="inline-flex items-center space-x-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
                <code className="text-blue-400">arm/acc</code>
                <span className="text-gray-500">or</span>
                <code className="text-orange-400">🇦🇲/acc</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image src="/armenian-flag.png" alt="Armenian Flag" width={24} height={18} className="rounded" />
              <span className="text-lg font-bold bg-gradient-to-r from-red-400 via-blue-400 to-orange-400 bg-clip-text text-transparent">
                Armenian Accelerationism
              </span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>Decentralized. Open. Building the future.</p>
              <p className="text-sm mt-1">🇦🇲/acc • Radically optimistic since 2024</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
