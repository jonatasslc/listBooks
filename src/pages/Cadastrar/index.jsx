import React, {useState} from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const initialValue = {
    title: '',
    image: '',
    price: 0,
    url: '',
}; // os campos acima vão receber valores digitados no formulário



function Cadastrar(){
    //
    const [values, setValues] = useState(initialValue); // um objeto que usa o state para armazenar os livros cadastrados

    //
    const navigate = useNavigate(); // hook do Routes para navegação

    // 
    function onSubmit(evento){ // ao salvar os dados, essa função é acionada
        evento.preventDefault(); // para não executar o comportamento padrão do form, que é de recarregar automaticamente

        const url = '/books';

        api.post(url, values) // está enviando para a api fake os dados armazenados no values, usando o post
            .then( () =>{
                navigate('/'); // endereço da api fake
            })
    }

    // essa função abaixo está enviando os dados digitados no formulário para o values, automaticamente a cada alteração
    function onChange(ev){
        const {name, value } = ev.target
        // console.log({name, value});

        setValues({ ...values, [name]:value}) // "..." indica que vai considerar o que já havia antes no "values" e adicionar o que está sendo preenchido
        // console.log(values);
    }

    return(
        <>
            <h1>Cadastrar</h1>
            <form onSubmit={onSubmit}>
                <div className={styles.booksFormGroup}>
                    <label htmlFor="title">Titulo</label>
                    <input type="text" id="title" name="title" onChange={onChange}/>
                </div>
                <div className={styles.booksFormGroup}>
                    <label htmlFor="url">Url do Livro</label>
                    <input type="text" id="url" name="url" onChange={onChange}/>
                </div>
                <div className={styles.booksFormGroup}>
                    <label htmlFor="image">Url/Image</label>
                    <input type="text" id="image" name="image" onChange={onChange}/>
                </div>
                <div className={styles.booksFormGroup}>
                    <label htmlFor="price">Preço</label>
                    <input type="text" id="price" name="price" onChange={onChange}/>
                </div>
                <button type="submit">Salvar</button>
            </form>            
        </>
    )
}

export default Cadastrar;