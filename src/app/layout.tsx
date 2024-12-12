import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/globals.css';
import { MswComponent } from '@/mocks/msw.component';
import QueryProviders from '@/utils/queryProvider';
import { SpeedInsights } from '@vercel/speed-insights/next';
import MainHeader from '@/components/header/MainHeader';
import MainNavigation from '@/components/nav/MainNavigation';
import ZustandProvider from '@/providers/ZustandProvider';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: "WE'GO",
  description:
    "여러 사람들과 함께 떠나는 여행. WE'GO와 함께 다양한 여행모임을 만나보세요",
  icons: {
    icon: '/favicon.png',
  },
};

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
            <MainHeader />
            {children}
            <MainNavigation />
          </ZustandProvider>
        </QueryProviders>
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
