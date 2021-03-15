import React, { useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import CloseIcon from '@material-ui/icons/Close';
import bannerImage from '../../assets/images/banner.jpg';
import './Modal.css'

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };


  return (
    <>
      {showModal ? (
        <div className="Background" onClick={closeModal} ref={modalRef}>

          <animated.div className="animated" style={animation}>
            
            <div className="ModalWrapper" showModal={showModal}>
              <div className="ModalImg" src={bannerImage} alt='banner' />
              
              <div className="ModalContent">
                <h1>Are you ready?</h1>
                <p>Get exclusive access to our next launch.</p>
                <button>Join Now</button>
              </div>

              <CloseIcon 
                className="CloseModalButton"
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}              
              />
            </div>
          
          </animated.div>
        
        </div>
      ) : null}
        <div className="">
          <button onClick={() => setShowModal(true)}>Show Modal</button>
        </div>      
    </>
  );
};

export default Modal;

