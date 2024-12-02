import { useState } from 'react'
import styles from './AddTask.module.css'

function AddTask() {

    const [initialMessage, setInitialMessage] = useState('No tasks added')
    const [task, setTask] = useState('')
    const [inputValue, setInputValue] = useState(''); 
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [itemsList, setItemsList] = useState([])

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (inputValue === '') {
            return
        }

        // Criar um id único para cada tarefa, evitando a posição no array como id, pois quando excluímos uma tarefa a seguinte ocupa o id da excluída
        const newTask = {
            id: Date.now(),
            task: inputValue,
            completed: false,
        }
        
        // Adiciona o novo item diretamente à lista antes de atualizar o task
        setItemsList((prevItems) => [...prevItems, newTask])

        setTask(inputValue)
        setIsSubmitted(true)
        setInputValue('')
        setInitialMessage('')
    }

    const handleItem = (id) => {
        // Usando o ID para alterar o estado da tarefa de não completado para completado e vice-versa
        const updatedItemsList = itemsList.map((item => item.id === id ? { ...item, completed: !item.completed} : item))
        setItemsList(updatedItemsList)
    }
    
    const handleDelete = (id, e) => {
        // deixa o evento de delete restrito ao botão e não ao li todo
        e.stopPropagation()

        const updatedItemsList = itemsList.filter((item) => item.id !== id)
        setItemsList(updatedItemsList)
    }

    const handleDeleteAll = () => {
        setItemsList(() => [])
    }


  return (
    <div>
      <form  onSubmit={handleSubmit}
      className={styles.form}>
          <label className={styles.label}>
            <input className={styles.input}
            onChange={handleChange}
            type="text" name='task' id='task' value={inputValue} placeholder='What is your next task?'/>
            <input className={styles.button}
            type="submit" value='Add' />
          </label>
            <span>{initialMessage}</span>
      </form>

      <ul className={styles.ul}>
        {isSubmitted && itemsList.map((task) => (
            <li key={task.id} className={task.completed ? styles.checkedItem : styles.item} onClick={() => handleItem(task.id)}>
                <span>{task.task}</span>
                <button className={styles.delButton} onClick={(e) => handleDelete(task.id, e)}>Delete</button>
            </li>))}
      </ul>

            {itemsList.length > 0 ? <button className={styles.delAllButton} onClick={handleDeleteAll}>Delete all</button> : null}
      
    </div>
  )
}

export default AddTask
