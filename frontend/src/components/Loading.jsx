const Loading = () => {
  return (
    <div style={{ 
      display: 'flex', // Usa flexbox
      justifyContent: 'center', // Centra horizontalmente
      alignItems: 'center', // Centra verticalmente
      height: '100vh', // Altura total de la ventana
    }}>
      <div style={{ 
        width: '75px', 
        height: '75px', 
        border: '5px solid #f3f3f3', 
        borderTop: '5px solid #3498db', 
        borderRadius: '50%', 
        animation: 'spin 2s linear infinite',
      }}>
      </div>
    </div>
  );
};

export default Loading;
