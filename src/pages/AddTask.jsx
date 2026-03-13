import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';

const AddTask = () => {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const handleSubmit = (formData) => {
    addTask(formData);
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button 
          onClick={() => navigate('/')}
          style={styles.backButton}
        >
          ← Voltar
        </button>
        <h1 style={styles.title}>Adicionar Nova Tarefa</h1>
      </div>
      
      <TaskForm 
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
        buttonText="Adicionar Tarefa"
      />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px'
  },
  header: {
    marginBottom: '30px'
  },
  backButton: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '0',
    marginBottom: '16px',
    fontWeight: '600'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#333',
    margin: 0
  }
};

export default AddTask;
