import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  TrendingUp, 
  Target, 
  RefreshCw, 
  Bot, 
  Upload,
  Check,
  ArrowRight,
  Sparkles,
  Database,
  BarChart3
} from 'lucide-react'

function Waitlist() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('https://formspree.io/f/mblazbzq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubmitted(true)
        setEmail('')
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        const data = await response.json()
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }

  const SectionWrapper = ({ children, className = '' }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div 
          className="text-center max-w-4xl z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            Replace vibes with outcomes
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
            AI-powered career path planning backed by millions of data points from admissions data, job market trends, and real-world outcomes
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={loading || submitted}
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all backdrop-blur-xl disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: loading || submitted ? 1 : 1.05 }}
                whileTap={{ scale: loading || submitted ? 1 : 0.95 }}
                disabled={loading || submitted}
                className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-2xl font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    Joined
                  </>
                ) : loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    Join Waitlist
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
            {error && (
              <p className="text-sm text-red-400 mt-2 text-center">{error}</p>
            )}
            {submitted && !error && (
              <p className="text-sm text-green-400 mt-2 text-center">Successfully joined! Check your email for confirmation.</p>
            )}
            {!submitted && !error && (
              <p className="text-sm text-white/50 mt-4">We'll never spam you. Unsubscribe anytime.</p>
            )}
          </form>
        </motion.div>

        <motion.div
          className="absolute bottom-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Statement */}
      <SectionWrapper>
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                The problem
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                People are making life-changing career and education decisions based on intuition, not data. Traditional guidance is limited, and consultants charge premium rates for generic advice.
              </p>
            </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { label: 'People per advisor', value: '376:1', note: 'vs. recommended 250:1' },
              { label: 'Annual applicants', value: 'Millions', note: 'competing for limited opportunities' },
              { label: 'Private consultant rates', value: '$250/hr', note: 'for one-size-fits-all advice' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl"
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80 mb-1">{stat.label}</div>
                <div className="text-sm text-white/50">{stat.note}</div>
              </motion.div>
            ))}
          </div>
        </div>
        </section>
      </SectionWrapper>

      {/* Solution Overview */}
      <SectionWrapper>
        <section className="py-32 px-6 bg-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                The solution
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                Data-driven career path planning that learns from real outcomes, not assumptions.
              </p>
            </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: TrendingUp,
                title: 'Outcome Matching',
                description: 'See what worked for people with similar profiles, backgrounds, and goals.'
              },
              {
                icon: Target,
                title: 'Personalized Paths',
                description: 'Get multiple paths tailored to your profile with probability-based recommendations.'
              },
              {
                icon: RefreshCw,
                title: 'Real-Time Updates',
                description: 'Your plan adapts as you progress and new data becomes available.'
              },
              {
                icon: Bot,
                title: 'AI Agent',
                description: 'Ask anything and get data-backed answers powered by millions of real outcomes.'
              },
            ].map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-black/40 border border-white/10 rounded-3xl backdrop-blur-xl hover:border-white/20 transition-all"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
        </section>
      </SectionWrapper>

      {/* Data Sources */}
      <SectionWrapper>
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Built on real data
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                Our insights come from millions of verified data points across multiple trusted sources.
              </p>
            </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              'Admissions Data',
              'Research Institutions',
              'Pew Research Center',
              'Bureau of Labor Statistics',
              'LinkedIn Job Market Data',
              'Education Systems',
            ].map((source, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl text-center backdrop-blur-xl"
              >
                <Database className="w-8 h-8 mx-auto mb-3 text-blue-400/50" />
                <div className="text-sm text-white/80">{source}</div>
              </motion.div>
            ))}
          </div>
        </div>
        </section>
      </SectionWrapper>

      {/* How It Works */}
      <SectionWrapper>
        <section className="py-32 px-6 bg-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              How it works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                icon: Upload,
                title: 'Upload Your Profile',
                description: 'Resume, credentials, or professional profile. Takes just a few minutes.'
              },
              {
                step: '02',
                icon: Sparkles,
                title: 'AI Analysis',
                description: 'Our AI matches your profile against millions of data points in seconds.'
              },
              {
                step: '03',
                icon: Target,
                title: 'Get Your Path',
                description: 'Receive personalized paths with probabilities, timelines, and recommendations.'
              },
            ].map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="text-6xl font-bold text-white/5 absolute -top-4 -left-4">
                    {step.step}
                  </div>
                  <div className="p-8 bg-black/40 border border-white/10 rounded-3xl backdrop-blur-xl relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
        </section>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper>
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              {...fadeInUp}
              viewport={{ once: true }}
            >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to replace vibes with outcomes?
            </h2>
              <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join the waitlist to be among the first to experience data-driven career and education planning.
              </p>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={loading || submitted}
                  className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all backdrop-blur-xl disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: loading || submitted ? 1 : 1.05 }}
                  whileTap={{ scale: loading || submitted ? 1 : 0.95 }}
                  disabled={loading || submitted}
                  className="px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-2xl font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitted ? (
                    <>
                      <Check className="w-5 h-5" />
                      Joined
                    </>
                  ) : loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>
              {error && (
                <p className="text-sm text-red-400 mt-2 text-center">{error}</p>
              )}
              {submitted && !error && (
                <p className="text-sm text-green-400 mt-2 text-center">Successfully joined! Check your email for confirmation.</p>
              )}
            </form>
            </motion.div>
          </div>
        </section>
      </SectionWrapper>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-xl font-bold">OutcomesOS</div>
            </div>
            <div className="text-sm text-white/50 text-center md:text-right">
              <p>Built for people who want outcomes, not vibes.</p>
              <p className="mt-2">© 2024 OutcomesOS. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Waitlist

