import './styles.css'
export const EnlargedImage = ({ onClose }) => {
    return (
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
        onClick={onClose}
      >

            <div 
            id="enlarged-mermaid-chart" 
            className="mermaid" 
            style={{ 
            width: '95%', 
            height: '95%', 
            backgroundColor: 'white',
            padding: '10px',
            // boxSizing: 'border-box',
            overflow: 'auto', // Changed from 'hidden' to 'auto'
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }} ></div>
      </div>
    );
  }