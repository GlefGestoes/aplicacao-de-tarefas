import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskItem = ({ task, onEdit }) => {
  const { removeTask, toggleTaskCompletion } = useTasks();
  const [isExpanded, setIsExpanded] = useState(false);

  const priorityColors = {
    low: '#4caf50',
    medium: '#ff9800',
    high: '#f44336'
  };

  const priorityLabels = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta'
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{
      ...styles.container,
      opacity: task.completed ? 0.7 : 1,
      backgroundColor: task.completed ? '#f5f5f5' : 'white'
    }}>
      <div style={styles.header}>
        <div style={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTaskCompletion(task.id)}
            style={styles.checkbox}
          />
        </div>
        
        <div style={styles.content} onClick={() => setIsExpanded(!isExpanded)}>
          <h3 style={{
            ...styles.title,
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#999' : '#333'
          }}>
            {task.title}
          </h3>
          
          <div style={styles.meta}>
            <span style={{
              ...styles.priority,
              backgroundColor: priorityColors[task.priority],
              color: 'white'
            }}>
              {priorityLabels[task.priority]}
            </span>
            <span style={styles.date}>
              {formatDate(task.createdAt)}
            </span>
          </div>
        </div>

        <div style={styles.actions}>
          <button 
            onClick={() => onEdit(task)}
            style={styles.editButton}
            title="Editar"
          >
            ✏️
          </button>
          <button 
            onClick={() => {
              if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
                removeTask(task.id);
              }
            }}
            style={styles.deleteButton}
            title="Excluir"
          >
            🗑️
          </button>
        </div>
      </div>

      {isExpanded && task.description && (
        <div style={styles.description}>
          <p>{task.description}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    marginBottom: '12px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    gap: '12px'
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  checkbox: {
    width: '22px',
    height: '22px',
    cursor: 'pointer',
    accentColor: '#667eea'
  },
  content: {
    flex: 1,
    cursor: 'pointer'
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '16px',
    fontWeight: '600'
  },
  meta: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    fontSize: '13px'
  },
  priority: {
    padding: '4px 10px',
    borderRadius: '20px',
    fontWeight: '600',
    fontSize: '12px'
  },
  date: {
    color: '#666'
  },
  actions: {
    display: 'flex',
    gap: '8px'
  },
  editButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    transition: 'background-color 0.2s'
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '6px',
    transition: 'background-color 0.2s'
  },
  description: {
    padding: '0 16px 16px 50px',
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.5',
    borderTop: '1px solid #f0f0f0',
    marginTop: '8px',
    paddingTop: '12px'
  }
};

export default TaskItem;
