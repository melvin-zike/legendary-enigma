import React, { useState } from 'react'

const CommentForm = ({handleSubmit,
     submitlabel, 
     hasCancelButton = false,
     initialText = "",
     handleCancel,
    }) => {
    const [text, setText] = useState(initialText);
    const isTexteareaDisabled = text.length === 0;

    const onSubmit = event => {
        event.preventDefault();
        handleSubmit(text);
        setText("");
    }

    return (
        <div>
          <form className="comment-contain" onSubmit={onSubmit}>
              <textarea 
              className="comment-form-textarea"
              value={text}
              placeholder="Write Comment"
              onChange={(e) => setText(e.target.value)}
              />
             
              <button className="comment-form-button" disabled={isTexteareaDisabled}>{submitlabel}</button>
              {hasCancelButton &&  (
                  <button type="button"
                  className  ="comment-form-button comment-form-coancel-button"
                  onClick={handleCancel} 
                  >
                      Cancle
                      </button>
              )}
              
              
               </form>  
        </div>
    )
}

export default CommentForm
