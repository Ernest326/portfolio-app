// src/components/AboutSection.tsx
import React, { useRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { motion, useInView } from 'framer-motion'; // Import motion and useInView



const AboutSection: React.FC = () => {
  const sectionRef = useRef(null);
  // Animate when 30% of the section is in view, only once
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <Box
      component={motion.section} // Use motion.section for semantic HTML
      ref={sectionRef}
      sx={{ py: 8, my: 4 }}
      initial={{ opacity: 0, y: 50 }} // Initial state: invisible and slightly down
      animate={isInView ? { opacity: 1, y: 0 } : {}} // Animate to: visible and original position
      transition={{ duration: 0.8, ease: "easeOut" }} // Animation timing
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
        }}
      >
        <Typography variant="h3" component="h2" gutterBottom sx={{ color: 'primary.main', mb: 4}}>
          A Little About Me
        </Typography>
        <Typography variant="body1" paragraph>
          I am a Software Engineering & Computer Science student studying at Maynooth Univeristy. <br/><br/>
          Ever since I was a child I have always been fascinated by the world around me and how everything works <br/><br/>
          I have a huge passion for technology, programming and electronics and I love to explore and learn new things!<br/>
          Other then programming I also have other hobbies such as art, music, engineering, working out, chess and gaming<br/>
        </Typography>

      </Paper>
    </Box>
  );
};

export default AboutSection;