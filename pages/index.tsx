import { Box, Button, Container, Typography, Stack, Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ py: 10 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={6}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Text Content */}
        <Box flex={1}>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Hey, I'm Ernest 👋
          </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
          <Typography variant="h5" color="text.secondary" gutterBottom>
            I’m a Computer Science student currently studying at Maynooth University
          </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
          <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
            This website is currently in development however feel free to check out my projects or contact me if you have any questions.
          </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => router.push('/projects')}>
              View Projects
            </Button>
            <Button variant="outlined" onClick={() => router.push('/#contact')}>
              Contact Me
            </Button>
          </Stack>
          </motion.div>
        </Box>

        {/* Optional Avatar */}
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
        >
        <Avatar
          alt="Ernest"
          src="/profile.jpg" // <- put your image in /public/profile.jpg
          sx={{
            width: { xs: 120, md: 180 },
            height: { xs: 120, md: 180 },
            boxShadow: 4,
            border: '4px solid',
            borderColor: 'background.paper',
          }}
        />
        </motion.div>
      </Stack>

      <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
      >
      <Typography variant="body1" sx={{ mt: 10, mb: 2}}> 
            I am a student currently studying "Computer Science and Software Engineering" at Maynooth University Ireland
      </Typography>      
      <Typography sx={{ mb: 2}}>     
            I am a hobbyist with a wide range of passions mainly in technology, programming, Artificial Intelligence and Virtual Reality
      </Typography>
      <Typography sx={{ mb: 2}}>
            I love to explore new things and I am always eager to look for new opportunities and learn new things!
      </Typography>
      <Typography sx={{ mb: 2}}>
            Ever since I was young I have always been fascinated by technology and I always loved to explore new things and learn
            how everything works. Nowadays I love to dabble in a bit of everything and love working on new projects
      </Typography>
      <Typography>
            My hobbies include programming, art, electronics, modelling, 3D printing, gaming, music, playing guitar, working out, and spending time with friends.
      </Typography>
      </motion.div>
    </Container>
  );
}