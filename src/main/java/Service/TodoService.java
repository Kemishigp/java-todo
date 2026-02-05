package com.example.todo.service;

import com.example.todo.model.Todo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class TodoService {

    private final List<Todo> todos = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong();

    public List<Todo> getAllTodos() {
        return todos;
    }

    public Todo addTodo(String title) {
        Todo todo = new Todo(idCounter.incrementAndGet(), title, false);
        todos.add(todo);
        return todo;
    }

    public Todo completeTodo(Long id) {
        for (Todo todo : todos) {
            if (todo.getId().equals(id)) {
                todo.setCompleted(true);
                return todo;
            }
        }
        return null;
    }
}
