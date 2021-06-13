import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import Modal from 'react-modal'
import StripeForm from './StripeForm3'

const Header1 = styled.div`
  font-size: 17px;
	color: #FFFFFF;
	justify-content: center;
	border-bottom: solid 0.5px #FFFFFFF;
`

const customStyles2 = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '300px',
		backgroundColor			:	'#282828',
  }
}

export default function StripeModal({closeModal, modalIsOpen}){
  return (
    <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles2}
          contentLabel="Example Modal"
        >
          <header>
            <Header1>Pay Xport</Header1>
          </header>
          <StripeForm />
        </Modal>
    </div>
  )
}
