/* eslint-disable no-useless-computed-key */
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as action from "./_redux/todos/todoAction";

function App() {
  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state.todos);
  const [value, setValue] = useState("");

  const onDragEnd = (result, columns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      const data = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      };
      dispatch(action.storeToTodo(data));
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      const data = {
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      };
      dispatch(action.storeToTodo(data));
    }
  };

  const handleAdd = () => {
    const prev = { ...columns };
    const data = {
      ...prev,
      todo_list: {
        name: prev.todo_list.name,
        items: [...prev.todo_list.items, { id: uuidv4(), content: value }],
      },
    };
    dispatch(action.storeToTodo(data));
    setValue("");
  };

  useEffect(() => {
    const data =
      localStorage.getItem("TODO") && JSON.parse(localStorage.getItem("TODO"));

    if (data && Object.keys(data).length > 0) {
      dispatch(action.storeToTodo(data));
    }
  }, [dispatch]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          height: "100%",
          margin: "50px 0 20px 0",
        }}
      >
        <input
          style={{ width: "300px", height: "30px", padding: "5px" }}
          value={value}
          placeholder="Write your task ..."
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <button
          onClick={handleAdd}
          style={{ background: "#fff", color: "#ff6347", fontSize: "20px" }}
        >
          Add
        </button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <DragDropContext onDragEnd={(result) => onDragEnd(result, columns)}>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px solid #000",
                }}
                key={columnId}
              >
                <div
                  style={{
                    background: "#ff6347",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <h2>{column.name}</h2>
                </div>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
