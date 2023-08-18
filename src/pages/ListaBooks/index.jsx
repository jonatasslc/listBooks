import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ListBooks from '../../components/ListBooks';
import api from '../../services/api';
import styles from './styles.module.css';

const Container = styled.div`
  max-width: 960px;
  margin: 30px auto;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #ccc;
  padding: 10px;
`;

function ListaBooks (){
  const[books, setBooks] = useState([]);
  const[search, setSearch] = useState('');

  useEffect( () => {
      const url = '/books';
      
      const params = {};
      if (search) {
        params.title_like = search

        api.get('/books?_embed=books', {params})
          .then( (response) => {
            // console.log(response)
            setBooks(response.data)
          })

      } else {
        
        api.get(url) // all
        .then( (response) => {
          // console.log(response)
          setBooks(response.data)
        })

      }
  },[search]) 


    return(
          <Container>
        <h1>Minhas Lista de Livros</h1>
        <input 
          className={styles.listaSearchInput}
          type="search" 
          placeholder='Buscar Livros - Digite aqui o Titulo do Livro'
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
        />
        <ListContainer>
          {
            books.map(book => {
              return ( <ListBooks 
                key={book.id} 
                books={book}
                
                  /> )
            })

          }
          
        </ListContainer>
    </Container>
    )
}

export default ListaBooks;