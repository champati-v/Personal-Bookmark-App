import * as React from 'react';

interface EmailTemplateProps {
  username: string;
  loginUrl: string;
}

export function EmailTemplate({ username, loginUrl }: EmailTemplateProps) {
  return (
    <div
      style={{
        margin: 0,
        padding: '32px 0',
        backgroundColor: '#f5f5f5',
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid #e5e7eb',
        }}
      >
        <p
          style={{
            margin: '0 0 16px',
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#6b7280',
          }}
        >
          Bookmark Manager
        </p>
        <h1
          style={{
            margin: '0 0 16px',
            fontSize: '28px',
            lineHeight: 1.2,
            color: '#111827',
          }}
        >
          Welcome, {username}
        </h1>
        <p
          style={{
            margin: '0 0 24px',
            fontSize: '16px',
            lineHeight: 1.7,
            color: '#4b5563',
          }}
        >
          Your Bookmark Manager account is ready. Start saving links, organizing
          your favorites, and building your personal collection in one place.
        </p>
        <a
          href={loginUrl}
          style={{
            display: 'inline-block',
            backgroundColor: '#111827',
            color: '#ffffff',
            textDecoration: 'none',
            padding: '12px 20px',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Open Bookmark Manager
        </a>
        <p
          style={{
            margin: '24px 0 0',
            fontSize: '13px',
            lineHeight: 1.6,
            color: '#6b7280',
          }}
        >
          If the button does not work, copy and paste this link into your browser:
          <br />
          <a href={loginUrl} style={{ color: '#111827' }}>
            {loginUrl}
          </a>
        </p>
      </div>
    </div>
  );
}