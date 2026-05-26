function BrowserPanel({ dc }) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#0a0a0a',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(139, 92, 246, 0.1)',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)'
    }}>
      <div style={{
        padding: '24px',
        borderBottom: '1px solid rgba(139, 92, 246, 0.1)',
        backgroundColor: '#000000'
      }}>
        <h2 style={{ 
          margin: 0,
          color: '#8b5cf6',
          fontWeight: '600',
          fontSize: '20px',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          {dc && <dc.Icon icon="package" style={{ width: '20px', height: '20px', color: '#8b5cf6' }} />}
          Lucide Icons Browser
        </h2>
        <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: '13px' }}>
          Find an icon, copy its name, and paste it in the preview panel
        </p>
      </div>
      <iframe
        src="https://lucide.dev/icons/"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          backgroundColor: '#ffffff',
          borderRadius: '0 0 12px 12px'
        }}
      />
    </div>
  );
}

return { BrowserPanel };
