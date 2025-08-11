import { useRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

export const EnlargedImage = ({ chart, onClose }) => {
  const wrapperRef = useRef();
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(30, 41, 59, 0.75)',
        zIndex: 2000,
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '90vw',
          height: '80vh',
          background: 'white',
          borderRadius: 12,
          boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          position: 'relative',
          padding: '24px 2.4px 1.2px 2.4px',
        }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 18, fontSize: 28, background: 'none', border: 'none', cursor: 'pointer', color: '#333' }}>✕</button>
        <h2 style={{ margin: '0 0 4px 0', fontWeight: 700, fontSize: 22, color: '#1e293b', letterSpacing: 0.5, textAlign: 'center' }}>
          Diagram Preview (Interactive)
        </h2>
        <p style={{ margin: '0 0 2px 0', color: '#475569', fontSize: 15, textAlign: 'center', maxWidth: 520 }}>
          <b>Tip:</b> Use your mouse wheel or trackpad to zoom in and out. Click and drag anywhere on the diagram to pan and explore details. For the best view, maximize your browser window.
        </p>
        <TransformWrapper ref={wrapperRef} minScale={0.2} initialScale={0.8} wheel={{ step: 0.1 }} doubleClick={{ disabled: true }}>
          <TransformComponent>
            <div
              className="mermaid"
              style={{
                width: '80vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                overflow: 'auto',
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  minWidth: '80vw',
                  minHeight: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                dangerouslySetInnerHTML={{ __html: chart }}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
};