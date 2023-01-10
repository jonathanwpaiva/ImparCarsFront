import './style.css'
import SearchBar from '../SearchBar'
import CarCard from '../CarCard'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import Button from '../Button';
import Button2 from '../Button2';
import Button3 from '../Button3';
import Button4 from '../Button4';
import Modal from 'react-modal';
import createIcon from '../../Assets/Imgs/icone_criar.png'
import DeleteIcon from '../../Assets/Imgs/Icon-trash@2x.png'

const Content = () => {
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(4);
    const [id, setId] = useState(0);
    const GET_CARS_URL = `https://app-jonathanwillian-api.azurewebsites.net/api/cars/${skip}/${take}`
    const POST_IMAGE_URL = "https://app-jonathanwillian-api.azurewebsites.net/api/uploadimage"
    const POST_CAR_URL = "https://app-jonathanwillian-api.azurewebsites.net/api/car"
    const DELETE_CAR_URL = `https://app-jonathanwillian-api.azurewebsites.net/api/car/${id}`
    const UPDATE_CAR_URL = `https://app-jonathanwillian-api.azurewebsites.net/api/car/${id}`

    const [carsData, setCarsData] = useState([])
    const [file, setFile] = useState();
    const [fileLabel, setFileLabel] = useState('Nenhum arquivo selecionado');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModelOpen] = useState(false)
    const [cardName, setCardName] = useState('');
    const [cardDescription, setCardDescription] = useState('');
    let cardPhoto = ''

    const viewMore = () => {
        const takeLimit = 20
        const maxNumberOfCars = take == takeLimit

        if (!maxNumberOfCars) {
            setTake(take + 4)
            getCars()
            console.log('take ', take)

        }
        else {
            console.log('passou')
            setSkip(skip + 4)
            getCars()
        }
    }

    const getCars = async () => {
        const response = await axios.get(GET_CARS_URL)
        const carsMapped = response.data.map(data => {

            const cars = {
                "id": data.id,
                "name": data.name,
                "status": data.status,
                "base64": data.base64
            }
            return cars
        })
        setCarsData(carsMapped)

    }

    useEffect(() => {
        getCars();
    },[])

    const openCreateModal = (id) => {
        setId(id)
        setIsCreateModalOpen(true)
    }

    const closeCreateModal = () => {
        setId(0)
        setIsCreateModalOpen(false)
    }

    const openEditModal = (id) => {
        setId(id)
        setIsEditModalOpen(true)
    }

    const closeEditModal = () => {
        setId(0)
        setIsEditModalOpen(false)
    }

    const openDeleteModal = (id) => {
        setId(id)
        console.log('id', id)
        setIsDeleteModelOpen(true)
    }

    const closeDeleteModal = () => {
        setId(0)
        setIsDeleteModelOpen(false)
    }

    const fileInput = useRef(null);

    const handleFileClick = () => {
        fileInput.current.click();
    }

    const handleFileChange = (e) => {
        setFileLabel(e.target.files[0].name);
        setFile(e.target.files[0])
    }

    const handleCardName = (e) => {
        setCardName(e.target.value)
    }

    const handleCardDrescription = (e) => {
        setCardDescription(e.target.value)
    }

    const filterCars = (content) => {      
        console.log(carsData) 
        const car = carsData.filter(car => car.name == content)
        
        if(car != undefined){            
            setCarsData(car)
        }                
    }

    const createCard = async () => {
        await postImage()
        await postCard()
    }

    const updateCard = async () => {
        await postImage()
        await postUpdatedCard()
    }

    const postImage = async () => {
        const response = await axios.post(POST_IMAGE_URL, {
            file
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        cardPhoto = response.data
        return response.data
    }

    const postCard = async () => {
        await axios.post(POST_CAR_URL, {
            "name": cardName,
            "status": cardDescription,
            "base64": cardPhoto
        },)
    }

    const deleteCard = async () => {
        await axios.delete(DELETE_CAR_URL)
    }

    const postUpdatedCard = async () => {
        await axios.put(UPDATE_CAR_URL, {
            "name": cardName,
            "status": cardDescription,
            "base64": cardPhoto
        },)
    }

    return (
        <div className='content-container'>
            <div className='background'>
                <div className='search-bar'>
                    <SearchBar                         
                        filterCars={filterCars}
                    />
                </div>
            </div>
            <div className='content-header'>
                <h1>Resultado de busca</h1>
                <Button onClick={() => openCreateModal()}>Novo Card</Button>
            </div>
            <Modal
                isOpen={isCreateModalOpen}
                onRequestClose={closeCreateModal}
                className='create-card-modal'
            >
                <div className='create-card-modal-content-container'>
                    <div className='title'>
                        <img src={createIcon} alt="" />
                        <h1>Criar card</h1>
                    </div>
                    <div className='create-card-horizontal-line'></div>
                    <div className='create-card-modal-input'>
                        <p>DIGITE UM NOME PARA O CARD</p>
                        <input
                            type='text'
                            id='input-content'
                            placeholder='Digite o nome'
                            value={cardName}
                            onChange={handleCardName}
                        />
                    </div>
                    <div className='create-card-modal-input'>
                        <p>DIGITE UMA DESCRIÇÃO PARA O CARD</p>
                        <input
                            type='text'
                            id='input-content'
                            placeholder='Digite a descrição'
                            value={cardDescription}
                            onChange={handleCardDrescription}
                        />
                    </div>
                    <div className='create-card-modal-file'>
                        <p>INCLUA UMA IMAGEM PARA APARECER NO CARD</p>
                        <p for="customFile" class="custom-file-p">
                            {fileLabel}
                            <Button2 onClick={handleFileClick}>Escolher Arquivo</Button2>
                        </p>
                        <input
                            ref={fileInput}
                            id="customFile"
                            type='file'
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className='create-card-horizontal-line'></div>
                    <div className='create-button'>
                        <Button onClick={createCard}>Criar card</Button>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                className='create-card-modal'
            >
                <div className='create-card-modal-content-container'>
                    <div className='title'>
                        <img src={createIcon} alt="" />
                        <h1>Editar card</h1>
                    </div>
                    <div className='create-card-horizontal-line'></div>
                    <div className='create-card-modal-input'>
                        <p>DIGITE UM NOME PARA O CARD</p>
                        <input
                            type='text'
                            id='input-content'
                            placeholder='Digite o nome'
                            value={cardName}
                            onChange={handleCardName}
                        />
                    </div>
                    <div className='create-card-modal-input'>
                        <p>DIGITE UMA DESCRIÇÃO PARA O CARD</p>
                        <input
                            type='text'
                            id='input-content'
                            placeholder='Digite a descrição'
                            value={cardDescription}
                            onChange={handleCardDrescription}
                        />
                    </div>
                    <div className='create-card-modal-file'>
                        <p>INCLUA UMA IMAGEM PARA APARECER NO CARD</p>
                        <p for="customFile" class="custom-file-p">
                            {fileLabel}
                            <Button2 onClick={handleFileClick}>Escolher Arquivo</Button2>
                        </p>
                        <input
                            ref={fileInput}
                            id="customFile"
                            type='file'
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className='create-card-horizontal-line'></div>
                    <div className='create-button'>
                        <Button onClick={updateCard}>Editar card</Button>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={closeDeleteModal}
                className='delete-card-modal'
            >
                <div className='delete-card-modal-content-container'>
                    <div className='delete-card-modal-content'>
                        <img src={DeleteIcon} alt="" />
                        <h1>Excluir</h1>
                        <p>CERTEZA QUE DESEJA EXCLUIR?</p>
                    </div>
                    <div className='delete-card-modal-horizontal-line'></div>
                    <div className='delete-card-modal-buttons'>
                        <Button3 onClick={deleteCard}>Excluir</Button3>
                        <Button4>Cancelar</Button4>
                    </div>
                </div>
            </Modal>
            <div className='content'>
                {carsData.map((data) => (
                    <CarCard
                        id={data.id}
                        name={data.name}
                        status={data.status}
                        base64={data.base64}
                        openEditModal={openEditModal}
                        openDeleteModal={openDeleteModal}
                    />
                ))}
            </div>
            <div className='view-more'>
                <Button onClick={viewMore}>Ver mais...</Button>
            </div>
        </div>
    )
}

export default Content
