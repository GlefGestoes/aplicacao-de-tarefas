import React, { useState, useEffect } from 'react';

const TaskForm = ({ initialData = null, onSubmit, onCancel, buttonText = 'Salvar' }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        priority: initialData.priority || 'medium'
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'O título é obrigatório';
    } else if (formData.title.length < 3) {
      newErrors.title = 'O título deve ter pelo menos 3 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      if (!initialData) {
        setFormData({ title: '', description: '', priority: 'medium' });
      }
    }
  };

  const priorities = [
    { value: 'low', label: 'Baixa', color: '#4caf50' },
    { value: 'medium', label: 'Média', color: '#ff9800' },
    { value: 'high', label: 'Alta', color: '#f44336' }
  ];

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label htmlFor="title" style={styles.label}>Título *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Digite o título da tarefa"
          style={{
            ...styles.input,
            borderColor: errors.title ? '#f44336' : '#ddd'
          }}
        />
        {errors.title && <span style={styles.error}>{errors.title}</span>}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="description" style={styles.label}>Descrição</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Digite a descrição da tarefa (opcional)"
          rows="4"
          style={styles.textarea}
        />
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="priority" style={styles.label}>Prioridade</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          style={styles.select}
        >
          {priorities.map(p => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.buttonGroup}>
        {onCancel && (
          <button type="button" onClick={onCancel} style={styles.cancelButton}>
            Cancelar
          </button>
        )}
        <button type="submit" style={styles.submitButton}>
          {buttonText}
        </button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontWeight: '600',
    color: '#333',
    fontSize: '14px'
  },
  input: {
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.3s',
    outline: 'none'
  },
  textarea: {
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    resize: 'vertical',
    minHeight: '100px',
    fontFamily: 'inherit'
  },
  select: {
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  error: {
    color: '#f44336',
    fontSize: '13px',
    marginTop: '4px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '10px'
  },
  submitButton: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  cancelButton: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#e0e0e0',
    color: '#333',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default TaskForm;
