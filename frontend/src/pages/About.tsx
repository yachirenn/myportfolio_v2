import { motion } from 'motion/react'
import TextPressure from '../components/ui/TextPressure'

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-[#F6F7ED] px-6 sm:px-16 md:px-32 pt-32">
      <div className="flex h-145 gap-10 items-start">
        
        {/* ===== KIRI: FOTO ===== */}
        <div className="flex h-full">
          <div className="w-98 rounded-2xl overflow-hidden border-2 border-black/10 shadow-lg">
            <img 
              src="/assets/guwelagi.webp" 
              alt="Rendy" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* ===== KANAN: TEXT ===== */}
        <div className="flex flex-col gap-6">
          
          {/* TextPressure - height disesuaikan */}
          <div className="relative w-full">
            <TextPressure
              text="helloooow!"
              fontFamily="Compressa VF"
              fontUrl="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2"
              flex={false}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#2c1810"
              strokeColor="#ff0000"
              minFontSize={18}
            />
          </div>

          {/* Paragraphs */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-[#5c4a3a] leading-relaxed"
          >
            I'm <span className="font-bold text-black">Rendy</span> — a Web Developer 
            and Creative Content Creator based in Indonesia. I dedicate myself to building 
            digital spaces that are not just functional, but possess a distinct soul.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base text-[#5c4a3a] leading-relaxed"
          >
            My creative direction is inspired by 
            <span className="font-semibold text-black"> Japanese culture</span>, 
            <span className="font-semibold text-black"> anime</span>, and 
            <span className="font-semibold text-black"> J-Pop/J-Rock music</span>.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-base text-[#5c4a3a] leading-relaxed"
          >
            Currently seeking 
            <span className="font-bold text-black"> Freelance, Internship, and Collaborative 
            opportunities</span>. Let's connect and build something meaningful together!
          </motion.p>

          {/* Status badges */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <span className="px-3 py-1.5 bg-[#2c1810] text-[#f5e6d3] text-xs font-medium rounded-full">
              🇯🇵 Freelance Web Dev
            </span>
            <span className="px-3 py-1.5 bg-black/5 text-black text-xs font-medium rounded-full border border-black/10">
              🎌 Japan Enthusiast
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}