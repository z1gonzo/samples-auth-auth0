import React, { Fragment, useState } from 'react'
const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  const [activeModal, setActiveModal] = useState(false);

  const updateDescription = async e => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        `http://localhost:5000/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  const isActive = () => { setActiveModal(!activeModal) }
  const active = activeModal ? "is-active" : "";

  return (
    <Fragment>
      <div classname="main">
        <button onClick={isActive}>Edit</button>
        <div class={`modal ${active}`}>
          {/* <div class="modal-background"></div> */}
          <div class="modal-content has-background-grey">
            <div class="modal-header">
              <h4 class="modal-title">Edit Todo</h4>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateDescription(e)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={isActive}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};


export default EditTodo;