import { Form, Col, Button } from 'react-bootstrap'
import Select from 'react-select';

export function addFormGroup(controlId, label, placeholder, fieldValue, fieldName, handleChange, errorMap, type) {
    return (
        <Form.Group as={Col} controlId={controlId} key={label} >
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} onChange={handleChange}
                value={fieldValue} name={fieldName} />
            {errorMap && errorMap[fieldName] && <div className="alert alert-danger">{errorMap[fieldName]}</div>}
        </Form.Group>
    );
}

export function getSelectOptions(options, value, lable) {

    var arrOfOptions = []

    options.map((option) => {
        const obj = {
            value: option[value],
            label: option[lable]
        }
        arrOfOptions.push(obj)
    });
    return arrOfOptions;


}


export function addSelectFormGroup(controlId, label, fieldValue, handleChange, options, value, lable, name) {
    return (
        <Form.Group as={Col} controlId={controlId} >
            <Form.Label>{label}</Form.Label>
            <Select
                defaultValue={fieldValue}
                onChange={(selectedOption) => { handleChange(selectedOption, name) }}
                options={getSelectOptions(options, value, lable)}
            />
        </Form.Group>
    )
}

export function formButton(verb) {
    return (
        <Button variant="dark" type="submit">
            {verb}
        </Button>
    )
}