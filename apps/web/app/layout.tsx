import './globals.css';

export const metadata = {
  title: 'GoldMine Admin',
  description: 'Premium earnings dashboard for workers and revenue oversight',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
