const {useState, useEffect} = React;

function Option(props) {
    return (
        <div className={'sad-option ' + (props.value ? 'sad-checked': '')} onClick={props.toggle}>
            <input id='sad-val' title="select" type="checkbox" checked={props.value} onChange={(e)=>{}}/>&nbsp;{props.text}
        </div>
    )
}

function StandaloneSearchDropdown(props) {
    var [options, setOptions] = useState(props.options);
    const original = props.options;

    const getDropdown = () => {return document.getElementById('sad-options')}

    const getInputVal = () => {return document.getElementById('sad-select').value}

    const getContainer = () => {return document.getElementById('sad-select-container')};

    const hideDropdown = (e) => {
        getDropdown().style.display = 'none';
    }

    const showDropdown = (e) => {
        getDropdown().style.display = 'flex';
    }

    const filterResults = (e) => {
        let input = getInputVal();
        if (input.trim() == '')
            setOptions(original);
        else {
            let filtered = original.filter(o=>o.text.toLowerCase().includes(input.toLowerCase()));
            setOptions(filtered);
        }
    }

    useEffect(()=>{
        document.addEventListener('mousedown', (e)=>{
            const container = getContainer();
            if (!container.contains(e.target))
                hideDropdown();
        })
    },[])

    const sortFiltered = (o) => {
        const reg = (a,b) => {
            if (a == b) return 0;
            if (a > b) return 1;
            if (a < b) return -1;
        }
        let current = [...o];
        current = current.sort((a,b)=>a.text>=b.text);
        current = current.sort((a,b)=>{
            let c = b.value - a.value;
            if (c == 0)
                return reg(a.text, b.text);
            else return c;
        })
        return current;
    }

    const genToggleMethod = (index) => {
        return () => {
            let o = [...options];
            o[index].value = !o[index].value;
            setOptions(sortFiltered(o));
            console.log(o);
        }
    } 

    return (
        <div id='sad-select-container' style={{width: props.container_width || '25%', height: props.container_height || '25%'}}>
            <input onKeyUp={filterResults} onFocus={showDropdown} title="d" type="text" id='sad-select' style={{width: props.input_width || '100%'}}></input>
            <div id='sad-options' style={{display:'none'}}>
                {options.map((option, i)=><Option key={i} text={option.text} value={option.value} toggle={genToggleMethod(i)}></Option>)}
                {options.length == 0 ? <span>Sorry, no results.</span> : ''}
            </div>
        </div>
    )
}