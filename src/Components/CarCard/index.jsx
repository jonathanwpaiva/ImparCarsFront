import './style.css'
import DeleteIcon from '../../Assets/Imgs/Icon-trash.png'
import EditIcon from '../../Assets/Imgs/Icon-edit.png'

const CarCard = (props) => {
    
    const id = props.id;
    const name = props.name;
    const status = props.status;
    const base64 = props.base64  

    const openEditModal = () => {
        props.openEditModal(id)
    }

    const openDeleteModal = () => {                    
        props.openDeleteModal(id)
    }

    const imgSrc = `data:image/jpeg;base64,${base64}`;  

    return (
        <div className='carCard'>
            <div className='carCardTopContent'>
                <img src={imgSrc} alt={id}></img>
                <h4>{name}</h4>                
            </div>
            <div className='horizontalLine'></div>
            <div className='carCardBottomContent'>
                {status}
            </div>
            <div className='carCardOptions'>

                <div className='carCardDelete' onClick={openDeleteModal}>
                    <img src={DeleteIcon} alt='delete ' /> Excluir
                </div>
                <div className='verticalLine'></div>
                <div className='carCardEdit' onClick={openEditModal}>
                    <img src={EditIcon} alt='edit' /> Editar
                </div>
            </div>
        </div>
    )
}

export default CarCard