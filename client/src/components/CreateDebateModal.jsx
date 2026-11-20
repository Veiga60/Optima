import { useState } from 'react';
import '../style/CreateDebateModal.css'

export default function CreateDebateModal({ createDebate, onClose, setTitle: setParentTitle }) {
    const [modalTitle, setModalTitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setModalTitle(e.target.value);
        if (setParentTitle) {
            setParentTitle(e.target.value);
        }
    };

    const handleCreate = async () => {
        if (!modalTitle.trim()) {
            setErrorMessage('Por favor, introduce un título para el debate.');
            return;
        }

        try {
            setIsSubmitting(true);
            setErrorMessage('');
            await createDebate(modalTitle);
            onClose();
        } catch (error) {
            if (error.response?.status === 409) {
                setErrorMessage('Ya existe un debate con este título.');
            } else if (error.response?.status === 403) {
                setErrorMessage('No tienes permisos de entrenador para crear debates.');
            } else {
                setErrorMessage('Error al crear el debate. Inténtalo de nuevo.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div id='createDebateModalMainDiv'>
                <div id='createDebateMainDiv'>
                    <div id='createDebate'>
                        <p id='createDebateText'>NUEVO DEBATE</p>
                    </div>
                    <div id='createDebateInputDiv'>
                        <input
                            className='createDebateInput'
                            type="text"
                            placeholder='Título'
                            id="debateTitle"
                            value={modalTitle}
                            onChange={handleChange}
                            disabled={isSubmitting}
                        />
                    </div>
                    {errorMessage && (
                        <p style={{ color: '#ff4d4f', fontSize: '0.85rem', margin: '5px 0', textAlign: 'center' }}>
                            {errorMessage}
                        </p>
                    )}
                    <div id='createDebateButtonsDiv'>
                        <button
                            className='createDebateModalButton'
                            onClick={handleCreate}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'CREANDO...' : 'CREAR'}
                        </button>
                        <button
                            className='createDebateModalButton'
                            onClick={() => onClose()}
                            disabled={isSubmitting}
                        >
                            CERRAR
                        </button>
                    </div>
                </div>
            </div >
        </>
    )
}