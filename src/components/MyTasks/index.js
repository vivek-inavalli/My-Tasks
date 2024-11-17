import './index.css'
import {Component} from 'react'

import {v4 as uuid} from 'uuid'

import Tags from '../Tags'
import Tasks from '../Tasks'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTasks extends Component {
  state = {
    taskName: '',
    tagName: tagsList[0].optionId,
    myTaskList: [],
    activeTag: '',
  }

  onClickTag = id => {
    const {activeTag} = this.state
    if (id === activeTag) {
      this.setState({activeTag: ''})
    } else {
      this.setState({activeTag: id})
    }
  }

  submitTask = event => {
    event.preventDefault()
    const {taskName, tagName} = this.state
    const taskDetails = {id: uuid(), taskName, tagName}

    this.setState(prevState => ({
      taskName: '',
      tagName: tagsList[0].optionId,
      myTaskList: [...prevState.myTaskList, taskDetails],
    }))
  }

  onChangeTaskName = e => {
    this.setState({taskName: e.target.value})
  }

  renderTaskField = () => {
    const {taskName} = this.state
    return (
      <div className="inputFieldContainer">
        <label htmlFor="task" className="title">
          Task
        </label>
        <input
          type="text"
          value={taskName}
          placeholder="Enter the task here"
          onChange={this.onChangeTaskName}
          className="inputField"
          id="task"
          required
        />
      </div>
    )
  }

  onChangeTag = e => {
    this.setState({tagName: e.target.value})
  }

  renderTagsField = () => {
    const {tagName} = this.state
    return (
      <div className="inputFieldContainer">
        <label htmlFor="task" className="title">
          Tags
        </label>
        <select
          className="inputField"
          onChange={this.onChangeTag}
          value={tagName}
        >
          {tagsList.map(tagDetails => (
            <option value={tagDetails.optionId} key={tagDetails.optionId}>
              {tagDetails.displayText}
            </option>
          ))}
        </select>
      </div>
    )
  }

  render() {
    const {myTaskList, activeTag} = this.state
    const filteredList = myTaskList.filter(item => item.tagName === activeTag)
    console.log(filteredList)
    const list = activeTag === '' ? myTaskList : filteredList
    return (
      <div className="appContainer">
        <div className="creatingTask">
          <h1 className="mainHeading">Create a Task!</h1>
          <form onSubmit={this.submitTask} className="formContainer">
            {this.renderTaskField()}
            {this.renderTagsField()}
            <button type="submit" className="submitBtn">
              Add Task
            </button>
          </form>
        </div>
        <div className="createdTasks">
          <h1 className="heading">Tags</h1>
          <ul className="tagButtons">
            {tagsList.map(item => (
              <Tags
                key={item.optionId}
                tagDetails={item}
                activeTag={activeTag}
                onClickTag={this.onClickTag}
              />
            ))}
          </ul>
          <h1 className="heading">Tasks</h1>
          {myTaskList.length > 0 ? (
            <ul className="myTasks">
              {list.map(item => (
                <Tasks key={item.id} taskDetails={item} />
              ))}
            </ul>
          ) : (
            <p className="noTasks">No Tasks Added Yet</p>
          )}
        </div>
      </div>
    )
  }
}

export default MyTasks
