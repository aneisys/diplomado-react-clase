import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: Props) => {
  return createPortal(<>
    <div
      style={{
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.7)',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          color: 'black',
        }}
      >
        {children}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  </>,
    document.getElementById('modal-root')! // Portal
  );
};
