import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: '똥간은 어디에?',
  description:
    '땀 뻘뻘 흘리며 화장실을 찾던 날들이여, 안녕! 이곳에서는 공용 화장실의 위치를 빠르게 찾아, 급한 일을 빠르게 해결할 수 있습니다.',
};
declare global {
  interface Window {
    kakao: any;
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        {children}
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
