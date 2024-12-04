// import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function FooterDetails() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        

        <div>
         
          
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Way to Grow ! 
              </h6>
              <p>
                Najlepsza aplikacja do szybkiego tworzenia Twoich planów !
              </p>
              <>Your Way To GROW !</>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Nasze mozliwości</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Plan treningów do maratonu
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Plan rozwoju ściezki kariery
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                 Plan nauki języka obcego
                </a>
              </p>
              
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Uzyteczne linki</h6>
              
              <p>
                <a href='#!' className='text-reset'>
                  Pomoc
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
               contact@WayToGrow.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright: 
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
           WayToGrow
        </a>
      </div>
    </MDBFooter>
  );
}