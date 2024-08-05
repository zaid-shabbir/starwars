import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Typography } from '@mui/material';
import theme from '../theme';
import styles from "./layout.module.scss";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.layoutContainer}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <div className={styles.layoutChild}>
              <Typography variant="h2" className={styles.starWarsText} textAlign="center">
                Star Wars Holocron
              </Typography>
              {children}
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}