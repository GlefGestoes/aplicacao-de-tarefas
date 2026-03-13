import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';

const TaskList = ({ onEditTask }) => {
  const { tasks, stats, loading } = useTasks();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  if (loading) {
    return <div style={styles.loading}>Carregando tarefas...</div>;
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const getEmptyMessage = () => {
    if (tasks.length === 0) return 'Nenhuma tarefa cadastrada. Adicione sua primeira tarefa!';
    if (filter === 'pending' && filteredTasks.length === 0) return 'Nenhuma tarefa pendente!';
    if (filter === 'completed' && filteredTasks.length === 0) return 'Nenhuma tarefa concluída!';
    return 'Nenhuma tarefa encontrada.';
  };

  return (
    <div style={styles.container}>
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <span style={styles.statNumber}>{stats.total}</span>
          <span style={styles.statLabel}>Total</span>
        </div>
        <div style={{...styles.statCard, backgroundColor: '#e8f5e9'}}>
          <span style={{...styles.statNumber, color: '#4caf50'}}>{stats.completed}</span>
          <span style={styles.statLabel}>Concluídas</span>
        </div>
        <div style={{...styles.statCard, backgroundColor: '#fff3e0'}}>
          <span style={{...styles.statNumber, color: '#ff9800'}}>{stats.pending}</span>
          <span style={styles.statLabel}>Pendentes</span>
        </div>
      </div>

      <div style={styles.controls}>
        <div style={styles.filterGroup}>
          <button
            onClick={() => setFilter('all')}
            style={{
              ...styles.filterButton,
              backgroundColor: filter === 'all' ? '#667eea' : '#f0f0f0',
              color: filter === 'all' ? 'white' : '#333'
            }}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('pending')}
            style={{
              ...styles.filterButton,
              backgroundColor: filter === 'pending' ? '#ff9800' : '#f0f0f0',
              color: filter === 'pending' ? 'white' : '#333'
            }}
          >
            Pendentes
          </button>
          <button
            onClick={() => setFilter('completed')}
            style={{
              ...styles.filterButton,
              backgroundColor: filter === 'completed' ? '#4caf50' : '#f0f0f0',
              color: filter === 'completed' ? 'white' : '#333'
            }}
          >
            Concluídas
          </button>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={styles.sortSelect}
        >
          <option value="date">Ordenar por Data</option>
          <option value="priority">Ordenar por Prioridade</option>
        </select>
      </div>

      <div style={styles.list}>
        {sortedTasks.length > 0 ? (
          sortedTasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onEdit={onEditTask}
            />
          ))
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📝</div>
            <p style={styles.emptyText}>{getEmptyMessage()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#666',
    fontSize: '16px'
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  statNumber: {
    display: 'block',
    fontSize: '28px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500'
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '12px'
  },
  filterGroup: {
    display: 'flex',
    gap: '8px'
  },
  filterButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'all 0.3s'
  },
  sortSelect: {
    padding: '10px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '14px'
  },
  list: {
    display: 'flex',
    flexDirection: 'column'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#999'
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  emptyText: {
    fontSize: '16px',
    margin: 0
  }
};

export default TaskList;
