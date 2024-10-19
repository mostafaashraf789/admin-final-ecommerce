
import Input from './InputComponant'
import Select from './Select'
import TextArea from './TextArea'

const FormController = (props) => {

    const {control , ...rest }= props 
  
    switch(control){
        case 'input':
            return <Input {...rest}/>
        case 'textarea':
            return <TextArea {...rest}/>
        case 'select':
            return <Select {...rest}/>
        default: return null
    }
  
   
   
        
}

export default FormController
