import { Field, ErrorMessage } from 'formik'
import ErrorText from './errorText/ErrorText'
import { TextField } from '@mui/material'


const Input = (props) => {
    const { name ,divStyle, className,...rest} = props
    
  return (
    <div className={divStyle}>
        <Field as={TextField}  variant="standard" id={name} name={name}  className={className} {...rest} />
        <ErrorMessage name={name} component={ErrorText} />
    </div>
  )
}

export default Input
