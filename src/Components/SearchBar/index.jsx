import './style.css'
import SearchIcon from '../../Assets/Imgs/lupa.png'
import { useState } from 'react';

const SearchBar = (props) => {
    const [searchContent, setSearchContent] = useState('');

    const handleSearchContent = (e) => {
        setSearchContent(e.target.value)
        console.log('teste ', searchContent) 
    }

    const filter = () => {
        props.filterCars(searchContent)
    }

    return (
        <div className='search'>            
            <input
                type='text'
                id='input-content'
                placeholder='Digite aqui sua busca...'
                value={searchContent}
                onChange={handleSearchContent}
            />
            <div className='searchButton' onClick={filter}>
                <img
                    src={SearchIcon}
                    alt='search'
                />
            </div>
        </div>
    )
}

export default SearchBar