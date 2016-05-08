import {Page} from 'ionic-angular';
import {ApplicationRef} from 'angular2/core';
import {Todo} from '../../classes/Todo';
import {loadTodos, addTodo, toggleTodo, deleteTodo, startBackendAction, endBackendAction} from '../../actions/todoActions';
import {TodoService} from "../../services/TodoService";
import {TodoStore} from "../../store/store";
import {List} from 'immutable';

@Page({
  templateUrl: 'build/pages/page1/page1.html',
  providers: [TodoService]
})
export class Page1 {
  // store: any = TodoStore;
  unsubscribe: Function;
  onAddtodo: any;
  todos: any;

  constructor(private store: TodoStore, applicationRef: ApplicationRef, private todoService: TodoService) {

    todoService.getAllTodos()
          .subscribe(
              res => {
                  let todos = res.map((todo: Todo) =>
                      new Todo({id:todo.id, description:todo.description,completed: todo.completed}));

                  store.dispatch(loadTodos(List(todos)));
              },
              err => console.log("Error retrieving Todos")
          );

       this.unsubscribe = store.subscribe(
          state => {
            console.log('Received new store state: ', state.todos);
            this.todos = state.todos;
            applicationRef.tick();
          }
      );
  }



  onAddTodo(input) {
        let description = input.value
        let newTodo = new Todo({id:Math.random(), description});

        // this.store.dispatch(startBackendAction('Saving Todo...'));

        this.store.dispatch(addTodo(newTodo));

        // this.store.dispatch(endBackendAction('Error occurred: '));

        input.value = '';
    }

    onToggleTodo(todo){
      console.log('toggle me', todo);
      this.store.dispatch(toggleTodo(todo));
    }

    onRemoveTodo(todo){
      console.log('remove me', todo);
      this.store.dispatch(deleteTodo(todo));
    }

}
