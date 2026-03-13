import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskForm from '../components/TaskForm';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, editTask } = useTasks();
  
  const task = getTaskById(id);

  if (!task) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>
          <h2>Tarefa não encontrada</h2>
          <button onClick={() => navigate('/')} style={styles.button}>
            Voltar para Home
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (formData) => {
    editTask(id, formData);
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
        <h1 style={styles.title}>Editar Tarefa</h1>
      </div>
      
      <TaskForm 
        initialData={task}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
        buttonText="Salvar Alterações"
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
  },
  error: {
    textAlign: 'center',
    padding: '60px 20px'
  },
  button: {
    marginTop: '20px',
    padding: '12px 24px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px'
  }
};

export default EditTask;
