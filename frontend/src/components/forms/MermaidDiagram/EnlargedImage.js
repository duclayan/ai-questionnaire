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
          width: '70vw',
          height: '70vh',
          background: 'white',
          borderRadius: 12,
          boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 18, fontSize: 28, background: 'none', border: 'none', cursor: 'pointer', color: '#333' }}>✕</button>
        <TransformWrapper ref={wrapperRef} minScale={0.2} initialScale={1} wheel={{ step: 0.1 }} doubleClick={{ disabled: true }}>
          <TransformComponent>
            <div
              className="mermaid"
              style={{
                width: '100%',
                height: '100%',
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
                  minWidth: '100%',
                  minHeight: '100%',
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