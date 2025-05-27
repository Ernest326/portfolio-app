// src/components/TerminalTyper.tsx
import React, { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import { Box, Typography, Button } from '@mui/material'; // Added Button
import { motion } from 'framer-motion';

// Define button styles outside the component for clarity and performance
const terminalButtonStyles = {
  fontFamily: '"Roboto Mono", "SF Mono", "Fira Code", "Courier New", monospace',
  color: '#64ffda', // Neon cyan/green, matching the role line
  fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' }, // Slightly smaller for button feel
  padding: '8px 12px',
  border: '1px solid transparent', // Start transparent
  textTransform: 'none', // Prevent MUI's default uppercase
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out, border-color 0.2s ease-in-out',

};

const TerminalTyper: React.FC = () => {
  const githubUrl = "https://github.com/Ernest326";
  const linkedinUrl = "https://linkedin.com/in/ernest-warzuchowski-63b85b306/";
  const introEl = useRef<HTMLSpanElement>(null);
  const roleEl = useRef<HTMLSpanElement>(null);
  const typedIntroInstance = useRef<Typed | null>(null);
  const typedRoleInstance = useRef<Typed | null>(null);

  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    if (!introEl.current || typedIntroInstance.current) return;
    const introString = `Hello!<br />My name is Ernest.<br />I am a &nbsp`;
    typedIntroInstance.current = new Typed(introEl.current, {
      strings: [introString],
      typeSpeed: 40,
      loop: false,
      contentType: 'html',
      showCursor: true,
      cursorChar: '_',
      onComplete: (self) => {
        setIntroComplete(true);
        self.cursor.remove();
      },
    });
    return () => {
      typedIntroInstance.current?.destroy();
      typedIntroInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!introComplete || !roleEl.current || typedRoleInstance.current) return;
    const roles = ["Hobbyist.", "AI Enthusiast.", "VR Enthusiast.", "Full-Stack Developer.", "Computer Science Student.", "Software Engineer"];
    typedRoleInstance.current = new Typed(roleEl.current, {
      strings: roles,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      startDelay: 100,
      loop: true,
      smartBackspace: true,
      showCursor: true,
      cursorChar: '_',
    });
    return () => {
      typedRoleInstance.current?.destroy();
      typedRoleInstance.current = null;
    };
  }, [introComplete]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Box // The main animated terminal box
        component={motion.div}
        initial={{ scaleX: 0, opacity: 0, width: '70vw' }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        sx={{
          width: { xs: '90vw', sm: '80vw', md: '70vw' },
          maxWidth: '1000px',
          transformOrigin: 'center',
          padding: { xs: '20px', sm: '25px', md: '30px' },
          backgroundColor: 'rgba(10, 25, 47, 0.9)', // Slightly more opaque
          border: '1px solid rgba(100, 255, 218, 0.25)',
          borderRadius: '10px',
          color: '#ccd6f6',
          boxShadow: '0px 15px 35px -15px rgba(2,12,27,0.7)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column', // Children will stack vertically
          minHeight: '450px', // Minimum height for the terminal box
        }}
        position="relative" // For absolute positioning of children
      >
        {/* Typed text area */}
        <Typography
          component="div"
          sx={{
            fontFamily: '"Roboto Mono", "SF Mono", "Fira Code", "Courier New", monospace',
            fontSize: { xs: '0.85rem', sm: '1rem', md: '1.1rem' },
            lineHeight: 1.8,
            textAlign: 'left',
            whiteSpace: 'pre-wrap',
            minHeight: '100px', // Minimum height for the typed lines
            '& .typed-cursor': {
              color: '#64ffda',
              fontWeight: 'bold',
              fontSize: '1.1em',
            },
            '& .role-line-dynamic': {
              color: '#64ffda',
              fontWeight: 'bold',
              fontSize: '1.05em',
            },
          }}
        >
          <span ref={introEl}></span>
          {introComplete && <span ref={roleEl} className="role-line-dynamic"></span>}
        </Typography>

        {/* Static welcome message - appears after intro typing */}
        {introComplete && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }} // Delayed fade-in
          >
            <Typography
              variant="body1"
              sx={{
                mt: 5, // Margin top
                color: '#a8b2d1', // Lighter slate (for secondary text)
                textAlign: 'left',
                fontFamily: '"Roboto Mono", "SF Mono", "Fira Code", "Courier New", monospace',
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
              }}
            >
              Welcome to my personal portfolio!<br/> Feel free to explore my works and to connect with me!
            </Typography>
          </motion.div>
        )}

        {/* Profile image - appears after welcome message */}
        {introComplete && (
            <motion.div
              initial={{ opacity: 0}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }} // Further delay
              style={{ marginTop: 'auto' }} // Pushes image towards the bottom if there's extra space
            >
          <Box sx={{
              mt: 2, // Margin top
              alignItems: 'center',
              position: 'absolute',
              top: '25px',
              right: '50px'
            }}
            >
            <img
              src="profile.jpg"
              alt="Profile"
              style={{
                objectFit: 'cover',
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                boxShadow: '0px 5px 15px rgba(2,12,27,0.5)',
              }}/>
              </Box>
            </motion.div>
        )}

        {/* Buttons - appear after welcome message */}
        {introComplete && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }} // Further delay
            style={{ marginTop: 'auto' }} // Pushes buttons towards the bottom if there's extra space
          >
            <Box
              sx={{
                mt: {xs: 3, md: 4}, // More margin top before buttons
                mb: 3,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center', // Align buttons to the left
                alignItems: { xs: 'stretch', sm: 'center' }, // Stretch on xs for full width feel
                gap: { xs: 1.5, sm: 3 },
              }}
            >
              <Button
                variant="text"
                href="/projects"
                sx={terminalButtonStyles}
              >
                [ VIEW PROJECTS ]
              </Button>
                <Button
                variant="text"
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={terminalButtonStyles}
                startIcon={
                  <img
                  src="https://img.icons8.com/ios11/512/FFFFFF/github.png"
                  alt=""
                  style={{ width: 20, height: 20, marginRight: 4 }}
                  />
                }
                >
                [ VIEW GITHUB ]
                </Button>
                <Button
                variant="text"
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={terminalButtonStyles}
                startIcon={
                  <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1024px-LinkedIn_icon.svg.png"
                  alt=""
                  style={{ width: 20, height: 20, marginRight: 4 }}
                  />
                }
                >
                [ VIEW LINKEDIN ]
                </Button>
                {/* Icon images below the buttons */}

            </Box>
          </motion.div>
        )}
      </Box>
    </Box>
  );
};

export default TerminalTyper;