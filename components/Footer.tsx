import React from 'react';
import {Box, Container, Typography, Link} from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 4,
                backgroundColor: 'primary.secondary',
                color: 'white',
                textAlign: 'center',
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body2" color="text.secondary" align="center">
                    © {new Date().getFullYear()} Ernest's Portfolio - Ernest W.
                </Typography>
            </Container>
        </Box>
    )
};

export default Footer;