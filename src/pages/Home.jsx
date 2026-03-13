import React from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';

const Home = () => {
  const navigate = useNavigate();

  const handleEditTask = (task) => {
    navigate(`/edit-task/${task.id}`);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Minhas Tarefas</h1>
          <p style={styles.subtitle}>Organize seu dia de forma eficiente</p>
        </div>
        <button 
          onClick={() => navigate('/add-task')}
          style={styles.addButton}
        >
          <span style={styles.plusIcon}>+</span>
          Nova Tarefa
        </button>
      </header>

      <TaskList onEditTask={handleEditTask} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  title: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#333',
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    margin: 0
  },
  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 24px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(102, 126, 234, 0.3)',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  plusIcon: {
    fontSize: '20px',
    fontWeight: '700'
  }
};

export default Home;
