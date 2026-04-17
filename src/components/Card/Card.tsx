import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface PropsHeader {
  title: string;
  subtitle?: string;
}

export const Card = ({ children }: Props) => (
  <div
    style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      maxWidth: '300px',
    }}
  >
    {children}
  </div>
);

export const CardHeader = ({ title, subtitle }: PropsHeader) => (
  <header style={{ border: '1px solid #ddd', marginBottom: '12px' }}>
    <h2>{title}</h2>
    {subtitle && <p style={{ color: '#666' }}>{subtitle}</p>}
  </header>
);

export const CardBody = ({ children }: Props) => (
  <main style={{ padding: '10px 0' }}>{children}</main>
);

export const CardFooter = ({ children }: Props) => (
  <main style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
    {children}
  </main>
);
