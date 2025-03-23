import { Box, Button, Container, Typography, Stack, Avatar } from '@mui/material';
import { useRouter } from 'next/router';

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
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Heyo, I'm Ernest 👋
          </Typography>

          <Typography variant="h5" color="text.secondary" gutterBottom>
            I’m a Computer Science student currently studying at Maynooth University
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
            This website is currently in development however feel free to check out my projects or contact me if you have any questions.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => router.push('/projects')}>
              View Projects
            </Button>
            <Button variant="outlined" onClick={() => router.push('/#contact')}>
              Contact Me
            </Button>
          </Stack>
        </Box>

        {/* Optional Avatar */}
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
      </Stack>
      <Typography variant="body1" sx={{ mt: 10, mb: 4 }}> 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquam elit eget nisl commodo accumsan. In posuere augue libero, eget placerat tortor ultrices at. Nullam finibus turpis id lacus dapibus finibus et sed nisl. Duis eget mi ex. Proin sed placerat diam. Quisque ullamcorper augue erat. Sed bibendum sagittis mauris, accumsan sollicitudin tellus euismod eget. Maecenas at iaculis nulla.
            
            Etiam at lectus luctus, aliquam magna vitae, tincidunt odio. Pellentesque at iaculis arcu. Etiam quis fermentum augue. Phasellus dignissim dictum dui ac maximus. Cras eu facilisis nibh, sed bibendum justo. Suspendisse feugiat turpis sed lacus tincidunt consectetur. Suspendisse aliquam sagittis leo vitae elementum. Duis elit sem, feugiat porttitor sem sed, viverra lacinia justo.
            
            Vestibulum convallis lorem sed dui finibus, sit amet rhoncus ligula vehicula. In dapibus eros diam, a porta erat auctor id. Maecenas nisi felis, pharetra eu sapien commodo, elementum tempus arcu. Curabitur tincidunt neque a tellus aliquam accumsan. Aliquam non varius odio. Nam at volutpat leo. Morbi at lectus in felis ultrices luctus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus massa lorem, interdum sed dictum eu, tempor a magna. Maecenas efficitur sit amet sem et viverra. Sed quis odio auctor, auctor purus id, euismod metus. Fusce sed laoreet velit, at ullamcorper sapien. Etiam condimentum ultrices justo, non accumsan eros. Vestibulum metus purus, egestas quis ligula ut, lacinia vestibulum mi. Mauris nec mauris eros.
            
            Curabitur et dapibus libero. Vestibulum sit amet nibh convallis quam euismod iaculis. Morbi posuere felis ut nisi elementum egestas. Curabitur id ultrices magna. Donec sit amet sem consequat, aliquam urna in, luctus est. Suspendisse ut scelerisque eros, finibus viverra justo. Aliquam aliquet lacinia odio quis dapibus. In hac habitasse platea dictumst. Praesent non mi semper, sagittis elit in, tempor nisl.
            
            Praesent at neque odio. Nam ultricies purus eget vehicula cursus. Donec dapibus sapien id nibh faucibus aliquam. Maecenas elementum orci nisl, id mollis quam gravida nec. Nunc in porttitor libero, sit amet pretium ligula. In vestibulum lobortis posuere. Proin rhoncus tellus turpis, in hendrerit sapien dignissim a. Integer gravida velit eu felis feugiat, eget imperdiet urna pretium. In sit amet est metus. 
                      </Typography>
    </Container>
  );
}