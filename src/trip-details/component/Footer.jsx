import React from 'react'
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { motion } from 'framer-motion'

function Footer() {
  return (
    <motion.footer
      className="bg-gray-900 text-white py-8 sm:py-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6 sm:space-y-8">
          <h2 className="text-xl sm:text-2xl font-bold">
            Crafted  with{' '}
            <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text  text-gray-300">
            ♥
            </span>
          </h2>

          <div className="flex items-center gap-6 sm:gap-8">
            <motion.a
              href="https://github.com/ashu-1403"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transform hover:scale-110 transition-all duration-300"
              aria-label="GitHub"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FaGithub className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/YourLinkedInUsername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transform hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FaLinkedin className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="https://www.instagram.com/a.shugupta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transform hover:scale-110 transition-all duration-300"
              aria-label="Instagram"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <FaInstagram className="w-6 h-6" />
            </motion.a>

            <motion.a
              href="mailto:ashugupta1403@gmail.com"
              className="text-gray-400 hover:text-primary transform hover:scale-110 transition-all duration-300"
              aria-label="Email"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <FaEnvelope className="w-6 h-6" />
            </motion.a>
          </div>

          <motion.p
            className="text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            © {new Date().getFullYear()} All rights reserved.
          </motion.p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer