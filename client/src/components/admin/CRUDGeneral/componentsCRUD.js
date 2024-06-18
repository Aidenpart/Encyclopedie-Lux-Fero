export const InputTextOrTextarea = ({label, value, onChange, isTextArea}) => {

    return (
        <label>{label} :
        {isTextArea ?
            <textarea onChange={onChange} value={value} />
            : <input onChange={onChange} value={value} type="text" /> }
        </label>
    );
};


export const InputNumber = ({label, value, onChange}) => {

    return (
        <label>{label} :
           <input onChange={onChange} value={value} type="number" />
        </label>
    );
};


export const InputList = ({label, value, onChange, list}) => {

    return (
        <label>{label} :
            <select onChange={onChange} value={value}>
                <option>-----</option>
                {list.map((data, i) => {
                    return <option key={i}>{data}</option>;
                })}
            </select>
        </label>
    );
};