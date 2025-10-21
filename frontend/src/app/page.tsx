'use client'

import { useEffect, useState } from 'react'

interface Todo {
  id: number
  title: string
  completed: boolean
  createdAt: string
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newTodoTitle, setNewTodoTitle] = useState('')

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3001/todos')
      if (!response.ok) {
        throw new Error('Failed to fetch todos')
      }
      const data = await response.json()
      setTodos(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async () => {
    if (!newTodoTitle.trim()) return

    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodoTitle }),
      })

      if (!response.ok) {
        throw new Error('Failed to add todo')
      }

      setNewTodoTitle('')
      await fetchTodos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo')
    }
  }

  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      })

      if (!response.ok) {
        throw new Error('Failed to update todo')
      }

      await fetchTodos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo')
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete todo')
      }

      await fetchTodos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo')
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Todo App</h1>
      <p>Next.js + NestJS</p>

      {error && (
        <div style={{
          padding: '1rem',
          marginBottom: '1rem',
          backgroundColor: '#fee',
          color: '#c00',
          borderRadius: '4px'
        }}>
          Error: {error}
        </div>
      )}

      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="新しいTodoを入力..."
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            width: '70%',
            marginRight: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          追加
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Todo一覧 ({todos.length}件)</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {todos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  padding: '1rem',
                  marginBottom: '0.5rem',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id, todo.completed)}
                    style={{ marginRight: '1rem' }}
                  />
                  <span style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#999' : '#000'
                  }}>
                    {todo.title}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#f00',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}
