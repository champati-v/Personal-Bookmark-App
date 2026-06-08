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
        padding: '32px 16px',
        backgroundColor: '#f7faf8',
        backgroundImage:
          'radial-gradient(circle at top, rgba(200, 242, 223, 0.9) 0%, rgba(239, 250, 244, 0.6) 28%, rgba(247, 251, 255, 0) 62%)',
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '8px 14px',
              borderRadius: '999px',
              border: '1px solid #b7e7cf',
              backgroundColor: '#ffffff',
              color: '#0f5132',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
            }}
          >
            Bookmark Workspace
          </span>
        </div>

        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '28px',
            padding: '40px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 24px 60px rgba(15, 23, 42, 0.08)',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              marginBottom: '20px',
              padding: '12px 14px',
              borderRadius: '18px',
              backgroundColor: '#052e2b',
              color: '#ffffff',
              fontSize: '20px',
              lineHeight: 1,
            }}
          >
            &#9733;
          </div>

          <p
            style={{
              margin: '0 0 12px',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#0f766e',
            }}
          >
            Welcome aboard
          </p>

          <h1
            style={{
              margin: '0 0 16px',
              fontSize: '32px',
              lineHeight: 1.15,
              letterSpacing: '-0.04em',
              color: '#0f172a',
            }}
          >
            Welcome, {username}
          </h1>

          <p
            style={{
              margin: '0 0 28px',
              fontSize: '16px',
              lineHeight: 1.75,
              color: '#475569',
            }}
          >
            Your Bookmark Manager account is ready. Start saving links, organizing
            your favorites, and building your personal collection in one place.
          </p>

          <div
            style={{
              padding: '20px',
              borderRadius: '20px',
              background:
                'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,251,252,1) 100%)',
              border: '1px solid #e2e8f0',
              marginBottom: '28px',
            }}
          >
            <p
              style={{
                margin: '0 0 8px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#0f172a',
              }}
            >
              Your workspace is ready
            </p>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                lineHeight: 1.7,
                color: '#64748b',
              }}
            >
              Keep private research organized, publish selected links publicly, and
              get back to your saved resources faster.
            </p>
          </div>

          <a
            href={loginUrl}
            style={{
              display: 'inline-block',
              backgroundColor: '#052e2b',
              color: '#ffffff',
              textDecoration: 'none',
              padding: '14px 22px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 600,
              boxShadow: '0 14px 30px rgba(6, 78, 59, 0.2)',
            }}
          >
            Open Bookmark Manager
          </a>

          <div
            style={{
              marginTop: '28px',
              paddingTop: '24px',
              borderTop: '1px solid #e2e8f0',
            }}
          >
            <p
              style={{
                margin: '0 0 10px',
                fontSize: '13px',
                lineHeight: 1.7,
                color: '#64748b',
              }}
            >
              If the button does not work, copy and paste this link into your
              browser:
            </p>
            <a
              href={loginUrl}
              style={{
                color: '#0f172a',
                fontSize: '13px',
                lineHeight: 1.7,
                wordBreak: 'break-all',
              }}
            >
              {loginUrl}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
