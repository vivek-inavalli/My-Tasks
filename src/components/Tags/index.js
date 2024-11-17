import './index.css'

const Tags = props => {
  const {tagDetails, onClickTag, activeTag} = props
  const {displayText, optionId} = tagDetails
  return (
    <li className="tagList">
      <button
        type="button"
        className={`${activeTag === optionId ? 'tagBtn active' : 'tagBtn'}`}
        onClick={() => onClickTag(optionId)}
      >
        {displayText}
      </button>
    </li>
  )
}

export default Tags