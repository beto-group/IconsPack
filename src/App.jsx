const { findNearestAncestorWithClass, findDirectChildByClass } = await dc.require(dc.resolvePath("ICONS PACK/src/utils/domUtils.js"));
const { PreviewPanel } = await dc.require(dc.resolvePath("ICONS PACK/src/components/PreviewPanel.jsx"));
const { BrowserPanel } = await dc.require(dc.resolvePath("ICONS PACK/src/components/BrowserPanel.jsx"));

function App(props) {
  const { dc } = props;
  const { useState, useRef, useEffect } = dc;

  const [iconName, setIconName] = useState('search');
  const [size, setSize] = useState(48);
  const [isFullTab, setIsFullTab] = useState(true);
  const containerRef = useRef(null);
  const stateRefs = useRef({}).current;
  const instanceId = useRef(Math.random().toString(36).substr(2, 5)).current;
  const uniqueWrapperClass = "iconpack-fulltab-" + instanceId;

  // Suppress iframe console errors
  useEffect(() => {
    const originalError = console.error;
    const originalWarn = console.warn;
    
    console.error = (...args) => {
      const message = args[0]?.toString() || '';
      if (message.includes('currentColor') || 
          message.includes('cross-origin') || 
          message.includes('autofocus')) {
        return;
      }
      originalError.apply(console, args);
    };
    
    console.warn = (...args) => {
      const message = args[0]?.toString() || '';
      if (message.includes('currentColor') || 
          message.includes('cross-origin') || 
          message.includes('autofocus')) {
        return;
      }
      originalWarn.apply(console, args);
    };
    
    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  // Full-tab effect (Header-Safe FullTab standard)
  useEffect(() => {
    if (!isFullTab) return;

    const container = containerRef.current;
    if (!container) return;

    // 1. Locate nearest leaf content wrapper
    const leaf = container.closest('.workspace-leaf-content');
    if (!leaf) return;

    // 2. Select the view-content container below the header
    const contentWrapper = leaf.querySelector(':scope > .view-content') || leaf;
    const currentParent = container.parentNode;
    if (!currentParent) return;

    // 3. Setup placeholder in standard DOM layout
    stateRefs.originalParent = currentParent;
    const placeholder = document.createElement("div");
    placeholder.style.display = "none";
    if (container.nextSibling) {
      currentParent.insertBefore(placeholder, container.nextSibling);
    } else {
      currentParent.appendChild(placeholder);
    }
    stateRefs.placeholder = placeholder;

    // 4. Inject impeccable status bar suppression stylesheet
    const styleId = `icons-pack-status-${instanceId}`;
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.innerHTML = `
        /* Hide global status bar and view footers */
        .status-bar, .view-footer, .workspace-leaf-content-footer { 
            display: none !important; 
        }
        
        /* Expand workspace-leaf-content to edge-to-edge container */
        .workspace-leaf-content { 
            padding: 0 !important; 
            margin: 0 !important; 
            border-radius: 0 !important; 
        }
      `;
      document.head.appendChild(styleEl);
    }

    stateRefs.parentPositionInfo = {
      element: contentWrapper,
      originalInlinePosition: contentWrapper.style.position,
    };

    if (window.getComputedStyle(contentWrapper).position === 'static') {
      contentWrapper.style.position = "relative";
    }

    // 5. Append component to view-content
    contentWrapper.appendChild(container);

    requestAnimationFrame(() => {
      Object.assign(contentWrapper.style, {
        padding: "0",
        margin: "0",
        height: "100%",
        width: "100%",
        display: "block",
        overflow: "hidden"
      });
    });

    Object.assign(container.style, {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      zIndex: "9998",
      overflow: "hidden",
      backgroundColor: "#000000",
    });

    // 6. Graceful cleanup on unmount or fulltab minimize toggle
    return () => {
      if (stateRefs.placeholder?.parentNode) {
        stateRefs.placeholder.parentNode.replaceChild(container, stateRefs.placeholder);
      } else if (stateRefs.originalParent) {
        stateRefs.originalParent.appendChild(container);
      }

      const el = document.getElementById(styleId);
      if (el) el.remove();

      if (stateRefs.parentPositionInfo?.element) {
        const { element, originalInlinePosition } = stateRefs.parentPositionInfo;
        element.style.position = originalInlinePosition || '';
        element.style.padding = '';
        element.style.margin = '';
        element.style.height = '';
        element.style.width = '';
        element.style.overflow = '';
      }

      container.removeAttribute("style");
    };
  }, [isFullTab]);

  const sizes = [
    { label: 'Small (24px)', value: 24 },
    { label: 'Medium (48px)', value: 48 },
    { label: 'Large (72px)', value: 72 },
    { label: 'XL (96px)', value: 96 }
  ];

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <style>{`
        .${uniqueWrapperClass}:hover .subtle-icon {
          opacity: 1;
          transform: scale(1);
        }
        .iconspack-preview-icon svg.svg-icon {
          width: var(--icon-size, 24px);
          height: var(--icon-size, 24px);
        }
        .iconspack-input:focus {
          outline: none;
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.1);
        }
        .iconspack-button:hover {
          background-color: rgba(139, 92, 246, 0.2);
          border-color: rgba(139, 92, 246, 0.4);
        }
      `}</style>
      {isFullTab ? (
        <div style={{
          display: 'flex',
          gap: '20px',
          height: '100%',
          boxSizing: 'border-box',
          fontFamily: 'monospace',
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: '24px',
          position: 'relative'
        }} className={uniqueWrapperClass}>
          {/* Exit Full Tab Icon */}
          <div style={{
            position: "absolute", 
            top: "24px", 
            right: "24px", 
            fontFamily: "monospace",
            fontSize: "14px", 
            color: "#8b5cf6", 
            userSelect: "none",
            cursor: "pointer", 
            opacity: 0.6, 
            transform: "scale(0.95)",
            transition: "opacity 0.2s, transform 0.2s", 
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 12px",
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            borderRadius: "6px"
          }} 
          className="subtle-icon" 
          title="Exit Full Tab" 
          onClick={() => setIsFullTab(false)}>
            {dc && <dc.Icon icon="minimize-2" style={{ width: '16px', height: '16px', color: '#8b5cf6' }} />}
            <span>Exit Full Tab</span>
          </div>

          {/* Left Panel */}
          <PreviewPanel
            dc={dc}
            iconName={iconName}
            setIconName={setIconName}
            size={size}
            setSize={setSize}
            sizes={sizes}
          />

          {/* Right Panel */}
          <BrowserPanel dc={dc} />
        </div>
      ) : (
        // Compact mode
        <div style={{
          padding: "24px", 
          boxSizing: "border-box", 
          display: "flex",
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center",
          gap: "16px", 
          border: "1px solid rgba(139, 92, 246, 0.2)",
          borderRadius: "12px", 
          backgroundColor: "#0a0a0a"
        }}>
          {dc && <dc.Icon icon="package" style={{ width: '48px', height: '48px', color: '#8b5cf6' }} />}
          <p style={{ margin: 0, color: "#666", fontSize: "14px", fontFamily: "monospace" }}>Component is in compact mode.</p>
          <button style={{
            padding: '10px 20px', 
            fontSize: '13px', 
            fontWeight: '600', 
            color: '#ffffff',
            backgroundColor: 'rgba(139, 92, 246, 0.2)', 
            border: '1px solid rgba(139, 92, 246, 0.3)', 
            borderRadius: '8px', 
            cursor: 'pointer',
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }} 
          onClick={() => setIsFullTab(true)}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.3)';
            e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(139, 92, 246, 0.2)';
            e.target.style.borderColor = 'rgba(139, 92, 246, 0.3)';
          }}>
            {dc && <dc.Icon icon="maximize-2" style={{ width: '16px', height: '16px', color: '#ffffff' }} />}
            Enter Full Tab
          </button>
        </div>
      )}
    </div>
  );
}

return { App };
