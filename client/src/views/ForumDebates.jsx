import Header from '../components/Header.jsx'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import CreateDebateModal from '../components/CreateDebateModal.jsx'
import '../style/ForumDebates.css'
import { AuthContext } from '../context/AuthContext.jsx';
import SERVER_URL from '../config.js'

export default function ForumDebates() {
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const [createDebateModal, setCreateDebateModal] = useState(false);

    const [debates, setDebates] = useState([]);
    const [title, setTitle] = useState('');

    const { authenticatedUser } = useContext(AuthContext);

    const toggleCreateDebateModal = () => {
        setCreateDebateModal((prev) => !prev);
    }

    const getDebates = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/debates/categories/${categoryId}`, { withCredentials: true })
            setDebates(response.data);
        } catch (error) {
            console.log('Error fetching debates: ', error);
        }
    }

    const createDebate = async (debateTitle) => {
        const titleToSend = debateTitle || title;
        if (!titleToSend || !titleToSend.trim()) {
            return;
        }

        try {
            await axios.post(`${SERVER_URL}/debates`,
                {
                    title: titleToSend.trim(),
                    category: {
                        id: categoryId
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    withCredentials: true
                });
            setTitle('');
            await getDebates();
        } catch (error) {
            console.log('Error creating debate: ', error);
            throw error;
        }
    }

    useEffect(() => {
        getDebates()
    }, []);

    return (
        <>
            <Header />
            <div id='debatesMainDiv'>
                <div id='debatesDiv'>
                    {
                        debates.map((debate) => {
                            return (
                                <div key={debate.id} className='debateDiv' onClick={() => navigate(`/forum/categories/${categoryId}/${debate.id}`)}>
                                    <p id='debateText'>{debate.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div id='createDebateButtonDiv'>
                    {(authenticatedUser?.isCoach) &&
                        (
                            <button className='createDebateButton' onClick={toggleCreateDebateModal}>NUEVO DEBATE</button>
                        )
                    }
                </div>
            </div >
            {(createDebateModal) &&
                (
                    <CreateDebateModal
                        createDebate={createDebate}
                        onClose={toggleCreateDebateModal}
                        setTitle={setTitle}
                    />
                )
            }
        </>
    )
}