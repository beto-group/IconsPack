function PreviewPanel({ dc, iconName, setIconName, size, setSize, sizes }) {
  return (
    <div style={{
      width: '380px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      backgroundColor: '#0a0a0a',
      padding: '24px',
      borderRadius: '12px',
      border: '1px solid rgba(139, 92, 246, 0.1)',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)'
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
        {dc && <dc.Icon icon="eye" style={{ width: '20px', height: '20px', color: '#8b5cf6' }} />}
        Icon Preview
      </h2>
      <div 
        className="icon-preview-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          padding: '60px',
          borderRadius: '12px',
          minHeight: '200px',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          boxShadow: '0 0 40px rgba(139, 92, 246, 0.1) inset'
        }}
      >
        <span 
          className="iconspack-preview-icon"
          style={{
            '--icon-size': `${size}px`,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8b5cf6'
          }}
        >
          {dc && <dc.Icon icon={iconName} />}
        </span>
      </div>

      <div>
        <label style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '8px',
          marginBottom: '10px', 
          fontWeight: '600',
          color: '#e0e0e0',
          fontSize: '14px'
        }}>
          {dc && <dc.Icon icon="tag" style={{ width: '16px', height: '16px', color: '#8b5cf6' }} />}
          Icon Name:
        </label>
        <input
          type="text"
          value={iconName}
          onChange={(e) => setIconName(e.target.value)}
          placeholder="Enter icon name..."
          className="iconspack-input"
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid rgba(139, 92, 246, 0.2)',
            backgroundColor: '#000000',
            color: '#ffffff',
            fontSize: '14px',
            boxSizing: 'border-box',
            fontFamily: 'monospace',
            transition: 'all 0.2s ease'
          }}
        />
      </div>
      <div>
        <label style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '8px',
          marginBottom: '10px', 
          fontWeight: '600',
          color: '#e0e0e0',
          fontSize: '14px'
        }}>
          {dc && <dc.Icon icon="move" style={{ width: '16px', height: '16px', color: '#8b5cf6' }} />}
          Size:
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sizes.map(s => (
            <label key={s.value} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              cursor: 'pointer',
              padding: '10px',
              backgroundColor: size === s.value ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
              border: '1px solid',
              borderColor: size === s.value ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.1)',
              borderRadius: '6px',
              transition: 'all 0.2s ease'
            }}>
              <input
                type="radio"
                value={s.value}
                checked={size === s.value}
                onChange={() => setSize(s.value)}
                style={{ marginRight: '10px', accentColor: '#8b5cf6' }}
              />
              <span style={{ color: size === s.value ? '#8b5cf6' : '#e0e0e0' }}>{s.label}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '8px',
          marginBottom: '10px', 
          fontWeight: '600',
          color: '#e0e0e0',
          fontSize: '14px'
        }}>
          {dc && <dc.Icon icon="code" style={{ width: '16px', height: '16px', color: '#8b5cf6' }} />}
          Usage:
        </label>
        <div style={{
          backgroundColor: '#000000',
          padding: '16px',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '12px',
          lineHeight: '1.8',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          overflow: 'auto'
        }}>
          <div style={{ color: '#569cd6' }}>{'<span'}</div>
          <div style={{ marginLeft: '20px' }}>
            <span style={{ color: '#9cdcfe' }}>className</span>
            <span style={{ color: '#d4d4d4' }}>="</span>
            <span style={{ color: '#ce9178' }}>custom-icon</span>
            <span style={{ color: '#d4d4d4' }}>"</span>
          </div>
          <div style={{ marginLeft: '20px' }}>
            <span style={{ color: '#9cdcfe' }}>style</span>
            <span style={{ color: '#d4d4d4' }}>=&#123;&#123; </span>
            <span style={{ color: '#ce9178' }}>'--icon-size'</span>
            <span style={{ color: '#d4d4d4' }}>: </span>
            <span style={{ color: '#ce9178' }}>'{size}px'</span>
            <span style={{ color: '#d4d4d4' }}> &#125;&#125;</span>
          </div>
          <div style={{ color: '#569cd6' }}>{'>'}</div>
          <div style={{ marginLeft: '20px' }}>
            <span style={{ color: '#569cd6' }}>{'<dc.Icon'}</span>
            <span style={{ color: '#d4d4d4' }}> </span>
            <span style={{ color: '#9cdcfe' }}>icon</span>
            <span style={{ color: '#d4d4d4' }}>="</span>
            <span style={{ color: '#ce9178' }}>{iconName}</span>
            <span style={{ color: '#d4d4d4' }}>" </span>
            <span style={{ color: '#569cd6' }}>{'/>'}</span>
          </div>
          <div style={{ color: '#569cd6' }}>{'</span>'}</div>
        </div>
      </div>
      <div>
        <label style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '8px',
          marginBottom: '10px', 
          fontWeight: '600',
          color: '#e0e0e0',
          fontSize: '14px'
        }}>
          {dc && <dc.Icon icon="zap" style={{ width: '16px', height: '16px', color: '#8b5cf6' }} />}
          Quick Examples:
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['search', 'home', 'star', 'heart', 'settings', 'user', 'file', 'folder', 'bell', 'bookmark', 'calendar', 'check'].map(name => (
            <button
              key={name}
              onClick={() => setIconName(name)}
              className="iconspack-button"
              style={{
                padding: '8px 14px',
                backgroundColor: iconName === name ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.05)',
                color: iconName === name ? '#8b5cf6' : '#e0e0e0',
                border: '1px solid',
                borderColor: iconName === name ? 'rgba(139, 92, 246, 0.4)' : 'rgba(139, 92, 246, 0.1)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: 'monospace',
                transition: 'all 0.2s ease',
                fontWeight: iconName === name ? '600' : '400'
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

return { PreviewPanel };
