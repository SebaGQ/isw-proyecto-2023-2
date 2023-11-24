import React from 'react';
import ReviewsComponent from '../components/reviews/reviews';
// import '../styles/ReviewsComponent.css'; // Asume que tienes estilos específicos para ReviewsComponent

function ReviewsPage() {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '800px' }}> {/* Ajusta el maxWidth según tus necesidades */}
        <ReviewsComponent />
    </div>
    </div>
  );
}

export default ReviewsPage;
