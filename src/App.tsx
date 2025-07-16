import React, { useState, useEffect } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import BackgroundSlideshow from './components/BackgroundSlideshow';

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [prevTimeLeft, setPrevTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [vhsStates, setVhsStates] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false
  });
  
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate time until Tuesday, May 26 at 12:00 AM GMT+2
  useEffect(() => {
    const targetDate = new Date('2026-05-26T00:00:00+02:00').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        const newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
        
        // Check for changes and trigger glitch effects
        setTimeLeft(prevTime => {
          const changes = {
            days: newTimeLeft.days !== prevTime.days,
            hours: newTimeLeft.hours !== prevTime.hours,
            minutes: newTimeLeft.minutes !== prevTime.minutes,
            seconds: newTimeLeft.seconds !== prevTime.seconds
          };
          
          // Trigger glitch animations for changed units
          if (changes.days || changes.hours || changes.minutes || changes.seconds) {
            setVhsStates(changes);
            
            // Reset glitch states after animation duration
            setTimeout(() => {
              setVhsStates({
                days: false,
                hours: false,
                minutes: false,
                seconds: false
              });
            }, 100);
          }
          
          setPrevTimeLeft(prevTime);
          return newTimeLeft;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleSecureSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <BackgroundSlideshow>
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        {/* Main Content */}
        <div className="text-center max-w-5xl mx-auto space-y-8">
          {/* Main Headline - Replace with Logo */}
          <div className="flex items-center justify-center">
            <img 
              src="/TRANSPARENT_LOGO/GTA-6-Logo-PNG-from-Grand-Theft-Auto-VI-Transparent.png"
              alt="Grand Theft Auto VI Logo"
              className="max-h-[20vh] w-auto object-contain"
            />
          </div>

          {/* Countdown Timer */}
          <div className="my-12">
            <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
              {[
                { value: timeLeft.days, label: 'DAYS', vhs: vhsStates.days, vhsClass: 'vhs-days' },
                { value: timeLeft.hours, label: 'HRS', vhs: vhsStates.hours, vhsClass: 'vhs-hours' },
                { value: timeLeft.minutes, label: 'MIN', vhs: vhsStates.minutes, vhsClass: 'vhs-minutes' },
                { value: timeLeft.seconds, label: 'SEC', vhs: vhsStates.seconds, vhsClass: 'vhs-seconds' }
              ].map((unit, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`bg-black/60 backdrop-blur-sm rounded-lg p-4 md:p-6 mb-3 border border-red-500/40 shadow-2xl ${unit.vhs ? unit.vhsClass : ''}`}>
                    <div className="text-2xl md:text-4xl lg:text-5xl font-pixel leading-none tracking-wider transform transition-all duration-300 hover:scale-105 digit-glow pixel-perfect" style={{ 
                      color: '#FF0000',
                      imageRendering: 'pixelated',
                      textRendering: 'geometricPrecision'
                    }}>
                      {formatNumber(unit.value)}
                    </div>
                  </div>
                  <div className="text-sm md:text-base font-semibold text-white tracking-widest enhanced-text-visibility">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl lg:text-3xl gta-subtitle leading-tight mb-8" style={{ 
            color: '#FFFFFF', 
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 1px 1px 2px rgba(0, 0, 0, 0.9)'
          }}>
            The Premium GTA VI Collectible You've Been Waiting For
          </h2>

          {/* Action Buttons */}
          <div className="space-y-4 max-w-md mx-auto">
            {/* Frosted Glass Card */}
            <div className="frosted-glass-card">
            {!isSubmitted ? (
              <>
                {/* Email Input Form */}
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email for priority access"
                    required
                    className="w-full px-6 py-4 bg-black/30 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/70 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/30 transition-all duration-300 text-center font-medium"
                  />
                </form>
                
                {/* Secure Button */}
                <button
                  onClick={handleSecureSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white gta-cta py-4 px-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 button-glow enhanced-text-visibility heartbeat-animation"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Secure Your Countdown Clock Now
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="bg-green-500/30 backdrop-blur-sm border border-green-400/40 rounded-lg p-6 text-center">
                <Check className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-xl gta-subtitle text-white mb-2 enhanced-text-visibility">You're In!</h3>
                <p className="text-white gta-body enhanced-text-visibility">
                  Welcome to the exclusive pre-order list. We'll notify you when the GTA VI Countdown Clock becomes available.
                </p>
              </div>
            )}
          </div>
          </div>

          {/* Bottom Text */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-base md:text-lg text-white gta-body enhanced-text-visibility">
              Be among the first 300 pre-orders to secure your exclusive collector's countdown clock. 
              Limited availability – only <span className="font-bold text-yellow-300">{timeLeft.days} days</span> before the GTA VI release!
            </p>
            {/* Trust Indicators */}
            <div className="text-center">
              <p className="text-sm text-white gta-secondary enhanced-text-visibility">
                Premium collectible • Limited edition • Worldwide shipping • 30-day guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </BackgroundSlideshow>
  );
}

export default App;