import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [projects, setProject] = useState([])

  useEffect(()=> {
    api.get('/repositories')
      .then(response => {
        setProject(response.data)
      })
  }, [])

  async function handleAddRepository() {

    const _new = {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    }

    await api.post('/repositories', _new).then(response => {
      setProject([...projects, response.data])
    })

  }

  async function handleRemoveRepository(id) {
    await api.delete('repositories/'+id);

    const newRepositories = projects.filter(
      repository => repository.id !== id
    )

    setProject(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map( project => 
        <li id={project.id} key={project.id}>
          {project.title} 
          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
        </li> )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
