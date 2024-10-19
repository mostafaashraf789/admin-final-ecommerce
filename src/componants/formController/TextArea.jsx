import { ErrorMessage, Field } from 'formik'

import ErrorText from './errorText/ErrorText'

function TextArea(props) {
    const { name, divStyle, ...rest } = props
    return (
        <div className={divStyle} >
            <Field as='textarea' id={name} name={name} {...rest} />
            <ErrorMessage name={name} component={ErrorText} />
        </div>
    )
}

export default TextArea

