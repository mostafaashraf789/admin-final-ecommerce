import { ErrorMessage, Field } from 'formik'
import ErrorText from './errorText/ErrorText'


function Select(props) {
    const {  name,selectClass, divStyle,optionClass,options, ...rest } = props
    return (
        <div className={divStyle}>
            <Field as='select' name={name} id={name} {...rest}  className={` ${selectClass}`}>
                {options.map(option => (
                    <option key={option.value} value={option.value} className={optionClass}>
                        {option.key}
                    </option>
                ))}
            </Field>
            <ErrorMessage name={name} component={ErrorText} />

        </div>
    )
}

export default Select
