function Option(props) {

    return (
        <div className={'option ' + (props.value ? 'checked': '')} onClick={props.toggle}>
            <input id='val' title="select" type="checkbox" checked={props.value} onChange={(e)=>{}}/>&nbsp;{props.text}
        </div>
    )
}