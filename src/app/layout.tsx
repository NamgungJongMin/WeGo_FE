import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/globals.css';
import { MswComponent } from '@/mocks/msw.component';
import QueryProviders from '@/providers/QueryProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import MainNavigation from '@/components/nav/MainNavigation';
import ZustandProvider from '@/providers/ZustandProvider';
import Header from '@/components/header/Header';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

declare global {
  interface Window {
    Kakao: any;
  }
}

export const metadata: Metadata = {
  title: "WE'GO",
  description:
    "여러 사람들과 함께 떠나는 여행. WE'GO와 함께 다양한 여행모임을 만나보세요",
  icons: {
    icon: '/favicon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

if (
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_MODE === 'mock' &&
  process.env.NEXT_RUNTIME === 'nodejs'
) {
  const { server } = await import('@/mocks/server');
  server.listen();
}

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} antialiased`}>
        <MswComponent />
        <QueryProviders>
          <ZustandProvider>
            <Header />
            <MainNavigation />
            {children}
          </ZustandProvider>
        </QueryProviders>
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
