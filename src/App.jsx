import { useState } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs';
import './App.css';

function App() {
  const [titulo, setTitulo] = useState('');
  const [duracao, setDuracao] = useState('');
  const [tarefas, setTarefas] = useState([]);

  const adicionarTarefa = (e) => {
    e.preventDefault();
    if (titulo && duracao) {
      const novaTarefa = {
        id: Date.now(),
        titulo,
        duracao,
        concluida: false
      };
      setTarefas([...tarefas, novaTarefa]);
      setTitulo('');
      setDuracao('');
    }
  };

  const marcarComoConcluida = (id) => {
    setTarefas(
      tarefas.map(tarefa =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };

  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  };

  return (
    <div className='conteudo-principal'>
      <div className='header'>
        <h1>Lista de Tarefas</h1>
      </div>

      <div className='form'>
        <h2>Insira a sua próxima tarefa:</h2>
        <form onSubmit={adicionarTarefa}>
          <div className='form-control'>
            <label htmlFor="titulo">O que você vai fazer?</label>
            <input 
              type="text" 
              name="titulo" 
              placeholder='Título da tarefa' 
              onChange={(e) => setTitulo(e.target.value)}
              value={titulo} 
              required
            />
          </div>
          <div className='form-control'>
            <label htmlFor="duracao">Duração:</label>
            <input 
              type="text" 
              name="duracao" 
              placeholder='Tempo estimado (em horas)' 
              onChange={(e) => setDuracao(e.target.value)}
              value={duracao} 
              required
            />
          </div>
          <input type="submit" value="Criar Tarefa" />
        </form>
      </div>

      <div className='lista-tarefas'>
        <h2>Lista de tarefas:</h2>
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id} className={tarefa.concluida ? 'concluida' : ''}>
              <span>{tarefa.titulo} - {tarefa.duracao} hora(s)</span>
              <button onClick={() => marcarComoConcluida(tarefa.id)}>
                {tarefa.concluida ? <BsBookmarkCheckFill /> : <BsBookmarkCheck />}
              </button>
              <button onClick={() => removerTarefa(tarefa.id)}>
                <BsTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;